// js/topics/sza12.quiz.js
export const quiz = {
  topicId: "sza12",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi a futószalag (pipeline) feldolgozás alapelve?",
      options: [
        "Az utasítások párhuzamos végrehajtása több processzoron",
        "Az utasítás több részre bontása és ezek időben átfedett végrehajtása",
        "Az utasítások gyorsabb órajelű végrehajtása",
        "Az utasítások sorrendjének megváltoztatása",
      ],
      answerIndex: 1,
      explanation:
        "A pipeline elv lényege: az utasítást részekre bontjuk, és ezek egymással átfedve hajtódnak végre.",
    },

    {
      id: "q2",
      type: "single",
      prompt: "Mely fázisokra bontjuk tipikusan az utasítás-végrehajtást?",
      options: [
        "Load – Execute – Store",
        "Fetch – Decode – Execute – Write Back",
        "Input – Process – Output",
        "Decode – Execute – Commit",
      ],
      answerIndex: 1,
      explanation:
        "A tananyag szerint a klasszikus négy fázis: Fetch, Decode, Execute, Write Back.",
    },

    {
      id: "q3",
      type: "single",
      prompt: "Mi az ideális pipeline működés eredménye?",
      options: [
        "Minden ciklusban egy új utasítás kezdődik",
        "Minden ciklusban egy utasítás befejeződik",
        "Minden utasítás párhuzamosan fut",
        "A pipeline mindig üresjárat nélkül működik",
      ],
      answerIndex: 1,
      explanation:
        "Ideális esetben minden órajelciklusban elkészül egy utasítás.",
    },

    {
      id: "q4",
      type: "single",
      prompt: "Mely feltétele szükséges a pipeline működéshez két fokozat esetén?",
      options: [
        "A két fokozat külön memóriát használjon",
        "A fokozatok végrehajtási ideje közel azonos legyen",
        "Legalább három végrehajtóegység legyen",
        "A cache mérete nagyobb legyen",
      ],
      answerIndex: 1,
      explanation:
        "A pipeline akkor hatékony, ha a fokozatok végrehajtási ideje azonos vagy közel azonos.",
    },

    {
      id: "q5",
      type: "single",
      prompt: "Mit jelent az időbeli párhuzamosság?",
      options: [
        "Több utasítás ugyanazon az adaton dolgozik",
        "A végrehajtó egységek térben párhuzamosak",
        "A végrehajtó egységek időben egymás után kapcsolódnak",
        "A processzor több magot használ",
      ],
      answerIndex: 2,
      explanation:
        "Pipeline esetén az egységek időben egymás után vannak kapcsolva – ez az időbeli párhuzamosság.",
    },

    {
      id: "q6",
      type: "single",
      prompt: "Melyik állítás igaz a dedikált futószalagokra?",
      options: [
        "Minden utasítást végre tudnak hajtani",
        "Csak speciális utasításokat hajtanak végre",
        "Mindig lassabbak az univerzálisnál",
        "Nem tartalmaznak pufferregisztereket",
      ],
      answerIndex: 1,
      explanation:
        "Dedikált futószalag csak meghatározott utasításokra szolgál, ezért kisebb és gyorsabb lehet.",
    },

    {
      id: "q7",
      type: "single",
      prompt: "Miért szükségesek az elválasztó pufferregiszterek a pipeline fokozatok között?",
      options: [
        "A regiszterek számának növelése miatt",
        "Az eltérő végrehajtási idők kiegyenlítésére",
        "Az órajel gyorsítására",
        "Az adatfüggőségek megszüntetésére",
      ],
      answerIndex: 1,
      explanation:
        "A pufferregiszterek kiegyenlítik az egyes fokozatok eltérő végrehajtási idejét.",
    },

    {
      id: "q8",
      type: "single",
      prompt: "Mit nevezünk prefetchingnek?",
      options: [
        "Az operandusok előzetes betöltését",
        "A pipeline teljes átfedését",
        "A következő utasítás lehívását a visszaírással egy időben",
        "Az Execute fokozat ismétlését",
      ],
      answerIndex: 2,
      explanation:
        "Prefetching során a következő utasítás lehívása már a WB alatt megtörténik.",
    },

    {
      id: "q9",
      type: "single",
      prompt: "Mit jelent az újrafeldolgozás a pipeline feldolgozásnál?",
      options: [
        "Az utasítás teljes újraindítását",
        "Az Execute fokozat többszöri egymás utáni végrehajtását",
        "A pipeline ürítését",
        "Az elágazások újraszámítását",
      ],
      answerIndex: 1,
      explanation:
        "Újrafeldolgozáskor az Execute fokozat fut le többször egymás után, pl. iteratív műveleteknél.",
    },

    {
      id: "q10",
      type: "single",
      prompt: "Mi a futószalagos feldolgozás egyik legfontosabb szűk keresztmetszete?",
      options: [
        "Regiszterek száma",
        "Memóriasávszélesség és elágazások",
        "ALU műveleti sebessége",
        "Órajel frekvenciája",
      ],
      answerIndex: 1,
      explanation:
        "A pipeline hatékonyságát főként a memóriasávszélesség és az elágazások korlátozzák.",
    },
  ],
};
