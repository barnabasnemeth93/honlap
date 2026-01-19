export const TOPICS = [

{
  id: "sza1",
  code: "SzA1",
  title: "Az utasításszintű (logikai) architektúra",
  group: "SzA",
  order: 1,
  topicModule: () => import("./sza1.topic.js"),
  quizModule: () => import("./sza1.quiz.js"),
},
{
  id: "sza2",
  code: "SzA2",
  title: "Az adattér, adatmanipulációs fa",
  group: "SzA",
  order: 2,
  topicModule: () => import("./sza2.topic.js"),
  quizModule: () => import("./sza2.quiz.js"),
},

{
  id: "sza3",
  code: "SzA3",
  title: "Szekvenciális utasításvégrehajtás, utasítás- és operandustípusok, állapottér, állapotműveletek",
  group: "SzA",
  order: 3,
  tags: ["utasítás", "fetch", "decode", "PC", "operandus", "architektúra"],
  topicModule: () => import("./sza3.topic.js"),
  quizModule: () => import("./sza3.quiz.js"),
},
{
  id: "sza4",
  code: "SzA4",
  title: "Az aritmetikai egységek felépítése I.",
  group: "SzA",
  order: 4,
  topicModule: () => import("./sza4.topic.js"),
  quizModule: () => import("./sza4.quiz.js"),
},
{
  id: "sza7",
  code: "SzA7",
  title: "Külső buszrendszer",
  group: "SzA",
  order: 7,
  topicModule: () => import("./sza7.topic.js"),
  quizModule: () => import("./sza7.quiz.js"),
  summaryModule: () => import("./summaries/sza7.summary.js"),
},



{
  id: "sza9",
  code: "SzA9",
  title: "Megszakítási rendszer",
  group: "SzA",
  order: 9,
  topicModule: () => import("./sza9.topic.js"),
  quizModule: () => import("./sza9.quiz.js"),
},

{
  id: "sza10",
  code: "SzA10",
  title: "Számítógép architektúrák osztályozása és az adatfüggőségek",
  group: "SzA",
  order: 10,
  tags: [
    "architektúra",
    "Flynn",
    "SIMD",
    "MIMD",
    "adatfüggőség",
    "RAW",
    "WAR",
    "WAW",
    "pipeline",
    "párhuzamosság"
  ],
  topicModule: () => import("./sza10.topic.js"),
  quizModule: () => import("./sza10.quiz.js"),
},

{
  id: "sza11",
  code: "SzA11",
  title:
    "Vezérlésfüggőségek, teljesítmény korlátozó hatásuk csökkentése és a szekvenciális konzisztencia",
  group: "SzA",
  order: 11,
  tags: [
    "vezérlésfüggőség",
    "elágazás",
    "JMP",
    "NOP",
    "branch prediction",
    "statikus",
    "dinamikus",
    "spekulatív",
    "ROB",
    "szekvenciális konzisztencia",
    "memóriakonzisztencia",
    "precíz megszakítás",
    "kivételkezelés"
  ],
  topicModule: () => import("./sza11.topic.js"),
  quizModule: () => import("./sza11.quiz.js"),
},

{
  id: "sza12",
  code: "SzA12",
  title:
    "A futószalag (pipeline) elvű utasítás-végrehajtás, pipeline CPU-k",
  group: "SzA",
  order: 12,
  tags: [
    "pipeline",
    "futószalag",
    "utasítás-végrehajtás",
    "fetch",
    "decode",
    "execute",
    "writeback",
    "prefetching",
    "átlapolt végrehajtás",
    "újrafeldolgozás",
    "memóriasávszélesség",
    "cache",
    "elágazások"
  ],
  topicModule: () => import("./sza12.topic.js"),
  quizModule: () => import("./sza12.quiz.js"),
},

{
  id: "sza13",
  code: "SzA13",
  title:
    "Szuperskalár architektúrák, első generációs (keskeny) szuperskalár CPU-k",
  group: "SzA",
  order: 13,
  tags: [
    "szuperskalár",
    "kibocsátás",
    "kibocsátási ráta",
    "Harvard architektúra",
    "Neumann elv",
    "I-cache",
    "D-cache",
    "RISC",
    "CISC",
    "utasításablak",
    "közvetlen kibocsátás",
    "végrehajtási modell",
    "szélesség",
    "szűk keresztmetszet"
  ],
  topicModule: () => import("./sza13.topic.js"),
  quizModule: () => import("./sza13.quiz.js"),
},
{
  id: "sza14",
  code: "SzA14",
  title: "Második generációs (széles) szuperskalár processzorok",
  group: "SzA",
  order: 14,
  tags: [
    "szuperskalár",
    "második generáció",
    "széles",
    "kibocsátás",
    "kibocsátási szűk keresztmetszet",
    "dinamikus utasítás-ütemezés",
    "pufferelt kibocsátás",
    "kiküldés",
    "sorrenden kívüli végrehajtás",
    "Stréber modell",
    "regiszter-átnevezés",
    "átnevezési regiszter",
    "WAR",
    "WAW",
    "ROB",
    "reorder buffer",
    "spekulatív bit",
    "rekonverzió",
    "kiírási szabályok"
  ],
  topicModule: () => import("./sza14.topic.js"),
  quizModule: () => import("./sza14.quiz.js"),
},

{
  id: "sza15",
  code: "SzA15",
  title:
    "Harmadik generációs szuperskalár processzorok – utasításon belüli párhuzamos végrehajtás",
  group: "SzA",
  order: 15,
  tags: [
    "harmadik generáció",
    "szuperskalár",
    "utasításon belüli párhuzamosság",
    "ILP",
    "duál műveleti utasítás",
    "multiply-add",
    "SIMD",
    "multimédia",
    "2D",
    "3D",
    "fixpontos SIMD",
    "lebegőpontos SIMD",
    "MMX",
    "SSE",
    "pakolt adattípus",
    "128 bit",
    "hangfeldolgozás",
    "képfeldolgozás",
    "vektoros feldolgozás"
  ],
  topicModule: () => import("./sza15.topic.js"),
  quizModule: () => import("./sza15.quiz.js"),
},






];
