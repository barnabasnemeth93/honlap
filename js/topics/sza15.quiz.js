// js/topics/sza15.quiz.js
// SzA15 – Harmadik generációs szuperskalár processzorok
// A kérdések kizárólag a tétel anyagára épülnek

export const quiz = {
  topicId: "sza15",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt:
        "Miért vált szükségessé a harmadik generációs szuperskalár processzorok megjelenése?",
      options: [
        "A memória túl gyors lett a processzorhoz képest",
        "A második generáció elérte teljesítménybeli korlátait",
        "A cache mérete túl nagyra nőtt",
        "A pipeline túl rövid volt",
      ],
      answerIndex: 1,
      explanation:
        "A 2. generációs megoldások (ROB, OoO) már nem biztosítottak további jelentős gyorsulást.",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mit jelent az utasításon belüli párhuzamosság (ILP)?",
      options: [
        "Több utasítás párhuzamos futtatása",
        "Egy utasítás több adatot vagy több műveletet dolgoz fel egyszerre",
        "Utasítások sorrenden kívüli végrehajtása",
        "Több futószalag alkalmazása",
      ],
      answerIndex: 1,
      explanation:
        "ILP esetén egyetlen utasítás végez több műveletet vagy dolgozik több adatelemen.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Mely területen különösen hatékony az ILP alkalmazása?",
      options: [
        "Operációs rendszer ütemezés",
        "Multimédiás és vektoros feldolgozás",
        "Háttértár-kezelés",
        "Hálózati protokollok",
      ],
      answerIndex: 1,
      explanation:
        "Multimédiában sok az egymástól független adat, ami ideális az ILP-hez.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Mi a SIMD rövidítés jelentése?",
      options: [
        "Single Instruction Multiple Data",
        "Super Instruction Multiple Data",
        "Single Internal Memory Decoder",
        "Sequential Instruction Memory Design",
      ],
      answerIndex: 0,
      explanation:
        "SIMD = Single Instruction Multiple Data.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Mi a SIMD utasítások alapelve?",
      options: [
        "Több különböző utasítás egy adaton",
        "Egy utasítás több adatelemen ugyanazt a műveletet végzi",
        "Minden adat külön utasítást igényel",
        "Csak lebegőpontos adatokon működik",
      ],
      answerIndex: 1,
      explanation:
        "SIMD-nél ugyanaz az utasítás fut le párhuzamosan több adaton.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Milyen adatok feldolgozására használták főként az MMX technológiát?",
      options: [
        "Lebegőpontos tudományos számításokra",
        "2D multimédiás, pixeles és hangadatokra",
        "Operációs rendszer kernel műveleteire",
        "Titkosítási algoritmusokra",
      ],
      answerIndex: 1,
      explanation:
        "MMX főleg fixpontos, pixeles és hangfeldolgozásra készült.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Hogyan tárolta az MMX a pakolt adattípusokat?",
      options: [
        "Külön SIMD regiszterekben",
        "Az általános célú regiszterekben",
        "A lebegőpontos regiszterek mantisszájában",
        "Cache memóriában",
      ],
      answerIndex: 2,
      explanation:
        "Az MMX a meglévő FP regiszterek mantisszáját használta adattárolásra.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mekkora volt az MMX által használt pakolt adattípus mérete?",
      options: [
        "32 bit",
        "64 bit",
        "96 bit",
        "128 bit",
      ],
      answerIndex: 1,
      explanation:
        "Az MMX 64 bites pakolt adattípusokat használt.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mi jellemző az SSE technológiára?",
      options: [
        "Fixpontos SIMD műveletek",
        "Lebegőpontos SIMD műveletek",
        "Csak 2D feldolgozás",
        "64 bites vektorregiszterek",
      ],
      answerIndex: 1,
      explanation:
        "Az SSE elsősorban lebegőpontos SIMD műveletekre készült.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mekkora adatméretet kezel az SSE pakolt adattípusa?",
      options: [
        "64 bit",
        "96 bit",
        "128 bit",
        "256 bit",
      ],
      answerIndex: 2,
      explanation:
        "Az SSE 128 bites vektorregisztereket és pakolt adattípusokat vezetett be.",
    },
  ],
};
