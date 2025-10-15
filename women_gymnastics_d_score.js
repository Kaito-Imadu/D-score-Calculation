// 技データベース（女子体操4種目）
const skillsDatabase = {
    'VT': [], // 跳馬（手動入力）
    'UB': [], // 段違い平行棒
    'BB': [], // 平均台
    'FX': []  // ゆか
};

// 現在のルーティン
const currentRoutines = {
    'VT': [],
    'UB': [],
    'BB': [],
    'FX': []
};

let currentApparatus = 'VT';
let currentRule = 'standard'; // 'standard' or 'alteration1'

// ローカルストレージ管理システム
const storageManager = {
    // データをローカルストレージに保存
    saveToStorage() {
        try {
            // 跳馬の手入力データを収集
            const vaultNameInput = document.getElementById('vt-skill-name');
            const vaultNumberInput = document.getElementById('vt-skill-number');
            const vaultScoreInput = document.getElementById('vt-d-score');
            
            if (vaultNameInput || vaultNumberInput || vaultScoreInput) {
                const vaultName = vaultNameInput ? vaultNameInput.value.trim() : '';
                const vaultNumber = vaultNumberInput ? vaultNumberInput.value.trim() : '';
                const vaultScore = vaultScoreInput ? parseFloat(vaultScoreInput.value) || 0 : 0;
                
                // 跳馬データを手動で更新（複数技対応）
                if (vaultName || vaultNumber || vaultScore > 0) {
                    // 既存の跳馬技を検索して更新、または新規追加
                    let existingIndex = -1;

                    if (vaultName.trim() !== '' || vaultNumber.trim() !== '') {
                        existingIndex = currentRoutines.VT.findIndex(skill => {
                            return (skill.name === vaultName && skill.skillNumber === vaultNumber) ||
                                   (skill.name === vaultName && vaultName.trim() !== '') ||
                                   (skill.skillNumber === vaultNumber && vaultNumber.trim() !== '');
                        });
                    }

                    const vaultSkillData = {
                        name: vaultName || '未入力',
                        skillNumber: vaultNumber || '',
                        difficulty: '',
                        elementGroup: '',
                        value: vaultScore
                    };

                    if (existingIndex !== -1) {
                        currentRoutines.VT[existingIndex] = vaultSkillData;
                        console.log(`Updated vault skill at index ${existingIndex}:`, vaultSkillData);
                    } else {
                        currentRoutines.VT.push(vaultSkillData);
                        console.log(`Added new vault skill:`, vaultSkillData);
                    }

                    console.log(`All vault skills in storage:`, currentRoutines.VT);
                } else {
                    console.log(`Skipping vault data update - empty values, keeping existing:`, currentRoutines.VT);
                }
            }
            
            // 組み合わせ加点とND値を収集
            const connectionScores = {};
            const otherNDs = {};
            const eScores = {};
            
            const apparatusList = ['VT', 'UB', 'BB', 'FX'];
            apparatusList.forEach(apparatus => {
                const key = apparatus.toLowerCase();
                
                // CV（組み合わせ点）は跳馬以外で対応
                if (apparatus !== 'VT') {
                    const cvInput = document.getElementById(`${key}-cv-input`);
                    if (cvInput) {
                        const value = parseFloat(cvInput.value) || 0;
                        connectionScores[apparatus] = value;
                        console.log(`Saving CV for ${apparatus}: ${value}`);
                    }
                }
                
                // その他ND（全種目）
                const otherNDInput = document.getElementById(`${key}-other-nd-input`);
                if (otherNDInput) {
                    const value = parseFloat(otherNDInput.value) || 0;
                    otherNDs[apparatus] = value;
                    console.log(`Saving other ND for ${apparatus}: ${value}`);
                }
                
                // 目標Eスコア（全種目）
                const eScoreInput = document.getElementById(`${key}-e-score-input`);
                if (eScoreInput) {
                    const value = parseFloat(eScoreInput.value) || 0.0;
                    eScores[apparatus] = value;
                    console.log(`Saving E-score for ${apparatus}: ${value}`);
                }
            });
            
            // CR状態を保存（ルール別）
            const compositionRequirements = {};
            ['standard', 'alteration1'].forEach(rule => {
                compositionRequirements[rule] = {};
                const suffix = rule === 'alteration1' ? '-alt' : '';
                
                ['UB', 'BB', 'FX'].forEach(apparatus => {
                    for (let i = 1; i <= 4; i++) {
                        const checkboxId = `${apparatus.toLowerCase()}-cr${i}${suffix}`;
                        const checkbox = document.getElementById(checkboxId);
                        if (checkbox) {
                            compositionRequirements[rule][checkboxId] = checkbox.checked;
                        }
                    }
                });
            });
            
            const dataToSave = {
                routines: currentRoutines,
                apparatus: currentApparatus,
                rule: currentRule,
                connectionScores: connectionScores,
                otherNDs: otherNDs,
                eScores: eScores,
                compositionRequirements: compositionRequirements,
                timestamp: Date.now()
            };
            localStorage.setItem('women_gymnastics_d_score_data', JSON.stringify(dataToSave));
            console.log('=== SAVE TO STORAGE ===');
            console.log('Vault data in currentRoutines:', currentRoutines.VT);
            console.log('Full data saved:', dataToSave);
            console.log('======================');
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },
    
    // ローカルストレージからデータを読み込み
    loadFromStorage() {
        try {
            const savedData = localStorage.getItem('women_gymnastics_d_score_data');
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // データを復元
                Object.keys(currentRoutines).forEach(apparatus => {
                    if (data.routines && data.routines[apparatus]) {
                        currentRoutines[apparatus] = [...data.routines[apparatus]];
                    }
                });
                
                // 種目も復元
                if (data.apparatus) {
                    currentApparatus = data.apparatus;
                }
                
                // ルールも復元
                if (data.rule) {
                    currentRule = data.rule;
                }
                
                // 跳馬の手入力フィールドを復元
                setTimeout(() => {
                    const vaultNameInput = document.getElementById('vt-skill-name');
                    const vaultNumberInput = document.getElementById('vt-skill-number');
                    const vaultScoreInput = document.getElementById('vt-d-score');
                    
                    if (currentRoutines.VT.length > 0) {
                        const vaultData = currentRoutines.VT[0];
                        if (vaultNameInput) {
                            vaultNameInput.value = vaultData.name === '未入力' ? '' : (vaultData.name || '');
                        }
                        if (vaultNumberInput) {
                            vaultNumberInput.value = vaultData.skillNumber || '';
                        }
                        if (vaultScoreInput) {
                            vaultScoreInput.value = vaultData.value || 0;
                        }
                        calculateVaultScore();
                        console.log('Vault manual data restored:', vaultData);
                    } else {
                        if (vaultNameInput) vaultNameInput.value = '';
                        if (vaultNumberInput) vaultNumberInput.value = '';
                        if (vaultScoreInput) vaultScoreInput.value = '';
                        console.log('No vault data to restore, cleared fields');
                    }
                }, 100);
                
                // 組み合わせ加点を復元
                if (data.connectionScores) {
                    Object.keys(data.connectionScores).forEach(apparatus => {
                        const key = apparatus.toLowerCase();
                        const connectionInput = document.getElementById(`${key}-connection-input`);
                        if (connectionInput) {
                            connectionInput.value = data.connectionScores[apparatus] || 0;
                            console.log(`Restored connection score for ${apparatus}: ${data.connectionScores[apparatus]}`);
                        } else {
                            console.log(`Connection input not found for: ${key}`);
                        }
                    });
                }
                
                // その他NDを復元（全種目）
                if (data.otherNDs) {
                    Object.keys(data.otherNDs).forEach(apparatus => {
                        const key = apparatus.toLowerCase();
                        const otherNDInput = document.getElementById(`${key}-other-nd-input`);
                        if (otherNDInput) {
                            otherNDInput.value = data.otherNDs[apparatus] || 0;
                            console.log(`Restored other ND for ${apparatus}: ${data.otherNDs[apparatus]}`);
                        } else {
                            console.log(`Other ND input not found for: ${key}`);
                        }
                    });
                }
                
                // 目標Eスコアを復元
                if (data.eScores) {
                    Object.keys(data.eScores).forEach(apparatus => {
                        const key = apparatus.toLowerCase();
                        const eScoreInput = document.getElementById(`${key}-e-score-input`);
                        if (eScoreInput) {
                            eScoreInput.value = data.eScores[apparatus] || 0.0;
                            console.log(`Restored E-score for ${apparatus}: ${data.eScores[apparatus]}`);
                        } else {
                            console.log(`E-score input not found for: ${key}`);
                        }
                    });
                }
                
                console.log('=== LOAD FROM STORAGE ===');
                console.log('Vault data loaded:', data.routines?.VT);
                console.log('Current VT after restore:', currentRoutines.VT);
                console.log('Full data loaded:', data);
                console.log('=========================');
                return true;
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
        return false;
    },
    
    // ローカルストレージをクリア
    clearStorage() {
        try {
            localStorage.removeItem('women_gymnastics_d_score_data');
            console.log('localStorage cleared');
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
};

// 履歴管理システム
const historyManager = {
    history: [],
    currentIndex: -1,
    maxHistory: 50,
    
    // 現在の状態をスナップショットとして保存
    takeSnapshot(description = 'Action') {
        const snapshot = {
            timestamp: Date.now(),
            description: description,
            apparatus: currentApparatus,
            routines: JSON.parse(JSON.stringify(currentRoutines)) // Deep copy
        };
        
        // 現在のインデックス以降の履歴を削除（新しい分岐を開始）
        this.history = this.history.slice(0, this.currentIndex + 1);
        
        // 新しいスナップショットを追加
        this.history.push(snapshot);
        
        // 履歴サイズ制限
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        } else {
            this.currentIndex++;
        }
        
        console.log(`History: Saved snapshot "${description}" (${this.currentIndex + 1}/${this.history.length})`);
        this.updateHistoryUI();
        
        // ローカルストレージにも保存
        storageManager.saveToStorage();
    },
    
    // 元に戻す（Undo）
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const snapshot = this.history[this.currentIndex];
            this.restoreSnapshot(snapshot);
            console.log(`History: Undone to "${snapshot.description}"`);
            this.updateHistoryUI();
            return true;
        }
        return false;
    },
    
    // やり直し（Redo）
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            const snapshot = this.history[this.currentIndex];
            this.restoreSnapshot(snapshot);
            console.log(`History: Redone to "${snapshot.description}"`);
            this.updateHistoryUI();
            return true;
        }
        return false;
    },
    
    // スナップショットを復元
    restoreSnapshot(snapshot) {
        // ルーティンデータを復元
        Object.keys(currentRoutines).forEach(apparatus => {
            currentRoutines[apparatus] = [...(snapshot.routines[apparatus] || [])];
        });
        
        // 表示を更新
        if (snapshot.apparatus !== currentApparatus) {
            switchApparatus(snapshot.apparatus);
        } else {
            displayCurrentRoutine(snapshot.apparatus);
            calculateScore(snapshot.apparatus);
        }
    },
    
    // 全リセット
    resetAll() {
        Object.keys(currentRoutines).forEach(apparatus => {
            currentRoutines[apparatus] = [];
        });
        
        // ローカルストレージもクリア
        storageManager.clearStorage();
        
        this.takeSnapshot('Reset All');
        displayCurrentRoutine(currentApparatus);
        calculateScore(currentApparatus);
        console.log('All routines reset');
    },
    
    // 履歴UIの更新
    updateHistoryUI() {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        const historyInfo = document.getElementById('history-info');
        
        if (undoBtn) undoBtn.disabled = this.currentIndex <= 0;
        if (redoBtn) redoBtn.disabled = this.currentIndex >= this.history.length - 1;
        
        if (historyInfo && this.history.length > 0) {
            const current = this.history[this.currentIndex];
            const timestamp = new Date(current.timestamp).toLocaleTimeString();
            historyInfo.textContent = `${current.description} (${timestamp})`;
        }
    }
};

