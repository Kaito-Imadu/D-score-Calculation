// 技データベース
const skillsDatabase = {
    'FX': [], // ゆか
    'PH': [], // あん馬  
    'SR': [], // つり輪
    'VT': [], // 跳馬（手動入力）
    'PB': [], // 平行棒
    'HB': []  // 鉄棒
};

// 現在のルーティン
const currentRoutines = {
    'FX': [],
    'PH': [],
    'SR': [],
    'VT': [],
    'PB': [],
    'HB': []
};

let currentApparatus = 'FX';

// FX NL1/NL3 要求項目チェック状態（true = 満たしている = NDなし）
// NL1 (2025-08): アクロバット開始・バランス/跳躍実施
// NL1/NL3 (2026-01-01〜): 各コーナー移動が異なること
const fxNLState = {
    acroStart: true,         // NL1: 演技をアクロバット技で開始
    balanceJump: true,       // NL1: バランスまたは跳躍・跳技の実施
    cornerTransitions: true  // NL1/NL3: 各コーナー移動が異なること（2026/1/1〜）
};

// FX NL1/NL3 状態更新関数
function updateFXNLState(key, checked) {
    fxNLState[key] = checked;
    calculateScore('FX');
}

// ローカルストレージ管理システム
const storageManager = {
    // データをローカルストレージに保存
    saveToStorage() {
        try {
            // 跳馬の手入力データを収集
            const vaultNameInput = document.getElementById('vt-skill-name');
            const vaultScoreInput = document.getElementById('vt-d-score');
            
            if (vaultNameInput || vaultScoreInput) {
                const vaultName = vaultNameInput ? vaultNameInput.value.trim() : '';
                const vaultScore = vaultScoreInput ? parseFloat(vaultScoreInput.value) || 0 : 0;
                
                // 跳馬データを手動で更新（有効なデータがある場合のみ上書き）
                if (vaultName || vaultScore > 0) {
                    currentRoutines.VT = [{
                        name: vaultName || '未入力',
                        difficulty: '',
                        elementGroup: '',
                        value: vaultScore
                    }];
                    console.log(`Saving vault manual data: name="${vaultName}", score=${vaultScore}`);
                } else {
                    console.log(`Skipping vault data update - empty values, keeping existing:`, currentRoutines.VT);
                }
            }
            
            // 組み合わせ加点とND値を収集
            const connectionScores = {};
            const otherNDs = {};
            const eScores = {};
            
            const apparatusList = ['FX', 'PH', 'SR', 'VT', 'PB', 'HB'];
            apparatusList.forEach(apparatus => {
                const key = apparatus.toLowerCase();
                
                // 組み合わせ加点（ゆかと鉄棒のみ）
                if (apparatus === 'FX' || apparatus === 'HB') {
                    const connectionInput = document.getElementById(`${key}-connection-input`);
                    if (connectionInput) {
                        const value = parseFloat(connectionInput.value) || 0;
                        connectionScores[apparatus] = value;
                        console.log(`Saving connection score for ${apparatus}: ${value}`);
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
                    const value = parseFloat(eScoreInput.value) || 8.5;
                    eScores[apparatus] = value;
                    console.log(`Saving E-score for ${apparatus}: ${value}`);
                }
            });
            
            const dataToSave = {
                routines: currentRoutines,
                apparatus: currentApparatus,
                connectionScores: connectionScores,
                otherNDs: otherNDs,
                eScores: eScores,
                fxNLState: { ...fxNLState },
                timestamp: Date.now()
            };
            localStorage.setItem('men_gymnastics_d_score_data', JSON.stringify(dataToSave));
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
            const savedData = localStorage.getItem('men_gymnastics_d_score_data');
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
                
                // 跳馬の手入力フィールドを復元
                setTimeout(() => {
                    const vaultNameInput = document.getElementById('vt-skill-name');
                    const vaultScoreInput = document.getElementById('vt-d-score');
                    
                    if (currentRoutines.VT.length > 0) {
                        const vaultData = currentRoutines.VT[0];
                        if (vaultNameInput) {
                            vaultNameInput.value = vaultData.name === '未入力' ? '' : (vaultData.name || '');
                        }
                        if (vaultScoreInput) {
                            vaultScoreInput.value = vaultData.value || 0;
                        }
                        calculateVaultScore();
                        console.log('Vault manual data restored:', vaultData);
                    } else {
                        if (vaultNameInput) vaultNameInput.value = '';
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
                            eScoreInput.value = data.eScores[apparatus] || 8.5;
                            console.log(`Restored E-score for ${apparatus}: ${data.eScores[apparatus]}`);
                        } else {
                            console.log(`E-score input not found for: ${key}`);
                        }
                    });
                }
                
                // FX NL1/NL3 状態を復元
                if (data.fxNLState) {
                    Object.assign(fxNLState, data.fxNLState);
                    console.log('Restored fxNLState:', fxNLState);
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
            localStorage.removeItem('men_gymnastics_d_score_data');
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

// 難度値を取得するヘルパー関数
function getDifficultyValue(difficulty) {
    const difficultyMap = {
        'A': 0.1, 'B': 0.2, 'C': 0.3, 'D': 0.4, 'E': 0.5,
        'F': 0.6, 'G': 0.7, 'H': 0.8, 'I': 0.9, 'J': 1.0
    };
    return difficultyMap[difficulty] || 0;
}

// 技入力欄を追加
function addSkillInput(apparatus) {
    const newSkill = {
        name: '',
        difficulty: '',
        elementGroup: '',
        value: 0
    };

    currentRoutines[apparatus].push(newSkill);
    displayCurrentRoutine(apparatus);
    storageManager.saveToStorage();
}

// 自由技入力欄を追加（グループ×、難度a）
function addCustomSkillInput(apparatus) {
    const skillsContainer = document.getElementById(apparatus.toLowerCase() + '-skills');
    const skillIndex = currentRoutines[apparatus].length;
    
    // 自由技データを追加（グループ×、難度a、0.1点）
    const customSkill = {
        name: '',
        elementGroup: '×',
        difficulty: 'a',
        value: 0.1,
        isCustom: true // カスタム技であることを示すフラグ
    };
    
    currentRoutines[apparatus].push(customSkill);
    historyManager.takeSnapshot(`Add custom skill input ${skillIndex + 1}`);
    
    const skillDiv = createCustomSkillInputElement(apparatus, skillIndex, customSkill);
    skillsContainer.appendChild(skillDiv);
}

// カスタム技入力要素を作成（a技用、セレクトボックスで表示）
function createCustomSkillInputElement(apparatus, skillIndex, skill) {
    console.log(`=== Creating custom skill element for ${apparatus}-${skillIndex} ===`);
    
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-input-group';
    skillDiv.style.position = 'relative';
    
    const skillNumber = document.createElement('div');
    skillNumber.className = 'skill-number';
    skillNumber.textContent = skillIndex + 1;
    
    // 技名入力
    const skillInput = document.createElement('input');
    skillInput.type = 'text';
    skillInput.className = 'skill-input';
    skillInput.placeholder = '技名を入力';
    skillInput.value = skill ? skill.name : '';
    skillInput.dataset.apparatus = apparatus;
    skillInput.dataset.skillIndex = skillIndex;
    skillInput.style.width = '270px';
    skillInput.style.flex = 'none';
    
    skillInput.addEventListener('input', function() {
        const currentSkill = currentRoutines[apparatus][skillIndex];
        if (currentSkill) {
            currentSkill.name = this.value;
            calculateScore(apparatus);
            storageManager.saveToStorage();
        }
    });
    
    // 難度選択（固定値a (0.1)）
    const difficultySelect = document.createElement('select');
    difficultySelect.className = 'difficulty-select';
    difficultySelect.style.width = '90px';
    difficultySelect.style.flex = 'none';
    difficultySelect.style.flexShrink = '0';
    difficultySelect.innerHTML = '<option value="a">a (0.1)</option>';
    difficultySelect.value = 'a';
    difficultySelect.disabled = true;
    
    // グループ選択（固定値グループ×）
    const groupSelect = document.createElement('select');
    groupSelect.className = 'group-select';
    groupSelect.style.width = '90px';
    groupSelect.style.flex = 'none';
    groupSelect.style.flexShrink = '0';
    groupSelect.innerHTML = '<option value="×">グループ×</option>';
    groupSelect.value = '×';
    groupSelect.disabled = true;
    
    // 技情報表示エリア（非表示）
    const skillInfo = document.createElement('div');
    skillInfo.className = 'skill-info';
    skillInfo.style.display = 'none';
    
    // 削除ボタン
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-skill';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => removeSkill(apparatus, skillIndex);
    
    // 要素を組み立て（通常技と同じ順序）
    skillDiv.appendChild(skillNumber);
    skillDiv.appendChild(skillInput);
    skillDiv.appendChild(difficultySelect);
    skillDiv.appendChild(groupSelect);
    skillDiv.appendChild(skillInfo);
    skillDiv.appendChild(removeButton);
    
    // ドラッグ&ドロップ機能
    setupDragAndDrop(skillDiv, apparatus, skillIndex);
    
    console.log(`=== Custom skill element created successfully for ${apparatus}-${skillIndex} ===`);
    return skillDiv;
}

// 技入力要素を作成
function createSkillInputElement(apparatus, skillIndex, skill = null) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-input-group';
    skillDiv.style.position = 'relative';

    const skillNumber = document.createElement('div');
    skillNumber.className = 'skill-number';
    skillNumber.textContent = skillIndex + 1;

    // 技名入力（テキスト入力）
    const skillNameInput = document.createElement('input');
    skillNameInput.type = 'text';
    skillNameInput.className = 'skill-input';
    skillNameInput.placeholder = '技名を入力';
    skillNameInput.value = skill ? skill.name : '';
    skillNameInput.style.width = '270px';
    skillNameInput.style.flex = 'none';
    skillNameInput.addEventListener('input', function() {
        currentRoutines[apparatus][skillIndex].name = this.value;
        storageManager.saveToStorage();
    });

    // 難度選択（A-J）
    const difficultySelect = document.createElement('select');
    difficultySelect.className = 'difficulty-select';
    difficultySelect.style.flex = '1';
    difficultySelect.innerHTML = `
        <option value="">難度</option>
        <option value="A">A (0.1)</option>
        <option value="B">B (0.2)</option>
        <option value="C">C (0.3)</option>
        <option value="D">D (0.4)</option>
        <option value="E">E (0.5)</option>
        <option value="F">F (0.6)</option>
        <option value="G">G (0.7)</option>
        <option value="H">H (0.8)</option>
        <option value="I">I (0.9)</option>
        <option value="J">J (1.0)</option>
    `;
    if (skill && skill.difficulty) {
        difficultySelect.value = skill.difficulty;
    }
    difficultySelect.addEventListener('change', function() {
        const difficulty = this.value;
        const value = difficulty ? getDifficultyValue(difficulty) : 0;
        currentRoutines[apparatus][skillIndex].difficulty = difficulty;
        currentRoutines[apparatus][skillIndex].value = value;
        updateSkillInfo(skillInfo, currentRoutines[apparatus][skillIndex], apparatus);
        calculateScore(apparatus);
        storageManager.saveToStorage();
    });

    // グループ選択（I-IV）
    const groupSelect = document.createElement('select');
    groupSelect.className = 'group-select';
    groupSelect.style.flex = '1';
    groupSelect.innerHTML = `
        <option value="">グループ</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
    `;
    if (skill && skill.elementGroup) {
        groupSelect.value = skill.elementGroup;
    }
    groupSelect.addEventListener('change', function() {
        currentRoutines[apparatus][skillIndex].elementGroup = this.value;
        updateSkillInfo(skillInfo, currentRoutines[apparatus][skillIndex], apparatus);
        calculateScore(apparatus);
        storageManager.saveToStorage();
    });

    const skillInfo = document.createElement('div');
    skillInfo.className = 'skill-info';
    if (skill) {
        updateSkillInfo(skillInfo, skill, apparatus);
    }

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-skill';
    removeButton.innerHTML = '×';
    removeButton.onclick = () => removeSkill(apparatus, skillIndex);

    // ドラッグ&ドロップ
    setupDragAndDrop(skillDiv, apparatus, skillIndex);

    skillDiv.appendChild(skillNumber);
    skillDiv.appendChild(skillNameInput);
    skillDiv.appendChild(difficultySelect);
    skillDiv.appendChild(groupSelect);
    skillDiv.appendChild(skillInfo);
    skillDiv.appendChild(removeButton);

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
        draggedIndex = getCurrentSkillIndex(this);
        draggedApparatus = apparatus;
        this.classList.add('dragging');
        
        const dragImage = this.cloneNode(true);
        dragImage.style.opacity = '0.7';
        dragImage.style.position = 'absolute';
        dragImage.style.top = '-1000px';
        document.body.appendChild(dragImage);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setDragImage(dragImage, 0, 0);
        setTimeout(() => {
            if (dragImage.parentNode) {
                document.body.removeChild(dragImage);
            }
        }, 0);
        
        console.log(`Drag started: skill at current index ${draggedIndex} from ${apparatus}`);
    });
    
    skillDiv.addEventListener('dragend', function(e) {
        console.log('Drag ended');
        this.classList.remove('dragging');
        hideAllDropIndicators();
        
        document.querySelectorAll('.dragging').forEach(el => {
            el.classList.remove('dragging');
        });
        
        draggedElement = null;
        draggedIndex = null;
        draggedApparatus = null;
    });
    
    skillDiv.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (draggedElement && draggedElement !== this && draggedApparatus === apparatus) {
            showDropIndicator(this, e.clientY);
        }
        return false;
    });
    
    skillDiv.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (draggedElement && draggedElement !== this && draggedApparatus === apparatus) {
            this.classList.add('drag-over');
        }
    });
    
    skillDiv.addEventListener('dragleave', function(e) {
        this.classList.remove('drag-over');
    });
    
    skillDiv.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        this.classList.remove('drag-over');
        
        if (draggedElement && draggedElement !== this && draggedApparatus === apparatus) {
            const dropIndex = getCurrentSkillIndex(this);
            const insertPosition = getInsertPosition(this, e.clientY);
            let targetIndex = dropIndex;
            
            if (insertPosition === 'after') {
                targetIndex = dropIndex + 1;
            }
            
            const actualFromIndex = getCurrentSkillIndex(draggedElement);
            
            console.log(`Drop detected: from=${actualFromIndex}, to=${targetIndex}, position=${insertPosition}`);
            
            if (actualFromIndex !== -1 && targetIndex !== -1) {
                if (actualFromIndex < targetIndex) {
                    targetIndex--;
                }
                
                console.log(`Executing move: from ${actualFromIndex} to ${targetIndex}`);
                moveSkillToPosition(apparatus, actualFromIndex, targetIndex);
            } else {
                console.warn(`Invalid indices: from=${actualFromIndex}, to=${targetIndex}`);
            }
        }
        hideAllDropIndicators();
        return false;
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
    
    // 2025年新ルール: グループ点計算
    groupScore = calculateGroupScore(validSkills, apparatus);
    console.log(`Received group score: ${groupScore} for ${apparatus}`);
    
    // 着地加点は削除（要求により）
    landingBonus = 0;
    
    // 組み合わせ加点（ゆかと鉄棒のみ、手動入力）
    if (apparatus === 'FX' || apparatus === 'HB') {
        const connectionInput = document.getElementById(`${apparatus.toLowerCase()}-connection-input`);
        connectionScore = connectionInput ? parseFloat(connectionInput.value) || 0 : 0;
    }
    
    // 目標Eスコア取得
    const eScoreInput = document.getElementById(`${apparatus.toLowerCase()}-e-score-input`);
    const eScore = eScoreInput ? parseFloat(eScoreInput.value) || 8.5 : 8.5;
    
    // 技数ND計算（PDFの表に基づく正確な計算）
    // カスタム技も技数NDの計算に含める
    const skillCount = validSkills.length;
    
    // Number of elements Neutral Deduction (ND) 表（PDFより）
    // 8技以上または7技以上 = 0.0点, それ以外は表の通り
    if (skillCount >= 8) {
        skillND = 0.0;
    } else if (skillCount === 7) {
        skillND = 0.0;
    } else if (skillCount === 6) {
        skillND = 0.0;
    } else if (skillCount === 5) {
        skillND = 3.0;
    } else if (skillCount === 4) {
        skillND = 4.0;
    } else if (skillCount === 3) {
        skillND = 5.0;
    } else if (skillCount === 2) {
        skillND = 6.0;
    } else if (skillCount === 1) {
        skillND = 7.0;
    } else {
        skillND = 10.0; // 0技の場合
    }
    
    console.log(`Skill count: ${skillCount}, Skill ND: ${skillND}`);
    
    // その他ND（手動入力）
    const otherNDInput = document.getElementById(`${apparatus.toLowerCase()}-other-nd-input`);
    otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;

    // FX NL1/NL3 自動ND（チェックボックスの状態から計算）
    if (apparatus === 'FX') {
        if (!fxNLState.acroStart) otherND += 0.3;      // NL1: アクロバット技で開始していない
        if (!fxNLState.balanceJump) otherND += 0.3;    // NL1: バランス/跳躍技を実施していない
        if (!fxNLState.cornerTransitions) otherND += 0.3; // NL1/NL3: コーナー移動が重複している
    }

    const totalScore = difficultyScore + groupScore + connectionScore + landingBonus;
    const targetScore = Math.max(0, totalScore + eScore - skillND - otherND);
    
    // ゆかの詳細計算ログ
    if (apparatus === 'FX') {
        console.log(`=== FLOOR DETAILED CALCULATION ===`);
        console.log(`Difficulty Score: ${difficultyScore.toFixed(3)}`);
        console.log(`Group Score: ${groupScore.toFixed(3)}`);
        console.log(`Connection Score: ${connectionScore.toFixed(3)}`);
        console.log(`Landing Bonus: ${landingBonus.toFixed(3)}`);
        console.log(`Skill ND: ${skillND.toFixed(3)}`);
        console.log(`Other ND: ${otherND.toFixed(3)}`);
        console.log(`Total D Score: ${totalScore.toFixed(3)}`);
        console.log(`E Score: ${eScore.toFixed(3)}`);
        console.log(`Target Score: ${targetScore.toFixed(3)}`);
        console.log(`Expected: ${(totalScore + eScore).toFixed(3)}`);
        console.log(`================================`);
    }
    
    // 表示を更新
    const prefix = apparatus.toLowerCase();
    const difficultyElement = document.getElementById(`${prefix}-difficulty-score`);
    const groupElement = document.getElementById(`${prefix}-group-score`);
    const skillNDElement = document.getElementById(`${prefix}-skill-nd`);
    const totalElement = document.getElementById(`${prefix}-total-score`);
    const targetElement = document.getElementById(`${prefix}-target-score`);
    
    console.log(`=== SCORE DISPLAY UPDATE ===`);
    console.log(`Difficulty: ${difficultyScore}, Group: ${groupScore}, Landing: ${landingBonus}, SkillND: ${skillND}, Total: ${totalScore}`);
    
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
    if (skillNDElement) skillNDElement.textContent = skillND > 0 ? '-' + skillND.toFixed(1) : '0.0';
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
    updateRequirements(apparatus, validSkills);
    
    // 総合スコア更新
    updateTotalScores();
}

