// js/topics/sza2.quiz.js
export const quiz = {
  topicId: "sza2",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi az adattér definíciója?",
      options: [
        "A gép teljes háttértár-kapacitása",
        "A CPU által közvetlenül elérhető és manipulálható tárolóhelyek összessége",
        "A virtuális címek halmaza",
        "Csak a regiszterek összessége",
      ],
      answerIndex: 1,
      explanation:
        "Az adattér a processzor által közvetlenül elérhető és manipulálható tárolóhelyek összessége.",
    },
    {
      id: "q2",
      type: "single",
      prompt: "Az adattér két fő komponense:",
      options: [
        "ALU és CU",
        "Memóriatér és regisztertér",
        "Virtuális memória és fizikai memória",
        "RAM és ROM",
      ],
      answerIndex: 1,
      explanation: "A tétel szerint: memóriatér + regisztertér.",
    },
    {
      id: "q3",
      type: "single",
      prompt: "Melyik állítás igaz a memóriatérre a regisztertérhez képest?",
      options: [
        "Kicsi és drága",
        "Gyors és dedikált címtér",
        "Nagy, olcsó és lassú",
        "Csak SRAM-ot használ",
      ],
      answerIndex: 2,
      explanation:
        "A táblázat alapján a memóriatér nagy, olcsó és lassú (jellemzően DRAM).",
    },
    {
      id: "q4",
      type: "single",
      prompt: "Melyik állítás igaz a regisztertérre a memóriatérhez képest?",
      options: [
        "Nagy és olcsó",
        "Processzor lapkán kívül helyezkedik el",
        "Kicsi, drága és gyors",
        "Közös címtérre kerül I/O-val",
      ],
      answerIndex: 2,
      explanation: "A regisztertér kicsi, drága és gyors, és a CPU lapkán van.",
    },
    {
      id: "q5",
      type: "single",
      prompt: "Mi a címtér (Address Space)?",
      options: [
        "A ténylegesen beépített RAM mérete",
        "Az összes olyan cím halmaza, amelyet a processzor generálni tud",
        "Az adatok fizikailag elfoglalt helye",
        "A regiszterek címeinek halmaza",
      ],
      answerIndex: 1,
      explanation:
        "A címtér a processzor által generálható címek halmaza; méretét a címsín szélessége határozza meg.",
    },
    {
      id: "q6",
      type: "single",
      prompt: "Mi a memória-tér (Memory Space)?",
      options: [
        "A gép ténylegesen beépített fizikai operatív tár (RAM) mérete",
        "A virtuális címek száma",
        "A lapozási egység (paging) mérete",
        "A processzor regisztereinek összmérete",
      ],
      answerIndex: 0,
      explanation:
        "A memória-tér a ténylegesen beépített fizikai RAM mérete, gyakran kisebb, mint a címtér.",
    },
    {
      id: "q7",
      type: "single",
      prompt: "Mi a virtuális memória lényege a tétel szerint?",
      options: [
        "A programozó kisebb memóriát lát, mint a fizikai",
        "A programozó nagyobb memóriát láthat, mint amennyi fizikailag rendelkezésre áll",
        "A virtuális címek közvetlenül fizikai címek",
        "A virtuális memória csak gyorsítótár",
      ],
      answerIndex: 1,
      explanation:
        "A virtuális memória absztrakciós réteg: nagyobb memóriaképet adhat a programozónak a fizikaihoz képest.",
    },
    {
      id: "q8",
      type: "single",
      prompt: "Ki fordítja le a virtuális címeket fizikai címekre (a tétel szerint)?",
      options: [
        "ALU",
        "CU",
        "MMU (Memory Management Unit)",
        "FPU",
      ],
      answerIndex: 2,
      explanation:
        "A tételben: az MMU fordítja a virtuális címeket fizikai címekre, lapozás (paging) segítségével.",
    },
    {
      id: "q9",
      type: "single",
      prompt: "Miért előnyösek a regiszterek a memóriához képest?",
      options: [
        "Mert nagyobbak",
        "Mert olcsóbbak",
        "Mert gyorsabbak (de kisebb kapacitásúak)",
        "Mert a gépen kívül helyezkednek el",
      ],
      answerIndex: 2,
      explanation:
        "A tétel szerint a regiszterek a leggyorsabb tárolók, de kicsi a kapacitásuk és drágák.",
    },
    {
      id: "q10",
      type: "single",
      prompt: "Mit jelent az egyszerű regisztertér fejlődési szint?",
      options: [
        "Dedikált regiszterek adattípusonként",
        "Kevés, általános célú regiszter (korai, pl. 8 bites korszak)",
        "Regiszterablakok (SPARC)",
        "Többkapus SRAM cellák",
      ],
      answerIndex: 1,
      explanation:
        "A korai processzorokban kevés, általános célú regiszter volt.",
    },
    {
      id: "q11",
      type: "single",
      prompt: "Mit jelent az adattípusonként különböző (szelektált) regisztertér?",
      options: [
        "Minden regiszter ugyanazt csinálja",
        "Külön funkciójú regiszterek: adat-, cím- és lebegőpontos regiszterek",
        "Csak verem alapú tárolás van",
        "Csak DRAM használható",
      ],
      answerIndex: 1,
      explanation:
        "A hatékonyság miatt szétválasztják: adatregiszter, címregiszter, lebegőpontos (FPU) regiszter.",
    },
    {
      id: "q12",
      type: "single",
      prompt: "Mi jellemző a többszörös regisztertérre (regiszterablakokra)?",
      options: [
        "Főleg CISC-nél jellemző",
        "Főleg RISC-nél (pl. SPARC), a szubrutin-hívások gyorsítására",
        "A memóriába mentés kötelező (stack push/pop mindig)",
        "A regiszterek nem fedhetik át egymást",
      ],
      answerIndex: 1,
      explanation:
        "RISC (pl. SPARC): részben átfedő regiszterkészletek a gyors hívásokhoz, kevesebb stack push/pop.",
    },
    {
      id: "q13",
      type: "single",
      prompt: "Mi a regisztercella fizikai kialakításának lényege a tétel szerint?",
      options: [
        "DRAM cellákból épül fel, hogy olcsó legyen",
        "D-típusú flip-flopokból vagy többkapus (multi-ported) SRAM cellákból épül fel",
        "Csak egy olvasási porttal rendelkezhet",
        "Nem lehet egy órajelciklus alatt több művelet",
      ],
      answerIndex: 1,
      explanation:
        "A tételben: D flip-flopok vagy multi-ported SRAM; cél: egy ciklus alatt több olvasás/írás kiszolgálása.",
    },
    {
      id: "q14",
      type: "single",
      prompt: "Mit ír le az adatmanipulációs fa?",
      options: [
        "A háttértár fájlrendszerét",
        "A processzor műveletvégző képességeit és az adatokon végezhető átalakításokat",
        "Az utasítások lehívási (fetch) sorrendjét",
        "A címfordítás részleteit kizárólag",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint az adatmanipulációs fa a műveletvégző képességet és az adatokon végezhető transzformációkat írja le.",
    },
    {
      id: "q15",
      type: "single",
      prompt: "Melyik NEM az adatmanipulációs fa 'szintjei' közül való?",
      options: [
        "Mikroműveleti szint",
        "Utasításszint (ISA)",
        "Algoritmus/Szoftver szint",
        "Memória-szint (RAM/DRAM)",
      ],
      answerIndex: 3,
      explanation:
        "A szintek: mikroműveleti, ISA, algoritmus/szoftver. Memória-szint nem szerepel itt.",
    },
    {
      id: "q16",
      type: "single",
      prompt: "Melyik tartozik a felsorolt adattípusok közé?",
      options: [
        "Kernel (operációs rendszer)",
        "BCD (binárisan kódolt decimális)",
        "DMA",
        "Pipeline",
      ],
      answerIndex: 1,
      explanation:
        "A tételben szerepel: integer, float, string, BCD, boolean, vektor/SIMD.",
    },
    {
      id: "q17",
      type: "single",
      prompt: "Az azonnali (Immediate) címzés lényege:",
      options: [
        "Az adat egy regiszterben van",
        "Az adat maga az utasítás része",
        "Az utasítás tartalmazza a memória pontos címét",
        "A tényleges címet egy regiszter/memóriahely tartalmazza",
      ],
      answerIndex: 1,
      explanation: "Immediate: a konstans az utasításban van.",
    },
    {
      id: "q18",
      type: "single",
      prompt: "A közvetlen (Direct) címzés lényege:",
      options: [
        "Az adat maga az utasítás része",
        "Az adat egy regiszterben van",
        "Az utasítás tartalmazza a memória pontos címét",
        "A PC-hez képest eltolás",
      ],
      answerIndex: 2,
      explanation:
        "Direct: az utasításban benne van a memória pontos címe.",
    },
    {
      id: "q19",
      type: "single",
      prompt: "A közvetett (Indirect) címzés lényege:",
      options: [
        "Az utasítás tartalmazza a memória pontos címét",
        "A tényleges címet egy regiszter vagy memóriahely tartalmazza",
        "Az adat maga az utasítás része",
        "A PC növelése",
      ],
      answerIndex: 1,
      explanation:
        "Indirect: egy regiszter/memóriahely mutat a tényleges címre.",
    },
    {
      id: "q20",
      type: "single",
      prompt: "Mit jelent az indexelés a tétel szerint?",
      options: [
        "A PC felülírása",
        "Báziscímhez (pl. tömb kezdete) hozzáadjuk egy indexregiszter tartalmát",
        "Az adat maga az utasítás része",
        "A regiszterek ablakozása",
      ],
      answerIndex: 1,
      explanation:
        "Indexelés: báziscím + indexregiszter → tömbelemek hatékony elérése ciklusokban.",
    },
  ],
};