// 埋め込まれたデータから技データを読み込む
function loadSkillsData() {
    console.log('=== Loading Embedded Skills Data ===');
    
    try {
        // 埋め込まれた技データを使用
        if (typeof FLOOR_SKILLS !== 'undefined') {
            const validFloorSkills = FLOOR_SKILLS.filter(skill => 
                skill && skill.name && skill.name.trim().length > 0
            );
            skillsDatabase.FX = validFloorSkills;
            console.log(`✓ Floor: ${validFloorSkills.length} skills loaded from embedded data`);
        } else {
            console.log('FLOOR_SKILLS not found, using demo data');
            skillsDatabase.FX = generateDemoData('FX');
        }
        
        if (typeof POMMEL_SKILLS !== 'undefined') {
            const validPommelSkills = POMMEL_SKILLS.filter(skill => 
                skill && skill.name && skill.name.trim().length > 0
            );
            skillsDatabase.PH = validPommelSkills;
            console.log(`✓ Pommel Horse: ${validPommelSkills.length} skills loaded from embedded data`);
        } else {
            console.log('POMMEL_SKILLS not found, using demo data');
            skillsDatabase.PH = generateDemoData('PH');
        }
        
        if (typeof RINGS_SKILLS !== 'undefined') {
            const validRingsSkills = RINGS_SKILLS.filter(skill => 
                skill && skill.name && skill.name.trim().length > 0
            );
            skillsDatabase.SR = validRingsSkills;
            console.log(`✓ Still Rings: ${validRingsSkills.length} skills loaded from embedded data`);
        } else {
            console.log('RINGS_SKILLS not found, using demo data');
            skillsDatabase.SR = generateDemoData('SR');
        }
        
        if (typeof PARALLEL_SKILLS !== 'undefined') {
            const validParallelSkills = PARALLEL_SKILLS.filter(skill => 
                skill && skill.name && skill.name.trim().length > 0
            );
            skillsDatabase.PB = validParallelSkills;
            console.log(`✓ Parallel Bars: ${validParallelSkills.length} skills loaded from embedded data`);
        } else {
            console.log('PARALLEL_SKILLS not found, using demo data');
            skillsDatabase.PB = generateDemoData('PB');
        }
        
        if (typeof HIGHBAR_SKILLS !== 'undefined') {
            const validHighbarSkills = HIGHBAR_SKILLS.filter(skill => 
                skill && skill.name && skill.name.trim().length > 0
            );
            skillsDatabase.HB = validHighbarSkills;
            console.log(`✓ High Bar: ${validHighbarSkills.length} skills loaded from embedded data`);
        } else {
            console.log('HIGHBAR_SKILLS not found, using demo data');
            skillsDatabase.HB = generateDemoData('HB');
        }
    } catch (error) {
        console.error('Error loading embedded skills data:', error);
        
        // フォールバック：すべてデモデータを使用
        skillsDatabase.FX = generateDemoData('FX');
        skillsDatabase.PH = generateDemoData('PH');
        skillsDatabase.SR = generateDemoData('SR');
        skillsDatabase.PB = generateDemoData('PB');
        skillsDatabase.HB = generateDemoData('HB');
    }

    console.log('=== Skills Data Loading Complete ===');
    
    // 全体のサマリー
    Object.keys(skillsDatabase).forEach(apparatus => {
        const skills = skillsDatabase[apparatus];
        console.log(`${apparatus}: ${skills.length} valid techniques loaded`);
        if (skills.length > 0) {
            console.log(`  Sample: "${skills[0].name}" (EG: ${skills[0].elementGroup || skills[0].eg}, 難度: ${skills[0].difficulty})`);
        }
    });
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const skills = [];
    
    for (let i = 2; i < lines.length; i++) { // ヘッダーをスキップ
        const line = lines[i].trim();
        if (!line) continue;
        
        const columns = line.split(',');
        if (columns.length >= 4) {
            const skill = {
                name: columns[2] ? columns[2].replace(/"/g, '') : '',
                eg: columns[3] ? columns[3].replace(/"/g, '') : '',
                difficulty: columns[4] ? columns[4].replace(/"/g, '') : ''
            };
            
            if (skill.name) {
                skills.push(skill);
            }
        }
    }
    
    return skills;
}

function generateDemoData(apparatus) {
    const demoData = {
        'FX': [
            { name: 'バク転', eg: 'Ⅲ', difficulty: 'A' },
            { name: '後方屈身2回宙返り', eg: 'Ⅲ', difficulty: 'D' },
            { name: '前方伸身宙返り', eg: 'Ⅱ', difficulty: 'B' },
            { name: '脚上挙支持', eg: 'Ⅰ', difficulty: 'B' }
        ],
        'PH': [
            { name: 'Bセア', eg: 'Ⅰ', difficulty: 'B' },
            { name: '横向き旋回', eg: 'Ⅱ', difficulty: 'A' },
            { name: 'イコウ', eg: 'Ⅲ', difficulty: 'A' }
        ],
        'SR': [
            { name: 'アザリアン', eg: 'Ⅱ', difficulty: 'D' },
            { name: '後ろ振り上がり十字懸垂', eg: 'Ⅲ', difficulty: 'C' },
            { name: 'ディスロー', eg: 'Ⅰ', difficulty: 'A' }
        ],
        'PB': [
            { name: '前方屈身宙返り', eg: 'Ⅱ', difficulty: 'C' },
            { name: '後方宙返り', eg: 'Ⅲ', difficulty: 'B' }
        ],
        'HB': [
            { name: 'アドラー', eg: 'Ⅱ', difficulty: 'B' },
            { name: 'コバチ', eg: 'Ⅲ', difficulty: 'C' }
        ]
    };
    
    return demoData[apparatus] || [];
}

// 種目切り替え
// この重複関数を削除（後の完全版を使用）

// 現在のルーティンを表示
function displayCurrentRoutine(apparatus) {
    const skillsContainer = document.getElementById(apparatus.toLowerCase() + '-skills');
    skillsContainer.innerHTML = '';
    
    const routine = currentRoutines[apparatus];
    for (let i = 0; i < routine.length; i++) {
        let skillDiv;
        // カスタム技かどうかで作成関数を分ける
        if (routine[i].isCustom) {
            skillDiv = createCustomSkillInputElement(apparatus, i, routine[i]);
        } else {
            skillDiv = createSkillInputElement(apparatus, i, routine[i]);
        }
        skillsContainer.appendChild(skillDiv);
    }
    
    // 最低1つの入力欄を確保
    if (routine.length === 0) {
        addSkillInput(apparatus);
    }
    
    // コンテナドロップゾーンは削除（技要素間のドラッグのみ）
    
    calculateScore(apparatus);
}


// 技入力欄を追加
function addSkillInput(apparatus) {
    const skillsContainer = document.getElementById(apparatus.toLowerCase() + '-skills');
    const skillIndex = currentRoutines[apparatus].length;

    // 女子体操用カスタム技データ（技名・難度・技の種類）
    const skillData = {
        name: '',
        difficulty: 'A',
        value: 0.1,
        isCustom: true
    };

    // ゆかと平均台の場合は技の種類を追加
    if (apparatus === 'FX' || apparatus === 'BB') {
        skillData.skillType = 'acro'; // デフォルトはアクロ
    }

    currentRoutines[apparatus].push(skillData);
    historyManager.takeSnapshot(`Add custom skill input ${skillIndex + 1}`);

    const skillDiv = createCustomSkillInputElement(apparatus, skillIndex);
    skillsContainer.appendChild(skillDiv);
}

// カスタム技追加関数（HTMLのボタンから呼び出される）
function addCustomSkillToApparatus(apparatus) {
    // ダイアログを表示してカスタム技を追加
    if (typeof showCustomSkillDialog === 'function') {
        showCustomSkillDialog(apparatus);
    } else {
        // showCustomSkillDialog関数が存在しない場合は、addSkillInputを呼び出す
        addSkillInput(apparatus);
    }
}


// 女子体操用カスタム技入力要素を作成
function createCustomSkillInputElement(apparatus, skillIndex, skill = null) {
    console.log(`=== Creating custom skill element for ${apparatus}-${skillIndex} ===`);
    
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-input-group custom-skill';
    skillDiv.style.position = 'relative';
    
    const skillNumber = document.createElement('div');
    skillNumber.className = 'skill-number';
    skillNumber.textContent = skillIndex + 1;
    
    // 技名入力
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'skill-input';
    nameInput.placeholder = '技名を入力...';
    nameInput.value = skill ? skill.name : '';
    nameInput.setAttribute('data-skill-index', skillIndex);
    nameInput.setAttribute('data-apparatus', apparatus);
    nameInput.addEventListener('input', () => {
        currentRoutines[apparatus][skillIndex].name = nameInput.value;
        calculateScore(apparatus);
        storageManager.saveToStorage();
    });
    
    // 難度選択
    const difficultySelect = document.createElement('select');
    difficultySelect.className = 'difficulty-select';
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach(diff => {
        const option = document.createElement('option');
        option.value = diff;
        option.textContent = diff;
        if (skill && skill.difficulty === diff) {
            option.selected = true;
        }
        difficultySelect.appendChild(option);
    });
    difficultySelect.addEventListener('change', () => {
        const difficultyValues = { 'A': 0.1, 'B': 0.2, 'C': 0.3, 'D': 0.4, 'E': 0.5, 'F': 0.6, 'G': 0.7, 'H': 0.8, 'I': 0.9, 'J': 1.0 };
        currentRoutines[apparatus][skillIndex].difficulty = difficultySelect.value;
        currentRoutines[apparatus][skillIndex].value = difficultyValues[difficultySelect.value];
        calculateScore(apparatus);
        storageManager.saveToStorage();
    });
    
    // 技の種類選択（ゆかと平均台のみ）
    let skillTypeSelect = null;
    if (apparatus === 'FX' || apparatus === 'BB') {
        skillTypeSelect = document.createElement('select');
        skillTypeSelect.className = 'skill-type-select';
        skillTypeSelect.style.width = '70px';
        skillTypeSelect.style.fontSize = '12px';
        
        const acroOption = document.createElement('option');
        acroOption.value = 'acro';
        acroOption.textContent = 'アクロ';
        
        const danceOption = document.createElement('option');
        danceOption.value = 'dance';
        danceOption.textContent = 'ダンス';
        
        skillTypeSelect.appendChild(acroOption);
        skillTypeSelect.appendChild(danceOption);
        
        // 既存のスキルタイプがあれば設定
        if (skill && skill.skillType) {
            skillTypeSelect.value = skill.skillType;
        } else {
            skillTypeSelect.value = 'acro'; // デフォルトはアクロ
        }
        
        skillTypeSelect.addEventListener('change', () => {
            currentRoutines[apparatus][skillIndex].skillType = skillTypeSelect.value;
            calculateScore(apparatus);
            storageManager.saveToStorage();
        });
    }
    
    // 女子体操では要素グループの概念は使用しない（CRはチェックボックスで手動管理）
    
    // 削除ボタン
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-skill';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => removeSkill(apparatus, skillIndex);
    
    // ドラッグ&ドロップ機能
    setupDragAndDrop(skillDiv, apparatus, skillIndex);
    
    skillDiv.appendChild(skillNumber);
    skillDiv.appendChild(nameInput);
    skillDiv.appendChild(difficultySelect);
    if (skillTypeSelect) {
        skillDiv.appendChild(skillTypeSelect);
    }
    skillDiv.appendChild(removeButton);
    
    console.log(`=== Custom skill element created successfully for ${apparatus}-${skillIndex} ===`);
    return skillDiv;
}

// 技入力要素を作成
function createSkillInputElement(apparatus, skillIndex, skill = null) {
    console.log(`=== Creating skill element for ${apparatus}-${skillIndex} ===`);
    
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-input-group';
    skillDiv.style.position = 'relative';
    
    // 入力フィールドのコンテナを作成（オートコンプリート用）
    const inputContainer = document.createElement('div');
    inputContainer.style.position = 'relative';
    inputContainer.style.flex = '1';
    
    const skillNumber = document.createElement('div');
    skillNumber.className = 'skill-number';
    skillNumber.textContent = skillIndex + 1;
    
    const skillInput = document.createElement('input');
    skillInput.type = 'text';
    skillInput.className = 'skill-input';
    skillInput.placeholder = '技名を入力してください...';
    skillInput.value = skill ? skill.name : '';
    skillInput.setAttribute('data-skill-index', skillIndex);
    skillInput.setAttribute('data-apparatus', apparatus);
    
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    
    const skillInfo = document.createElement('div');
    skillInfo.className = 'skill-info';
    
    if (skill) {
        updateSkillInfo(skillInfo, skill, apparatus);
    }
    
    // 移動コントロール（矢印ボタンを削除、技番号ドラッグのみに）
    const moveControls = document.createElement('div');
    moveControls.className = 'move-controls';
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-skill';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => removeSkill(apparatus, skillIndex);
    
    // ドラッグ&ドロップ機能
    setupDragAndDrop(skillDiv, apparatus, skillIndex);
    
    // オートコンプリート機能
    setupAutocomplete(skillInput, dropdown, apparatus, skillIndex, skillInfo);
    
    // コンテナに入力要素とドロップダウンを追加
    inputContainer.appendChild(skillInput);
    inputContainer.appendChild(dropdown);
    
    skillDiv.appendChild(skillNumber);
    skillDiv.appendChild(inputContainer);
    skillDiv.appendChild(skillInfo);
    skillDiv.appendChild(removeButton);
    
    console.log(`=== Skill element created successfully for ${apparatus}-${skillIndex} ===`);
    return skillDiv;
}

// オートコンプリート機能の設定（完全改良版）
function setupAutocomplete(input, dropdown, apparatus, skillIndex, skillInfo) {
    
    // デバウンス処理のための変数
    let searchTimeout = null;
    
    input.addEventListener('input', function() {
        const query = this.value.trim();
        console.log(`=== INPUT EVENT ===`);
        console.log(`Query: "${query}", Apparatus: ${apparatus}, Index: ${skillIndex}`);
        
        // 前のタイムアウトをクリア
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        // 短い遅延を入れて検索を実行
        searchTimeout = setTimeout(() => {
            performSearch(query, dropdown, apparatus, skillIndex, skillInfo, input);
            // 入力後に即座にスコア計算も実行
            if (query.length > 0) {
                console.log('Calling calculateScore from input event');
                calculateScore(apparatus);
            }
        }, 100);
    });
    
    // フォーカスが外れたときにドロップダウンを隠す
    input.addEventListener('blur', function() {
        console.log(`=== BLUR EVENT ===`);
        console.log(`Input value: "${this.value}"`);
        console.log(`Apparatus: ${apparatus}, Index: ${skillIndex}`);
        
        setTimeout(() => {
            dropdown.style.display = 'none';
            // 手動入力された技名をチェック
            checkAndUpdateSkill(this.value, apparatus, skillIndex, skillInfo);
        }, 200);
    });
    
    // キーボード操作の改善
    let selectedIndex = -1;
    input.addEventListener('keydown', function(e) {
        const items = dropdown.querySelectorAll('.autocomplete-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items, selectedIndex);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                items[selectedIndex].click();
            } else {
                dropdown.style.display = 'none';
                checkAndUpdateSkill(this.value, apparatus, skillIndex, skillInfo);
            }
        } else if (e.key === 'Escape') {
            dropdown.style.display = 'none';
            selectedIndex = -1;
        } else {
            selectedIndex = -1; // リセット
        }
    });
    
    function updateSelection(items, index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.style.backgroundColor = '#007bff';
                item.style.color = 'white';
            } else {
                item.style.backgroundColor = 'white';
                item.style.color = 'black';
            }
        });
    }
}