// 2025年新ルール: グループ点計算
function calculateGroupScore(skills, apparatus) {
    console.log(`=== GROUP SCORE CALCULATION for ${apparatus} ===`);
    console.log(`Skills to analyze:`, skills.length);
    
    const egCounts = { 'Ⅰ': 0, 'Ⅱ': 0, 'Ⅲ': 0, 'Ⅳ': 0, 'Ⅴ': 0, 'Ⅵ': 0, 'Ⅶ': 0, 'Ⅷ': 0, 'I': 0, 'II': 0, 'III': 0, 'IV': 0 };
    const egSkills = { 'Ⅰ': [], 'Ⅱ': [], 'Ⅲ': [], 'Ⅳ': [], 'I': [], 'II': [], 'III': [], 'IV': [] };
    
    // 各グループの技を収集（同一グループ4技制限を適用）
    // カスタム技もグループ点計算に含める
    skills.forEach((skill, index) => {
        const elementGroup = skill.elementGroup || skill.eg;
        const isCustom = skill.isCustom || false;
        const skillType = isCustom ? "Custom skill" : "Normal skill";
        
        console.log(`Skill ${index+1}: "${skill.name}" - ${skillType}, EG: "${elementGroup}", Difficulty: "${skill.difficulty}"`);
        
        // グループが設定されていて、同一グループ4技制限内の場合のみ追加
        if (elementGroup && egCounts[elementGroup] !== undefined && egCounts[elementGroup] < 4) {
            egCounts[elementGroup]++;
            if (egSkills[elementGroup]) {
                egSkills[elementGroup].push(skill);
                console.log(`  Added to group ${elementGroup} (count: ${egCounts[elementGroup]})`);
            }
        } else {
            console.log(`  Skipped: EG="${elementGroup}" not valid or limit reached`);
        }
    });
    
    let groupScore = 0;
    const difficultyValues = {
        'A': 0.1, 'B': 0.2, 'C': 0.3, 'D': 0.4, 'E': 0.5, 'F': 0.6, 'G': 0.7, 'H': 0.8, 'I': 0.9, 'J': 1.0, 'a': 0.1
    };
    
    // 各グループの点数計算（2025年新ルール）
    const groupsToCheck = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'I', 'II', 'III', 'IV'];
    groupsToCheck.forEach(group => {
        if (egSkills[group] && egSkills[group].length > 0) {
            console.log(`Processing group ${group} with ${egSkills[group].length} skills`);
            const highestSkill = egSkills[group].reduce((highest, skill) => {
                const currentValue = difficultyValues[skill.difficulty] || 0;
                const highestValue = difficultyValues[highest.difficulty] || 0;
                return currentValue > highestValue ? skill : highest;
            });
            
            const highestValue = difficultyValues[highestSkill.difficulty] || 0;
            
            // グループの正規化（英数字と漢数字の両方に対応）
            const normalizedGroup = group === 'I' || group === 'Ⅰ' ? 1 : 
                                   group === 'II' || group === 'Ⅱ' ? 2 :
                                   group === 'III' || group === 'Ⅲ' ? 3 :
                                   group === 'IV' || group === 'Ⅳ' ? 4 : 0;
            
            console.log(`Group ${group} normalized to ${normalizedGroup}, highest skill: ${highestSkill.name} (${highestSkill.difficulty}), value: ${highestValue}`);

            switch (apparatus) {
                case 'FX': // ゆか
                    if (normalizedGroup === 1) {
                        groupScore += 0.5; // A難度以上で+0.5
                        console.log(`  Added 0.5 for Group I (floor static elements)`);
                    } else if (normalizedGroup >= 2 && normalizedGroup <= 4) {
                        const score = highestValue >= 0.4 ? 0.5 : 0.3; // D難度以上で+0.5、A-C で+0.3
                        groupScore += score;
                        console.log(`  Added ${score} for Group ${normalizedGroup} (difficulty-based)`);
                    }
                    break;
                case 'PH': // あん馬
                    if (normalizedGroup === 1) {
                        groupScore += 0.5; // A難度以上で+0.5
                        console.log(`  Added 0.5 for Group I`);
                    } else if (normalizedGroup === 4) {
                        // NL3 (2026/1/1〜): 終末技EGは難度価値点と同じ、ただし最大0.5
                        const dismountScore = Math.min(highestValue, 0.5);
                        groupScore += dismountScore;
                        console.log(`  Added ${dismountScore} for Group IV (dismount, capped at 0.5 per NL3)`);
                    } else {
                        const score = highestValue >= 0.4 ? 0.5 : 0.3; // D難度以上で+0.5、A-C で+0.3
                        groupScore += score;
                        console.log(`  Added ${score} for Group ${normalizedGroup}`);
                    }
                    break;
                case 'SR': // つり輪
                    if (normalizedGroup === 1) {
                        groupScore += 0.5; // A難度以上で+0.5
                        console.log(`  Added 0.5 for Group I`);
                    } else if (normalizedGroup === 4) {
                        // NL3 (2026/1/1〜): 終末技EGは難度価値点と同じ、ただし最大0.5
                        const dismountScore = Math.min(highestValue, 0.5);
                        groupScore += dismountScore;
                        console.log(`  Added ${dismountScore} for Group IV (dismount, capped at 0.5 per NL3)`);
                    } else {
                        const score = highestValue >= 0.4 ? 0.5 : 0.3; // D難度以上で+0.5、A-C で+0.3
                        groupScore += score;
                        console.log(`  Added ${score} for Group ${normalizedGroup}`);
                    }
                    break;
                case 'PB': // 平行棒
                    if (normalizedGroup === 1) {
                        groupScore += 0.5; // A難度以上で+0.5
                        console.log(`  Added 0.5 for Group I`);
                    } else if (normalizedGroup === 4) {
                        // NL3 (2026/1/1〜): 終末技EGは難度価値点と同じ、ただし最大0.5
                        const dismountScore = Math.min(highestValue, 0.5);
                        groupScore += dismountScore;
                        console.log(`  Added ${dismountScore} for Group IV (dismount, capped at 0.5 per NL3)`);
                    } else {
                        const score = highestValue >= 0.4 ? 0.5 : 0.3; // D難度以上で+0.5、A-C で+0.3
                        groupScore += score;
                        console.log(`  Added ${score} for Group ${normalizedGroup}`);
                    }
                    break;
                case 'HB': // 鉄棒
                    if (normalizedGroup === 1) {
                        groupScore += 0.5; // A難度以上で+0.5
                        console.log(`  Added 0.5 for Group I`);
                    } else if (normalizedGroup === 4) {
                        // NL3 (2026/1/1〜): 終末技EGは難度価値点と同じ、ただし最大0.5
                        const dismountScore = Math.min(highestValue, 0.5);
                        groupScore += dismountScore;
                        console.log(`  Added ${dismountScore} for Group IV (dismount, capped at 0.5 per NL3)`);
                    } else {
                        const score = highestValue >= 0.4 ? 0.5 : 0.3; // D難度以上で+0.5、A-C で+0.3
                        groupScore += score;
                        console.log(`  Added ${score} for Group ${normalizedGroup}`);
                    }
                    break;
            }
        }
    });
    
    console.log(`=== GROUP SCORE RESULT ===`);
    console.log(`Final group score: ${groupScore}`);
    console.log(`Group counts:`, egCounts);
    console.log(`=== END GROUP SCORE ===`);
    
    return groupScore;
}

