// js/topics/sza11.quiz.js
export const quiz = {
  topicId: "sza11",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mely három fő függőségtípus létezik a tananyag szerint?",
      options: [
        "Adat, memória, vezérlés",
        "Adat, vezérlés, erőforrás",
        "Vezérlés, időzítés, adat",
        "Adat, címzési, erőforrás",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint három függőség létezik: adat-, vezérlés- és erőforrás-függőség.",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mikor alakul ki vezérlésfüggőség?",
      options: [
        "Ha két utasítás ugyanazt a regisztert használja",
        "Ha a végrehajtó egységek száma kevés",
        "Ha feltétlen vagy feltételes elágazáshoz érkezünk",
        "Ha túl hosszú a futószalag",
      ],
      answerIndex: 2,
      explanation:
        "Vezérlésfüggőség akkor lép fel, amikor az elágazás dönti el, melyik legyen a következő utasítás.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Az utasítás-feldolgozás négy fázisa közül melyik a helyes sorrend?",
      options: [
        "Fetch – Execute – Decode – Write Back",
        "Decode – Fetch – Execute – Write Back",
        "Fetch – Decode – Execute – Write Back",
        "Fetch – Decode – Write Back – Execute",
      ],
      answerIndex: 2,
      explanation:
        "A helyes sorrend: Fetch, Decode, Execute, Write Back.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Miért okoz problémát a feltétlen vezérlésátadás (pl. JMP) futószalagos végrehajtásnál?",
      options: [
        "Mert az ALU nem tud ugrást végrehajtani",
        "Mert túl sok regisztert használ",
        "Mert a következő utasítások már lehívásra kerülhetnek rossz irányból",
        "Mert a cache nem támogatja",
      ],
      answerIndex: 2,
      explanation:
        "A JMP végrehajtása előtt már megkezdődhet a következő utasítások fetch-elése, amelyek feleslegessé válhatnak.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Mit nevezünk ugrási buboréknak?",
      options: [
        "A cache-ben üres helyet",
        "A pipeline hibás állapotát",
        "A JMP utasítás mögé beszúrt NOP-ok sorozatát",
        "A spekulatív végrehajtás hibáját",
      ],
      answerIndex: 2,
      explanation:
        "Statikus kezelésnél a JMP mögé NOP utasítások kerülnek — ezt nevezzük ugrási buboréknak.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Hány NOP utasítást kell beszúrni statikus kezelésnél?",
      options: [
        "A pipeline fokozatok számával megegyezőt",
        "Mindig pontosan hármat",
        "n − 1 darabot, ahol n a futószalagok száma",
        "Amennyit a fordító eldönt",
      ],
      answerIndex: 2,
      explanation:
        "A tétel szerint a szükséges NOP-ok száma: n − 1.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Mi jellemző a dinamikus vezérlésfüggőség-kezelésre?",
      options: [
        "Hardver végzi el futás közben",
        "Optimalizáló compiler rendezi át az utasításokat",
        "Mindig spekulációt használ",
        "Csak feltételes elágazásoknál működik",
      ],
      answerIndex: 1,
      explanation:
        "Dinamikus kezelésnél a compiler fordítási időben próbálja átrendezni az utasításokat.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mikor van szükség spekulatív elágazáskezelésre?",
      options: [
        "Ha az elágazás feltételének kiértékelése nagy késleltetésű művelettől függ",
        "Ha nincs cache",
        "Ha az elágazás feltétlen",
        "Ha a pipeline rövid",
      ],
      answerIndex: 0,
      explanation:
        "Spekulációt akkor alkalmazunk, amikor a feltétel kiértékelése hosszú ideig tart (pl. osztás).",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mi a Reorder Buffer (ROB) elsődleges szerepe?",
      options: [
        "Az utasítások sorrendjének véglegesítése és a szekvenciális konzisztencia megőrzése",
        "A cache működtetése",
        "A regiszterek átnevezése kizárólag",
        "A pipeline mélységének növelése",
      ],
      answerIndex: 0,
      explanation:
        "A ROB biztosítja, hogy az utasítások csak az eredeti sorrendjükben íródhassanak ki.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mit jelent a precíz megszakításkezelés?",
      options: [
        "A megszakítás azonnali kezelése",
        "A megszakítások párhuzamos feldolgozása",
        "A megszakítások elfogadása csak az utasítások eredeti sorrendjében",
        "A megszakítások figyelmen kívül hagyása",
      ],
      answerIndex: 2,
      explanation:
        "Precíz megszakításnál a CPU csak akkor fogad el megszakítást, ha minden korábbi utasítás befejeződött.",
    },
  ],
};
