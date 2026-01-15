export const quiz = {
    topicId: "sza4",
    questions: [
      {
        id: "q1",
        type: "single",
        prompt: "Mi tartozik az aritmetikai egység (ALU környezet) fő részei közé a tétel szerint?",
        options: [
          "Csak a szűk értelemben vett ALU és a memória",
          "Regiszterek, adatutak, kapcsolópontok, szűk értelemben vett ALU",
          "Vezérlőegység, MMU, cache és DMA",
          "Csak regiszterek és a buszrendszer",
        ],
        answerIndex: 1,
        explanation:
          "A tétel szerint az aritmetikai egység felépítésében regiszterek, adatutak, kapcsolópontok és a szűk értelemben vett ALU szerepel.",
      },
  
      {
        id: "q2",
        type: "single",
        prompt: "Miért NEM azonos az adatút a busszal?",
        options: [
          "Mert az adatút kizárólag a memóriát köti össze az I/O-val",
          "Mert az adatút a belső egységek (regiszterek, kapcsolópontok, ALU) összekötésére szolgál",
          "Mert a busz csak egyirányú, az adatút pedig kétirányú",
          "Mert a busz csak lebegőpontos adatokhoz használható",
        ],
        answerIndex: 1,
        explanation:
          "A tétel kiemeli: az adatút a belső egységek összekötésére szolgál, ezért nem azonos a busszal.",
      },
  
      {
        id: "q3",
        type: "single",
        prompt: "Mit jelent a tételben az az állítás, hogy „az adatutakon egyszerre egy adat lehet” (egyszerű adatút esetén)?",
        options: [
          "Minden órajelben egyszerre több operandus is áramolhat",
          "A regiszterek nem tudnak írni az adatutakra",
          "Egyszerre csak egy forrás lehet aktív, ezért 1 operandus betöltése 1 órajelciklus",
          "Az adatút csak 1 bites adatot tud vinni",
        ],
        answerIndex: 2,
        explanation:
          "Egyszerű adatút esetén egyszerre egy adat lehet a vonalon, így egy operandus betöltése tipikusan 1 ciklus.",
      },
  
      {
        id: "q4",
        type: "single",
        prompt: "Mi a különbség a 2 és 3 adatutas megoldás között a tétel szerint?",
        options: [
          "2 adatút: az eredmény azonnal visszaírható; 3 adatút: nem",
          "2 adatút: operandusok egy ciklus alatt tölthetők; 3 adatút: az eredmény is egyből visszaírható",
          "2 adatút: csak olvasás; 3 adatút: csak írás",
          "Nincs különbség, csak elnevezés",
        ],
        answerIndex: 1,
        explanation:
          "A tétel alapján 2 adatútnál gyorsabb az operandusok betöltése, 3 adatútnál pedig az eredmény is rögtön visszaírható.",
      },
  
      {
        id: "q5",
        type: "single",
        prompt: "Mi a kapcsolópontok (kapuk) szerepe?",
        options: [
          "A memóriaoldali címdekódolás elvégzése",
          "Csak a szükséges regiszter kapujának nyitása, a többi zárása",
          "A műveleti kód (opcode) értelmezése",
          "Az ALU órajelének generálása",
        ],
        answerIndex: 1,
        explanation:
          "Kapcsolópontok gondoskodnak róla, hogy egyszerre csak a megfelelő regiszter „legyen rákötve” az adatútra.",
      },
  
      {
        id: "q6",
        type: "single",
        prompt: "Mi jellemző a bemeneti és kimeneti kapcsolók állapotaira a tétel szerint?",
        options: [
          "Bemeneti: 3 állás (1/0/zárt), kimeneti: 2 állás (nyitott/zárt)",
          "Mindkettő: 4 állás",
          "Bemeneti: 2 állás (nyitott/zárt), kimeneti: 3 állás (1/0/zárt)",
          "Bemeneti: csak zárt lehet, kimeneti: csak nyitott lehet",
        ],
        answerIndex: 2,
        explanation:
          "A tételben: bemeneti kapcsoló kétállású (nyit/zár), kimeneti háromállású (1, 0 vagy zárt).",
      },
  
      {
        id: "q7",
        type: "single",
        prompt: "Mi az 1 bites félösszeadó kimeneteinek (S és C) tipikus logikai alakja?",
        options: [
          "S = A AND B; C = A XOR B",
          "S = A XOR B; C = A AND B",
          "S = A OR B; C = A XOR B",
          "S = NOT(A XOR B); C = A OR B",
        ],
        answerIndex: 1,
        explanation:
          "Félösszeadónál S a kizáró-vagy (XOR), a carry pedig A AND B.",
      },
  
      {
        id: "q8",
        type: "single",
        prompt: "Miért „nem teljes” a félösszeadó?",
        options: [
          "Mert nem tud kivonni",
          "Mert nem foglalkozik a beérkező átvitellel (Cin)",
          "Mert csak párhuzamosan működik",
          "Mert mindig 2 ciklust igényel",
        ],
        answerIndex: 1,
        explanation:
          "A félösszeadó nem kezeli a korábbi helyiértékből érkező carry-t (Cin).",
      },
  
      {
        id: "q9",
        type: "single",
        prompt: "Hogyan állítható elő 1 bites teljes összeadó két félösszeadóval (tétel logikája szerint)?",
        options: [
          "A és B összeadása után az S-hez adjuk Cin-t; a carry-kat megfelelően összekombináljuk",
          "A és B XOR-ozása után az eredményt mindig eldobjuk",
          "Cin-t hozzáadjuk A-hoz, majd az eredményt OR-oljuk B-vel",
          "Nem lehet két félösszeadóval megvalósítani",
        ],
        answerIndex: 0,
        explanation:
          "Először A+B, majd a kapott S és Cin összeadása, a carry-k pedig megfelelően kombinálódnak.",
      },
  
      {
        id: "q10",
        type: "single",
        prompt: "Mi a ripple-carry (n-bites párhuzamos) összeadó fő hátránya?",
        options: [
          "Nem tud összeadni, csak kivonni",
          "Az átvitel bitről bitre „végigfut”, ezért a késleltetés nő n-nel",
          "Túl kevés hardvert használ, ezért pontatlan",
          "Csak soros regiszterekkel működik",
        ],
        answerIndex: 1,
        explanation:
          "Ripple-carry esetén a carry terjedése láncszerű, így a késleltetés a bitek számával nő.",
      },
  
      {
        id: "q11",
        type: "single",
        prompt: "Mit jelent CLA (Carry Look Ahead) esetén a Generate (G) jel egy bithelyen?",
        options: [
          "Azt, hogy a carry biztosan továbbterjed",
          "Azt, hogy a bithely önmaga előállít carry-t (tipikusan Ai AND Bi)",
          "Azt, hogy az összegbit mindig 1 lesz",
          "Azt, hogy nincs szükség Cin-re",
        ],
        answerIndex: 1,
        explanation:
          "Generate: a bithely „létrehozza” a carry-t (klasszikusan Ai ∧ Bi).",
      },
  
      {
        id: "q12",
        type: "single",
        prompt: "Mit jelent CLA esetén a Propagate (P) jel a tétel alapján?",
        options: [
          "A carry terjesztését jelzi (ha bejön carry, továbbmehet a következő helyiértékre)",
          "A carry törlését jelzi",
          "Azt jelzi, hogy a bithely mindenképp generál carry-t",
          "Azt jelzi, hogy az S bit mindig 0",
        ],
        answerIndex: 0,
        explanation:
          "Propagate: jelzi, hogy az átvitel továbbterjedhet a következő helyiértékre.",
      },
  
      {
        id: "q13",
        type: "single",
        prompt: "Miért gyorsabb a CLA összeadó a ripple-carryhoz képest?",
        options: [
          "Mert egyáltalán nem számol carry-t",
          "Mert előre jelzi / párhuzamos logikával számolja az átviteleket, nem sorban várja meg",
          "Mert soros összeadó elvén működik",
          "Mert kevesebb kaput használ mindig",
        ],
        answerIndex: 1,
        explanation:
          "A CLA az átviteleket előre, kombinációs logikával számolja, így csökken a láncszerű késleltetés.",
      },
  
      {
        id: "q14",
        type: "single",
        prompt: "Miért igényel a szorzás tipikusan több bitet az eredmény tárolásához?",
        options: [
          "Mert a szorzás mindig lebegőpontos művelet",
          "Mert n bites × n bites esetén akár 2n bites eredmény is lehet",
          "Mert az ALU csak duplázással tud szorozni",
          "Mert a carry bitek elvesznek",
        ],
        answerIndex: 1,
        explanation:
          "Fixpontos szorzásnál két n bites szám szorzata akár 2n bitet is igényelhet (pl. 8×8 → 16 bit).",
      },
  
      {
        id: "q15",
        type: "single",
        prompt: "Mi a bitcsoportos (pl. 2 bites) szorzás ötlete a tétel szerint?",
        options: [
          "A szorzandót mindig 1-gyel növeljük",
          "A szorzót csoportokra bontjuk, és a részeredményeket gyűjtőregiszterbe adjuk, léptetésekkel",
          "A szorzást teljesen kiváltjuk kivonással",
          "A szorzót mindig 1 bitesre rövidítjük",
        ],
        answerIndex: 1,
        explanation:
          "Bitcsoportos szorzásnál a szorzót csoportokra osztjuk, és a megfelelően léptetett részeredményeket egy gyűjtőregiszterbe összegezzük.",
      },
  
      {
        id: "q16",
        type: "single",
        prompt: "Mi a Booth-algoritmus alapötlete a tétel megfogalmazása szerint?",
        options: [
          "A sok 1-est próbálja „eltüntetni”/kompaktálni, a közeli 2-hatványokhoz viszonyítva",
          "Csak páratlan számok szorzására használható",
          "A szorzást bináris osztásra vezeti vissza",
          "Mindig csak összeadást használ, léptetés nélkül",
        ],
        answerIndex: 0,
        explanation:
          "A Booth-féle megközelítés célja, hogy a szorzóban lévő hosszú 1-es sorozatokat hatékonyabban kezelje (kompaktabb műveletsor).",
      },
    ],
  };
  