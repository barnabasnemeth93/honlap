// js/topics/sza9.topic.js
// SzA9 – Megszakítási rendszer

export const topic = {
    id: "sza9",
    code: "SzA9",
    title: "Megszakítási rendszer",
    html: /* html */ `
      <div class="callout">
        <div><span class="badge">Tétel</span> <b>SzA9</b></div>
        <div class="muted">
          (megszakítás fogalma; megszakítási okok és források; a megszakítás folyamata;
          csoportosítás, az egy- és a többszintű megszakítási rendszer)
        </div>
      </div>
  
      <p>
        <b>Fogalma:</b> a feldolgozás szempontjából váratlannak tekinthető események kezelésére szolgáló művelet(ek).
      </p>
  
      <p>
        A számítógép, illetve a processzor reagálni tudjon a külső vagy a belső eseményekre, jelzésekre.
      </p>
  
      <p>
        <b>Célja:</b> nemcsak a reagálás, hanem a folyamatosan változó körülmények között is az optimális működés biztosítása.
      </p>
  
      <p>
        Megszakításkor tárolódik a kontextus (ami állapotjelzőket, regiszterek tartalmát tartalmazza).
      </p>
  
      <h2>Megszakítási okok vagy források</h2>
  
      <ul>
        <li>
          Géphibák, energiaellátás (túlmelegedés, hűtészavar): belső kód alkalmazása (pl. Valamelyik eszköz nem tud felépülni)
        </li>
        <li>
          I/O források: perifériák megszakításkérő jelei, üzenetküldést kérő perifériák
        </li>
        <li>
          Külső források: pl. Hálózati kommunikáció, Reset gomb megnyomása
        </li>
        <li>
          Programozási források:
          <ul>
            <li>Szándékos (pl. Rendszerhívás, BIOS rutinok, Op.rendszer rutinok)</li>
            <li>Hibakeresés (pl. Programozási probléma megtalálása)</li>
          </ul>
        </li>
      </ul>
  
      <h2>Milyen hibák generálhatnak megszakításokat?</h2>
  
      <ul>
        <li>
          Memóriavédelem megsértése (memóriában tárolt programokat védeni kell a felülírástól -» másik program ne írhassa felül)
        </li>
        <li>
          Tényleges tárkapacitás túlcímzése (ugye a programozó virtuális memóriát lát)
        </li>
        <li>
          Címzési előírások megsértése
        </li>
        <li>
          Aritmetikai logikai műveletek miatti megszakítások (túlcsordulás, alulcsordulás, stb.)
        </li>
      </ul>
  
      <h2>Megszakítások folyamata</h2>
  
      <figure class="figure">
        <img
          src="assets/figures/sza9-megszakitasok-folyamata.png"
          alt="Megszakítások folyamata ábra"
        />
      </figure>
  
      <h2>Megszakítások csoportosítása</h2>
  
      <ul>
        <li>
          Szinkron – aszinkron:
          <ul>
            <li>szinkron mindig ugyanott lépnek fel a megszakítások (pl. 0-val osztás)</li>
            <li>aszinkron véletlenszerűen bármikor felléphet</li>
          </ul>
        </li>
  
        <li>Várható – nem várható</li>
  
        <li>
          Utasítások végrehajtása között vagy közben lép fel
          <ul>
            <li>Között: mindig az adott utasítás eredményeképpen</li>
            <li>
              Közben: pl paging közben -» kezelés elindulhat rögtön a végrehajtás után
            </li>
          </ul>
        </li>
  
        <li>
          A felhasználó által explicite kért vagy nem kért megszakítások
          <ul>
            <li>Nem kért: túlcsordulás, 0-val osztás pl.</li>
            <li>Kért: OS rutin</li>
          </ul>
        </li>
  
        <li>
          A megszakítás kiszolgálása után a program futása folytatódik vagy nem folytatódik
          <ul>
            <li>
              Nem folytatódik (befejeződik): rossz programozás is lehet, de hardverhiba is
            </li>
            <li>IO megszakítás (beolvas adatot egy program egy perifériáról pl.)</li>
          </ul>
        </li>
  
        <li>
          A megszakítás maszkolható vagy nem maszkolható
          <ul>
            <li>Maszkolható: letiltható (pl. Töréspontok, debug, ha nem akarjuk ezeket kiszolgálni)</li>
            <li>Nem maszkolható: nem letiltható. pl. Egy hardverhiba</li>
          </ul>
        </li>
      </ul>
  
      <h2>Általános végrehajtási folyamat (szoftveres része)</h2>
  
      <ul>
        <li>
          Kérés (INTR – Interrupt Request) – ez egy vezérlőjel, ezt aktiváljuk, innen tudja a processzor, hogy megszakítást kér valamelyik folyamat.
        </li>
        <li>
          A processzor (vezérlőegység) befejezi az aktuális utasítást és utasítás töréspontban megvizsgálja, hogy elfogadható-e?
        </li>
        <li>
          Ha elfogadható, akkor Interrupt Acknowledge vezérlővonal aktiválásával jelzi, hogy elfogadható.
        </li>
      </ul>
  
      <h2>Általános végrehajtási folyamat (hardveres része)</h2>
  
      <ul>
        <li>Kontextus mentése verem tárolóba.</li>
        <li>Van egy megszakítás áramkör és ez van rákötve a CPU INT bemenetére.</li>
      </ul>
  
      <h2>Mikor jut érvényre egy megszakítás?</h2>
  
      <ul>
        <li>Megszakítható az éppen futó folyamat (lehet megszakítást is megszakítani akár)</li>
        <li>Megfelelő a prioritás nagysága</li>
        <li>Az adott megszakítás nincs maszkolva.</li>
      </ul>
  
      <h2>Szintek</h2>
  
      <h3>Egyszintű megszakítás:</h3>
      <p>
        Ha egy megszakítás érvényre jut, nincs mód újabb megszakítás elfogadására, amíg vissza nem térünk normál állapotba
      </p>
  
      <h3>Többszintű megszakítás:</h3>
      <ul>
        <li>A megszakításokhoz prioritási szinteket rendelnek hozzá</li>
        <li>Példa: 3 szintű megszakítás esetén harmadik szint, második szint és első szint</li>
      </ul>
  
      <h3>Többszintű, többrendű:</h3>
      <ul>
        <li>Ma is ezt használják</li>
        <li>
          A megszakítási forrásokat osztályozzák, azon belül pedig megszakítás típusok vannak (pl. 1,2,3 és 1a, 1b, 1c.)
        </li>
        <li>Osztályokon belül már egyszintű a prioritás.</li>
      </ul>
    `,
  };
  