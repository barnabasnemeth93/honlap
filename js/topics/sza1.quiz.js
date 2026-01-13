export const quiz = {
  topicId: "sza1",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi a számítási modell (SzM) fogalma?",
      options: [
        "A processzor fizikai felépítése",
        "A számításra vonatkozó alapelvek egy absztrakciója",
        "A programozási nyelv szintaktikája",
        "Az operációs rendszer működési elve",
      ],
      answerIndex: 1,
      explanation:
        "A számítási modell a számítás alapelveinek absztrakt leírása, nem konkrét megvalósítás.",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mi a helyes sorrend a számítási modell, programozási nyelv és architektúra között?",
      options: [
        "Architektúra → Programozási nyelv → Számítási modell",
        "Programozási nyelv → Architektúra → Számítási modell",
        "Számítási modell → Programozási nyelv → Architektúra",
        "Számítási modell → Architektúra → Programozási nyelv",
      ],
      answerIndex: 2,
      explanation:
        "A számítási modell határozza meg az igényeket, a nyelv kielégíti azokat, az architektúra pedig implementálja.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Melyik NEM absztrakciós szempont a számítási modellek jellemzésénél?",
      options: [
        "Min hajtjuk végre a számítást?",
        "Hogyan képezzük le a feladatot?",
        "Mi vezérli a végrehajtás sorrendjét?",
        "Milyen órajellel működik a processzor?",
      ],
      answerIndex: 3,
      explanation:
        "Az órajel már fizikai (implementációs) kérdés, nem absztrakciós szempont.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Melyik számítási modell vezérlés-meghajtott?",
      options: [
        "Adatfolyam modell",
        "Neumann-féle modell",
        "Predikátum-logika alapú modell",
        "Deklaratív modell",
      ],
      answerIndex: 1,
      explanation:
        "A Neumann-féle modell vezérlés-meghajtott, az utasítások sorrendje irányítja a végrehajtást.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Mi jellemző a Neumann-féle számítási modell adataira?",
      options: [
        "Az értékadás csak egyszer történhet",
        "Nincsenek változók",
        "A változók értéke többször módosítható",
        "Az adatok csak regiszterekben tárolódnak",
      ],
      answerIndex: 2,
      explanation:
        "A Neumann-modellben változókat használunk, amelyek értéke többször is módosítható.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Miért előzményérzékeny a Neumann-féle modell?",
      options: [
        "Mert nincs párhuzamos végrehajtás",
        "Mert a változók értéke a korábbi műveletektől függ",
        "Mert nincs közös memória",
        "Mert csak deklaratív problémákat kezel",
      ],
      answerIndex: 1,
      explanation:
        "A változók módosíthatók, ezért egy művelet eredménye függ a korábbi állapottól.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Mi a legfontosabb cél az adatfolyam számítási modellnél?",
      options: [
        "Egyszerű implementáció",
        "A memóriahasználat csökkentése",
        "A párhuzamosság maximális kihasználása",
        "Az órajel növelése",
      ],
      answerIndex: 2,
      explanation:
        "Az adatfolyam modell kifejezetten a párhuzamos végrehajtás kihasználására lett tervezve.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mi jellemző az adatfolyam modell változókezelésére?",
      options: [
        "A változók többször módosíthatók",
        "Nincsenek változók, csak egyszeri értékadások",
        "A változók globálisak",
        "Csak akkumulátort használ",
      ],
      answerIndex: 1,
      explanation:
        "Adatfolyam modellben nincs klasszikus változó, az értékadás egyszeri.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Hogyan indul el egy művelet az adatfolyam modellben?",
      options: [
        "A PC utasításmutató alapján",
        "Időzítő megszakításra",
        "Amint az összes szükséges adat rendelkezésre áll",
        "Felhasználói beavatkozásra",
      ],
      answerIndex: 2,
      explanation:
        "Adatfolyam modellben a rendelkezésre álló adatok indítják a végrehajtást.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Milyen jellegű problémamegoldás jellemző az adatfolyam modellre?",
      options: [
        "Procedurális",
        "Imperatív",
        "Deklaratív",
        "Vezérlés-orientált",
      ],
      answerIndex: 2,
      explanation:
        "Az adatfolyam modell deklaratív jellegű: azt mondjuk meg, mit kell kiszámítani, nem a lépések sorrendjét.",
    },

    {
      id: "q11",
      type: "single",
      prompt: "Mit jelent Amdahl (1964) szerint az architektúra fogalma?",
      options: [
        "A processzor belső áramkörei",
        "Az operációs rendszer felépítése",
        "Az ismerethalmaz, amely a gépi kódú programozáshoz szükséges",
        "A memória és a buszrendszer együttese",
      ],
      answerIndex: 2,
      explanation:
        "Amdahl szerint az architektúra az a tudás, amely a hatékony gépi kódú programozáshoz kell.",
    },

    {
      id: "q12",
      type: "single",
      prompt: "Melyik NEM tartozik Bell és Newell absztrakciós szintjei közé?",
      options: [
        "Áramköri szint",
        "Logikai tervezési szint",
        "Programozási szint",
        "Operációs rendszer szint",
      ],
      answerIndex: 3,
      explanation:
        "Az operációs rendszer szint nem része Bell és Newell klasszikus absztrakciós szintjeinek.",
    },

    {
      id: "q13",
      type: "single",
      prompt: "Mit értünk logikai (külső) architektúra alatt?",
      options: [
        "A hardver fizikai felépítését",
        "A programozó által látott specifikációt",
        "A processzor áramköreit",
        "A mikroarchitektúrát",
      ],
      answerIndex: 1,
      explanation:
        "A logikai architektúra a programozási modell, amit a programozó lát.",
    },

    {
      id: "q14",
      type: "single",
      prompt: "Melyik tartozik a logikai architektúra adattéréhez?",
      options: [
        "ALU és CU",
        "Megszakítási rendszer",
        "Memória és regiszterek",
        "Buszrendszer",
      ],
      answerIndex: 2,
      explanation:
        "Az adattér a CPU által közvetlenül manipulálható tárolókat jelenti.",
    },

    {
      id: "q15",
      type: "single",
      prompt: "Mi tartozik a fizikai architektúra (mikroarchitektúra) feladatai közé?",
      options: [
        "Utasításkészlet definiálása",
        "Címzési módok meghatározása",
        "A hardveres megvalósítás biztosítása",
        "A programozási nyelv szintaxisa",
      ],
      answerIndex: 2,
      explanation:
        "A fizikai architektúra a logikai architektúra hardveres megvalósítását jelenti.",
    },
  ],
};