function performSearch(query, dropdown, apparatus, skillIndex, skillInfo, input) {
    console.log(`=== PERFORM SEARCH ===`);
    console.log(`Apparatus: ${apparatus}`);
    console.log(`Query: "${query}"`);
    
    const skills = skillsDatabase[apparatus];
    console.log(`Available skills: ${skills ? skills.length : 0}`);
    
    if (skills && skills.length > 0) {
        console.log(`Sample skills for ${apparatus}:`);
        skills.slice(0, 3).forEach((skill, i) => {
            console.log(`  ${i+1}. "${skill.name}" (EG: ${skill.elementGroup || skill.eg}, 難度: ${skill.difficulty})`);
        });
    }
    
    // 空のクエリの場合は非表示
    if (!query) {
        dropdown.style.display = 'none';
        return;
    }
    
    // データがない場合
    if (!skills || skills.length === 0) {
        console.log(`ERROR: No skills data available for ${apparatus}`);
        console.log(`skillsDatabase keys:`, Object.keys(skillsDatabase));
        Object.keys(skillsDatabase).forEach(key => {
            console.log(`  ${key}: ${skillsDatabase[key].length} skills`);
        });
        dropdown.style.display = 'none';
        return;
    }
    
    // 検索実行
    const matches = findSkillMatches(skills, query);
    
    if (matches.length === 0) {
        console.log(`No matches found for "${query}"`);
        dropdown.style.display = 'none';
        return;
    }
    
    // ドロップダウンを表示
    displaySearchResults(matches, dropdown, query, apparatus, skillIndex, skillInfo, input);
}

function findSkillMatches(skills, query) {
    if (!query || !query.trim()) return [];
    
    const queryLower = query.toLowerCase().trim();
    const matches = [];
    
    console.log(`=== SEARCH DEBUG ===`);
    console.log(`Query: "${query}" (normalized: "${queryLower}")`);
    console.log(`Total skills to search: ${skills.length}`);
    
    let exactMatches = 0;
    let prefixMatches = 0;
    let partialMatches = 0;
    let flexibleMatches = 0;
    
    skills.forEach((skill, index) => {
        if (!skill || !skill.name || !skill.name.trim()) {
            return;
        }
        
        const skillNameLower = skill.name.toLowerCase();
        
        // 完全一致の場合は最高スコア
        if (skillNameLower === queryLower) {
            matches.push({ skill, score: 1000 });
            exactMatches++;
            return;
        }
        
        // 前方一致の場合は高スコア
        if (skillNameLower.startsWith(queryLower)) {
            matches.push({ skill, score: 500 + (100 - Math.min(skill.name.length, 100)) });
            prefixMatches++;
            return;
        }
        
        // 部分一致の場合
        if (skillNameLower.includes(queryLower)) {
            const matchIndex = skillNameLower.indexOf(queryLower);
            const score = 300 - matchIndex + (100 - Math.min(skill.name.length, 100));
            matches.push({ skill, score });
            partialMatches++;
            return;
        }
        
        // 文字レベルでの柔軟な一致（日本語対応）
        const queryChars = queryLower.split('');
        let matchedChars = 0;
        let lastIndex = -1;
        
        for (const char of queryChars) {
            const charIndex = skillNameLower.indexOf(char, lastIndex + 1);
            if (charIndex !== -1) {
                matchedChars++;
                lastIndex = charIndex;
            }
        }
        
        // 文字の一致率を計算
        const matchRatio = matchedChars / queryChars.length;
        if (matchRatio >= 0.6) { // 60%以上一致
            matches.push({ skill, score: Math.floor(matchRatio * 100) });
            flexibleMatches++;
        }
    });
    
    // スコア順でソート
    matches.sort((a, b) => b.score - a.score);
    
    // デバッグ情報を出力
    console.log(`Match types: Exact=${exactMatches}, Prefix=${prefixMatches}, Partial=${partialMatches}, Flexible=${flexibleMatches}`);
    console.log(`Total matches: ${matches.length}`);
    console.log(`Top 10 matches:`);
    matches.slice(0, 10).forEach((match, i) => {
        console.log(`  ${i+1}. "${match.skill.name}" (score: ${match.score})`);
    });
    console.log(`=== END SEARCH DEBUG ===`);
    
    return matches.slice(0, 20).map(match => match.skill);
}

function displaySearchResults(matches, dropdown, query, apparatus, skillIndex, skillInfo, input) {
    // ドロップダウンをクリア
    dropdown.innerHTML = '';
    dropdown.style.display = 'none';
    
    matches.forEach(skill => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        
        // スタイリング - コンパクト
        Object.assign(item.style, {
            padding: '3px 8px',
            borderBottom: '1px solid #eee',
            cursor: 'pointer',
            backgroundColor: 'white',
            transition: 'background-color 0.1s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '18px',
            fontSize: '9px',
            lineHeight: '1.3',
            color: '#333',
            fontWeight: 'normal',
            fontFamily: 'inherit'
        });
        
        // 検索クエリをハイライト
        let displayName = skill.name;
        try {
            displayName = skill.name.replace(
                new RegExp(`(${query})`, 'gi'),
                '<span style="background-color: #ffeb3b; padding: 0px 1px;">$1</span>'
            );
        } catch (e) {
            // 正規表現でエラーが起きた場合はそのまま表示
            displayName = skill.name;
        }
        
        item.innerHTML = `
            <div style="font-weight: bold; font-size: 11px; flex: 1; line-height: 1.2;">
                ${displayName}
            </div>
            <div style="font-size: 9px; color: #666; text-align: right; min-width: 40px; line-height: 1.2;">
                ${skill.elementGroup || skill.eg || '-'}${skill.difficulty || '-'}
            </div>
        `;
        
        // イベントリスナー
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f5f5f5';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });
        
        item.addEventListener('click', () => {
            console.log(`Selected: ${skill.name}`);
            // 完全な技名に補間
            input.value = skill.name;
            
            // ゆか以外の終末技（最後の技）には自動的にグループⅣを設定
            let finalSkill = { ...skill };
            if (apparatus !== 'FX' && skillIndex === 7) { // 8技目（終末技）
                finalSkill.elementGroup = 'Ⅳ';
                console.log(`Automatically set dismount skill to Group Ⅳ: ${skill.name}`);
            }
            
            // 履歴を保存
            historyManager.takeSnapshot(`Add: ${skill.name}`);
            
            currentRoutines[apparatus][skillIndex] = finalSkill;
            updateSkillInfo(skillInfo, finalSkill, apparatus);
            dropdown.style.display = 'none';
            calculateScore(apparatus);
            
            // フォーカスを次のフィールドに移動（使いやすさ向上）
            try {
                const parentRow = input.closest('.skill-input-group');
                if (parentRow) {
                    const nextInput = parentRow.nextElementSibling?.querySelector('.skill-input');
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            } catch (error) {
                console.log('Focus move failed:', error);
            }
        });
        
        dropdown.appendChild(item);
    });
    
    // ドロップダウンのスタイル設定 - 技入力の真横、種目名の高さに合わせて表示
    Object.assign(dropdown.style, {
        display: 'block',
        position: 'fixed',
        top: '80px',
        left: '50%',
        width: '280px',
        marginLeft: '10px',
        maxHeight: '300px',
        overflowY: 'auto',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '3px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: '9999',
        fontSize: '9px',
        fontWeight: 'normal',
        lineHeight: '1.3'
    });
    
    console.log(`Displayed ${matches.length} results`);
}

// 手動入力された技名をチェックして対応するスキルデータを検索・補間
function checkAndUpdateSkill(inputValue, apparatus, skillIndex, skillInfo) {
    console.log(`=== Manual Skill Check ===`);
    console.log(`Input: "${inputValue}"`);
    console.log(`Apparatus: ${apparatus}`);
    console.log(`SkillIndex: ${skillIndex}`);
    console.log(`CurrentRoutines before:`, currentRoutines[apparatus]);
    
    if (!inputValue || !inputValue.trim()) {
        console.log('Empty input, clearing skill');
        currentRoutines[apparatus][skillIndex] = { name: '', elementGroup: '', difficulty: '', value: 0 };
        updateSkillInfo(skillInfo, currentRoutines[apparatus][skillIndex], apparatus);
        calculateScore(apparatus);
        return;
    }
    
    const skills = skillsDatabase[apparatus];
    if (!skills || skills.length === 0) {
        console.log(`No skills database for ${apparatus}`);
        return;
    }
    
    const trimmedInput = inputValue.trim();
    let foundSkill = null;
    
    // 1. 完全一致を探す（大文字小文字を区別しない）
    foundSkill = skills.find(skill => 
        skill.name && skill.name.toLowerCase() === trimmedInput.toLowerCase()
    );
    
    if (foundSkill) {
        console.log(`Found exact match: ${foundSkill.name}`);
    } else {
        // 2. 部分一致を探す（入力が技名に含まれる）
        foundSkill = skills.find(skill => 
            skill.name && skill.name.toLowerCase().includes(trimmedInput.toLowerCase())
        );
        
        if (foundSkill) {
            console.log(`Found partial match: ${foundSkill.name}`);
        } else {
            // 3. 逆の部分一致を探す（技名が入力に含まれる）
            foundSkill = skills.find(skill => 
                skill.name && trimmedInput.toLowerCase().includes(skill.name.toLowerCase())
            );
            
            if (foundSkill) {
                console.log(`Found reverse partial match: ${foundSkill.name}`);
            }
        }
    }
    
    if (foundSkill) {
        console.log(`Setting skill: ${foundSkill.name} (EG: ${foundSkill.elementGroup || foundSkill.eg}, 難度: ${foundSkill.difficulty})`);
        // 入力フィールドも完全な技名に補間
        const inputElement = document.querySelector(`[data-skill-index="${skillIndex}"][data-apparatus="${apparatus}"]`);
        if (inputElement && inputElement.value !== foundSkill.name) {
            inputElement.value = foundSkill.name;
        }
        
        // ゆか以外の終末技（最後の技）には自動的にグループⅣを設定
        let finalSkill = { ...foundSkill };
        if (apparatus !== 'FX' && skillIndex === 7) { // 8技目（終末技）
            finalSkill.elementGroup = 'Ⅳ';
            console.log(`Automatically set dismount skill to Group Ⅳ: ${foundSkill.name}`);
        }
        
        currentRoutines[apparatus][skillIndex] = finalSkill;
        updateSkillInfo(skillInfo, finalSkill, apparatus);
        calculateScore(apparatus);
    } else {
        console.log(`No matching skill found for: "${trimmedInput}"`);
        console.log('Available skills sample:');
        skills.slice(0, 5).forEach(skill => {
            console.log(`  - ${skill.name}`);
        });
        
        // スキルが見つからない場合は手動入力として保存
        const manualSkill = {
            name: trimmedInput,
            eg: '',
            difficulty: '',
            value: 0
        };
        currentRoutines[apparatus][skillIndex] = manualSkill;
        historyManager.takeSnapshot(`Manual: ${trimmedInput}`);
        updateSkillInfo(skillInfo, manualSkill, apparatus);
        calculateScore(apparatus);
    }
}

