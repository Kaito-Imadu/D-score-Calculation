// あん馬の技データ
const POMMEL_SKILLS = 
[
  {
    "name": "正交差",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "セア",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "正交差横移動",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "とびセア",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "正交差横移動ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "とびセアひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "正交差とび横移動(馬端〜馬端)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "セアひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "正交差ひねり逆交差入れ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "Bセア",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "正交差横移動ひねり逆交差入れ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "Cセア",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "正交差とび横移動ひねり逆交差入れ(馬端〜馬端)",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "ミクラック",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "正交差倒立横移動ひねり逆交差入れ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ステパンヤン",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "開脚支持から後ろ抜き倒立、下ろして開脚支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "正交差ひねり一把手上倒立経過、逆交差入れ",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "リーニン",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "ブライアン",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "逆交差",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "バックセア",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "逆交差横移動",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "とびバックセア",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "逆交差横移動ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "とびバックセアひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "逆交差とび横移動(馬端〜馬端)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "逆交差ひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "バックセアひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "逆交差ひねり逆交差入れ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚支持後ろ振り一把手上倒立経過、逆交差入れ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "横向き旋回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "横向き開脚旋回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "トーマス",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "両把手を挟んで横向き旋回",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "あん部馬背横向き旋回",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "馬端中向き縦向き旋回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "縦向き旋回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "一把手上縦向き旋回",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一把手上縦向き旋回1/4転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "ループ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "馬端外向き縦向き旋回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "あん部馬背縦向き旋回",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "旋回1/4ひねり",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "旋回ひねり",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "ケイハ2",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一把手を挟んで横向き旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "一把手を挟んで横向き開脚旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "シュピンデル",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "横向き旋回1回ひねり移動(2回以内の旋回で逆馬端へ移動し再び戻る)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "横向き開脚旋回1回ひねり移動(2回以内の旋回で逆馬端へ移動し再び戻る)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "アイヒホルン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "両把手を挟んで旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "両把手を挟んで開脚旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ケイハ1",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ケイハ5",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "馬端旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "マジャール(※)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "両把手上開脚旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ベルキ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "あん部馬背縦向き旋回1回ひねり(2回以内の旋回で)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "シュテクリA",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "DSA",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "Aシュテ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "両把手を挟んでシュテクリA",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ケイハ3",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ケイハ6",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "シュテクリB",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "DSB",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "Bシュテ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "旋回倒立ひねり、下ろして旋回",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "旋回倒立ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回倒立ひねり、下ろして旋回",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回倒立ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ティッペルト",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "開脚背面とび横移動倒立経過、下ろして旋回",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "開脚背面とび横移動倒立経過、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "下向き逆移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "DSA倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "一把手上旋回倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ブスナリ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "上向き転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "リア",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "一腕上上向き270°転向(縦向き〜横向き)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一腕上上向き270°転向(横向き〜縦向き)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ベルトンチェリ",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "一腕上上向き全転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ショーン",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "メリーゴーランド",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "直接トラムロー",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "下向き逆移動",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "逆リア",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一腕上下向き270°転向(縦向き〜横向き)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一腕上下向き270°転向(横向き〜縦向き)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ダフチャン",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "逆トンチェリ",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "一腕上下向き全転向",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ベズゴ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "馬端下向き転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "馬端フクガ",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上下向き転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一把手を挟んで下向き転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "フクガ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "両把手を挟んで下向き転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ピネーロ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "下向き正転向移動",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上ロシアン180°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上ロシアン270°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上ロシアン360°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上ロシアン540°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "把手上ロシアン720°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "把手上ロシアン900°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "把手上ロシアン1080°以上転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "馬端馬背ロシアン180°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン270°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン360°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン540°転向",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン720°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "馬端馬背ロシアン900°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "馬端馬背ロシアン1080°以上転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "一把手上ロシアン180°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一把手上ロシアン270°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "あん部馬背ロシアン180°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "あん部馬背ロシアン270°転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "一把手上ロシアン360°転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "一把手上ロシアン540°転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "あん部馬背ロシアン360°転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "あん部馬背ロシアン540°転向",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "一把手上ロシアン720°転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "一把手上ロシアン900°転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "あん部馬背ロシアン720°転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "あん部馬背ロシアン900°転向",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "一把手上ロシアン1080°以上転向",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "あん部馬背ロシアン1080°以上転向",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "Dフロップ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "Eフロップ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "Fフロップ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "Dコンバイン",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "Eコンバイン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "Fコンバイン",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "Gコンバイン",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "Hコンバイン",
    "elementGroup": "II",
    "difficulty": "H"
  },
  {
    "name": "ベルトンチェリから直接DSA倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "下向き逆移動直接背面とび横移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "DSA直接背面とび横移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "ルース3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "イェッセン3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "旋回倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "開脚旋回倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "旋回背面とび横移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "開脚旋回背面とび横移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "馬端から反対の馬端へロシアン180°転向移動倒立3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "ペルラン3/3部分移動1回ひねり、下ろして開脚旋回",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "横移動(1/3部分)",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "横移動1/4ひねり(1/3部分)",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "イコウ",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "横移動(3/3：馬端－把手－把手－馬端)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "横移動(3/3：馬端－あん部馬背－馬端)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "横移動(3/3：馬端－馬端)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "とび横移動(1/3部分)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "とびイコウ",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "とび横移動(3/3：馬端－両把手－馬端)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "背面とび横移動(馬端馬背－馬端馬背)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ヤマワキ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "縦向き前移動1/4ひねり両把手横向き支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "縦向き後ろ移動1/4ひねり両把手横向き支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "全ての旋回移動ひねり",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "正面横移動ひねり、背面横移動ひねり(馬端〜馬端)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "一把手を越えて縦向き3/3移動ひねり",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "一把手を越えて横向き3/3移動ひねり",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ニンレイズ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ティトフ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "両把手を越えて縦向き3/3移動ひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ニンレイズ2",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ケイハ4",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "開脚旋回3/3移動1回ひねり(2回の旋回以内で)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ウルジカ2",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "バークハート",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "縦向き前移動(2/3部分)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "縦向き前移動(1/2部分)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "B前",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "縦向き前移動(3/3：馬端－把手－把手－馬端)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "縦向き前移動(3/3：馬端－把手－あん部馬背－把手－馬端)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "マジャール",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "縦向き前移動(馬端〜馬端)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "縦向きとび前移動(馬端〜馬端)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ドリッグス",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "縦向き後ろ移動(1/3部分)",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "Aバック",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "縦向き後ろ移動(2/3部分)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "縦向き後ろ移動(1/2部分)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "Bバック",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "半シバ",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "縦向き後ろ移動(3/3：馬端－把手－把手－馬端)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "縦向き後ろ移動(3/3：馬端－把手－あん部馬背－把手－馬端)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "シバド",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "縦向き後ろ移動(馬端－馬端)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "縦向きとび後ろ移動(馬端－馬端)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "クルバノフ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "リード",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "上向き転向、下向き逆移動、上向き転向",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "モギルニー",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "下向き逆移動、上向き転向、下向き逆移動",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ベレンキ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端横向き支持から下向き正転向移動(把手間に着手なしで逆馬端へ、横向き〜横向き)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "馬端横向き支持から下向き正転向移動(把手間に着手なしで逆馬端へ、横向き〜縦向き)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "Cトンフェイ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "馬端馬背支持から下向き正転向移動(馬端〜馬端、把手または把手間に着手なしで、横向き〜横向き)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端馬背支持から下向き正転向移動(馬端〜馬端、把手または把手間に着手なしで、横向き〜縦向き)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端馬背支持から下向き正転向移動(馬端〜馬端、把手または把手間に着手なしで、縦向き〜横向き)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端馬背支持から下向き正転向移動(馬端〜馬端、把手または把手間に着手なしで、縦向き〜縦向き)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "トンフェイ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端縦向き支持から両把手を越えてロシアン360°以上正転向",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "バンメン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "馬端横向き支持からロシアン630°以上転向移動(3/3部分)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "Dゴニアン",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "デゴニアン",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ロシアン720°以上転向移動(1/3部分：あん部馬背へ両手で着手)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ウ・グォニアン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ロシアン360°以上転向移動(3/3部分)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ロス",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "馬端外向き支持から遠い方の把手へ下向き逆移動、一把手上縦向き外向き支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ロメロ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "馬端外向き支持から下向き逆移動で反対の馬端外向き支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "アブ・アル・サウド",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "下向き転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "馬端ロシアン360°転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "馬端ロシアン540°転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "シャギニアン下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "旋回倒立450°以上ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "コリバノフ",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "DSA倒立450°以上3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "馬端馬背ロシアン360°転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン540°転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "馬端馬背ロシアン720°転向下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "馬端馬背ロシアン900°転向下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "馬端ロシアン1080°以上転向下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "両把手から1/4転向、ただちに一把手上ロシアン270°転向倒立下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ドリーゼ",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "下向き正移動下向き転向下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "DSA倒立下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "下向き逆移動倒立下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "一把手上旋回倒立下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "Aシュテ下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "逆リア倒立下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "DSA直接背面とび横移動倒立下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "下向き逆移動直接背面とび横移動倒立下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ルース",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "イェッセン",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "旋回倒立下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "旋回倒立270°ひねり下り(移動の有無に関わらず)",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "旋回背面とび横移動倒立下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "馬端から反対の馬端へロシアン180°転向移動倒立下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ペルラン",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "DSA倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "下向き逆移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ベルトンチェリから直接DSA倒立下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ベルトンチェリから直接DSA倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "ベルトンチェリから直接DSA倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "下向き逆移動直接背面とび横移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "DSA直接背面とび横移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "ルース270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "イェッセン270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "DSA直接背面とび横移動倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "下向き逆移動直接背面とび横移動倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "ルース450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "イェッセン450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "旋回倒立450°  ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "旋回倒立450°  ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回倒立450°  ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回倒立450°  ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "旋回背面とび横移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "開脚旋回背面とび横移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "旋回背面とび横移動倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "開脚旋回背面とび横移動倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "馬端から反対の馬端へロシアン180°転向移動倒立270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "ペルラン270°ひねり2/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "馬端から反対の馬端へロシアン180°転向移動倒立450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "ペルラン450°ひねり3/3部分移動下り",
    "elementGroup": "IV",
    "difficulty": "F"
  }
];
