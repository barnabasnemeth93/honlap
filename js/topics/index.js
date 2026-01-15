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



];