// 技情報を更新
function updateSkillInfo(skillInfo, skill, apparatus) {
    const isCustom = skill.isCustom || false;
    const isASkill = skill.isASkill || false;
    
    let badgeIndicator = '';
    if (isASkill) {
        badgeIndicator = '<div class="a-skill-badge" style="background: #ff9800; color: white; padding: 4px 6px; border-radius: 8px; font-size: 9px; font-weight: bold; margin-right: 4px;">a技</div>';
    } else if (isCustom) {
        badgeIndicator = '<div class="custom-skill-badge" style="background: #17a2b8; color: white; padding: 4px 6px; border-radius: 8px; font-size: 9px; font-weight: bold; margin-right: 4px;">カスタム</div>';
    }
    
    skillInfo.innerHTML = `
        ${badgeIndicator}
        <div class="eg-badge">${skill.elementGroup || skill.eg || '-'}</div>
        <div class="difficulty-badge">${skill.difficulty || '-'}</div>
    `;
}

// 技を削除
function removeSkill(apparatus, skillIndex) {
    const skillName = currentRoutines[apparatus][skillIndex]?.name || `Skill ${skillIndex + 1}`;
    historyManager.takeSnapshot(`Remove: ${skillName}`);
    currentRoutines[apparatus].splice(skillIndex, 1);
    displayCurrentRoutine(apparatus);
}

// 技の移動（上下ボタン用）
// 移動処理中フラグ
let isMovingSkill = false;

// ドロップターゲットインジケーター管理
// 新しいドラッグ&ドロップシステム
let draggedElement = null;
let draggedIndex = null;
let draggedApparatus = null;

function setupDragAndDrop(skillDiv, apparatus, skillIndex) {
    skillDiv.draggable = true;
    
    skillDiv.addEventListener('dragstart', function(e) {
        draggedElement = this;
        // 現在の実際のインデックスを動的に取得
        draggedIndex = getCurrentSkillIndex(this);
        draggedApparatus = apparatus;
        this.classList.add('dragging');
        
        // ドラッグ画像を設定（少し透明に）
        const dragImage = this.cloneNode(true);
        dragImage.style.opacity = '0.7';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        setTimeout(() => document.body.removeChild(dragImage), 0);
        
        console.log(`Drag started: skill at current index ${draggedIndex} from ${apparatus}`);
    });
    
    skillDiv.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');
        hideAllDropIndicators();
        draggedElement = null;
        draggedIndex = null;
        draggedApparatus = null;
    });
    
    skillDiv.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation(); // コンテナのdragoverイベントを防ぐ
        if (draggedElement && draggedElement !== this) {
            console.log('Dragover on skill element');
            showDropIndicator(this, e.clientY);
        }
    });
    
    skillDiv.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation(); // コンテナのdropイベントを防ぐ
        if (draggedElement && draggedElement !== this) {
            const dropIndex = getCurrentSkillIndex(this);
            const insertPosition = getInsertPosition(this, e.clientY);
            let targetIndex = dropIndex;
            
            if (insertPosition === 'after') {
                targetIndex = dropIndex + 1;
            }
            
            // 同じ種目内での移動の場合のみ処理
            if (draggedApparatus === apparatus) {
                // 実際の現在位置を再取得（ドラッグ中に位置が変わる可能性のため）
                const actualFromIndex = getCurrentSkillIndex(draggedElement);
                
                // ドラッグ元より後ろに挿入する場合は、インデックスを調整
                if (actualFromIndex < targetIndex) {
                    targetIndex--;
                }
                
                console.log(`Dropping on skill element: ${insertPosition} position, moving from ${actualFromIndex} to ${targetIndex}`);
                moveSkillToPosition(apparatus, actualFromIndex, targetIndex);
            }
        }
        hideAllDropIndicators();
    });
}

function getCurrentSkillIndex(skillElement) {
    const container = skillElement.parentNode;
    const skillElements = Array.from(container.querySelectorAll('.skill-input-group'));
    return skillElements.indexOf(skillElement);
}

function getInsertPosition(element, clientY) {
    const rect = element.getBoundingClientRect();
    const middle = rect.top + rect.height / 2;
    return clientY < middle ? 'before' : 'after';
}

function showDropIndicator(element, clientY) {
    hideAllDropIndicators();
    const position = getInsertPosition(element, clientY);
    
    const skillIndex = getCurrentSkillIndex(element);
    console.log(`Show drop indicator: skill ${skillIndex}, position ${position}, clientY ${clientY}`);
    
    let indicator = document.querySelector('.active-drop-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'drop-target-indicator active-drop-indicator show';
        document.body.appendChild(indicator);
    }
    
    const rect = element.getBoundingClientRect();
    const container = element.parentNode;
    const containerRect = container.getBoundingClientRect();
    
    indicator.style.position = 'fixed';
    indicator.style.left = containerRect.left + 'px';
    indicator.style.width = containerRect.width + 'px';
    indicator.style.zIndex = '9999';
    
    if (position === 'before') {
        indicator.style.top = (rect.top - 2) + 'px';
        console.log(`Indicator positioned BEFORE skill ${skillIndex} at top ${rect.top - 2}`);
    } else {
        indicator.style.top = (rect.bottom + 2) + 'px';
        console.log(`Indicator positioned AFTER skill ${skillIndex} at top ${rect.bottom + 2}`);
    }
}

function hideAllDropIndicators() {
    const indicator = document.querySelector('.active-drop-indicator');
    if (indicator) {
        indicator.remove();
    }
}


// 2回宙返り系終末技のND更新
function updateDismountND(apparatus) {
    if (apparatus !== 'FX') return;
    
    console.log('=== updateDismountND called ===');
    
    const checkbox1 = document.getElementById('fx-dismount-check');
    const checkbox2 = document.getElementById('fx-dismount-requirement-check');
    const otherNDInput = document.getElementById('fx-other-nd-input');
    
    console.log('Checkbox1:', checkbox1, 'checked:', checkbox1 ? checkbox1.checked : 'null');
    console.log('Checkbox2:', checkbox2, 'checked:', checkbox2 ? checkbox2.checked : 'null');
    
    if (otherNDInput) {
        // どちらかのチェックボックスがチェックされているか確認
        const isChecked = (checkbox1 && checkbox1.checked) || (checkbox2 && checkbox2.checked);
        console.log('Final isChecked:', isChecked);
        
        // その他NDを加算/減算で更新
        const currentValue = parseFloat(otherNDInput.value) || 0;
        let newValue;
        
        if (isChecked) {
            // 満たしている場合、0.3を減算
            newValue = Math.max(0, currentValue - 0.3);
        } else {
            // 満たしていない場合、0.3を加算
            newValue = currentValue + 0.3;
        }
        
        otherNDInput.value = newValue.toFixed(1);
        console.log('Changed Other ND from', currentValue, 'to', newValue);
        
        // 遅延して要求項目を再描画し、チェック状態を保持
        setTimeout(() => {
            calculateScore('FX');
            
            // 再描画後にチェック状態を復元
            setTimeout(() => {
                const newCheckbox2 = document.getElementById('fx-dismount-requirement-check');
                if (newCheckbox2 && newCheckbox2.checked !== isChecked) {
                    newCheckbox2.checked = isChecked;
                    console.log('Restored checkbox state to:', isChecked);
                }
            }, 50);
        }, 10);
    }
}

// つり輪の振動倒立技のND更新
function updateHandstandND(apparatus) {
    if (apparatus !== 'SR') return;
    
    console.log('=== updateHandstandND called ===');
    
    const checkbox = document.getElementById('sr-handstand-check');
    const otherNDInput = document.getElementById('sr-other-nd-input');
    
    console.log('Checkbox:', checkbox, 'checked:', checkbox ? checkbox.checked : 'null');
    
    if (otherNDInput) {
        const currentValue = parseFloat(otherNDInput.value) || 0;
        let newValue;
        
        if (checkbox && checkbox.checked) {
            // 満たしている場合、0.3を減算
            newValue = Math.max(0, currentValue - 0.3);
        } else {
            // 満たしていない場合、0.3を加算
            newValue = currentValue + 0.3;
        }
        
        otherNDInput.value = newValue.toFixed(1);
        console.log('Changed Other ND from', currentValue, 'to', newValue);
        
        // 遅延して要求項目を再描画し、チェック状態を保持
        setTimeout(() => {
            calculateScore('SR');
            
            // 再描画後にチェック状態を復元
            setTimeout(() => {
                const newCheckbox = document.getElementById('sr-handstand-check');
                if (newCheckbox && newCheckbox.checked !== checkbox.checked) {
                    newCheckbox.checked = checkbox.checked;
                    console.log('Restored checkbox state to:', checkbox.checked);
                }
            }, 50);
        }, 10);
    }
}

function moveSkill(apparatus, skillIndex, direction) {
    // 移動処理中は新しい移動を無視
    if (isMovingSkill) {
        return;
    }
    
    isMovingSkill = true;
    
    const routine = currentRoutines[apparatus];
    const newIndex = skillIndex + direction;
    
    // 範囲チェック
    if (newIndex < 0 || newIndex >= routine.length) {
        isMovingSkill = false;
        return;
    }
    
    const skillName = routine[skillIndex]?.name || `Skill ${skillIndex + 1}`;
    historyManager.takeSnapshot(`Move: ${skillName} ${direction > 0 ? 'down' : 'up'}`);
    
    // 要素を移動
    const skill = routine.splice(skillIndex, 1)[0];
    routine.splice(newIndex, 0, skill);
    
    displayCurrentRoutine(apparatus);
    calculateScore(apparatus);
    
    // 移動後のフォーカス設定とフラグリセット
    setTimeout(() => {
        const movedInput = document.querySelector(`[data-apparatus="${apparatus}"][data-skill-index="${newIndex}"]`);
        if (movedInput) {
            movedInput.focus();
        }
        isMovingSkill = false;
    }, 100);
}

// 技の移動（ドラッグ&ドロップ用）
function moveSkillToPosition(apparatus, fromIndex, toIndex) {
    const routine = currentRoutines[apparatus];
    
    console.log(`=== MOVE SKILL DEBUG ===`);
    console.log(`Apparatus: ${apparatus}`);
    console.log(`From: ${fromIndex}, To: ${toIndex}`);
    console.log(`Routine before:`, routine.map((s, i) => `${i}: ${s.name || 'unnamed'}`));
    console.log(`Routine length: ${routine.length}`);
    
    // 基本的な範囲チェック
    if (fromIndex === toIndex) {
        console.log(`Same position (${fromIndex}), no move needed`);
        return;
    }
    
    if (fromIndex < 0 || fromIndex >= routine.length ||
        toIndex < 0 || toIndex > routine.length) {
        console.warn(`Invalid move parameters: fromIndex=${fromIndex}, toIndex=${toIndex}, length=${routine.length}`);
        return;
    }
    
    const skillName = routine[fromIndex]?.name || `Skill ${fromIndex + 1}`;
    console.log(`Moving skill: "${skillName}"`);
    historyManager.takeSnapshot(`Move: ${skillName}`);
    
    // 標準的な配列要素移動
    const [movedSkill] = routine.splice(fromIndex, 1);
    console.log(`After splice removal, routine length: ${routine.length}`);
    
    // toIndexが範囲外の場合は最後に追加
    const finalIndex = Math.min(toIndex, routine.length);
    console.log(`Final insertion index: ${finalIndex} (original target: ${toIndex})`);
    
    routine.splice(finalIndex, 0, movedSkill);
    console.log(`After insertion, routine length: ${routine.length}`);
    
    console.log(`Routine after:`, routine.map((s, i) => `${i}: ${s.name || 'unnamed'}`));
    console.log(`========================`);
    
    // 表示を更新
    displayCurrentRoutine(apparatus);
    calculateScore(apparatus);
}

