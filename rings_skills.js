// つり輪の技データ
const RINGS_SKILLS = 
[
  {
    "name": "前振り上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "支持後ろ振り、前に回りながら懸垂",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前ロール",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前振り上がり支持前方回転振り出し懸垂後ろ振り",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ケキ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ほん転逆上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後方車輪倒立経過",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "伸腕ほん転逆上がり倒立経過",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後方かかえ込み2回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "グチョギー",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後方屈身2回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "後方伸身2回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "オニール",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "後方屈身懸垂回転",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後方伸身懸垂回転",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "ディスロー",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後ろ振り上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前方車輪倒立経過",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がり倒立経過",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前方屈身懸垂回転",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前方伸身懸垂回転",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "クーゲル",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前方ほん転逆上がり支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ホンマ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前方伸身ほん転逆上がり支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "懸垂からゆっくりと肩転位",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "肩転位",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前方かかえ込み２回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ヤマワキ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前方かかえ込み2回宙返り懸垂（※）",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ヤマワキ（※）",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前方屈身2回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前方伸身2回宙返り懸垂",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ジョナサン",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前方屈身2回宙返り懸垂（※）",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "前方伸身2回宙返り懸垂（※）",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "ジョナサン（※）",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "け上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後方屈腕け上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後方伸腕け上がり支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "支持前振出し懸垂後ろ振り",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "支持後ろ振り前方屈身宙返り支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "屈腕屈身逆上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "屈腕伸身逆上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "十字懸垂から屈腕屈身逆上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "十字懸垂から屈腕伸身逆上がり支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後方屈腕け上がり倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後方屈腕伸身支持回転倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後方車輪倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ほん転逆上がり倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ほん転倒立",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前方車輪倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がり倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "支持後ろ振り倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ホンマ支持後ろ振り倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "伸身ホンマ支持後ろ振り倒立(2秒)",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "開脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "脚上挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ヒロンデル",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "上向き中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "正面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "脚上挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "開脚水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "脚上挙十字懸垂から引き上げ脚上挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ツカハラ3",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "懸垂から伸腕で引き上げ脚上挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "コラック",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "屈腕屈身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈腕屈身開脚力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈腕シンピ",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈腕伸身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "伸腕屈身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "伸腕屈身開脚力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "開脚水平から伸腕伸身力倒立",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "支持から伸腕伸身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "水平支持から伸腕伸身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "中水平から伸腕伸身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゆっくりと前方屈腕屈身支持回転",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "ゆっくりと前方屈腕伸身支持回転",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "ゆっくりと伸腕伸身逆上がり脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "ゆっくりと前方伸腕伸身支持回転十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ゆっくりと前方伸腕伸身支持回転脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "屈腕引き上げ背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "伸腕引き上げ背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "伸腕伸身逆上がり十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "伸腕伸身逆上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "アザリアン",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "伸腕伸身逆上がり脚上挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "タイ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "十字懸垂から背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "脚前挙十字懸垂から背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "懸垂から引き上げ脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "背面水平懸垂経過十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "背面水平懸垂経過脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ナカヤマ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "背面水平懸垂経過脚上挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "グ・キュウ・チャン",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "背面水平懸垂経過伸腕伸身引き上げ上向き中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ザフラン",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "倒立から中水平を経過して背面水平懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "支持から伸腕で下して懸垂、引き上げ十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "十字懸垂から伸腕で下して懸垂、引き上げ十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "リー・シャオシュン",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "懸垂から伸腕で引き上げ十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "懸垂から伸腕で引き上げ脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "水平支持からゆっくり下ろして背面水平懸垂経過引き上げ水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "水平支持からゆっくり下ろして背面水平懸垂経過引き上げ中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "中水平支持からゆっくり下ろして背面水平経過引き上げ水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "バンゲルダー",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "懸垂から伸腕で引き上げ上向き中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "タロック2",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "倒立からゆっくり伸腕で十字倒立経過逆懸垂",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "中水平支持から押し上げ水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "中水平支持からゆっくり背面水平懸垂経過中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "背面水平懸垂から引き上げ中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "背面水平懸垂から引き上げ水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ザネッティ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "十字懸垂から引き上げ脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "脚前挙十字懸垂から引き上げ脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "脚前挙十字懸垂から伸腕屈身力十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "脚前挙十字懸垂から伸腕伸身力十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "十字懸垂から伸腕伸身力十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "中水平支持から伸腕伸身力十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "十字懸垂から引き上げ水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "十字懸垂から伸腕伸身中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "背面水平懸垂経過引き上げ十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "カルモナ",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "十字倒立からゆっくり下ろして逆懸垂経過伸腕伸身逆上がり十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "十字倒立からゆっくり下ろして逆懸垂経過伸腕伸身逆上がり脚上挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ボロビオフ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゾウ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "十字倒立からゆっくり下ろして逆懸垂経過伸腕伸身逆上がり中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ヨブチェフ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "十字倒立からゆっくり下ろして逆懸垂経過伸腕伸身逆上がり水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ゆっくりと後方伸腕伸身逆上がり水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ヤン・ミンヨン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ゆっくりと後方伸腕伸身逆上がり中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ゆっくりと後方伸腕伸身逆上がり十字倒立",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "シーモノフ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ゆっくりと前方伸腕伸身支持回転十字懸垂経過水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "グ・キュウ・チャン2",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゆっくりと伸腕伸身で前に回り十字懸垂経過十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ウィン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "伸腕逆上がり十字懸垂経過上向き中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "タロック",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ゆっくりと伸身で前に回り十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゆっくりと伸身で前に回り脚前挙十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゆっくりと伸身で前に回り十字懸垂(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ダフチャン",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゆっくりと伸身で前に回り十字懸垂経過中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ファム2",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "懸垂から伸腕伸身力倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "チンゴラーニ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "懸垂から伸腕伸身中水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "バランディン1",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "懸垂から伸腕伸身水平支持(2秒)",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "バランディン3",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "懸垂から伸腕伸身十字倒立(2秒)",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "バランディン2",
    "elementGroup": "II",
    "difficulty": "G"
  },
  {
    "name": "前振り上がり脚前挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "前振り上がり脚上挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "け上がり脚前挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "け上がり脚上挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ホンマ脚前挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "ホンマ脚上挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "グラシア",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ホンマ十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ホンマ脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "伸身ホンマ十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "伸身ホンマ脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ホンマ脚上挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "タナカ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "支持後ろ振り前方屈身宙返り直接十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "支持後ろ振り前方屈身宙返り直接脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "前振り上がり十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "前振り上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がり十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "け上がり十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "け上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "け上がり脚上挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "モリナリ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "け上がり上向き中水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後方け上がり十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方け上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方け上がり水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後方け上がり中水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ほん転逆上がり、脚を腕の上に乗せた開脚前挙支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "デルチェフ",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後方け上がり十字倒立(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ほん転逆上がり開脚水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "ほん転逆上がり十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ほん転逆上がり脚前挙十字懸垂(2秒)",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ほん転逆上がり水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ほん転逆上がり中水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "前振り上がり上向き中水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "ロドリゲス",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "ほん転逆上がり十字倒立(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後ろ振り上がり開脚水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がり水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り上がり中水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "後ろ振り上がり十字倒立(2秒)",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "伸身逆上がり水平支持(2秒)",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "前方屈身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方伸身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方屈身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方伸身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方屈身宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "前方伸身宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "前方屈身宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方伸身宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方屈身宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方伸身宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方かかえ込み2回宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方かかえ込み2回宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方かかえ込み2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "フィッシャー",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方屈身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方屈身2回宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "バラバノフ",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方屈身2回宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "前方屈身2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "後方屈身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方屈身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方伸身宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方伸身宙返り3回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "後方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方屈身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方かかえ込み3回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "後方屈身3回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "I"
  },
  {
    "name": "ウィッテンバーグ",
    "elementGroup": "IV",
    "difficulty": "I"
  },
  {
    "name": "後方かかえ込み2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "ムーンサルト",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方かかえ込み2回宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方かかえ込み2回宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "ルドルフ",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "後方かかえ込み2回宙返り5/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "トゥーハ",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "ルドルフハーフ",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "後方伸身宙返り1回ひねり後方かかえ込み宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方伸身2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "伸身ムーンサルト",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方伸身2回宙返り1/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方伸身2回宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "伸身ルドルフ",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "後方伸身2回宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "F"
  }
];
