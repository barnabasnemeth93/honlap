// js/topics/sza14.quiz.js
// SzA14 – Második generációs (széles) szuperskalár processzorok
// Kizárólag a tétel anyaga alapján

export const quiz = {
  topicId: "sza14",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt:
        "Mi volt az első generációs szuperskalár processzorok legfőbb teljesítménykorlátja?",
      options: [
        "A túl nagy regiszterkészlet",
        "A közvetlen kibocsátás miatti kibocsátási szűk keresztmetszet",
        "A túl gyors memóriaelérés",
        "A ROB hiánya a cache-ben",
      ],
      answerIndex: 1,
      explanation:
        "A közvetlen kibocsátás miatt gyakorlatban csak kb. 1 utasítás/ciklus volt elérhető.",
    },

    {
      id: "q2",
      type: "single",
      prompt:
        "Mi volt a második generációs szuperskalár processzorok fő tervezési célja?",
      options: [
        "Az órajel növelése",
        "A kibocsátási szűk keresztmetszet megszüntetése",
        "A cache méretének csökkentése",
        "A futószalag lerövidítése",
      ],
      answerIndex: 1,
      explanation:
        "A teljes mikroarchitektúrát át kellett tervezni a kibocsátási korlát megszüntetésére.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Mit jelent a dinamikus utasítás-ütemezés?",
      options: [
        "Az utasítások mindig sorrendben hajtódnak végre",
        "A fordítóprogram rendezi át az utasításokat",
        "A processzor futásidőben választja ki a végrehajtható utasításokat",
        "Csak a memóriaműveletek sorrendje változik",
      ],
      answerIndex: 2,
      explanation:
        "A CPU futásidőben dönti el, mely független utasítások küldhetők ki.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Hol történik az utasítások várakoztatása kibocsátás előtt?",
      options: [
        "Cache-ben",
        "ROB-ban",
        "Várakoztató állomásban",
        "Regisztertérben",
      ],
      answerIndex: 2,
      explanation:
        "A dekódolt utasítások a várakoztató állomásba kerülnek, nem közvetlenül a végrehajtókhoz.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Mi a sorrenden kívüli végrehajtás lényege?",
      options: [
        "A végrehajtás mindig a program szerinti sorrendben történik",
        "A végrehajtás a fordítóprogram által rendezett sorrendben zajlik",
        "A kész operandusú utasítások megelőzhetik a függőket",
        "Csak memóriaműveletek hajthatók végre",
      ],
      answerIndex: 2,
      explanation:
        "A független utasítások előbb kerülhetnek végrehajtásra, mint a függők.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Mi a regiszter-átnevezés elsődleges célja?",
      options: [
        "A RAW adatfüggőség megszüntetése",
        "Az ál adatfüggőségek (WAR, WAW) megszüntetése",
        "A cache-hibák csökkentése",
        "A pipeline mélyítés",
      ],
      answerIndex: 1,
      explanation:
        "Az átnevezés az ál adatfüggőségeket szünteti meg, nem a RAW-t.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Mely adatfüggőségek szüntethetők meg regiszter-átnevezéssel?",
      options: [
        "RAW",
        "RAW és WAR",
        "WAR és WAW",
        "Minden adatfüggőség",
      ],
      answerIndex: 2,
      explanation:
        "Az átnevezési regiszterek a WAR és WAW függőségeket szüntetik meg.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mi a Reorder Buffer (ROB) fő feladata?",
      options: [
        "Cache sorbarendezése",
        "Szekvenciális konzisztencia biztosítása",
        "Órajel növelése",
        "Utasítások tömörítése",
      ],
      answerIndex: 1,
      explanation:
        "A ROB gondoskodik arról, hogy az utasítások eredményei program szerinti sorrendben íródjanak ki.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mikor írható ki egy utasítás a ROB-ból?",
      options: [
        "Amint elkészült az eredménye",
        "Ha a spekulatív bit 1",
        "Csak ha minden előtte lévő utasítás már kiírásra került",
        "Ha az utána következő utasítás elkészült",
      ],
      answerIndex: 2,
      explanation:
        "Ez biztosítja a szekvenciális konzisztenciát.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mi történik hibás elágazásbecslés esetén?",
      options: [
        "Az utasítások azonnal kiíródnak",
        "A pipeline folytatódik változtatás nélkül",
        "A spekulatívan lehívott utasításokat eldobják",
        "A regisztertartalom végleges marad",
      ],
      answerIndex: 2,
      explanation:
        "Hibás becslésnél a spekulatív utasításokat törlik és a helyes irányba indul újra a lehívás.",
    },
  ],
};