// スコア計算
function calculateScore(apparatus) {
    console.log(`=== CALCULATE SCORE DEBUG ===`);
    console.log(`Apparatus: ${apparatus}`);
    
    const routine = currentRoutines[apparatus];
    console.log(`Routine:`, routine);
    
    let difficultyScore = 0;
    let groupScore = 0;
    let connectionScore = 0;
    let landingBonus = 0;
    let skillND = 0;
    let otherND = 0;
    
    // 難度点計算（上位8技または10技）
    const validSkills = routine.filter(skill => skill.name && (skill.difficulty || skill.isCustom));
    const difficultyValues = {
        'A': 0.1, 'B': 0.2, 'C': 0.3, 'D': 0.4, 'E': 0.5, 'F': 0.6, 'G': 0.7, 'H': 0.8, 'I': 0.9, 'J': 1.0, 'a': 0.1
    };
    
    // カスタム技と通常技を分離
    const customSkills = validSkills.filter(skill => skill.isCustom);
    const normalSkills = validSkills.filter(skill => !skill.isCustom);
    
    // 2025年新ルール: 全種目8技（7技+終末技）
    const maxSkills = 8;
    
    // 終末技を分離（通常技のみから）
    const dismountSkill = normalSkills.length > 0 ? normalSkills[normalSkills.length - 1] : null;
    const nonDismountSkills = normalSkills.slice(0, -1);
    
    // 非終末技から上位7技を選択
    const sortedNonDismountValues = nonDismountSkills
        .map(skill => difficultyValues[skill.difficulty] || 0)
        .sort((a, b) => b - a)
        .slice(0, 7);
    
    // 終末技の難度値を追加
    const dismountValue = dismountSkill ? (difficultyValues[dismountSkill.difficulty] || 0) : 0;
    const allSelectedValues = [...sortedNonDismountValues, dismountValue];
    
    // 通常技の難度点
    const normalDifficultyScore = allSelectedValues.reduce((sum, val) => sum + val, 0);
    
    // カスタム技の難度点を追加（実際の難度値を使用）
    const customDifficultyScore = customSkills.reduce((sum, skill) => {
        const difficultyValue = difficultyValues[skill.difficulty] || 0.1;
        return sum + difficultyValue;
    }, 0);
    
    difficultyScore = normalDifficultyScore + customDifficultyScore;
    
    // 技の種類カウント（ゆかと平均台のみ）
    if (apparatus === 'FX' || apparatus === 'BB') {
        let acroCount = 0;
        let danceCount = 0;
        
        validSkills.forEach(skill => {
            if (skill.skillType === 'acro') {
                acroCount++;
            } else if (skill.skillType === 'dance') {
                danceCount++;
            } else {
                // skillTypeが未設定の場合はデフォルトでアクロとしてカウント
                acroCount++;
            }
        });
        
        // 表示を更新
        const acroCountElement = document.getElementById(`${apparatus.toLowerCase()}-acro-count`);
        const danceCountElement = document.getElementById(`${apparatus.toLowerCase()}-dance-count`);
        
        if (acroCountElement) {
            acroCountElement.textContent = acroCount;
        }
        if (danceCountElement) {
            danceCountElement.textContent = danceCount;
        }
    }
    
    // 2025年新ルール: グループ点計算
    groupScore = calculateGroupScore(validSkills, apparatus);
    console.log(`Received group score: ${groupScore} for ${apparatus}`);
    
    // 着地加点は削除（要求により）
    landingBonus = 0;
    
    // 終末技加点（全種目、D難度以上の終末技で+0.2）
    let dismountBonus = 0;
    if (apparatus === 'FX') {
        const dismountBonusCheckbox = document.getElementById('fx-dismount-bonus');
        dismountBonus = dismountBonusCheckbox && dismountBonusCheckbox.checked ? 0.2 : 0;
    } else if (apparatus === 'UB') {
        const dismountBonusCheckbox = document.getElementById('ub-dismount-bonus');
        dismountBonus = dismountBonusCheckbox && dismountBonusCheckbox.checked ? 0.2 : 0;
    } else if (apparatus === 'BB') {
        const dismountBonusCheckbox = document.getElementById('bb-dismount-bonus');
        dismountBonus = dismountBonusCheckbox && dismountBonusCheckbox.checked ? 0.2 : 0;
    }
    
    // 技数ND計算（PDFの表に基づく正確な計算）
    // カスタム技も技数NDの計算に含める
    let skillCount = validSkills.length;
    
    // 技数カウントはスキル入力のみ（A難度要素は手動入力に含める）
    
    // 目標Eスコア取得
    const eScoreInput = document.getElementById(`${apparatus.toLowerCase()}-e-score-input`);
    let eScore = eScoreInput ? parseFloat(eScoreInput.value) || 0.0 : 0.0;
    
    // 技数に応じたEスコア制限を適用（ルール別）
    const eScoreCap = getEScoreCapForSkillCount(skillCount, currentRule);
    if (eScore > eScoreCap) {
        eScore = eScoreCap;
        console.log(`E-score capped from ${eScoreInput ? parseFloat(eScoreInput.value) : 8.5} to ${eScoreCap} due to skill count: ${skillCount} (rule: ${currentRule})`);
    }
    
    // 技数NDは廃止 - 短いEスコア制限で代替
    skillND = 0.0;
    
    // その他ND（手動入力）
    const otherNDInput = document.getElementById(`${apparatus.toLowerCase()}-other-nd-input`);
    otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
    
    // SB (シリーズボーナス) - 平均台のみ
    let seriesBonus = 0;
    if (apparatus === 'BB') {
        const sbInput = document.getElementById('bb-sb-input');
        seriesBonus = sbInput ? parseFloat(sbInput.value) || 0 : 0;
    }
    
    // CV (組み合わせ点) - 跳馬以外
    let connectionValue = 0;
    if (apparatus !== 'VT') {
        const cvInput = document.getElementById(`${apparatus.toLowerCase()}-cv-input`);
        connectionValue = cvInput ? parseFloat(cvInput.value) || 0 : 0;
    }
    
    const totalScore = difficultyScore + groupScore + dismountBonus + landingBonus + seriesBonus + connectionValue;
    const targetScore = Math.max(0, totalScore + eScore - otherND);
    
    // 詳細計算ログ
    console.log(`=== ${apparatus} DETAILED CALCULATION ===`);
    console.log(`Difficulty Score: ${difficultyScore.toFixed(3)}`);
    console.log(`Composition Requirements Score: ${groupScore.toFixed(3)}`);
    console.log(`Dismount Bonus: ${dismountBonus.toFixed(3)}`);
    console.log(`Landing Bonus: ${landingBonus.toFixed(3)}`);
    if (apparatus === 'BB') console.log(`Series Bonus (SB): ${seriesBonus.toFixed(3)}`);
    if (apparatus !== 'VT') console.log(`Connection Value (CV): ${connectionValue.toFixed(3)}`);
    console.log(`Other ND: ${otherND.toFixed(3)}`);
    console.log(`Total D Score: ${totalScore.toFixed(3)}`);
    console.log(`E Score: ${eScore.toFixed(3)}`);
    console.log(`Target Score: ${targetScore.toFixed(3)}`);
    console.log(`================================`);
    
    // 表示を更新
    const prefix = apparatus.toLowerCase();
    const difficultyElement = document.getElementById(`${prefix}-difficulty-score`);
    const groupElement = document.getElementById(`${prefix}-group-score`);
    const skillNDElement = document.getElementById(`${prefix}-skill-nd`);
    const totalElement = document.getElementById(`${prefix}-total-score`);
    const targetElement = document.getElementById(`${prefix}-target-score`);
    
    console.log(`=== SCORE DISPLAY UPDATE ===`);
    console.log(`Difficulty: ${difficultyScore}, Composition: ${groupScore}, Dismount: ${dismountBonus}, SkillND: ${skillND}, Total: ${totalScore}`);
    
    if (difficultyElement) {
        difficultyElement.textContent = difficultyScore.toFixed(1);
        console.log(`Updated difficulty display: ${difficultyScore.toFixed(1)}`);
    }
    if (groupElement) {
        groupElement.textContent = groupScore.toFixed(1);
        console.log(`Updated group display: ${groupScore.toFixed(1)}`);
    } else {
        console.log(`Group element not found: ${prefix}-group-score`);
    }
    if (totalElement) {
        totalElement.textContent = totalScore.toFixed(1);
        console.log(`Setting ${apparatus} total element to: ${totalScore.toFixed(1)}`);
        console.log(`Total element ID: ${prefix}-total-score`);
        console.log(`Total element found:`, totalElement);
    } else {
        console.error(`Total element NOT FOUND: ${prefix}-total-score`);
    }
    if (targetElement) {
        targetElement.textContent = targetScore.toFixed(1);
        if (apparatus === 'FX') {
            console.log(`Setting target element to: ${targetScore.toFixed(1)}`);
            console.log(`Target element current value: ${targetElement.textContent}`);
        }
    }
    
    // 要求項目チェック
    // 構成要求はチェックボックスで手動管理
    
    // Eスコア上限表示を更新
    updateEScoreCapDisplay(apparatus);
    
    // 総合スコア更新
    updateTotalScores();
}

// 2025年新ルール: グループ点計算
function calculateGroupScore(skills, apparatus) {
    console.log(`=== COMPOSITION REQUIREMENTS SCORE CALCULATION for ${apparatus} ===`);
    
    let compositionScore = 0;
    
    // ルールに応じたチェックボックスIDの決定
    const suffix = currentRule === 'alteration1' ? '-alt' : '';
    
    // チェックボックスベースの構成要求システム
    switch (apparatus) {
        case 'VT': // 跳馬
            // 跳馬は構成要求点なし
            compositionScore = 0;
            break;
        case 'UB': // 段違い平行棒
            const ubCR1 = document.getElementById(`ub-cr1${suffix}`);
            const ubCR2 = document.getElementById(`ub-cr2${suffix}`);
            const ubCR3 = document.getElementById(`ub-cr3${suffix}`);
            const ubCR4 = document.getElementById(`ub-cr4${suffix}`);
            
            if (ubCR1 && ubCR1.checked) compositionScore += 0.5;
            if (ubCR2 && ubCR2.checked) compositionScore += 0.5;
            if (ubCR3 && ubCR3.checked) compositionScore += 0.5;
            if (ubCR4 && ubCR4.checked) compositionScore += 0.5;
            break;
        case 'BB': // 平均台
            const bbCR1 = document.getElementById(`bb-cr1${suffix}`);
            const bbCR2 = document.getElementById(`bb-cr2${suffix}`);
            const bbCR3 = document.getElementById(`bb-cr3${suffix}`);
            const bbCR4 = document.getElementById(`bb-cr4${suffix}`);
            
            if (bbCR1 && bbCR1.checked) compositionScore += 0.5;
            if (bbCR2 && bbCR2.checked) compositionScore += 0.5;
            if (bbCR3 && bbCR3.checked) compositionScore += 0.5;
            if (bbCR4 && bbCR4.checked) compositionScore += 0.5;
            break;
        case 'FX': // ゆか
            const fxCR1 = document.getElementById(`fx-cr1${suffix}`);
            const fxCR2 = document.getElementById(`fx-cr2${suffix}`);
            const fxCR3 = document.getElementById(`fx-cr3${suffix}`);
            const fxCR4 = document.getElementById(`fx-cr4${suffix}`);
            
            if (fxCR1 && fxCR1.checked) compositionScore += 0.5;
            if (fxCR2 && fxCR2.checked) compositionScore += 0.5;
            if (fxCR3 && fxCR3.checked) compositionScore += 0.5;
            if (fxCR4 && fxCR4.checked) compositionScore += 0.5;
            break;
    }
    
    console.log(`Final composition score for ${apparatus} (${currentRule}): ${compositionScore}`);
    
    // デバッグ用：FXの場合のCR詳細を確認
    if (apparatus === 'FX') {
        const fxCR4Element = document.getElementById(`fx-cr4${currentRule === 'alteration1' ? '-alt' : ''}`);
        console.log(`=== FX CR4 DEBUG ===`);
        console.log(`Current rule: ${currentRule}`);
        console.log(`FX CR4 element:`, fxCR4Element);
        console.log(`FX CR4 checked:`, fxCR4Element ? fxCR4Element.checked : 'N/A');
        console.log(`Composition score returned:`, compositionScore);
        console.log(`====================`);
    }
    
    return compositionScore;
}

// 技数に基づくEスコア制限を取得（ルール別）
function getEScoreCapForSkillCount(skillCount, rule = currentRule) {
    if (rule === 'standard') {
        // 標準ルール：Short Exercise規則によるEスコア制限
        if (skillCount >= 7) return 10.0; // 7技以上 - 減点なし
        if (skillCount >= 5) return 6.0;  // 5-6技 - 4.0P減点 (10.0 - 4.0)
        if (skillCount >= 3) return 4.0;  // 3-4技 - 6.0P減点 (10.0 - 6.0)
        if (skillCount >= 1) return 2.0;  // 1-2技 - 8.0P減点 (10.0 - 8.0)
        return 0.0; // 0技 - 10.0P減点 (10.0 - 10.0)
    } else if (rule === 'alteration1') {
        // 変更規則Ⅰ：技数によるEスコア制限
        if (skillCount >= 6) return 10.0;
        if (skillCount === 5) return 7.0;
        if (skillCount === 4) return 6.0;
        if (skillCount === 3) return 5.0;
        if (skillCount === 2) return 4.0;
        if (skillCount === 1) return 3.0;
        return 0.0; // 0技の場合
    }
    return 10.0; // デフォルト
}

