export const TOPICS = [
  {
    id: "sza3",
    code: "SzA3",
    title: "Szekvenciális utasításvégrehajtás, utasítás- és operandustípusok, állapottér, állapotműveletek",
    tags: ["utasítás", "fetch", "decode", "PC", "operandus", "architektúra"],
    topicModule: () => import("./sza3.topic.js"),
    quizModule: () => import("./sza3.quiz.js"),
  },
{
  id: "sza1",
  code: "SzA1",
  title: "Az utasításszintű (logikai) architektúra",
  group: "SzA",
  order: 1,
  topicModule: () => import("./sza1.topic.js"),
  quizModule: () => import("./sza1.quiz.js"),
},


];
