// js/topics/sza13.quiz.js
// Forrás: SzA13 tétel (SzA 13.pdf) alapján. :contentReference[oaicite:0]{index=0}

export const quiz = {
  topicId: "sza13",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi jellemző a szuperskalár architektúrákra a tétel szerint?",
      options: [
        "Ciklusonként csak 1 utasítást tudnak kibocsátani",
        "A dekódolóegységből ciklusonként több utasítást is képesek kibocsátani",
        "Csak CISC utasításkészlettel működnek",
        "Nem kezelnek függőségeket hardveresen",
      ],
      answerIndex: 1,
      explanation:
        "Szuperskalárnál a dekódolóegység ciklusonként több utasítást is kibocsáthat (kibocsátási ráta).",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mi a szuperskalár CPU-k egyik közös mérőszáma?",
      options: [
        "Cache találati arány",
        "Kibocsátási ráta (utasítás/ciklus)",
        "Memória késleltetés (ns)",
        "Regiszterek bitszélessége",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint a kibocsátási ráta mutatja, ciklusonként hány utasítást képes a dekóder kibocsátani.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Milyen párhuzamosság jellemzi a szuperskalár processzorokat?",
      options: [
        "Csak időbeli párhuzamosság",
        "Csak térbeli párhuzamosság",
        "Időbeli és térbeli párhuzamosság is",
        "Semmilyen párhuzamosság",
      ],
      answerIndex: 2,
      explanation:
        "A tétel szerint időben és térben is párhuzamosak: több futószalag működik párhuzamosan.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Mi a Harvard architektúra lényege?",
      options: [
        "Adat és programkód ugyanabban a memóriában van",
        "Adat és programkód fizikailag elkülönített útvonalakon mozog",
        "A cache nem használható",
        "Csak memóriából dolgozik az ALU",
      ],
      answerIndex: 1,
      explanation:
        "Harvard elv: adat és programkód elkülönített útvonalakon mozog, így párhuzamos adat- és utasításmozgatás lehetséges.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "A tétel szerint hol jelenik meg Harvard-elvű működés a modern CPU-kban?",
      options: [
        "L2 és L3 cache-ben (közös adat/utasítás tárolás)",
        "L1 gyorsítótárban (külön I-cache és D-cache)",
        "Csak az operatív tárban",
        "Sehol, már nem használják",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint L1-ben külön utasítás cache (I-cache) és adat cache (D-cache) van → Harvard-elv.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Melyik állítás igaz a RISC-re a tétel szerint?",
      options: [
        "Változó hosszúságú utasítások jellemzik",
        "A memóriaelérés csak LOAD/STORE utasításokkal történik",
        "Tipikusan 2 operandusos utasításokat használ",
        "A műveletek memóriából közvetlenül dolgoznak",
      ],
      answerIndex: 1,
      explanation:
        "RISC-ben a memóriaelérés LOAD/STORE-ral történik, a műveletvégző utasítások regisztereket használnak.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Miért bonyolultabb a CISC dekódolás a tétel szerint?",
      options: [
        "Mert kevés utasításból áll a készlet",
        "Mert az utasítások azonos hosszúak",
        "Mert változó méretű utasításoknál az utasítás végét is azonosítani kell",
        "Mert nincs mikroprogramtár",
      ],
      answerIndex: 2,
      explanation:
        "CISC-nél változó hosszúságú utasítások vannak, ezért kell utasításhatárra illesztés is, ami plusz hardver/idő.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mit jelent az első generációs szuperskalároknál a közvetlen (nem pufferelt) kibocsátás?",
      options: [
        "Az utasítások a ROB-on keresztül kerülnek kiírásra",
        "A dekódolt utasítást a CPU közvetlenül a végrehajtó egységhez küldi",
        "A kibocsátás mindig sorrenden kívül történik",
        "A kibocsátás csak memóriaműveletekre vonatkozik",
      ],
      answerIndex: 1,
      explanation:
        "Közvetlen kibocsátásnál a dekódolt utasítás közvetlenül a végrehajtó egységhez kerül.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mi az utasításablak szerepe a tétel szerint?",
      options: [
        "Utasításokat tárol kibocsátás előtt, itt van dekódolás és függőségellenőrzés",
        "Cache-ként működik az operatív tár helyett",
        "Csak a spekulatív bitet tárolja",
        "A visszaírás (WB) gyorsítására szolgál",
      ],
      answerIndex: 0,
      explanation:
        "Az utasításablak puffer: dekódolás + függőségvizsgálat, független utasítások kimehetnek, függők maradnak.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mi volt az első generációs szuperskalár CPU-k egyik fő szűk keresztmetszete?",
      options: [
        "Kibocsátás: gyakorlatban kb. 1 utasítás/ciklus",
        "Túl sok ROB bejegyzés",
        "Dinamikus elágazásbecslés túl nagy erőforrásigénye",
        "A Harvard architektúra hiánya L1-ben",
      ],
      answerIndex: 0,
      explanation:
        "A tétel szerint a közvetlen kibocsátás miatt a kibocsátás szűk keresztmetszet lett: elméletben 2–3, gyakorlatban ~1 utasítás/ciklus.",
    },
  ],
};
