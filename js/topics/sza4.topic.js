// js/topics/sza4.topic.js
// SzA4 – Az aritmetikai egységek felépítése I.

export const topic = {
    id: "sza4",
    code: "SzA4",
    title: "Az aritmetikai egységek felépítése I.",
    html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA4</b>
    </div>
    <div class="muted">
      (az aritmetikai egység részei, adatutak, kapcsolópontok, ALU; az 1 bites fél és
      teljes összeadó, az n-bites soros összeadó, az n-bites párhuzamos összeadó,
      valamint az előrejelzett átvitellel felépített n-bites összeadó, a fixpontos szorzás
      algoritmusai és gyorsítási lehetőségek)
    </div>
  </div>
  
  <h2>Aritmetikai egység részei</h2>
  
  <p>
    Az Aritmetikai Logikai Egység (Arithmetic Logic Unit, avagy ALU) tartalmaz regisztereket,
    adatutakat, kapcsolópontokat és a szűk értelemben vett ALU-t.
  </p>
  
  <h3>Regiszterek</h3>
  
  <ul>
    <li>Látható</li>
    <li>Univerzális</li>
    <li>Dedikált</li>
    <li>Transzparens</li>
  </ul>
  
  <p>
    Adatfeldolgozáshoz használt pufferregiszterek, hivatkozni nem lehet rájuk,
    de számításba kell venni ezeket is
  </p>
  
  <h3>Adatutak</h3>
  
  <p>
    Ez nem egyenlő a busszal! Feladatuk az ALU részeinek összekötése (regiszterek,
    kapcsolópontok és szűk értelemben vett ALU).
  </p>
  
  <p>
    Egy adatút esetén arra van kötve a regiszter kimenete és bemenete is. A regiszterek ki és
    bemenetére egy tranzisztort kell kötni, ami kapcsolóként funkcionál. Az adatutakon egyszerre
    egy adat lehet, ami egyszerű, olcsó, de lassú megoldás. 1 operandus betöltése 1 órajelciklus.
  </p>
  
  <p>
    Két adatút esetén egy órajelciklus alatt feltölthetők az operandus regiszterek.
  </p>
  
  <p>
    Három adatút esetén pedig az eredmény is egyből visszaírható.
  </p>
  
  <h3>Kapcsolópontok</h3>
  
  <p>
    Azért felelnek, hogy csak a szükséges regiszter kapuja legyen nyitva, a többi zárva.
    Önálló vezérlésük van, a regiszterek részei. Általában tranzisztorok. Bemeneti kapcsoló
    esetén két állás: nyitott vagy zárt, kimeneti esetén három állás: 1, 0 vagy zárt.
  </p>
  
  <h3>Szűk értelemben vett ALU</h3>
  
  <p>
    A legalapvetőbb művelet az összeadás. Tudni kell kivonni, szorozni és osztani is, de minden
    művelet visszavezethető összeadásokra. Ezeket a műveleteket kell elvégeznie (még FX, FP, BCD esetén is),
    de vannak olyan műveletei, mint eltolás, negálás, léptetés és különböző logikai műveletek.
  </p>
  
  <h3>1 bites félösszeadó</h3>
  
  <p>
    Két bemeneti operandus van, egy A és egy B. A művelet legyen A + B. Ebből lesz egy kimeneti S,
    illetve egy C (carry). Ha túlcsordulás van, akkor a C = 1. Ez ugye csak akkor van, ha A és B is 1,
    tehát A és B = C. S pedig akkor lesz 1, ha A + B értéke 1. Ez akkor következhet csak be, ha vagy csak az A,
    vagy csak a B = 1. Tehát S = A xor B (kizáró vagy).  Minden más esetben az S = 0 lesz. Igazságtáblán jól látható.
  </p>
  
  <figure class="figure">
    <img src="https://i.ibb.co/dJHPmF7b/sza4-img7.png" alt="sza4-img7" />
  </figure>
  
  <p>
    Ez attól nem teljes összeadó még, hogy nem foglalkozik beérkező C(in) bittel, tehát egy előző összeadás eredményével.
    Ahhoz, hogy ezt kezelni tudjuk, teljes összeadóra van szükségünk.
  </p>
  
  <h3>1 bites teljes összeadó</h3>
  
  <p>
    Megvalósítható két félösszeadóval vagy logikai kapukból építhetünk sajátot.
  </p>
  
  <h3>Két félösszeadóval</h3>
  
  <figure class="figure">
    <img src="https://i.ibb.co/gLGNJMnt/sza4-img5.png" alt="sza4-img5" />
  </figure>
  
  <p>
    Látjuk, hogy a C(in) az egy előző számításból érkezik (egy előző számítás C(out)-ja).
    Először (első órajel) elvégezzük az A+B-t a félösszeadónkkal, majd a kapott eredményt (S)
    összeadjuk a C(in)-nel szintén félösszeadóval. Majd annak a C(out) bitjét egy XOR kapuba tesszük
    az eredeti A+B összeadás C(out)-jával.
  </p>
  
  <p>
    Itt azért van XOR kapu, mert vagy csak C’ vagy csak C’’ lehet 1. (C’ ugye csak akkor 1, ha A=1 és B=1.
    Ilyenkor S’ viszont 0 (mert túlcsordulás volt az első félösszeadónál). S’ és C(in) összeadásánál pedig,
    ha S’ = 0, akkor hiába C(in) = 1, akkor is C’’ = 0, mert nem lesz túlcsordulás.)
  </p>
  
  <p>
    Itt is érdemes megnézni az igazságtáblát, hogy lássuk jól.
  </p>
    <figure class="figure">
    <img src="https://i.ibb.co/jBr1yvw/sza4-img3.png" alt="sza4-img3" />
  </figure>
  

  
  <h3>Teljes összeadó kapukkal</h3>
  
  <figure class="figure">
    <img src="https://i.ibb.co/twdbFLCF/sza4-img1.png" alt="sza4-img1" />
  </figure>
  
  <p>
    Segítség hozzá: az igazságtáblából látjuk, hogy a C(out) csak akkor lehet 1, ha vagy A és B,
    vagy A és C(in), vagy B és C(in) valamelyike 1. Ezért van ott 3 AND kapu és utána pedig valamelyik legyen 1 legalább,
    akkor meg összekötve egy OR kapuval.
  </p>
  
  <p>
    Közben párhuzamosan számoljuk az S-t is. Ha logikai átalakításokat használtunk volna, megkaptuk volna,
    hogy S = (A xor B) xor C(in). Ezt az igazságtáblából is igazolhatjuk, hogy S akkor lehet 1, ha vagy csak A,
    vagy csak B, vagy csak C(in) = 1, vagy mindhárom pontosan 1. Ez pedig pontosan a leírt egyenlőség.
  </p>
  
  <p>
    Így tehát S-hez szükség van egy A xor B és egy ennek a kimenetére és a C(in)-re kötött xor kapura.
    Tehát itt is két ütemben történik minden, ahogy az ábrán is látszik. 2 órajelciklus kell hozzá csak – köszönhetően az átalakításoknak.
  </p>
  

  
  <h3>N-bites soros összeadó</h3>
  
  <p>
    A feladat az 2 db n bites regiszter tartalmának összeadása. A és B két darab n bites léptető regiszter,
    és a két összeadandó számot tárolják. A soros összeadó egymás után, bitről bitre végzi az összeadást,
    egy bitet egy időben, kezdve a legkisebb helyiértékű bittel, és haladva a legnagyobb helyiértékű bit felé.
    A bemeneti bitek (Ai és Bi) és az előző helyiértékből származó átviteli bit (Cin) egy összeadóba kerülnek,
    amely kiszámítja az adott bit pozícióra vonatkozó összeget (S) és az új átviteli bitet (Cout).
    Az előző helyiértékből származó átviteli bit (Cout) lesz a következő bit helyiértékének a bemeneti átviteli bitje (Cin).
    Ez biztosítja, hogy a magasabb helyiértékekhez tartozó átviteli bit figyelembe legyen véve a következő összeadásnál.
    A Flip-Flop, egy 1 bites késleltető/tároló, melynek a feladata a szinkronizálás, ő hozza át a következő helyiértékre
    az előző helyiérték carry-jét. Maga az összeadó n*t idő alatt fut le, ez egy lassú megvalósítás, de kevés hardver erőforrást igényel.
    Kivonás esetén elég az egyik regiszter aktuális bitjét negálni és a Cin-re igaz értéket küldeni.
  </p>

    <figure class="figure">
    <img src="https://i.ibb.co/xtqtp3pM/sza4-img9.png" alt="sza4-img9" />
  </figure>
  

  
  <h3>N-bites párhuzamos összeadó (Ripple Carry Adder)</h3>
  
  <p>
    Ez az összeadó egyszerre dolgozza fel az összes bitet, ellentétben a soros összeadóval, ahol a bitek egyenként kerülnek feldolgozásra.
    Itt a sebesség a fő előny, mivel az összes bit egyidejűleg kezelhető, cserébe több hardverelemet igényel.
    Ai és Bi az összeadandó számok bitjei, minden bitpárt egy önálló összeadóegység dolgoz fel párhuzamosan a többivel.
    Az összeadó egységek az Ai és Bi bemeneti biteken kívül fogadnak egy Cin bemeneti átviteli bitet.
    Az összeadó egység kiszámítja az összegbitet (Si) és a kimeneti átviteli bitet (Cout), amely a következő magasabb helyiértékű bit összeadásához szükséges.
    Az összeadók kimenetei (Si) alkotják a végső összeg biteit, a legkisebb helyiértéktől (legjobb oldalon) a legnagyobb helyiértékig (bal oldalon).
  </p>

    <figure class="figure">
    <img src="https://i.ibb.co/PsJNSbjs/sza4-img8.png" alt="sza4-img8" />
  </figure>
  

  
  <h3>Előrejelzett átvitellel felépített teljes összeadó</h3>
  
  <p>
    Carry Look Ahead (CLA) átvitelképzés jellemzi.
  </p>
  
  <h3>Carry logika</h3>
  
  <figure class="figure">
    <img src="https://i.ibb.co/svSrjXZ8/sza4-img6.png" alt="sza4-img6" />
  </figure>


  <p>
    AND: szorzás, OR: összeadás
  </p>
  
  <p>
    AB (A AND B)=G (Generate) - létrehozza a carryt
  </p>
  
  <p>
    A+B (A OR B)=P (Propagate/Terjesztés) - terjeszti a carryt
  </p>
  
  <p>
    Ai és Bi az összeadandó bitpárok. A Generate (Gi) előállítja az átviteleket az Ai és a Bi alapján (mindkét bemeneti bit 1).
    A Propagate (Pi) jelzi, hogyha az átviteli bit tovább terjed a következő helyiértékre (bármelyik bemeneti bit 1).
    Ha például a C3 kimenetet számoljuk az előző helyiértékek alapján, ha a P3 és a G3 értéke igaz (1), akkor C3 is 1 lesz,
    ami azt jelenti, hogy a harmadik helyiértéken is lesz átvitel. A CLA összeadó képes előrejelzeni az átviteli biteket azáltal,
    hogy megvizsgálja a bemeneti bitpárokat és azok átviteli viszonyait. Ezáltal az átviteli lánc késése jelentősen csökken,
    mivel nem kell megvárni minden egyes bit feldolgozását, hanem az átviteli információk gyorsabban propagálódnak az összeadó egész hosszában.
    Ez a módszer jelentősen gyorsítja a párhuzamos összeadást, különösen nagyobb bites számok esetében.
    Pl.: 3 ciklus alatt megvalósul az összeadás 8 bit esetén.
  </p>
  
  <h2>A fixpontos szorzás algoritmusai és gyorsítási lehetőségek</h2>
  
  <p>
    A szorzás alapját az összeadás adja, viszont egy komplexebb formában. Kell összeadás, invertálás és léptetés.
    A szorzást ezért szakosodott végrehajtóegységek végzik ma már. Egy emberi FX összeadás (sokáig használtak hasonlót a processzorokban):
  </p>
  
  <figure class="figure">
    <img src="https://i.ibb.co/bMSB5bkt/sza4-img4.png" alt="sza4-img4" />
  </figure>
  
  <p>
    Szorzás esetén az eredmény általában jóval több bit helyet foglal, pl.: 8bit*8bit esetén akár 16 bit is lehet az eredmény,
    aminek a tárolását meg kell oldani. Hogyan lehetne ezt gyorsítani?
  </p>
  
  <h3>Bitcsoporttal történő szorzás</h3>
  
  <p>
    A szorzót 2 bites csoportokra osztjuk. Létrehoztak egy gyűjtőregisztert és mindig ahhoz adták hozzá a részeredményeket shiftelés után.
  </p>

    <figure class="figure">
    <img src="https://i.ibb.co/pjq9ZhMS/sza4-img2.png" alt="sza4-img2" />
  </figure>
  
  

  
  <p>00: Nem kell a szorzandót a gyűjtőhöz adni, csak 2-t léptetünk balra.</p>
  <p>01: Gyűjtőhöz az 1x-esét adjuk hozzá és 2-t léptetünk balra.</p>
  <p>10: Kétszeresét adjuk hozzá és 2-t léptetünk balra.</p>
  <p>11: Négyszeresét adjuk hozzá és kivonjuk az egyszeresét.</p>
  
  <p>
    Ha a szorzóban sok az egyes, akkor lassú a szorzás, így jött a:
  </p>
  
  <h3>Booth féle algoritmus</h3>
  
  <p>
    El akarjuk tüntetni a sok egyest, így azt vizsgáljuk, melyik a hozzá legközelebbi szám (2 hatvány?), hogy ezt megtehessük.
  </p>

    <figure class="figure">
    <img src="https://i.ibb.co/rR1kGtH8/sza4-img10.png" alt="sza4-img10" />
  </figure>
    `,
  };
  