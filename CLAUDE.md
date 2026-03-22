# CLAUDE.md - AI開発ガイド

このファイルはClaude Codeがこのプロジェクトで作業する際の参照情報です。

## プロジェクト概要

体操競技Dスコア計算PWAアプリ。2025-2028年FIG採点規則に基づきDスコアを自動計算する。

- **URL**: https://kaito-imadu.github.io/D-score-Calculation/
- **ホスト**: GitHub Pages（静的サイト）
- **ビルドツール**: なし（Vanilla JS / HTML / CSS）

## ファイル構成

```
D-score-Calculation/
├── index.html                    # トップページ（男女選択）
├── men.html                      # 男子体操（6種目）メインページ
├── women.html                    # 女子体操（4種目）メインページ
├── men_gymnastics_d_score.js     # 男子計算ロジック（メインJS）
├── women_gymnastics_d_score.js   # 女子計算ロジック（メインJS）
├── manifest.json                 # PWA マニフェスト
├── sw.js                         # Service Worker（オフライン対応）
├── icon.svg                      # PWAアイコン
├── floor_skills.js               # ゆか技データ（存在しない場合はdemo data使用）
├── pommel_skills.js              # あん馬技データ（存在しない場合はdemo data使用）
├── rings_skills.js               # つり輪技データ（存在しない場合はdemo data使用）
├── parallel_skills.js            # 平行棒技データ（存在しない場合はdemo data使用）
├── highbar_skills.js             # 鉄棒技データ（存在しない場合はdemo data使用）
├── skills_database.js            # 女子技データ（存在しない場合はdemo data使用）
└── README.md
```

**注意**: `*_skills.js` ファイルは現在存在せず、アプリはdemo dataにフォールバックして動作する。

## 採点ルール参照

### MAG（男子体操）- 2025-2028年FIG規則 + Newsletter反映済み

#### Dスコア構成
- **難度点（Difficulty Score）**: 最高8技の難度値合計
  - 7技（終末技以外）+ 終末技1技を計上
  - FX: NL3適用 - ディスマウント最初に計上してから次の7技
  - 各技: A=0.1, B=0.2, C=0.3, D=0.4, E=0.5, F=0.6, G=0.7, H=0.8, I=0.9, J=1.0
- **グループ点（Element Group Score）**: 各EGから最高難度技でスコア
  - EG I: 常に+0.5
  - EG II, III: D難度以上→+0.5、A-C難度→+0.3
  - **EG IV (終末技)**: 難度価値と同じ、**ただし最大0.5（NL3: 2026/1/1〜）**
    - FXのみ旧ルール（0.5上限なし）

#### 種目別EGグループ
| 種目 | EG I | EG II | EG III | EG IV |
|------|------|-------|--------|-------|
| FX | 跳躍技以外 | 前方系跳躍 | 後方系跳躍 | ひねりを伴う1回宙返り |
| PH | 片足振動・交差 | 旋回・倒立 | 旋回移動 | 終末技 |
| SR | 振動・倒立 | 力技・静止 | 振動からの静止 | 終末技 |
| PB | 腕支持振動 | 両棒支持 | 長懸垂・逆懸垂 | 終末技 |
| HB | 懸垂振動 | 手放し技 | バーに近い技 | 終末技 |

#### FX 特別要件ND（NL1/NL3）
`fxNLState` オブジェクトで管理（`men_gymnastics_d_score.js` グローバル）:
- `acroStart`: アクロバット技で演技開始（不備=0.3ND）
- `balanceJump`: バランスまたは承認済み跳躍技の実施（不備=0.3ND）
- `cornerTransitions`: 各コーナー移動技が異なること（不備=0.3ND、2026/1/1〜）

### WAG（女子体操）- 2025-2028年FIG規則 + NL1反映済み

#### 構成要求（CR）- チェックボックス方式
各種目4項目（各+0.5）をユーザーが手動チェック
- **UB CR1**: 手放し技
- **FX CR1**: ダンス系列（大きく流れる移動パターン、停止・ポーズ禁止 ※NL1）
- 終末技: D難度以上でボーナス+0.2（FX/UB/BB）

#### ルール切り替え
- `currentRule`: `'standard'`（国際）または `'alteration1'`（日本国内）
- 技数ND・Eスコア上限が変わる

## 主要関数（男子）

```javascript
calculateScore(apparatus)      // メイン計算関数
calculateDifficultyScore(apparatus, validSkills)  // 難度点計算
calculateGroupScore(apparatus, validSkills)        // グループ点計算
updateRequirements(apparatus, validSkills)          // 要求項目UI更新
updateFXNLState(key, checked)  // FX NL1/NL3チェック状態更新
updateDismountND(apparatus)    // FX終末技ND更新（other-nd-inputを変更）
updateHandstandND(apparatus)   // SR振動倒立技ND更新
switchApparatus(apparatus)     // 種目切り替え
```

## 主要関数（女子）

```javascript
calculateScore(apparatus)      // メイン計算関数
calculateCompositionScore(apparatus) // 構成要求点計算
switchRule(rule)               // ルール切り替え
```

## データ保存

LocalStorage使用:
- `men_gymnastics_d_score_data`: 男子データ（routines, apparatus, connectionScores, otherNDs, eScores, fxNLState）
- `women_gymnastics_d_score_data`: 女子データ

## PWA構成

- **manifest.json**: アプリ名・アイコン・テーマカラー・ショートカット定義
- **sw.js**: キャッシュファースト戦略（`d-score-calc-v2`）
  - 外部リソース（AdSense, html2canvas）はキャッシュ除外
  - バックグラウンド更新対応

## ニュースレター更新時の作業手順

1. FIG公式サイト（gymnastics.sport）またはfig-docs.comでNLを確認
2. 計算ルール変更 → `men_gymnastics_d_score.js` / `women_gymnastics_d_score.js` を更新
3. 新命名技 → 対応する `*_skills.js` ファイルに追加（ファイルが存在しない場合は作成）
4. UI変更 → `men.html` / `women.html` を更新
5. SW更新 → `sw.js` の `CACHE_NAME` バージョンをインクリメント
6. `README.md` の更新履歴・ニュースレター反映表を更新

## 注意事項

- ビルドプロセスなし。変更は即座にgit pushで反映される
- `sw.js` の `CACHE_NAME` を変更しないとユーザーが古いキャッシュを使い続ける
- 技データベースファイルが存在しない場合、デモデータで動作する（技の自動補完が効かない）
- `men.html` / `women.html` は非常に大きなファイル（2000+行）。編集時は対象箇所を特定してから変更する