// Eスコア上限表示を更新
function updateEScoreCapDisplay(apparatus) {
    // 跳馬はEスコア制限なしなので表示を更新しない
    if (apparatus === 'VT') {
        const capElement = document.getElementById('vt-e-score-cap');
        if (capElement) {
            capElement.innerHTML = '<strong style="color: #28a745; font-size: 13px; background: #e8f5e8; padding: 2px 6px; border-radius: 4px; border: 1px solid #28a745;">制限なし</strong>';
        }
        return;
    }
    
    const skillInputs = document.querySelectorAll(`#${apparatus.toLowerCase()}-skills .skill-input-group`);
    let skillCount = skillInputs.length;
    
    const eScoreCap = getEScoreCapForSkillCount(skillCount, currentRule);
    const capElement = document.getElementById(`${apparatus.toLowerCase()}-e-score-cap`);
    
    if (capElement) {
        let capText, capColor, capStyle;
        
        if (eScoreCap >= 10.0) {
            // 制限なし
            capText = `最大: ${eScoreCap.toFixed(1)}`;
            capColor = '#28a745';
            capStyle = 'normal';
        } else {
            // 制限あり - 目立つように
            capText = `⚠️ 最大: ${eScoreCap.toFixed(1)}`;
            capColor = '#dc3545';
            capStyle = 'bold';
            
            // ルール別の説明追加（簡潔に）
            capText += ` [${skillCount}技]`;
        }
        
        capElement.innerHTML = `<strong style="color: ${capColor}; font-weight: ${capStyle}; font-size: 13px; background: ${eScoreCap < 10.0 ? '#ffe6e6' : '#e8f5e8'}; padding: 2px 6px; border-radius: 4px; border: 1px solid ${capColor}; white-space: nowrap; display: inline-block;">${capText}</strong>`;
    }
}


// 総合スコア更新
function updateTotalScores() {
    let totalDScore = 0;
    let totalEScore = 0;
    let totalND = 0;
    
    const apparatusList = ['VT', 'UB', 'BB', 'FX'];
    
    apparatusList.forEach(apparatus => {
        // Dスコア取得
        const totalElement = document.getElementById(`${apparatus.toLowerCase()}-total-score`);
        if (totalElement) {
            const value = parseFloat(totalElement.textContent) || 0;
            console.log(`Reading ${apparatus} total: ${totalElement.textContent} -> ${value}`);
            totalDScore += value;
        } else {
            console.error(`updateTotalScores: ${apparatus.toLowerCase()}-total-score element not found`);
        }
        
        // Eスコア取得
        
        // Eスコア取得（上限適用後の値）
        const eScoreInput = document.getElementById(`${apparatus.toLowerCase()}-e-score-input`);
        let eScore = eScoreInput ? parseFloat(eScoreInput.value) || 0.0 : 0.0;
        
        // 技数に応じたEスコア上限を適用
        const skillInputs = document.querySelectorAll(`#${apparatus.toLowerCase()}-skills .skill-input-group`);
        const skillCount = apparatus === 'VT' ? 1 : skillInputs.length;
        const eScoreCap = apparatus === 'VT' ? Infinity : getEScoreCapForSkillCount(skillCount, currentRule);
        const actualEScore = Math.min(eScore, eScoreCap);
        
        totalEScore += actualEScore;
        
        // ND取得
        const skillNDElement = document.getElementById(`${apparatus.toLowerCase()}-skill-nd`);
        const otherNDInput = document.getElementById(`${apparatus.toLowerCase()}-other-nd-input`);
        
        const skillND = skillNDElement && skillNDElement.textContent !== '0.0' ? 
            parseFloat(skillNDElement.textContent.replace('-', '')) || 0 : 0;
        const otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
        
        totalND += skillND + otherND;
    });
    
    const totalTargetScore = Math.max(0, totalDScore + totalEScore - totalND);
    
    // 表示更新
    const totalDElement = document.getElementById('total-d-score');
    const totalEElement = document.getElementById('total-e-score');
    const totalNDElement = document.getElementById('total-nd');
    const totalTargetElement = document.getElementById('total-target-score');
    
    if (totalDElement) totalDElement.textContent = totalDScore.toFixed(1);
    if (totalEElement) totalEElement.textContent = totalEScore.toFixed(1);
    if (totalNDElement) totalNDElement.textContent = totalND.toFixed(1);
    if (totalTargetElement) totalTargetElement.textContent = totalTargetScore.toFixed(1);
    
    // 種目別一覧も更新
    updateApparatusSummary();
}

// 種目別一覧更新
function updateApparatusSummary() {
    const summaryContainer = document.getElementById('apparatus-summary');
    if (!summaryContainer) return;
    
    const apparatusNames = {
        'VT': '跳馬',
        'UB': '段違い平行棒',
        'BB': '平均台',
        'FX': 'ゆか'
    };
    
    let html = '';
    Object.keys(apparatusNames).forEach(apparatus => {
        // 各種目のスコア取得
        const totalElement = document.getElementById(`${apparatus.toLowerCase()}-total-score`);
        const targetElement = document.getElementById(`${apparatus.toLowerCase()}-target-score`);
        const eScoreInput = document.getElementById(`${apparatus.toLowerCase()}-e-score-input`);
        const skillNDElement = document.getElementById(`${apparatus.toLowerCase()}-skill-nd`);
        const otherNDInput = document.getElementById(`${apparatus.toLowerCase()}-other-nd-input`);
        
        const dScore = totalElement ? parseFloat(totalElement.textContent) || 0 : 0;
        let eScore = eScoreInput ? parseFloat(eScoreInput.value) || 0.0 : 0.0;
        
        let otherND = 0;
        let targetScore = 0;
        
        // 技数に応じたEスコア制限を適用
        const skillInputs = document.querySelectorAll(`#${apparatus.toLowerCase()}-skills .skill-input-group`);
        const skillCount = apparatus === 'VT' ? 1 : skillInputs.length;
        const eScoreCap = apparatus === 'VT' ? Infinity : getEScoreCapForSkillCount(skillCount, currentRule);
        const actualEScore = Math.min(eScore, eScoreCap);
        
        if (apparatus === 'VT') {
            // 跳馬の場合は特別処理（Eスコア上限なし）
            otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
            targetScore = Math.max(0, dScore + eScore - otherND);
        } else {
            // 通常の種目（組み合わせ加点を考慮）
            otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
            
            // 目標スコア計算: D + E - ND（Dスコアには既に組み合わせ加点が含まれている）
            targetScore = Math.max(0, dScore + actualEScore - otherND);
            
            // ゆかのサマリー計算デバッグ
            if (apparatus === 'FX') {
                console.log(`=== FLOOR SUMMARY CALCULATION ===`);
                console.log(`dScore (from DOM, includes connection): ${dScore}`);
                console.log(`actualEScore: ${actualEScore}`);
                console.log(`otherND: ${otherND}`);
                console.log(`Calculated targetScore: ${targetScore}`);
                console.log(`================================`);
            }
        }
        
        const totalND = otherND;
        
        html += `
            <div style="background: rgba(255,255,255,0.2); padding: 3px 4px; border-radius: 3px; text-align: center; border: 1px solid rgba(255,255,255,0.3); min-width: 45px;">
                <div style="font-weight: bold; margin-bottom: 1px; font-size: 0.8em;">${apparatusNames[apparatus]}</div>
                <div style="display: flex; gap: 2px; justify-content: center; margin-bottom: 1px; font-size: 0.65em;">
                    <span>D${dScore.toFixed(1)}</span>
                    <span>E${actualEScore.toFixed(1)}</span>
                    <span>ND${totalND.toFixed(1)}</span>
                </div>
                <div style="font-size: 0.8em; font-weight: bold; padding: 1px 2px; background: rgba(255,255,255,0.2); border-radius: 2px;">
                    ${targetScore.toFixed(1)}
                </div>
            </div>
        `;
    });
    
    summaryContainer.innerHTML = html;
}

