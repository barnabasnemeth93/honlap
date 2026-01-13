export const quiz = {
  topicId: "sza3",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi történik a Fetch (utasítás lehívás) fázisban?",
      options: [
        "MAR ← PC; MDR ← [MAR]; IR ← MDR; PC ← PC+1",
        "DEC ← IR; AC ← MDR; [MAR] ← MDR",
        "MAR ← DEC.címrész; MDR ← AC; [MAR] ← MDR",
        "PC ← DEC.címrész; IR ← MDR",
      ],
      answerIndex: 0,
      explanation:
        "Fetch során az utasítás memóriából az IR-be kerül, majd a PC automatikusan inkrementálódik.",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mit jelent a [MAR] jelölés az állapotátmenetekben?",
      options: [
        "A MAR tartalmának értékét",
        "A MAR címén található memóriaértéket",
        "A MAR és MDR közti adatbuszt",
        "A dekóder címrészét",
      ],
      answerIndex: 1,
      explanation:
        "Szögletes zárójel mindig memóriatartalmat jelent: a MAR-ban lévő cím által mutatott memóriaértéket.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Mi a dekódolás (Decode) fő feladata?",
      options: [
        "Az utasítás végrehajtása az ALU-ban",
        "Az operandusok memóriából való betöltése",
        "Az IR-ben lévő utasítás értelmezése, vezérlés előkészítése",
        "Az eredmény visszaírása a memóriába",
      ],
      answerIndex: 2,
      explanation:
        "A dekódolás során az IR-ben lévő utasítás értelmezése történik, és előkészül a végrehajtás.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Miért kerül az eredmény először az AC-be aritmetikai műveletnél?",
      options: [
        "Mert az AC közvetlenül írható a memóriába",
        "Mert az ALU az AC-vel van közvetlen kapcsolatban",
        "Mert az AC nagyobb, mint a memória",
        "Mert az AC tartalmazza a PC-t is",
      ],
      answerIndex: 1,
      explanation:
        "Az ALU közvetlenül az akkumulátorhoz (AC) kapcsolódik, ezért a művelet eredménye oda kerül.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Miért kell az eredményt AC → MDR → memória útvonalon visszaírni?",
      options: [
        "Mert az AC nem tartalmaz adatot",
        "Mert az AC és a memória között nincs közvetlen buszkapcsolat",
        "Mert a PC ezt megköveteli",
        "Mert a dekóder csak MDR-t tud kezelni",
      ],
      answerIndex: 1,
      explanation:
        "Az AC és a memória között nincs közvetlen adatút, ezért köztes regiszterként az MDR-t kell használni.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Mi jellemző a feltétlen vezérlésátadó (JMP) utasítás végrehajtására?",
      options: [
        "Csak Fetch és Store fázisból áll",
        "A PC automatikusan PC+1-re áll",
        "A PC értékét az utasítás címrésze felülírja",
        "Nem használ dekódolást",
      ],
      answerIndex: 2,
      explanation:
        "JMP esetén a PC értéke közvetlenül az utasítás címrészéből töltődik fel.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Mi volt a 4 címes utasítások legnagyobb hátránya?",
      options: [
        "Nem lehetett bennük aritmetikai művelet",
        "Túl sok helyet foglaltak és merevek voltak",
        "Nem volt bennük műveleti kód",
        "Nem támogatták a memóriát",
      ],
      answerIndex: 1,
      explanation:
        "A 4 címes utasítások túl merevek voltak, és a következő utasítás címét is tárolni kellett bennük.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mi a PC (Program Counter) szerepe a modern architektúrákban?",
      options: [
        "Az aktuális operandus tárolása",
        "A következő végrehajtandó utasítás címének tárolása",
        "Az ALU vezérlése",
        "Az állapotjelzők kezelése",
      ],
      answerIndex: 1,
      explanation:
        "A PC tartalmazza a következő végrehajtandó utasítás memóriacímét, és általában automatikusan növekszik.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mi jellemző a 3 címes utasításokra?",
      options: [
        "Az eredmény mindig felülírja az egyik operandust",
        "Nem tartalmaznak céloperandust",
        "Az eredmény külön céloperandusba kerülhet",
        "Csak verem-alapú architektúráknál használatosak",
      ],
      answerIndex: 2,
      explanation:
        "3 címes utasításnál az eredmény külön céloperandusba írható, ami megkönnyíti a párhuzamosítást.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mi jellemző a 2 címes utasításokra?",
      options: [
        "Az eredmény mindig új memóriacímre kerül",
        "Az eredmény az első operandus helyén keletkezik",
        "Csak regiszter–regiszter műveletek lehetnek",
        "Mindig immediate operandust használnak",
      ],
      answerIndex: 1,
      explanation:
        "2 címes utasításnál az eredmény tipikusan az első operandust írja felül.",
    },

    {
      id: "q11",
      type: "single",
      prompt: "Mit jelent az immediate (i) operandus?",
      options: [
        "Az operandus a verem tetején van",
        "Az operandus a memóriában található",
        "Az operandus értéke közvetlenül az utasításban szerepel",
        "Az operandus csak az AC lehet",
      ],
      answerIndex: 2,
      explanation:
        "Immediate operandusnál a konstans érték közvetlenül az utasítás része (pl. ADD r1, 3).",
    },

    {
      id: "q12",
      type: "single",
      prompt: "Mit nevezünk állapottérnek?",
      options: [
        "Az ALU regisztereit",
        "A memóriát és a háttértárat együtt",
        "A programból látható, programtranszparens tárolók összességét",
        "Csak a PC és az IR regisztereket",
      ],
      answerIndex: 2,
      explanation:
        "Az állapottér a programból látható és programtranszparens állapotinformációkat hordozó tárolók együttese.",
    },

    {
      id: "q13",
      type: "single",
      prompt: "Melyik NEM tipikus állapotművelet a PC esetén?",
      options: [
        "Increment",
        "Decrement",
        "Felülírás utasításból vett címmel",
        "Clear (törlés)",
      ],
      answerIndex: 3,
      explanation:
        "A Clear tipikusan flag-ekhez kapcsolódik, nem a PC-hez.",
    },

    {
      id: "q14",
      type: "single",
      prompt: "Mi jellemző a homogén (szabályos) architektúrákra?",
      options: [
        "Vegyes operandustípusok használata",
        "Csak egy operandustípus dominál",
        "Csak memóriaoperandusok használata",
        "Csak verem-alapú működés",
      ],
      answerIndex: 1,
      explanation:
        "Homogén architektúránál egy domináns operandustípus van, ami egyszerűbbé és gyorsabbá teszi a kezelést.",
    },

    {
      id: "q15",
      type: "single",
      prompt: "Melyik jellemző inkább a CISC architektúrákra?",
      options: [
        "Regiszter–regiszter műveletek",
        "Homogén operandustípus",
        "Vegyes (heterogén) operandustípusok",
        "Csak 3 címes utasítások",
      ],
      answerIndex: 2,
      explanation:
        "CISC architektúráknál gyakori a regiszter + memória kombináció, azaz heterogén operanduskezelés.",
    },
  ],
};