// 総合スコア更新
function updateTotalScores() {
    let totalDScore = 0;
    let totalEScore = 0;
    let totalND = 0;
    
    const apparatusList = ['FX', 'PH', 'SR', 'VT', 'PB', 'HB'];
    
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
        const eScoreInput = document.getElementById(`${apparatus.toLowerCase()}-e-score-input`);
        if (eScoreInput) {
            totalEScore += parseFloat(eScoreInput.value) || 8.5;
        }
        
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
        'FX': 'ゆか',
        'PH': 'あん馬', 
        'SR': 'つり輪',
        'VT': '跳馬',
        'PB': '平行棒',
        'HB': '鉄棒'
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
        const eScore = eScoreInput ? parseFloat(eScoreInput.value) || 8.5 : 8.5;
        
        let skillND = 0;
        let otherND = 0;
        let targetScore = 0;
        
        if (apparatus === 'VT') {
            // 跳馬の場合は特別処理
            const vaultScoreElement = document.getElementById('vt-vault-score');
            const vaultDScore = vaultScoreElement ? parseFloat(vaultScoreElement.textContent) || 0 : 0;
            otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
            targetScore = Math.max(0, vaultDScore + eScore - otherND);
        } else {
            // 通常の種目（組み合わせ加点を考慮）
            skillND = skillNDElement && skillNDElement.textContent !== '0.0' ? 
                parseFloat(skillNDElement.textContent.replace('-', '')) || 0 : 0;
            otherND = otherNDInput ? parseFloat(otherNDInput.value) || 0 : 0;
            
            // 目標スコア計算: D + E - ND（Dスコアには既に組み合わせ加点が含まれている）
            targetScore = Math.max(0, dScore + eScore - skillND - otherND);
            
            // ゆかのサマリー計算デバッグ
            if (apparatus === 'FX') {
                console.log(`=== FLOOR SUMMARY CALCULATION ===`);
                console.log(`dScore (from DOM, includes connection): ${dScore}`);
                console.log(`eScore: ${eScore}`);
                console.log(`skillND: ${skillND}`);
                console.log(`otherND: ${otherND}`);
                console.log(`Calculated targetScore: ${targetScore}`);
                console.log(`================================`);
            }
        }
        
        const totalND = skillND + otherND;
        
        html += `
            <div style="background: rgba(255,255,255,0.2); padding: 3px 4px; border-radius: 3px; text-align: center; border: 1px solid rgba(255,255,255,0.3); min-width: 45px;">
                <div style="font-weight: bold; margin-bottom: 1px; font-size: 0.8em;">${apparatusNames[apparatus]}</div>
                <div style="display: flex; gap: 2px; justify-content: center; margin-bottom: 1px; font-size: 0.65em;">
                    <span>D${dScore.toFixed(1)}</span>
                    <span>E${eScore.toFixed(1)}</span>
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
    
    // 種目別要求項目（2025-2028年ルールに基づく）
    switch (apparatus) {
        case 'FX': // ゆか
            requirements = [
                { name: 'EG Ⅰ（跳躍技以外の技）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'EG Ⅱ（前方系の跳躍技）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'EG Ⅲ（後方系の跳躍技）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'EG Ⅳ（1回以上のひねりを伴う1回宙返り技）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '2回（3回）宙返り系の終末技', required: 1, actual: (() => {
                    const checkbox1 = document.getElementById('fx-dismount-check');
                    const checkbox2 = document.getElementById('fx-dismount-requirement-check');
                    const isChecked = (checkbox1 && checkbox1.checked) || (checkbox2 && checkbox2.checked);
                    return isChecked ? 1 : 0;
                })() },
                { name: '最大技数8技', required: 8, actual: Math.min(validSkills.length, 8) },
                // NL1/NL3 追加要求項目
                { name: 'NL1: アクロバット技で演技開始（不備= -0.3 ND）', manualCheck: 'fx-acro-start-check', stateKey: 'acroStart', checked: fxNLState.acroStart },
                { name: 'NL1: バランスまたは跳躍技の実施（不備= -0.3 ND）', manualCheck: 'fx-balance-check', stateKey: 'balanceJump', checked: fxNLState.balanceJump },
                { name: 'NL1/NL3: 各コーナー移動が異なる（不備= -0.3 ND）', manualCheck: 'fx-corners-check', stateKey: 'cornerTransitions', checked: fxNLState.cornerTransitions }
            ];
            break;
        case 'PH': // あん馬
            requirements = [
                { name: 'EG Ⅰ（片足振動技・交差技）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'EG Ⅱ（旋回・旋回倒立・転向技）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'EG Ⅲ（旋回移動・転向移動技）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'EG Ⅳ（終末技）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '最大技数8技（7技+終末技）', combined: { main: validSkills.length - egCounts['Ⅳ'], mainLimit: 7, sub: egCounts['Ⅳ'], subLimit: 1 } }
            ];
            break;
        case 'SR': // つり輪
            requirements = [
                { name: 'EG Ⅰ（振動・振動倒立技）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'EG Ⅱ（力技・静止技）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'EG Ⅲ（振動からの静止技）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'EG Ⅳ（終末技）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '振動倒立技', required: 1, actual: (() => {
                    const checkbox = document.getElementById('sr-handstand-check');
                    return checkbox ? (checkbox.checked ? 1 : 0) : 0;
                })() },
                { name: '最大技数8技（7技+終末技）', combined: { main: validSkills.length - egCounts['Ⅳ'], mainLimit: 7, sub: egCounts['Ⅳ'], subLimit: 1 } }
            ];
            break;
        case 'PB': // 平行棒
            requirements = [
                { name: 'EG Ⅰ（腕支持振動技）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'EG Ⅱ（両棒での支持技）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'EG Ⅲ（長懸垂・逆懸垂振動技）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'EG Ⅳ（終末技）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '最大技数8技（7技+終末技）', combined: { main: validSkills.length - egCounts['Ⅳ'], mainLimit: 7, sub: egCounts['Ⅳ'], subLimit: 1 } }
            ];
            break;
        case 'HB': // 鉄棒
            requirements = [
                { name: 'EG Ⅰ（懸垂振動技）', required: 1, actual: egCounts['Ⅰ'] },
                { name: 'EG Ⅱ（手放し技）', required: 1, actual: egCounts['Ⅱ'] },
                { name: 'EG Ⅲ（バーに近い技）', required: 1, actual: egCounts['Ⅲ'] },
                { name: 'EG Ⅳ（終末技）', required: 1, actual: egCounts['Ⅳ'] },
                { name: '最大技数8技（7技+終末技）', combined: { main: validSkills.length - egCounts['Ⅳ'], mainLimit: 7, sub: egCounts['Ⅳ'], subLimit: 1 } }
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
        } else if (req.manualCheck) {
            // NL1/NL3 手動チェック項目（fxNLState で管理）
            reqDiv.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px;">
                    <input type="checkbox" id="${req.manualCheck}"
                           onchange="updateFXNLState('${req.stateKey}', this.checked)"
                           style="transform: scale(1.1); margin-right: 4px;"
                           ${req.checked ? 'checked="checked"' : ''}>
                    <span style="font-size: 0.9em; color: #555;">${req.name}</span>
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
    const dScoreInput = document.getElementById('vt-d-score');
    const totalScoreDisplay = document.getElementById('vt-total-score');
    const vaultScoreDisplay = document.getElementById('vt-vault-score');
    
    const skillName = skillNameInput ? skillNameInput.value.trim() : '';
    const dScore = dScoreInput ? parseFloat(dScoreInput.value) || 0 : 0;
    
    console.log(`calculateVaultScore called: name="${skillName}", score=${dScore}`);
    
    // 跳馬のデータを保存（有効なデータがある場合のみ）
    if (skillName.trim() !== '' || dScore > 0) {
        currentRoutines.VT = [{
            name: skillName || '未入力',
            difficulty: '',
            elementGroup: '',
            value: dScore
        }];
        console.log('Vault data saved to currentRoutines:', currentRoutines.VT);
    } else {
        console.log('Skipping vault data save - empty values');
    }
    
    if (skillName || dScore > 0) {
        historyManager.takeSnapshot(`Vault: ${skillName} (${dScore})`);
    } else {
        historyManager.takeSnapshot('Vault: Clear');
    }
    
    // 目標Eスコア取得
    const eScoreInput = document.getElementById('vt-e-score-input');
    const eScore = eScoreInput ? parseFloat(eScoreInput.value) || 8.5 : 8.5;
    
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
        
        // 復元後に全種目のスコアを再計算
        const apparatusList = ['FX', 'PH', 'SR', 'VT', 'PB', 'HB'];
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
        displayCurrentRoutine('FX');
        
        // 初回読み込み時：ゆかのその他NDを0.3に設定
        const fxOtherNDInput = document.getElementById('fx-other-nd-input');
        if (fxOtherNDInput) {
            fxOtherNDInput.value = '0.3';
            // 初期計算も実行
            setTimeout(() => calculateScore('FX'), 100);
        }
        
        // 初回読み込み時：つり輪のその他NDを0.3に設定（振動倒立技を満たしていない前提）
        const srOtherNDInput = document.getElementById('sr-other-nd-input');
        if (srOtherNDInput) {
            srOtherNDInput.value = '0.3';
            setTimeout(() => calculateScore('SR'), 100);
        }
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
        
        console.log('Application initialized with localStorage support');
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
        
        // createReportContent関数が存在するかチェック
        if (typeof window.createReportContent === 'function') {
            window.createReportContent(title, name);
            const reportContent = document.getElementById('report-content');
            
            if (reportContent && preview) {
                preview.innerHTML = reportContent.innerHTML;
                console.log('Preview updated successfully');
            } else {
                console.error('Missing elements - reportContent:', reportContent, 'preview:', preview);
            }
        } else {
            console.error('createReportContent function not found');
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
window.updateFXNLState = updateFXNLState;
window.fxNLState = fxNLState;