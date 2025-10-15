// 平行棒の技データ
const PARALLEL_SKILLS = 
[
  {
    "name": "前振り上がり",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "前振り上がり開脚抜き倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前振り上がり開脚抜き懸垂",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ムンテアン",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前振り上がりひねり倒立",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "アームツイスト",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "前振り上がり3/4ひねり単棒倒立",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "前振り上がり1/4ひねり単棒倒立",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "前振り上がり1/4単棒横向き懸垂",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "ほん転ひねり腕支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "前振り上がりカトウ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ワタナベ",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ソラキディス腕支持",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "前振り上がり片腕支持3/4ひねり単棒横向き倒立経過、軸手を換えて片腕支持3/4ひねり支持",
    "elementGroup": "I",
    "difficulty": "G"
  },
  {
    "name": "ソラキディス",
    "elementGroup": "I",
    "difficulty": "G"
  },
  {
    "name": "アームマクーツ",
    "elementGroup": "I",
    "difficulty": "G"
  },
  {
    "name": "ほん転倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ほん転1/4ひねり単棒横向き倒立",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "コフトゥン",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前振り上がり片腕支持1回ひねり倒立",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "リチャード",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "アームディアミドフ",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "前振り上がり片腕支持5/4ひねり単棒横向き倒立経過、1/4ひねり倒立",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "ソラキディス2",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "ほん転開脚入れ腕支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "ほん転開脚入れ支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "前振り上がり後方かかえ込み2回宙返り腕支",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "ドミトリエンコ",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "前振り上がり後方屈身2回宙返り腕支持",
    "elementGroup": "I",
    "difficulty": "G"
  },
  {
    "name": "リー・シャオペン",
    "elementGroup": "I",
    "difficulty": "G"
  },
  {
    "name": "前振り上がり後方かかえ込み宙返りひねり腕支持",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "ハラダ",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "前振り上がり後方かかえ込み宙返りひねり懸垂",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "ダルトン",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "後ろ振り上がり倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がりひねり倒立",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がりとびひねり倒立",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り上がりとび3/4ひねり単棒横向き倒立",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "後ろ振り上がりひねり開脚抜き腕支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がりひねり開脚抜き支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がりひねり支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り上がり前方かかえ込み宙返り腕支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がり屈身宙返り腕支持",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "ヤマワキ",
    "elementGroup": "I",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り上がり前方屈身宙返り支持",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り上がり前方伸身宙返り支持",
    "elementGroup": "I",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り上がり前方かかえ込み2回宙返り腕支持",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "後ろ振り上がり前方宙返り開脚抜き腕支持",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "パクニック",
    "elementGroup": "I",
    "difficulty": "E"
  },
  {
    "name": "後ろ振り上がり前方宙返り開脚抜き懸垂",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "パクニック2",
    "elementGroup": "I",
    "difficulty": "F"
  },
  {
    "name": "後ろ振り上がり開脚入れ屈腕支持",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "屈腕アームカット",
    "elementGroup": "I",
    "difficulty": "A"
  },
  {
    "name": "後ろ振り上がり開脚入れ伸腕支持",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "アームカット",
    "elementGroup": "I",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り倒立",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "屈腕前振り上向きとび転向",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "カトウ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前振りひねり倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前振りひねり単棒倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前振り(後方棒上宙返り)1/4ひねり単棒倒立",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後方棒上宙返り1/4ひねり単棒倒立",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前振り3/4ひねりとび(軸手と反対側の)単棒横向き倒立",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ゼロゼルチェフ",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ピータース",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ディミック",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "脚前挙支持(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "単棒横向き脚前挙支持(2秒)",
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
    "name": "ディアミドフひねり腕支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "サラザール",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前振り片腕支持3/4ひねり単棒横向き倒立経過背面とび懸垂",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "デフレタス",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前振り開脚抜き支持",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前振り開脚抜き倒立",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前振り開脚抜き懸垂",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "バボス",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後ろ振り開脚入れ支持(脚前挙支持：2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "カット",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "前振り片腕支持1回ひねり倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ディアミドフ",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ディアミドフひねり",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ディアミドフ1/4ひねり",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前振り1回ひねり腕支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "カルミニッチ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "マクーツ腕支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前振り片腕支持3/4ひねり単棒倒立経過同軸手で3/4ひねり支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ゾンダーランド腕支持",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前振り片腕支持3/4ひねり単棒倒立経過、軸手を換えて3/4ひねり支持",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "マクーツ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前振り片腕支持5/4ひねり単棒倒立経過、軸手を換えて片腕支持5/4ひねり支持",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ゾンダーランド",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "前振り倒立肩転位支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "カルバロ",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "後方棒上宙返り倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後方棒上宙返り単棒倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後方棒上宙返り開脚入れ支持",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後方棒上宙返りひねり腕支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ツミロビッチ",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後方棒上宙返り単棒倒立※ヒーリー系の技へつなげた場合",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ルンプティス",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後方棒上かかえ込み2回宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "モリスエ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "後方棒上屈身2回宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ファン・リーピン",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "後方棒上かかえ込み宙返りひねり腕支持",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "スアレス",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後方棒上2回宙返りひねり腕支持",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "クアビタ",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "倒立1/4ひねり直ちに片腕支持3/4ひねり支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "倒立3/4ひねり直ちに片腕支持3/4ひねり支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ブランドストローム",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後ろ振りひねり支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り倒立経過ひねり支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ノビコフ",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後ろ振りひねり開脚抜き支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "倒立からヒーリー腕支持",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "単棒倒立からヒーリー腕支持",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "単棒倒立になる振動技(B難度以上)からヒーリー腕支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "倒立から片腕支持1回ひねり支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "単棒倒立から片腕支持1回ひねり支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "ヒーリー",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "単棒倒立になる振動技(B難度以上)からヒーリー支持",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "ベジェナル",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後ろ振りとびひねり倒立",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "後ろ振りとび3/4ひねり倒立",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "後ろ振りとび1回ひねり倒立",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ギャッツン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "後ろ振りとび5/4ひねり倒立経過1/4ひねり倒立",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "ギャッツン2",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "単棒倒立から3/4(1/2)ひねり倒立",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "倒立ひねり",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "倒立ひねり(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "後ろ振り倒立ひねり",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "後ろ振り倒立ひねり(2秒)",
    "elementGroup": "II",
    "difficulty": "A"
  },
  {
    "name": "倒立1回ひねり",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "後ろ振り倒立1回ひねり",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "倒立から前方宙返り支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "倒立から肩転位支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "カルバロ2",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前方宙返り開脚抜き懸垂",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "リー・チョルホン",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ササキ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方かかえ込み宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方屈身宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "B"
  },
  {
    "name": "前方宙返り支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前方宙返り開脚抜き腕支持",
    "elementGroup": "II",
    "difficulty": "D"
  },
  {
    "name": "前方宙返り開脚抜き屈腕支持",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方屈身宙返り懸垂",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "フアレス2",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前方かかえ込み2回宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "前方屈身2回宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "F"
  },
  {
    "name": "前方伸身宙返り腕支持",
    "elementGroup": "II",
    "difficulty": "C"
  },
  {
    "name": "前方宙返り1回ひねり腕支持",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "ウルジカ",
    "elementGroup": "II",
    "difficulty": "E"
  },
  {
    "name": "バブサー腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "バブサー腕屈腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "アルサディ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "倒立から伸膝で振り下ろし懸垂前振り上がり開脚抜き倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ティッペルト",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "チッペルト",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "懸垂前振り上がり開脚抜き伸身かつ水平位で懸垂",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "バブサー",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "懸垂前振り上がり開脚抜きひねり腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "懸垂前振り上がり閉脚抜きひねり腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "倒立から伸膝で振り下ろし懸垂前振り上がり1回ひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ノレット",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "倒立から伸膝で振り下ろし懸垂前振り上がり前方かかえ込み屈身宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "倒立から伸膝で振り下ろし懸垂前振り上がり前方かかえ込み開脚宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ジラルド",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "懸垂前振り上がり支持※膝をまげて懸垂",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "懸垂前振り上がり肩転位支持※膝をまげて懸垂",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "Bモイ",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "懸垂前振り上がり支持※伸膝で懸垂",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "懸垂前振り上がり肩転位支持※伸膝で懸垂",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "モイ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方車輪倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "背面車輪倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方車輪単棒倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "背面車輪単棒倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方車輪1/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "背面車輪1/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方車輪1/2ひねり倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "背面車輪1/2ひねり倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ケンモツ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ウエルス",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "後方車輪単棒縦向き倒立※ヒーリー系の技へつなげた場合",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ピアスキー",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "車輪ディアミドフ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "車輪ディアミドフ単棒倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "車輪ディアミドフひねり",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "車輪ディアミドフ1/4ひねり",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後方伸身宙返り懸垂",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "懸垂前振り後方宙返りひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "グシケン",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "懸垂前振り後方宙返りひねり支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "マリニチ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "車輪ディアミドフ単棒倒立※ヒーリー系の技へつなげた場合",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "車輪マクーツ腕支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "ダウザー",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "車輪マクーツ",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "バウマン",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "後方車輪開脚入れ腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後方車輪開脚入れ支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "コロレフ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "懸垂前振り後方かかえ込み宙返りひねり開脚抜き腕支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ソーサ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "懸垂前振り後方かかえ込み2回宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ベーレ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "屈身ベーレ",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "ベーレ1回ひねり",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "キンテロ",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "棒端懸垂前振り後方宙返りひねり懸垂",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "チャートランド",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "懸垂前振り後方かかえ込み宙返りひねり腕支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "マツナガ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "懸垂前振り後方かかえ込み宙返りひねり懸垂",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ソリス",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "懸垂前振りひねり前方かかえ込み2回宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "タナカ",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "け上がり支持",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "け上がりひねり支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "後方け上がり倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "懸垂前振り後方かかえ込み宙返りひねり支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "トレス",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "懸垂前振りひねり前方屈身2回宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "エスパルサ",
    "elementGroup": "III",
    "difficulty": "H"
  },
  {
    "name": "け上がり開脚抜き両棒倒立",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "け上がり開脚抜き単棒倒立",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "け上がり開脚抜き懸垂",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "オオクボ",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "懸垂前振り後方伸身宙返りひねり腕支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "フォーキン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "単棒横向き開脚浮腰上がり支持経過倒立",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "単棒横向き閉脚浮腰上がり支持経過倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "単棒横向き閉脚浮腰上がり支持経過とび3/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "単棒横向き閉脚浮腰上がり脚上挙支持経過とびひねり反対の棒に懸垂",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "リー・ドンファ",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "棒下振り出し腕支持",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "ピンコ",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "棒下振り出し支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "ピンコ支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "逆上がりひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "棒下宙返りひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "逆上がりひねり支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "棒下宙返りひねり支持",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "棒下振り出しひねり腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "ピンコひねり",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "棒下振り出しひねり支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ピンコひねり支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "逆上がり倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "逆上がり単棒倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "逆上がり1/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "棒下宙返り倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "棒下宙返り単棒倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "棒下宙返り1/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "クシェラ",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "セレン",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "逆上がりひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "逆上がり3/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "棒下宙返りひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "棒下宙返り3/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "逆上がり1回ひねり倒立",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "棒下宙返り1回ひねり倒立",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "テンハイビン",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "棒下振り出し開脚抜き倒立",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "アリカン",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "逆上がり5/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "棒下宙返り5/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "ツォウ・シーション",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "逆上がり懸垂",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "棒下宙返り懸垂",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "逆上がり支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "棒下宙返り支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "逆上がり開脚入れ支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "棒下宙返り開脚入れ支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "逆上がり単棒倒立※ヒーリー系の技へつなげた場合",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "棒下宙返り単棒倒立※ヒーリー系の技へつなげた場合",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "シャルロ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "逆上がり3/4ひねり単棒倒立経過、軸手を変えて3/4ひねり支持",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "棒下宙返り3/4ひねり単棒倒立経過、軸手を変えて3/4ひねり支持",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "ヤマムロ",
    "elementGroup": "III",
    "difficulty": "G"
  },
  {
    "name": "逆上がり、かかえ込み姿勢でひねり腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "棒下宙返り、かかえ込み姿勢でひねり腕支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "ギャニオン",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "逆上がり、伸身姿勢でひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "棒下宙返り、伸身姿勢でひねり腕支持",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "ギャニオン2",
    "elementGroup": "III",
    "difficulty": "C"
  },
  {
    "name": "逆上がり後方かかえ込み宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "棒下宙返り後方かかえ込み宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "テハダ",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "逆上がり後方屈身宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "棒下宙返り後方屈身宙返り腕支持",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "フアレス",
    "elementGroup": "III",
    "difficulty": "F"
  },
  {
    "name": "前方棒下宙返り支持",
    "elementGroup": "III",
    "difficulty": "A"
  },
  {
    "name": "前方棒下宙返りひねり支持",
    "elementGroup": "III",
    "difficulty": "B"
  },
  {
    "name": "横向き逆上がり1/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "D"
  },
  {
    "name": "横向き逆上がりひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "横向き逆上がり3/4ひねり倒立",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "ニューエン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "横向き逆上がり倒立直ちに片腕支持3/4ひねり支持",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "マローン",
    "elementGroup": "III",
    "difficulty": "E"
  },
  {
    "name": "前方屈身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方屈身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方伸身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方伸身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "前方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "前方屈身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "ベルヤフスキー",
    "elementGroup": "IV",
    "difficulty": "F"
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
    "name": "前方屈身宙返り5/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方伸身宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方伸身宙返り5/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "前方かかえ込み2回宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "後ろ振りひねり後方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "前方かかえ込み2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "ラーデュエ",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "棒端前方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "前方屈身2回宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "ダラロヤン",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "後方屈身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方屈身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方伸身宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方宙下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "後方屈身宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方屈身宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り3/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方伸身宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "カン",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り片腕支持ひねり後方かかえ込み宙返り下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後ろ振り片腕支持ひねり後方屈身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "ロースリスバーガー",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "棒端後方かかえ込み2回宙返り",
    "elementGroup": "IV",
    "difficulty": "B"
  },
  {
    "name": "後方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方ダブル",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "後方屈身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方屈身ダブル",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方かかえ込み2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "カトウヒロユキ",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "ムーンサルト",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "後方かかえ込み2回宙返りひねり下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "後方宙返りひねり前方かかえ込み宙返り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "棒端懸垂前振り後方伸身宙返り下り",
    "elementGroup": "IV",
    "difficulty": "A"
  },
  {
    "name": "棒端懸垂前振り後方かかえ込み2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "C"
  },
  {
    "name": "棒端懸垂前振り後方屈身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "D"
  },
  {
    "name": "棒端懸垂前振り後方伸身2回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "アルバレス",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "棒端懸垂前振り後方かかえ込み3回宙返り下り",
    "elementGroup": "IV",
    "difficulty": "G"
  },
  {
    "name": "棒端懸垂前振り後方かかえ込み2回宙返り1回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "棒端懸垂前振り後方かかえ込み2回宙返り1/2ひねり下り",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "棒端ムーンサルト",
    "elementGroup": "IV",
    "difficulty": "E"
  },
  {
    "name": "棒端懸垂前振り後方かかえ込み2回宙返り2回ひねり下り",
    "elementGroup": "IV",
    "difficulty": "F"
  },
  {
    "name": "棒端ルドルフ",
    "elementGroup": "IV",
    "difficulty": "F"
  }
];
