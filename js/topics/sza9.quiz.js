// js/topics/sza9.quiz.js
export const quiz = {
    topicId: "sza9",
    questions: [
      {
        id: "q1",
        type: "single",
        prompt: "Mi a megszakítás (interrupt) fogalma a tétel szerint?",
        options: [
          "A processzor órajelének megváltoztatása",
          "A feldolgozás szempontjából váratlannak tekinthető események kezelésére szolgáló művelet(ek)",
          "Egy program futásának végleges leállítása",
          "Csak külső perifériák jelzéseinek kezelése",
        ],
        answerIndex: 1,
        explanation:
          "A tételben: megszakítás = váratlannak tekinthető események kezelésére szolgáló művelet(ek).",
      },
  
      {
        id: "q2",
        type: "single",
        prompt: "Mi tárolódik megszakításkor?",
        options: [
          "Csak a programkód",
          "A kontextus (állapotjelzők és regiszterek tartalma)",
          "A teljes memória",
          "Csak az I/O puffer",
        ],
        answerIndex: 1,
        explanation:
          "A tételben: kontextus mentése történik (állapotjelzők + regiszterek).",
      },
  
      {
        id: "q3",
        type: "single",
        prompt: "Melyik NEM megszakítási ok/forrás a felsorolás szerint?",
        options: [
          "Géphibák / energiaellátás (pl. túlmelegedés)",
          "I/O források (perifériák megszakításkérő jelei)",
          "Külső források (pl. hálózati kommunikáció, reset gomb)",
          "Cache hit arány romlása",
        ],
        answerIndex: 3,
        explanation:
          "A tételben okok/források: géphibák, I/O, külső, programozási források. Cache hit arány nem szerepel.",
      },
  
      {
        id: "q4",
        type: "single",
        prompt: "A programozási források közül melyik szerepel a tételben?",
        options: [
          "Szándékos: rendszerhívás / BIOS rutinok / operációs rendszer rutinok",
          "Csak hálózati megszakítások",
          "Csak hőmérséklet jelzések",
          "Csak DMA megszakítás",
        ],
        answerIndex: 0,
        explanation:
          "Programozási források: szándékos (system call, BIOS, OS rutinok) és hibakeresés (debug).",
      },
  
      {
        id: "q5",
        type: "single",
        prompt: "Melyik hiba generálhat megszakítást a tétel szerint?",
        options: [
          "Memóriavédelem megsértése",
          "CPU órajel túl alacsony",
          "Helyes indexelés tömbben",
          "Gyorsító tár kiürülése",
        ],
        answerIndex: 0,
        explanation:
          "A tételben felsorolt hibák között szerepel a memóriavédelem megsértése.",
      },
  
      {
        id: "q6",
        type: "single",
        prompt: "A tétel szerint melyik tartozik az aritmetikai-logikai műveletek miatti megszakításokhoz?",
        options: [
          "Túlcsordulás, alulcsordulás",
          "Virtuális cím fordítása",
          "Regiszterablak átfedés",
          "I/O címterek összevonása",
        ],
        answerIndex: 0,
        explanation:
          "Példák: overflow/underflow (túlcsordulás/alulcsordulás).",
      },
  
      {
        id: "q7",
        type: "single",
        prompt: "Mit jelent az INTR (Interrupt Request) a szoftveres folyamatleírásban?",
        options: [
          "A CPU visszajelzése, hogy elfogadta a megszakítást",
          "Megszakításkérés vezérlőjel",
          "A kontextus mentése a verembe",
          "A megszakítás maszkolása",
        ],
        answerIndex: 1,
        explanation:
          "INTR = Interrupt Request (megszakításkérés vezérlőjel).",
      },
  
      {
        id: "q8",
        type: "single",
        prompt: "Mi történik a tétel szerinti folyamatban azután, hogy a CPU befejezi az aktuális utasítást?",
        options: [
          "Azonnal újraindítja a gépet",
          "Utasítás töréspontban megvizsgálja, hogy a megszakítás elfogadható-e",
          "Kikapcsolja az összes perifériát",
          "Átállítja a címsínt 0-ra",
        ],
        answerIndex: 1,
        explanation:
          "A tételben: a vezérlőegység utasítás töréspontban dönt az elfogadhatóságról.",
      },
  
      {
        id: "q9",
        type: "single",
        prompt: "Mivel jelzi a CPU, hogy elfogadható a megszakítás?",
        options: [
          "INTR aktiválásával",
          "Interrupt Acknowledge vezérlővonal aktiválásával",
          "A PC növelésével",
          "ALU flag törlésével",
        ],
        answerIndex: 1,
        explanation:
          "Elfogadás jelzése: Interrupt Acknowledge vezérlővonal aktiválása.",
      },
  
      {
        id: "q10",
        type: "single",
        prompt: "A tétel szerint mi történik a hardveres részben?",
        options: [
          "Kontextus mentése verem tárolóba",
          "A programkód törlése",
          "A cache teljes ürítése",
          "A memória-tér növelése",
        ],
        answerIndex: 0,
        explanation:
          "Hardveres rész: kontextus mentése verembe; megszakítási áramkör kapcsolódik a CPU INT bemenetére.",
      },
  
      {
        id: "q11",
        type: "single",
        prompt: "Mikor jut érvényre egy megszakítás a tétel szerint?",
        options: [
          "Mindig azonnal, függetlenül mindentől",
          "Ha megszakítható a futó folyamat, megfelelő a prioritás, és nincs maszkolva",
          "Csak ha a memória tele van",
          "Csak ha a felhasználó kéri",
        ],
        answerIndex: 1,
        explanation:
          "Három feltétel: megszakíthatóság, prioritás, maszkolás (nincs letiltva).",
      },
  
      {
        id: "q12",
        type: "single",
        prompt: "Mit jelent a maszkolható megszakítás?",
        options: [
          "Nem letiltható (pl. hardverhiba)",
          "Letiltható",
          "Mindig magasabb prioritású",
          "Csak debug esetén működik",
        ],
        answerIndex: 1,
        explanation:
          "Maszkolható = letiltható. Nem maszkolható = nem letiltható (pl. hardverhiba).",
      },
  
      {
        id: "q13",
        type: "single",
        prompt: "Szinkron megszakításra melyik példa szerepel a tételben?",
        options: [
          "Hálózati csomag érkezése",
          "0-val osztás",
          "Periféria üzenetküldés",
          "Reset gomb megnyomása",
        ],
        answerIndex: 1,
        explanation:
          "Szinkron: mindig ugyanott lép fel (példa: 0-val osztás).",
      },
  
      {
        id: "q14",
        type: "single",
        prompt: "Aszinkron megszakítás jellemzője a tétel szerint:",
        options: [
          "Mindig ugyanott lép fel",
          "Véletlenszerűen bármikor felléphet",
          "Csak programozó kérése lehet",
          "Csak utasítások között léphet fel",
        ],
        answerIndex: 1,
        explanation:
          "Aszinkron: véletlenszerűen bármikor felléphet.",
      },
  
      {
        id: "q15",
        type: "single",
        prompt: "Mit jelent az egyszintű megszakítás a tétel szerint?",
        options: [
          "A megszakításokhoz osztályokat és típusokat rendelünk",
          "Megszakítás közben is elfogadható újabb megszakítás",
          "Ha megszakítás érvényre jut, nincs mód újabb megszakítás elfogadására a visszatérésig",
          "Mindig három prioritási szint van",
        ],
        answerIndex: 2,
        explanation:
          "Egyszintű: amíg nem térünk vissza normál állapotba, nincs új megszakítás elfogadás.",
      },
  
      {
        id: "q16",
        type: "single",
        prompt: "Mit jelent a többszintű megszakítás a tétel szerint?",
        options: [
          "A megszakításokat nem lehet prioritás szerint rendezni",
          "A megszakításokhoz prioritási szinteket rendelnek",
          "Csak egyféle megszakítás létezik",
          "Csak nem maszkolható megszakítások vannak",
        ],
        answerIndex: 1,
        explanation:
          "Többszintű: prioritási szintek vannak (pl. 3 szint).",
      },
  
      {
        id: "q17",
        type: "single",
        prompt: "Mit jelent a többszintű, többrendű rendszer (a tétel szerint)?",
        options: [
          "Ma már nem használják",
          "A megszakítási forrásokat osztályozzák, azon belül megszakítás típusok vannak; osztályon belül egyszintű prioritás",
          "Minden megszakítás ugyanabba az osztályba tartozik",
          "Csak szoftveres megszakítások vannak",
        ],
        answerIndex: 1,
        explanation:
          "A tételben: ma is ezt használják; osztályok + típusok (pl. 1,2,3 és 1a,1b,1c), osztályon belül egyszintű prioritás.",
      },
  
      {
        id: "q18",
        type: "single",
        prompt: "A tétel szerint lehet-e megszakítást megszakítani?",
        options: [
          "Nem, soha",
          "Igen, lehet megszakítani akár megszakítást is",
          "Csak egyszintű rendszerben",
          "Csak nem maszkolható megszakításnál",
        ],
        answerIndex: 1,
        explanation:
          "A tételben szerepel: lehet megszakítani az éppen futó folyamatot (akár megszakítást is).",
      },
    ],
  };
  