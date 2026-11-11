const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function load(filename) {
    const elements = new Map();
    function element(id = '') {
        return { id, textContent: '9.9', innerHTML: '', value: '0', checked: false,
            setAttribute() {}, remove() { elements.delete(this.id); },
            before(child) { elements.set(child.id, child); } };
    }
    for (const id of ['fx-skills', 'fx-difficulty-score', 'fx-group-score', 'fx-total-score',
        'fx-target-score', 'total-d-score', 'total-e-score', 'total-target-score',
        'report-preview', 'report-content', 'apparatus-summary']) elements.set(id, element(id));
    const context = vm.createContext({
        document: { addEventListener() {}, getElementById: id => elements.get(id) || null,
            querySelectorAll: () => [], createElement: () => element() },
        window: { addEventListener() {} }, console: { log() {}, error() {} },
        setTimeout() {}, setInterval() {}, localStorage: { getItem: () => null, setItem() {} },
    });
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', filename), 'utf8'), context);
    return { context, elements, run: code => vm.runInContext(code, context) };
}

for (const filename of ['men_gymnastics_d_score.js', 'women_gymnastics_d_score.js']) {
    test(`${filename}: no demo data is substituted`, () => {
        const app = load(filename);
        app.run('loadSkillsData()');
        assert.equal(app.run('Object.values(skillsDatabase).reduce((n, skills) => n + skills.length, 0)'), 0);
        assert.equal(app.run('typeof generateDemoData'), 'undefined');
    });
    if (!filename.startsWith('men_')) {
        test(`${filename}: legacy data stops scoring and clears stale scores`, () => {
            const app = load(filename);
            app.run("currentRoutines.FX = [{name: 'ロンダートバク転', difficulty: 'A', value: 0.1}]; calculateScore('FX')");
            assert.equal(app.elements.get('fx-total-score').textContent, '—');
            assert.equal(app.elements.get('total-d-score').textContent, '—');
            assert.match(app.elements.get('fx-skill-data-error').textContent, /採点停止/);
            assert.equal(app.elements.get('report-preview').innerHTML, '');
            assert.equal(app.run('hasUnavailableSkillData()'), true);
        });
        test(`${filename}: manual difficulty can still be scored`, () => {
            const app = load(filename);
            app.run("currentRoutines.FX = [{name: '手入力', difficulty: 'D', value: 0.4, isCustom: true}]; updateEScoreCapDisplay = () => {}; updateTotalScores = () => {}; calculateScore('FX')");
            assert.equal(app.run('hasUnavailableSkillData()'), false);
            assert.equal(app.elements.get('fx-difficulty-score').textContent, '0.4');
            assert.equal(app.elements.get('fx-total-score').textContent, '0.4');
        });
    }
}


test('legacy data blocks report export before html2canvas', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'women.html'), 'utf8');
    const app = load('women_gymnastics_d_score.js');
    app.context.html2canvas = () => { throw new Error('must not render'); };
    let warnings = 0;
    app.context.alert = () => { warnings++; };
    const firstScript = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]).find(script => script.includes('function generateReport()'));
    assert.ok(firstScript);
    vm.runInContext(firstScript, app.context);
    app.run("currentRoutines.FX = [{name: 'old', difficulty: 'A'}]; generateReport()");
    assert.equal(warnings, 1);
});


for (const filename of ['men.html', 'women.html']) {
    test(`${filename}: inline scripts parse`, () => {
        const html = fs.readFileSync(path.join(__dirname, '..', filename), 'utf8');
        for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
            if (match[1].includes('application/ld+json') || !match[2].trim()) continue;
            assert.doesNotThrow(() => new vm.Script(match[2]));
        }
    });
}