// 要求項目チェック
function updateRequirements(apparatus, validSkills) {
    const requirementsContainer = document.getElementById(`${apparatus.toLowerCase()}-requirements`);
    if (!requirementsContainer) return;
    
    requirementsContainer.innerHTML = '';
    
    const egCounts = { 'Ⅰ': 0, 'Ⅱ': 0, 'Ⅲ': 0, 'Ⅳ': 0, 'Ⅴ': 0, 'Ⅵ': 0, 'Ⅶ': 0, 'Ⅷ': 0 };
    
    // 英数字から漢数字への変換マッピング
    const groupMapping = {
        'I': 'Ⅰ', 'II': 'Ⅱ', 'III': 'Ⅲ', 'IV': 'Ⅳ', 'V': 'Ⅴ', 'VI': 'Ⅵ', 'VII': 'Ⅶ', 'VIII': 'Ⅷ',
        'Ⅰ': 'Ⅰ', 'Ⅱ': 'Ⅱ', 'Ⅲ': 'Ⅲ', 'Ⅳ': 'Ⅳ', 'Ⅴ': 'Ⅴ', 'Ⅵ': 'Ⅵ', 'Ⅶ': 'Ⅶ', 'Ⅷ': 'Ⅷ'
    };
    
    console.log(`=== DISPLAY REQUIREMENTS DEBUG for ${apparatus} ===`);
    console.log(`ValidSkills:`, validSkills);
    
    validSkills.forEach((skill, index) => {
        const rawElementGroup = skill.elementGroup || skill.eg;
        const elementGroup = groupMapping[rawElementGroup];
        console.log(`Skill ${index+1}: "${skill.name}" - Raw EG: "${rawElementGroup}", Mapped EG: "${elementGroup}", Difficulty: "${skill.difficulty}"`);
        
        if (elementGroup && egCounts[elementGroup] !== undefined) {
            egCounts[elementGroup]++;
            console.log(`  Incremented group ${elementGroup} to ${egCounts[elementGroup]}`);
        } else {
            console.log(`  Warning: Invalid or missing element group: raw="${rawElementGroup}", mapped="${elementGroup}"`);
        }
    });
    
    console.log(`Final egCounts:`, egCounts);
    console.log(`=== END DISPLAY REQUIREMENTS DEBUG ===`);
    
    let requirements = [];
    
    // 種目別構成要求項目（女子体操2025-2028年ルールに基づく）
    switch (apparatus) {
        case 'VT': // 跳馬
            requirements = [
                { name: '跳馬技を実施', required: 1, actual: (() => {
                    const nameInput = document.getElementById('vt-skill-name');
                    const scoreInput = document.getElementById('vt-d-score');
                    return (nameInput && nameInput.value.trim()) || (scoreInput && scoreInput.value > 0) ? 1 : 0;
                })() },
                { name: 'Dスコア入力済み', required: 1, actual: (() => {
                    const scoreInput = document.getElementById('vt-d-score');
                    return scoreInput && scoreInput.value > 0 ? 1 : 0;
                })() }
            ];
            break;
        case 'UB': // 段違い平行棒
            requirements = [
                { name: 'CR1: 手放し技', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'CR2: 異なるバー間の飛行技', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'CR3: バーに近い技（サークル系）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'CR4: 着地技（D難度以上）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '最大技数8技', required: 8, actual: Math.min(validSkills.length, 8) }
            ];
            break;
        case 'BB': // 平均台
            requirements = [
                { name: 'CR1: ダンス系列（ジャンプ・リープ）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'CR2: 回転系技（180°以上）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'CR3: アクロバット系技', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'CR4: 着地技（C難度以上）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '最大技数8技', required: 8, actual: Math.min(validSkills.length, 8) }
            ];
            break;
        case 'FX': // ゆか
            requirements = [
                { name: 'CR1: ダンス系列（ジャンプ・リープの組み合わせ）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'CR2: 縦軸ひねり技（360°以上）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'CR3: 前転・後転宙返りの両方', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'CR4: 着地技（D難度以上）', required: 1, actual: (() => {
                    const checkbox1 = document.getElementById('fx-dismount-check');
                    const checkbox2 = document.getElementById('fx-dismount-requirement-check');
                    const isChecked = (checkbox1 && checkbox1.checked) || (checkbox2 && checkbox2.checked);
                    return isChecked ? 1 : 0;
                })() },
                { name: '最大技数8技', required: 8, actual: Math.min(validSkills.length, 8) }
            ];
            break;
    }
    
    requirements.forEach(req => {
        const reqDiv = document.createElement('div');
        reqDiv.className = 'requirement-item';
        
        const statusClass = req.actual >= req.required ? 'requirement-met' : 'requirement-not-met';
        const statusText = req.actual >= req.required ? '満たしている' : '不足';
        
        // 手動チェック項目の場合はチェックボックス付きで表示
        if (req.name === '2回（3回）宙返り系の終末技') {
            // その他NDの値を確認してチェック状態を決定
            const otherNDInput = document.getElementById('fx-other-nd-input');
            const otherNDValue = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0.3;
            const currentChecked = otherNDValue < 0.1; // NDが0に近い場合はチェック済み
            
            reqDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="fx-dismount-requirement-check" 
                           onchange="updateDismountND('FX')" 
                           style="transform: scale(1.1); margin-right: 4px;" 
                           ${currentChecked ? 'checked="checked"' : ''}>
                    <span>${req.name}</span>
                </div>
            `;
        } else if (req.name === '振動倒立技') {
            // つり輪の振動倒立技
            const otherNDInput = document.getElementById('sr-other-nd-input');
            const otherNDValue = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0.3;
            const currentChecked = otherNDValue < 0.1;
            
            reqDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="sr-handstand-check" 
                           onchange="updateHandstandND('SR')" 
                           style="transform: scale(1.1); margin-right: 4px;" 
                           ${currentChecked ? 'checked="checked"' : ''}>
                    <span>${req.name}</span>
                </div>
            `;
        } else if (req.combined) {
            // 組み合わせ表示（7技+終末技）
            const mainText = `${req.combined.main}/${req.combined.mainLimit}`;
            const subText = `${req.combined.sub}/${req.combined.subLimit}`;
            
            // メインまたはサブがゼロの場合は赤色
            let mainClass = req.combined.main === 0 ? 'requirement-zero' : 'requirement-normal';
            let subClass = req.combined.sub === 0 ? 'requirement-zero' : 'requirement-normal';
            
            reqDiv.innerHTML = `
                <span>${req.name}</span>
                <span><span class="${mainClass}">${mainText}</span>+<span class="${subClass}">${subText}</span></span>
            `;
        } else {
            // グループ要求項目の場合は実際の技数/制限値で表示
            let displayText;
            let displayClass;
            
            if (req.name.startsWith('EG ') && (req.name.includes('（') || req.name.includes(')'))) {
                // グループ項目の場合
                const maxAllowed = 4; // 同一グループ最大4技まで
                const actualCount = req.actual;
                
                if (actualCount === 0) {
                    displayText = `${actualCount}/${maxAllowed}`;
                    displayClass = 'requirement-zero'; // 0個の場合は赤
                } else if (actualCount > maxAllowed) {
                    displayText = `${actualCount}/${maxAllowed}`;
                    displayClass = 'requirement-over'; // 制限超過は赤
                } else {
                    displayText = `${actualCount}/${maxAllowed}`;
                    displayClass = 'requirement-normal'; // 正常は黒
                }
            } else if (req.name === '最大技数8技（7技+終末技）') {
                // 技数制限の場合
                const maxSkills = 8;
                const actualCount = req.actual;
                
                if (actualCount === 0) {
                    displayText = `${actualCount}/${maxSkills}`;
                    displayClass = 'requirement-zero';
                } else if (actualCount > maxSkills) {
                    displayText = `${actualCount}/${maxSkills}`;
                    displayClass = 'requirement-over';
                } else {
                    displayText = `${actualCount}/${maxSkills}`;
                    displayClass = 'requirement-normal';
                }
            } else if (req.name === '同一グループ4技制限') {
                // 同一グループ制限チェック - 最大グループ数を表示
                const maxInAnyGroup = Math.max(...Object.values(egCounts));
                const maxAllowed = 4;
                
                if (maxInAnyGroup === 0) {
                    displayText = `${maxInAnyGroup}/${maxAllowed}`;
                    displayClass = 'requirement-zero';
                } else if (maxInAnyGroup > maxAllowed) {
                    displayText = `${maxInAnyGroup}/${maxAllowed}`;
                    displayClass = 'requirement-over';
                } else {
                    displayText = `${maxInAnyGroup}/${maxAllowed}`;
                    displayClass = 'requirement-normal';
                }
            } else {
                // その他の項目は実際の技数/制限値のみ表示
                if (req.actual === 0) {
                    displayText = `${req.actual}/${req.required}`;
                    displayClass = 'requirement-zero';
                } else if (req.actual > req.required) {
                    displayText = `${req.actual}/${req.required}`;
                    displayClass = 'requirement-over';
                } else {
                    displayText = `${req.actual}/${req.required}`;
                    displayClass = 'requirement-normal';
                }
            }
            
            reqDiv.innerHTML = `
                <span>${req.name}</span>
                <span class="requirement-status ${displayClass}">${displayText}</span>
            `;
        }
        
        requirementsContainer.appendChild(reqDiv);
    });
}

// 跳馬のスコア計算（手動入力）
function calculateVaultScore() {
    const skillNameInput = document.getElementById('vt-skill-name');
    const skillNumberInput = document.getElementById('vt-skill-number');
    const dScoreInput = document.getElementById('vt-d-score');
    const totalScoreDisplay = document.getElementById('vt-total-score');
    const vaultScoreDisplay = document.getElementById('vt-vault-score');
    
    const skillName = skillNameInput ? skillNameInput.value.trim() : '';
    const skillNumber = skillNumberInput ? skillNumberInput.value.trim() : '';
    const dScore = dScoreInput ? parseFloat(dScoreInput.value) || 0 : 0;
    
    console.log(`calculateVaultScore called: name="${skillName}", number="${skillNumber}", score=${dScore}`);
    
    // 跳馬のデータを保存（複数技対応）
    if (skillName.trim() !== '' || skillNumber.trim() !== '' || dScore > 0) {
        // 既存の跳馬技を検索して更新、または新規追加
        let existingSkillIndex = -1;

        // 名前と番号が一致する既存技を検索
        if (skillName.trim() !== '' || skillNumber.trim() !== '') {
            existingSkillIndex = currentRoutines.VT.findIndex(skill => {
                return (skill.name === skillName && skill.skillNumber === skillNumber) ||
                       (skill.name === skillName && skillName.trim() !== '') ||
                       (skill.skillNumber === skillNumber && skillNumber.trim() !== '');
            });
        }

        const skillData = {
            name: skillName || '未入力',
            skillNumber: skillNumber || '',
            difficulty: '',
            elementGroup: '',
            value: dScore
        };

        if (existingSkillIndex !== -1) {
            // 既存技を更新
            currentRoutines.VT[existingSkillIndex] = skillData;
            console.log(`Updated existing vault skill at index ${existingSkillIndex}:`, skillData);
        } else {
            // 新規技を追加
            currentRoutines.VT.push(skillData);
            console.log('Added new vault skill to currentRoutines:', skillData);
        }

        console.log('All vault skills:', currentRoutines.VT);
    } else {
        console.log('Skipping vault data save - empty values');
    }
    
    if (skillName || dScore > 0) {
        historyManager.takeSnapshot(`Vault: ${skillName} (${dScore})`);
    } else {
        historyManager.takeSnapshot('Vault: Clear');
    }
    
    // 目標Eスコア取得（跳馬は技数制限なし、入力値をそのまま使用）
    const eScoreInput = document.getElementById('vt-e-score-input');
    let eScore = eScoreInput ? parseFloat(eScoreInput.value) || 0.0 : 0.0;
    
    console.log(`Vault E-score: ${eScore} (no cap applied for vault)`);
    
    // その他ND取得
    const otherNDInput = document.getElementById('vt-other-nd-input');
    const otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
    
    const totalScore = dScore;
    const targetScore = Math.max(0, totalScore + eScore - otherND);
    
    // 表示を更新
    if (totalScoreDisplay) totalScoreDisplay.textContent = totalScore.toFixed(1);
    if (vaultScoreDisplay) vaultScoreDisplay.textContent = totalScore.toFixed(1);
    
    const targetElement = document.getElementById('vt-target-score');
    if (targetElement) targetElement.textContent = targetScore.toFixed(1);
    
    // 総合スコア更新
    updateTotalScores();
    
    console.log(`Vault score updated: ${dScore} for "${skillName}"`);
}

// 種目切り替え関数の拡張
// ルール切り替え関数
function switchRule(rule) {
    console.log(`Switching to rule: ${rule}`);
    
    // ルールタブの状態を更新
    document.querySelectorAll('.rule-tab-button').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '#f8f9fa';
        btn.style.color = '#666';
        btn.style.fontWeight = 'normal';
        btn.style.borderWidth = '2px';
        btn.style.borderStyle = 'solid';
    });
    
    const activeRuleTab = document.querySelector(`[onclick="switchRule('${rule}')"]`);
    if (activeRuleTab) {
        activeRuleTab.classList.add('active');
        if (rule === 'standard') {
            activeRuleTab.style.background = '#667eea';
            activeRuleTab.style.borderColor = '#667eea';
            activeRuleTab.style.color = 'white';
        } else if (rule === 'alteration1') {
            activeRuleTab.style.background = '#28a745';
            activeRuleTab.style.borderColor = '#28a745';
            activeRuleTab.style.color = 'white';
        }
        activeRuleTab.style.fontWeight = 'bold';
    }
    
    // ルールインジケーターを更新
    const indicator = document.getElementById('current-rule-indicator');
    if (indicator) {
        if (rule === 'standard') {
            indicator.textContent = '現在適用中: 🌍 標準ルール (国際大会用)';
        } else if (rule === 'alteration1') {
            indicator.textContent = '現在適用中: 🇯🇵 変更規則Ⅰ (日本国内用)';
        }
    }
    
    currentRule = rule;
    
    // 全種目の構成要求表示を更新
    ['VT', 'UB', 'BB', 'FX'].forEach(apparatus => {
        updateCompositionRequirements(apparatus);
    });
    
    // CR状態を復元
    restoreCompositionRequirementStates();
    
    // 全種目のEスコア上限表示を更新
    ['VT', 'UB', 'BB', 'FX'].forEach(apparatus => {
        updateEScoreCapDisplay(apparatus);
    });
    
    // スコア再計算
    ['VT', 'UB', 'BB', 'FX'].forEach(apparatus => {
        calculateScore(apparatus);
    });
    
    // データ保存
    storageManager.saveToStorage();
}

// 構成要求表示を更新する関数
function updateCompositionRequirements(apparatus) {
    const requirementsContainer = document.getElementById(`${apparatus.toLowerCase()}-requirements`);
    if (!requirementsContainer) return;
    
    // 標準ルールの場合は元のCR内容を復元
    if (currentRule === 'standard') {
        restoreStandardRequirements(apparatus, requirementsContainer);
        return;
    }
    
    // 変更規則Ⅰの場合の構成要求を更新
    if (currentRule === 'alteration1') {
        updateAlterationRule1Requirements(apparatus, requirementsContainer);
    }
}

// CR状態を復元する関数
function restoreCompositionRequirementStates() {
    try {
        const savedData = localStorage.getItem('women_gymnastics_d_score_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.compositionRequirements) {
                const crData = data.compositionRequirements[currentRule];
                if (crData) {
                    Object.keys(crData).forEach(checkboxId => {
                        const checkbox = document.getElementById(checkboxId);
                        if (checkbox) {
                            checkbox.checked = crData[checkboxId];
                            console.log(`Restored CR state for ${checkboxId}: ${crData[checkboxId]}`);
                        }
                    });
                }
            }
        }

        // CR状態復元後に各種目のスコア計算を実行
        ['UB', 'BB', 'FX'].forEach(apparatus => {
            calculateScore(apparatus);
        });

        // CRチェックボックスに追加のイベントリスナーを設定（確実に動作させるため）
        setTimeout(() => {
            setupCREventListeners();
        }, 100);
    } catch (error) {
        console.error('Failed to restore CR states:', error);
    }
}

// CRチェックボックスのイベントリスナーを確実に設定
function setupCREventListeners() {
    console.log('Setting up CR event listeners...');

    const apparatuses = ['UB', 'BB', 'FX'];
    const suffixes = ['', '-alt']; // 標準ルールと変更規則

    apparatuses.forEach(apparatus => {
        suffixes.forEach(suffix => {
            for (let i = 1; i <= 4; i++) {
                const checkboxId = `${apparatus.toLowerCase()}-cr${i}${suffix}`;
                const checkbox = document.getElementById(checkboxId);

                if (checkbox) {
                    // 既存のイベントリスナーを削除して新しく設定
                    checkbox.removeEventListener('change', crChangeHandler);
                    checkbox.addEventListener('change', function() {
                        console.log(`CR checkbox changed: ${checkboxId}, checked: ${this.checked}`);
                        calculateScore(apparatus);
                        storageManager.saveToStorage();
                    });
                    console.log(`Event listener set for ${checkboxId}`);
                }
            }
        });
    });
}

// CRチェンジハンドラー（削除用）
function crChangeHandler() {}

