// ゆかの技データ
const FLOOR_SKILLS = 
[
  {
    "name": "倒立から下ろして開脚前挙支持(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "倒立から下ろして脚前挙支持(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "脚上挙支持(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "脚上挙支持(脚が水平,2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "マンナ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "立位から伸腕屈身開脚力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "開脚シンピ",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "伸腕屈身閉脚力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "屈腕伸身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "閉脚シンピ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "脚上挙支持(2秒)から伸腕屈身閉脚力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "脚上挙支持(2秒)から伸腕屈身開脚力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "マンナ(2秒)から伸腕屈身閉脚力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "マンナシンピ",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "正面支持臥から勢いをつけて屈腕伸身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "開脚座から伸腕屈身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "脚前挙支持から伸腕屈身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚前挙支持から伸腕屈身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前後シンピ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "臥シンピ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "マンナ(2秒)から肩転位して倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "立位から伸腕屈身力十字倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "倒立から下ろして十字倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後転から十字倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚座から伸腕屈身力十字倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "開脚水平支持(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "水平支持(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "中水平支持(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "倒立ひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "倒立1回ひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "1回ひねり(1/2)ひねり倒立",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "開脚水平支持(2秒)から伸腕伸身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "水平支持(2秒)から伸腕伸身力倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "中水平支持(2秒)から伸腕伸身力十字倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "アルバリーニョ",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "脚前挙などから後方回転開脚立ち",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前転開脚前挙支持経過倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚エンドーロール",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前転脚上挙支持経過倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "閉脚エンドーロール",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前方倒立回転",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前後開脚座",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "左右開脚座",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "片足平均立ち(2秒)",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "水平バランス",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "Y字バランス",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "脚を保持しない180°開脚片足平均立ち(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろとび正面支持臥",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後ろとび屈身正面支持臥",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろとび伸身正面支持臥",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "エンドー",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "バタフライ",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "バタフライ1回ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後方バタフライ1回ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "トンフェイ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "バタフライ2回ひねり",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "閉脚旋回",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "開脚旋回",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "閉脚旋回倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚旋回倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚旋回倒立、下ろして開脚旋回",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "閉脚旋回倒立、下ろして閉脚旋回",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ゴゴラーゼ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回とび1回ひねり倒立、開脚旋回",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "倒立から下ろして開脚旋回",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "倒立から下ろして閉脚旋回",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚旋回ひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "開脚旋回1回ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚旋回270°以上ひねり直接倒立",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "開脚旋回ひねり倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "開脚旋回270°以上ひねり直接倒立、下ろして開脚旋回",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "開脚旋回270°以上ひねり直接倒立、下ろして閉脚旋回",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "ロシアン360°転向",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "ロシアン540°転向",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "ロシアン720°転向",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ロシアン900°転向",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ロシアン1080°以上転向",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "フェドルチェンコ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後転倒立ひねり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後転倒立とび1回ひねり",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前転とび",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "両足踏み切り前転とび",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "転回",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "テンカイ",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前転とび直接前方かかえ込み宙返り",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "モランディ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "伸身前とび前転",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前方かかえ込み宙返り",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前宙",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前方かかえ込み宙返りひねり",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前宙ハーフ",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前方屈身宙返り",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈身前宙",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前方屈身宙返りひねり",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈身前宙ハーフ",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前方伸身宙返り",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "伸身前宙",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方伸身宙返りひねり",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "伸身前宙ハーフ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方かかえ込み２回宙返り",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方ダブル",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方かかえ込み２回宙返りひねり",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方ダブルハーフ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方屈身2回宙返り",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方屈身ダブル",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方屈身2回宙返りひねり",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方屈身ダブルハーフ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方かかえ込み2回宙返り1回ひねり",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "前方かかえ込み宙返り正面支持臥",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方屈身宙返り正面支持臥",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方かかえ込み2回宙返り3/2ひねり",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ザパタ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "前とびひねり後方かかえ込み2回宙返り",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "デファー",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方伸身2回宙返り3/2ひねり",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "前方屈身2回宙返り3/2ひねり",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "ザパタ2",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "後方かかえ込み宙返り",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方屈身宙返り",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返り",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "テンポ宙返り",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後方かかえ込み2回宙返り",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方ダブル",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方かかえ込み2回宙返り1回ひねり",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後ろとびひねり前方かかえ込み2回宙返り",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後ろとびひねり前方かかえ込み2回宙返りひねり",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ツカハラ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ムーンサルト",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後方かかえ込み2回宙返り2回ひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ルドルフ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方かかえ込み2回宙返り3/2ひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ムーンサルトハーフ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方伸身宙返り3/2ひねり前方かかえ込み宙返り",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "コロステリエフ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方かかえ込み2回宙返り3回ひねり",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "リ・ジョンソン",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "後方かかえ込み宙返りひねり(後ろとびひねりからも含む)",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方屈身宙返りひねり(後ろとびひねりからも含む)",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返りひねり(後ろとびひねりからも含む)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後ろとびひねり前方屈身2回宙返り",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後ろとびひねり前方屈身2回宙返りひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方かかえ込み2回宙返り5/2ひねり",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "ルドルフハーフ",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後転とび",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "バク転",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方屈身2回宙返り",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後方かかえ込み3回宙返り",
    "elementGroup": "III",
    "difficulty": "I"
  },
  {
    "name": "リューキン",
    "elementGroup": "III",
    "difficulty": "I"
  },
  {
    "name": "後方屈身3回宙返り",
    "elementGroup": "III",
    "difficulty": "J"
  },
  {
    "name": "ナゴルニー",
    "elementGroup": "III",
    "difficulty": "J"
  },
  {
    "name": "側方開脚2回宙返り3/4ひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ロウ・ユン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方伸身2回宙返り5/2ひねり",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "伸身ルドルフハーフ",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "後ろとびひねり前転",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返り1回ひねり即後方屈身宙返り",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方伸身宙返り2回ひねり即後方屈身宙返り",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "コリバノフ",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後方伸身2回宙返り",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方伸身2回宙返りひねり",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後ろとびひねり前方伸身2回宙返り",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "タマヨ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後方伸身2回宙返り3/2ひねり",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "伸身ムーンサルトハーフ",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "後ろとびひねり前方伸身2回宙返り1回ひねり",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "ヒポリト",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "後方伸身2回宙返り1回ひねり",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "伸身ムーンサルト",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後ろとびひねり前方伸身2回宙返りひねり",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "ぺネフ",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後方伸身2回宙返り2回ひねり",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "伸身ルドルフ",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "後方かかえ込み2回宙返り7/2ひねり",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "ミナミ",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "後方伸身2回宙返り3回ひねり",
    "elementGroup": "III",
    "difficulty": "I"
  },
  {
    "name": "シライ3",
    "elementGroup": "III",
    "difficulty": "I"
  },
  {
    "name": "後方伸身2回宙返り7/2ひねり",
    "elementGroup": "III",
    "difficulty": "J"
  },
  {
    "name": "ジャーマン",
    "elementGroup": "III",
    "difficulty": "J"
  },
  {
    "name": "前方かかえ込み宙返り1回ひねり",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "前方かかえ込み宙返り3/2ひねり",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "前方伸身宙返り1回ひねり",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方伸身宙返り3/2ひねり",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方伸身宙返り2回ひねり",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方伸身宙返り5/2ひねり",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "前方伸身宙返り3回ひねり",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "シライ2",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "後方伸身宙返り1回ひねり",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り3/2回ひねり",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方伸身宙返り2回ひねり",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方伸身宙返り5/2ひねり",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方伸身宙返り7/2ひねり",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "ゴンザレス",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "前方伸身宙返り7/2ひねり",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "ゴシマ",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "後方かかえ込み宙返り3/2ひねり",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り3回ひねり",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方伸身宙返り4回ひねり",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "シライ",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "グエン",
    "elementGroup": "IV",
    "difficulty": "F"
  }
];
