// js/topics/sza1.topic.js
// SzA1 – Az utasításszintű (logikai) architektúra

export const topic = {
  id: "sza1",
  code: "SzA1",
  title: "Az utasításszintű (logikai) architektúra",
html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA1</b>
    </div>
    <div class="muted">
      (fogalma; kapcsolatai, alapvető fajtái, jellemzői, csoportosításuk, a Neumann-féle és 
      az adatfolyam számítási modell; az architektúra fogalma, a processzor szintű logikai 
      és fizikai architektúra)
    </div>
  </div>


    <h2>1. A számítási modell (SzM)</h2>

    <p>
      <b>Fogalma:</b> A számítási modell a számításra vonatkozó alapelvek egy absztrakciója.
    </p>

    <h3>Kapcsolati és kronológia</h3>
    <ol>
      <li><b>Számítási modell:</b> Meghatározza az igényeket.</li>
      <li><b>Programozási nyelv:</b> Kielégíti a modell igényeit.</li>
      <li>
        <b>Architektúra:</b> A számítási modell konkrét implementációja,
        amely képes végrehajtani a nyelv utasításait.
      </li>
    </ol>

    <h3>Alapvető fajtái</h3>
    <ul>
      <li>Logikai</li>
      <li>Fizikai (később tárgyaljuk)</li>
    </ul>

    <h3>Alapvető jellemzői (absztrakciós szempontok)</h3>
    <ul>
      <li><b>Min hajtjuk végre?</b> (pl. adatokon, objektumokon)</li>
      <li><b>Hogyan képezzük le a feladatot?</b> (pl. utasítássorozattal, gráffal)</li>
      <li><b>Mi vezérli a végrehajtás sorrendjét?</b> (pl. vezérlés, adat vagy igény)</li>
    </ul>

    <h3>Csoportosításuk</h3>
    <ul>
      <li>
        <b>Alapelv szerint:</b> adatalapú, objektum-alapú,
        predikátum-logika alapú, tudásalapú vagy hibrid.
      </li>
      <li>
        <b>Végrehajtás szerint:</b> szekvenciális vagy párhuzamos.
      </li>
      <li>
        <b>Vezérlés szerint:</b> vezérlés-meghajtott, adat-meghajtott vagy igény-meghajtott.
      </li>
      <li>
        <b>Probléma jellege szerint:</b> procedurális vagy deklaratív.
      </li>
    </ul>

    <h2>2. Neumann-féle és adatfolyam számítási modellek</h2>

    <h3>Neumann-féle számítási modell (vezérlés-meghajtott)</h3>
    <p>
      Ez a legelterjedtebb modell, amelynek jellemzője az egyszerű implementáció.
    </p>

    <ul>
      <li>
        <b>Adatok:</b> Típusos változókban tárolódnak, melyek értéke többszörösen módosítható.
      </li>
      <li>
        <b>Vezérlés:</b>
        Az utasítások természetes sorrendje (implicit),
        vagy explicit vezérlésátadó utasítások (<code class="kbd">jump</code>, <code class="kbd">if</code>, <code class="kbd">goto</code>)
        határozzák meg a végrehajtást.
      </li>
      <li>
        <b>Tárolás:</b>
        Az adatok és az utasítások közös memóriában (operatív tárban) helyezkednek el.
      </li>
      <li>
        <b>Érzékenység:</b>
        Előzmény- (idő-) érzékeny a változók módosíthatósága miatt.
      </li>
    </ul>

    <h3>Adatfolyam számítási modell (adat-meghajtott / Streber modell)</h3>
    <p>
      Olyan rendszerekhez tervezték, ahol a párhuzamosság kihasználása a cél.
    </p>

    <ul>
      <li>
        <b>Adatok:</b>
        Nincsenek változók, csak bemenő adathalmazok;
        az értékadás egyszeri.
      </li>
      <li>
        <b>Vezérlés:</b>
        Amint az összes szükséges adat rendelkezésre áll,
        a művelet azonnal végrehajtódik.
      </li>
      <li>
        <b>Leképezés:</b>
        Adatfolyam gráffal írható le (csomópontok: műveletek, élek: adatok).
      </li>
      <li>
        <b>Tárolás:</b>
        Az adatok regiszterekben tárolódnak az utasításokon belül.
      </li>
      <li>
        <b>Érzékenység:</b>
        Nem előzményérzékeny, viszont magas a szinkronizációs
        és kommunikációs igény.
      </li>
    </ul>

    <h3>Összehasonlítás</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Szempont</th>
          <th>Neumann-féle modell</th>
          <th>Adatfolyam számítási modell</th>
        </tr>
      </thead>
      <tbody>
  <tr>
    <td>Min hajtódnak végre a számítások?</td>
    <td colspan="2">A számítások adatokon hajtódnak végre</td>
  </tr>

  <tr>
    <td>Egy változón elvégezhető értékadások száma</td>
    <td>Többszöri értékadás</td>
    <td>Egyszeri értékadás</td>
  </tr>

  <tr>
    <td>Adat és utasítás tárolása</td>
    <td>Közös operatív tár</td>
    <td>Regiszterben tároljuk</td>
  </tr>

  <tr>
    <td>Mi alapján hajtja végre a számítást</td>
    <td>Adatmanipulációs utasítás vezérelt</td>
    <td>Adatfolyam gráf</td>
  </tr>

  <tr>
    <td>Utasítások végrehajtásának sorrendje</td>
    <td>Szekvenciális</td>
    <td>Párhuzamos (sok műveletvégző egység, azonnali műveletvégzés)</td>
  </tr>

  <tr>
    <td>Probléma megfogalmazása</td>
    <td colspan="2">Procedurális jellegű</td>
  </tr>

  <tr>
    <td>Előzményérzékenység</td>
    <td>Előzményérzékeny</td>
    <td>Nincs előzményérzékenység</td>
  </tr>

  <tr>
    <td>Egyéb igények</td>
    <td></td>
    <td>Igen magas kommunikációs és szinkronizációs igény</td>
  </tr>
</tbody>

    </table>

    <h2>3. Az architektúra fogalma</h2>
    <p>
      Az architektúra a számítási modell konkrét megvalósítása.
      <b>Amdahl (1964)</b> meghatározása szerint:
      az az ismerethalmaz, amellyel a gépi kódú programozónak rendelkeznie kell
      hatékony programok írásához.
    </p>

    <h3>Bell és Newell absztrakciós szintjei</h3>
    <ol>
      <li>Áramköri szint</li>
      <li>Logikai tervezési szint</li>
      <li>Programozási szint</li>
      <li>PMS szint (Processzor, Memória, Switchek)</li>
    </ol>

    <h2>4. Processzor szintű logikai és fizikai architektúra</h2>

    <p>
      Az architektúra két fő részre bontható:
      a <b>logikai (külső)</b> és a <b>fizikai (belső)</b> felépítésre.
    </p>

    <h3>Logikai architektúra (külső architektúra / programozási modell)</h3>
    <p>
      A programozó által látott specifikáció, ahol a működésre
      „fekete dobozként” tekintünk.
    </p>

    <h4>Részei</h4>
    <ul>
      <li>
        <b>Adattér:</b> A CPU által közvetlenül manipulálható tárolók
        (memória és regiszterek).
      </li>
      <li>
        <b>Adatmanipulációk:</b>
        A végrehajtható műveletek, adattípusok és címzési módok halmaza.
      </li>
      <li>
        <b>Állapottér:</b>
        A program állapotát leíró tárolók (PC, flagek).
      </li>
      <li>
        <b>Állapotműveletek:</b>
        Az állapottér elemeit módosító utasítások
        (pl. increment, save, set).
      </li>
    </ul>

    <h3>Fizikai architektúra (belső architektúra / mikroarchitektúra)</h3>
    <p>
      A logikai architektúra hardveres implementációja az adott absztrakciós szinten.
    </p>

    <h4>Rendszer szinten</h4>
    <ul>
      <li>Processzor</li>
      <li>Memória</li>
      <li>Buszrendszer</li>
    </ul>

    <h4>Processzor szinten</h4>
    <ul>
      <li>
        <b>ALU (Aritmetikai–Logikai Egység):</b>
        A tényleges számításokat végző kombinációs hálózat.
      </li>
      <li>
        <b>Vezérlőegység (CU):</b>
        Irányítja a processzor működését és a vezérlőjelek előállítását.
      </li>
      <li>
        <b>I/O rendszer:</b>
        A külvilággal való kapcsolattartást végzi.
      </li>
      <li>
        <b>Megszakítási rendszer:</b>
        A kivételes események kezelését biztosítja.
      </li>
    </ul>
  `,
};