// 標準ルールのCR内容を復元
function restoreStandardRequirements(apparatus, container) {
    switch (apparatus) {
        case 'VT': // 跳馬は構成要求なし
            break;
        case 'UB': // 段違い平行棒
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr1" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR1: 逆握りまたは混合握りでの上がり技
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr2" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR2: 高棒から低棒へ移動する空中局面を伴う技
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr3" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR3: 低棒から高棒へ移動する空中局面を伴う技
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr4" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR4: 低棒での空中局面を伴う技（カウンターライズ技含む）
                    </label>
                </div>
            `;
            break;
        case 'BB': // 平均台
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr1" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR1: 2つのダンス要素の組み合わせ（1つは180°開脚）
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr2" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR2: 片足での1回転以上のターン
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr3" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR3: アクロバット系列（最低2つの連結技）
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr4" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR4: 前方と後方のアクロバット要素
                    </label>
                </div>
            `;
            break;
        case 'FX': // ゆか
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr1" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR1: 2つのダンス要素の組み合わせ（1つは180°開脚）
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr2" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR2: 前方/側方と後方の宙返り
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr3" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR3: 2回宙返り
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr4" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR4: 最低1回転のひねりを伴う宙返り
                    </label>
                </div>
            `;
            break;
    }
}

// 変更規則Ⅰの構成要求を設定
function updateAlterationRule1Requirements(apparatus, container) {
    switch (apparatus) {
        case 'VT': // 跳馬は変更なし
            break;
        case 'UB': // 段違い平行棒
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr1-alt" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR1: 高棒から低棒へ移動する空中局面を伴う技
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr2-alt" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR2: 空中局面を伴う技（構成要求１と兼ねられない、終末技を除く）
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr3-alt" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR3: 異なる握り（後ろ振り上げ倒立、開始技と終末技を除く）
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="ub-cr4-alt" onchange="calculateScore('UB')" style="margin-right: 8px;">
                        CR4: 360度以上のひねりを伴う空中局面を伴わない技（開始技除く）
                    </label>
                </div>
            `;
            break;
        case 'BB': // 平均台
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr1-alt" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR1: 180度開脚のダンス系技の組み合わせ
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr2-alt" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR2: ターン（グループ3）または接転系技・旋回
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr3-alt" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR3: 空中局面を伴う技を含むアクロバット系シリーズ
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="bb-cr4-alt" onchange="calculateScore('BB')" style="margin-right: 8px;">
                        CR4: 方向の異なるアクロバット系技
                    </label>
                </div>
                <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-left: 4px solid #2196f3; font-size: 12px;">
                    <strong>A難度として認められる要素:</strong><br>
                    <div style="margin-top: 8px; color: #333;">
                        ・伸身とび<br>
                        ・かかえ込みとび<br>
                        ・前転（座の姿勢またはしゃがみ立ちへ）
                    </div>
                </div>
            `;
            break;
        case 'FX': // ゆか
            container.innerHTML = `
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr1-alt" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR1: 180度開脚の跳躍技を含むダンス系技の組み合わせ
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr2-alt" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR2: ひねり（1回ひねり以上）を伴う宙返り
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr3-alt" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR3: 2回宙返りまたは2つの異なる宙返りを含む1つのアクロライン
                    </label>
                </div>
                <div class="requirement-item">
                    <label>
                        <input type="checkbox" id="fx-cr4-alt" onchange="calculateScore('FX')" style="margin-right: 8px;">
                        CR4: 後方宙返りと前方宙返り（片足踏み切りの宙返りは除く）
                    </label>
                </div>
                <div style="margin-top: 15px; padding: 10px; background: #e7f3ff; border-left: 4px solid #2196f3; font-size: 12px;">
                    <strong>A難度として認められる要素:</strong><br>
                    <div style="margin-top: 8px; color: #333;">
                        ・前方倒立回転<br>
                        ・側方倒立回転<br>
                        ・後方倒立回転
                    </div>
                </div>
            `;
            break;
    }
}

function switchApparatus(apparatus) {
    console.log(`Switching to apparatus: ${apparatus}`);
    
    // タブの状態を更新
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.apparatus-section').forEach(section => section.classList.remove('active'));
    
    const activeTab = document.querySelector(`[onclick="switchApparatus('${apparatus}')"]`);
    const activeSection = document.getElementById(apparatus);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeSection) activeSection.classList.add('active');
    
    currentApparatus = apparatus;
    
    // 跳馬の場合は特別処理
    if (apparatus === 'VT') {
        console.log('Switching to vault, current VT data:', currentRoutines.VT);
        // 跳馬は手動入力なので技一覧は表示しない
        // 跳馬のデータが存在する場合は表示を更新
        setTimeout(() => {
            const vaultNameInput = document.getElementById('vt-skill-name');
            const vaultScoreInput = document.getElementById('vt-d-score');
            
            console.log('=== SWITCH TO VAULT ===');
            console.log('Current VT data:', currentRoutines.VT);
            console.log('Name input element:', vaultNameInput);
            console.log('Score input element:', vaultScoreInput);
            
            if (currentRoutines.VT.length > 0) {
                const vaultData = currentRoutines.VT[0];
                console.log('Restoring vault data:', vaultData);
                
                if (vaultNameInput) {
                    const nameValue = vaultData.name === '未入力' ? '' : (vaultData.name || '');
                    vaultNameInput.value = nameValue;
                    console.log('Name input set to:', nameValue);
                }
                if (vaultScoreInput) {
                    const scoreValue = vaultData.value || 0;
                    vaultScoreInput.value = scoreValue;
                    console.log('Score input set to:', scoreValue);
                }
                calculateVaultScore();
            } else {
                console.log('No vault data to restore - setting default values');
                if (vaultNameInput) vaultNameInput.value = '';
                if (vaultScoreInput) vaultScoreInput.value = '';
                // データが空の場合はcalculateVaultScore()を呼ばない（データを保持）
            }
            console.log('======================');
        }, 100);
        return;
    }
    
    // 通常の種目は既存の表示ロジックを使用
    displayCurrentRoutine(apparatus);
    
    // ローカルストレージに現在の種目を保存
    storageManager.saveToStorage();
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== PAGE LOADED ===');
    
    // 同期的にデータを読み込み
    loadSkillsData();
    
    // DOM要素が確実に存在するのを待ってからデータを復元
    setTimeout(() => {
        console.log('Starting data restoration...');
        const dataLoaded = storageManager.loadFromStorage();
    
    if (dataLoaded) {
        // データが復元された場合は適切な種目に切り替え
        switchApparatus(currentApparatus);
        
        // 復元後に全種目のスコアを再計算（女子体操4種目）
        const apparatusList = ['VT', 'UB', 'BB', 'FX'];
        apparatusList.forEach(apparatus => {
            if (apparatus === 'VT') {
                calculateVaultScore();
            } else {
                calculateScore(apparatus);
            }
        });
        
        console.log('Restored data from localStorage');
    } else {
        // データがない場合はデフォルト表示
        displayCurrentRoutine('VT');
        
        // 初回読み込み時：各種目のスコアを計算
        // 初回読み込み時：各種目のスコアを計算
        ['VT', 'UB', 'BB', 'FX'].forEach(apparatus => {
            if (apparatus === 'VT') {
                // 跳馬はデータがある場合のみ計算
                if (currentRoutines.VT.length > 0) {
                    calculateVaultScore();
                }
            } else {
                calculateScore(apparatus);
            }
        });
    }
    
    // 初期スナップショットを保存（復元後または初期状態）
    historyManager.takeSnapshot(dataLoaded ? 'Restored from storage' : 'Initial state');
    
    // 初期状態の種目別一覧を更新
    updateApparatusSummary();
    
    // キーボードショートカットの設定
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            historyManager.undo();
        } else if (e.ctrlKey && e.key === 'y') {
            e.preventDefault();
            historyManager.redo();
        }
    });
    
    // 跳馬入力フィールドにイベントリスナーを追加
    const vaultNameInput = document.getElementById('vt-skill-name');
    const vaultScoreInput = document.getElementById('vt-d-score');
    
    // 跳馬手入力フィールドのイベントリスナー設定
    if (vaultNameInput) {
        console.log('Setting up vault name input listeners');
        ['input', 'blur', 'change'].forEach(event => {
            vaultNameInput.addEventListener(event, () => {
                console.log(`Vault name ${event} event: "${vaultNameInput.value}"`);
                storageManager.saveToStorage();
            });
        });
    }
    if (vaultScoreInput) {
        console.log('Setting up vault score input listeners');
        ['input', 'change'].forEach(event => {
            vaultScoreInput.addEventListener(event, () => {
                console.log(`Vault score ${event} event: ${vaultScoreInput.value}`);
                calculateVaultScore();
                storageManager.saveToStorage();
            });
        });
    }
    
    // 組み合わせ加点とND値のイベントリスナーを追加
    const apparatusList = ['FX', 'PH', 'SR', 'VT', 'PB', 'HB'];
    apparatusList.forEach(apparatus => {
        const key = apparatus.toLowerCase();
        
        // 組み合わせ加点（ゆかと鉄棒のみ）
        if (apparatus === 'FX' || apparatus === 'HB') {
            const connectionInput = document.getElementById(`${key}-connection-input`);
            if (connectionInput) {
                connectionInput.addEventListener('change', () => {
                    calculateScore(apparatus);
                    storageManager.saveToStorage();
                });
            }
        }
        
        // その他ND
        const otherNDInput = document.getElementById(`${key}-other-nd-input`);
        if (otherNDInput) {
            otherNDInput.addEventListener('change', () => {
                if (apparatus === 'VT') {
                    // 跳馬は手動入力なのでcalculateVaultScoreを呼ぶ
                    calculateVaultScore();
                } else {
                    calculateScore(apparatus);
                }
                storageManager.saveToStorage();
            });
        }
        
        // 目標Eスコア
        const eScoreInput = document.getElementById(`${key}-e-score-input`);
        if (eScoreInput) {
            eScoreInput.addEventListener('change', () => {
                if (apparatus === 'VT') {
                    // 跳馬は手動入力なのでcalculateVaultScoreを呼ぶ
                    calculateVaultScore();
                } else {
                    calculateScore(apparatus);
                }
                storageManager.saveToStorage();
            });
        }
    });
    
        // 定期保存（5秒ごと）
        setInterval(() => {
            storageManager.saveToStorage();
        }, 5000);
        
        // 初期化時：全種目のEスコア上限表示を設定
        ['VT', 'UB', 'BB', 'FX'].forEach(apparatus => {
            updateEScoreCapDisplay(apparatus);
        });
        
        console.log('Application initialized with localStorage support');

        // CRイベントリスナーの設定
        setTimeout(() => {
            setupCREventListeners();
        }, 200);
    }, 100); // setTimeout の終了
});

// レポートプレビュー更新関数
function updateReportPreview() {
    try {
        console.log('updateReportPreview called');
        const title = document.getElementById('report-title').value || '体操競技 Dスコア計算結果';
        const name = document.getElementById('report-name').value || '未入力';
        const preview = document.getElementById('report-preview');
        
        console.log('Preview element:', preview);
        console.log('Title:', title, 'Name:', name);
        
        // 総合スコア更新を先に実行
        updateTotalScores();
        
        // 関数が利用可能になるまで待機してから実行
        const tryUpdatePreview = () => {
            if (typeof window.generateReportHTML === 'function') {
                const html = window.generateReportHTML(title, name);
                if (preview) {
                    preview.innerHTML = html;
                    console.log('Preview updated successfully with generateReportHTML');
                } else {
                    console.error('Preview element not found');
                }
                return true;
            } else if (typeof window.createReportContent === 'function') {
                window.createReportContent(title, name);
                const reportContent = document.getElementById('report-content');

                if (reportContent && preview) {
                    preview.innerHTML = reportContent.innerHTML;
                    console.log('Preview updated successfully with createReportContent');
                } else {
                    console.error('Missing elements - reportContent:', reportContent, 'preview:', preview);
                }
                return true;
            }
            return false;
        };

        // まず即座に試行
        if (!tryUpdatePreview()) {
            console.log('Report functions not ready, waiting...');
            // 200ms後に再試行
            setTimeout(() => {
                if (!tryUpdatePreview()) {
                    console.log('Functions still not available, using fallback...');
                    // フォールバック表示
                    if (preview) {
                        preview.innerHTML = `
                            <div style="padding: 20px; border: 2px solid #007bff; background: #f8f9fa;">
                                <h1 style="color: #007bff;">${title}</h1>
                                <p>氏名: ${name}</p>
                                <p>適用ルール: ${window.currentRule === 'standard' ? '🌍 標準ルール' : '🇯🇵 日本変更規則Ⅰ'}</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                    <div style="border: 1px solid #ddd; padding: 10px;">跳馬 (VT)</div>
                                    <div style="border: 1px solid #ddd; padding: 10px;">段違い平行棒 (UB)</div>
                                    <div style="border: 1px solid #ddd; padding: 10px;">平均台 (BB)</div>
                                    <div style="border: 1px solid #ddd; padding: 10px;">ゆか (FX)</div>
                                </div>
                            </div>
                        `;
                        console.log('Preview updated with fallback HTML');
                    }
                }
            }, 200);
        }
    } catch (error) {
        console.error('Error in updateReportPreview:', error);
    }
}

// グローバルスコープに関数をバインド
window.updateReportPreview = updateReportPreview;
window.updatePreview = updateReportPreview;
window.currentRoutines = currentRoutines;
window.updateTotalScores = updateTotalScores;
window.addSkillInput = addSkillInput;
window.switchApparatus = switchApparatus;
window.removeSkill = removeSkill;
window.moveSkill = moveSkill;
window.moveSkillToPosition = moveSkillToPosition;