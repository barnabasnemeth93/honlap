// js/topics/sza10.quiz.js
export const quiz = {
  topicId: "sza10",
  questions: [
    {
      id: "q1",
      type: "single",
      prompt: "Mi alapján történik a Flynn-féle architektúra-osztályozás?",
      options: [
        "A pipeline fokozatok száma alapján",
        "Az utasítás- és adatfolyamok számossága szerint",
        "A gyorsítótár szintek száma szerint",
        "A regiszterek bitszélessége szerint",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint Flynn az utasításfolyam (SI/MI) és adatfolyam (SD/MD) számossága alapján osztályoz.",
    },
    {
      id: "q2",
      type: "single",
      prompt: "Mi a Flynn-féle osztályozás legfőbb korlátja a tétel szerint?",
      options: [
        "Nem mutatja a párhuzamosság módját",
        "Nem használható egyprocesszoros gépeknél",
        "Nem kezeli a memóriát",
        "Nem működik RISC rendszereknél",
      ],
      answerIndex: 0,
      explanation:
        "A tétel kiemeli: a modell egyszerű, de nem mutatja meg, hogyan valósul meg a párhuzamosság.",
    },
    {
      id: "q3",
      type: "single",
      prompt: "A modern (korszerű) osztályozás milyen két nagy csoportot különböztet meg?",
      options: [
        "SISD és MIMD",
        "Adatpárhuzamos és funkcionálisan párhuzamos architektúrák",
        "CISC és RISC",
        "Memória-központú és regiszter-központú",
      ],
      answerIndex: 1,
      explanation:
        "A tétel szerint a modern osztályozás a párhuzamosság módja alapján adatpárhuzamos és funkcionálisan párhuzamos rendszereket különít el.",
    },
    {
      id: "q4",
      type: "single",
      prompt: "Melyik felsorolás tartalmaz kizárólag adatpárhuzamos architektúrákat a tétel szerint?",
      options: [
        "Vektor, asszociatív/neurális, szisztolikus, SIMD",
        "ILP, SMT, folyamat szintű párhuzamosság",
        "Futószalag, szuperskalár, VLIW",
        "SMT, SIMD, ILP",
      ],
      answerIndex: 0,
      explanation:
        "Adatpárhuzamos: vektor, asszociatív/neurális, szisztolikus, SIMD. Az ILP/SMT a funkcionális párhuzamossághoz tartozik.",
    },
    {
      id: "q5",
      type: "single",
      prompt: "Mit jelent az adatfüggőség fogalma a tétel megfogalmazása szerint?",
      options: [
        "Két utasítás ugyanazt a vezérlőjelet kapja",
        "Egymást követő utasítások ugyanazt az adatot használják",
        "Utasítások azonos műveleti kóddal futnak",
        "A program ciklust tartalmaz",
      ],
      answerIndex: 1,
      explanation:
        "A tétel definíciója: adatfüggőség, ha egymást követő utasítások ugyanazt az adatot használják.",
    },
    {
      id: "q6",
      type: "single",
      prompt: "Melyik adatfüggőség tekinthető valós adatfüggőségnek a tétel szerint?",
      options: ["WAR", "WAW", "RAW", "névütközés"],
      answerIndex: 2,
      explanation:
        "Valós adatfüggőség: RAW (Read After Write) — az olvasás egy még el nem készült eredményt igényel.",
    },
    {
      id: "q7",
      type: "single",
      prompt: "Mi történik tipikusan RAW adatfüggőség esetén futószalagos végrehajtásban?",
      options: [
        "Elakadás (stall), várakozás következik be",
        "A vezérlés automatikusan kihagyja az utasítást",
        "A függőség mindig megszűnik NOP nélkül is",
        "A CPU átáll MISD módba",
      ],
      answerIndex: 0,
      explanation:
        "A tétel szerint a RAW miatt az utasítás nem folytatható, amíg a függőség fel nem oldódik → elakadás/várakozás, csökken a hatékonyság.",
    },
    {
      id: "q8",
      type: "single",
      prompt: "Melyik megoldás szerepel a tételben RAW kezelésére (és nem csak „időhúzás”)?",
      options: [
        "Operandus előrehozás (forwarding)",
        "A regiszterek számának csökkentése",
        "Csak NOP utasítások beszúrása",
        "A program átírása assembly-re",
      ],
      answerIndex: 0,
      explanation:
        "A tétel kiemeli az operandus előrehozást: extra hardverrel az eredmény visszavezethető, így megspórolható a W/B várása (a visszaírás ettől még megtörténik).",
    },
    {
      id: "q9",
      type: "single",
      prompt: "Mi a WAR (write after read) probléma lényege a tételben szereplő értelmezés szerint?",
      options: [
        "Két utasítás ugyanabba a regiszterbe ír, és összekeveri az eredményt",
        "Egy gyorsabb írás felülírhat egy olyan regisztert, amit egy lassabb utasítás még olvasna",
        "Az olvasás később történik, mint a visszaírás, ezért nincs gond",
        "Csak memóriaoperandusoknál fordul elő",
      ],
      answerIndex: 1,
      explanation:
        "WAR-nál a későbbi utasítás írása (ha gyorsabb) túl korán felülírhatja azt a regisztert, amit az előző (lassabb) utasítás még olvasna → sérülhet a szekvenciális konzisztencia.",
    },
    {
      id: "q10",
      type: "single",
      prompt: "Mi a tételben szereplő megoldás WAR és WAW (ál-adatfüggőségek) megszüntetésére?",
      options: [
        "Átnevezési regiszterek használata",
        "NOP beszúrás minden írás elé",
        "PC felülírás",
        "Cache méretének növelése",
      ],
      answerIndex: 0,
      explanation:
        "A tétel szerint WAR és WAW ál-adatfüggőségek, amelyek átnevezési regiszterekkel kezelhetők (programozó számára transzparens, extra hardver).",
    },
  ],
};
