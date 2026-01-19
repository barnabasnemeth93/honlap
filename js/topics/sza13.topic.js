// js/topics/sza13.topic.js
// Forrás: SzA 13.pdf teljes tartalma alapján. :contentReference[oaicite:0]{index=0}

export const topic = {
  id: "sza13",
  code: "SzA13",
  title:
    "Szuperskalár architektúrák, első generációs (keskeny) szuperskalár CPU-k",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA13</b>
    </div>
    <div class="muted">
      (működési elvük, Harvard architektúra, CISC–RISC architektúrák, fejlődésük,
      közös jellemzőik, összehasonlításuk. Az I. generációs szuperskalár CPU-k
      jellemzői, közvetlen kibocsátás, végrehajtási modelljük,
      kibocsátási szűk keresztmetszetük)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>Szuperskalár architektúrák alapelve</div>
    <div class="learn-body">
      <p>
        A <b>szuperskalár processzor</b> képes egy órajelciklus alatt
        <b>több utasítás párhuzamos végrehajtására</b>.
      </p>

      <p>
        A párhuzamosság nemcsak időbeli, hanem <b>térbeli</b> is:
        <b>több futószalag</b> működik egymással párhuzamosan.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>Szuperskalár generációk közös jellemzői</div>
    <div class="learn-body">
      <ul>
        <li>
          Ciklusonként a dekódolóegységből
          <b>több utasítás kibocsátása</b> lehetséges  
          → mérőszáma a <b>kibocsátási ráta</b>
          <ul>
            <li>I. generáció: <b>2–3 utasítás / ciklus</b></li>
            <li>II. generáció: <b>4–6 utasítás / ciklus</b></li>
          </ul>
        </li>

        <li>
          <b>Időbeli és térbeli párhuzamosság</b> egyszerre
        </li>

        <li>
          A függőségeket a processzor
          <b>dinamikusan, extra hardverekkel</b> kezeli
        </li>

        <li>
          <b>Kompatibilitás:</b> a régi programok is futtathatók maradnak
        </li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">3</span>Harvard architektúra</div>
    <div class="learn-body">
      <p>
        A Harvard architektúra 1944-ből származik.
        Lényege, hogy az <b>adat</b> és a <b>programkód</b>
        fizikailag <b>elkülönített útvonalakon</b> mozog.
      </p>

      <p>
        Következménye:
        az utasítások és adatok
        <b>párhuzamosan mozoghatnak</b>.
      </p>

      <div class="subblock">
        <div class="subblock-title">Modern processzorokban</div>
        <ul>
          <li>
            <b>L1 cache:</b> külön utasítás- (I-cache) és adatcache (D-cache)
            → <b>Harvard-elv</b>
          </li>
          <li>
            <b>L2 és L3 cache:</b> közös tárolás
            → <b>Neumann-elv</b>
          </li>
        </ul>
      </div>

      <p class="muted">
        Így a mai CPU-k a Harvard- és Neumann-elveket egyszerre használják.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">4</span>RISC architektúra</div>
    <div class="learn-body">
      <ul>
        <li>Kis számú utasításkészlet (≈ 50–150)</li>
        <li>Egyszerű címzési módok</li>
        <li>Memóriaelérés kizárólag <b>LOAD / STORE</b> utasításokkal</li>
        <li>Minden művelet <b>regiszter–regiszter</b> között történik</li>
        <li>Nagyszámú regiszterkészlet</li>
        <li>Általában <b>3 operandusos</b> utasítások</li>
        <li>Azonos utasításhossz → pipeline-barát</li>
        <li>Hardveres (huzalozott) dekódolás</li>
        <li>Egy utasítás ≈ <b>1 órajel</b></li>
      </ul>

      <div class="subblock">
        <div class="subblock-title">Előny / hátrány</div>
        <p>
          <b>Előny:</b> alacsony fogyasztás, gyors utasításszintű végrehajtás  
          <br/>
          <b>Hátrány:</b> nagyobb programméret, bonyolultabb fordítóprogram
        </p>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">5</span>CISC architektúra</div>
    <div class="learn-body">
      <ul>
        <li>Nagyszámú utasításkészlet (több száz)</li>
        <li>Mikroprogramtár szükséges</li>
        <li>Sokféle címzési mód</li>
        <li>Változó hosszúságú utasítások</li>
        <li>Közvetlen memóriaoperandus használata</li>
        <li>2 operandusos utasítások</li>
        <li>Utasítások több ciklus alatt futnak le</li>
        <li>Kompatibilitás régi programokkal</li>
        <li>Támogatott: többszálúság, virtualizáció</li>
      </ul>

      <div class="subblock">
        <div class="subblock-title">Előny / hátrány</div>
        <p>
          <b>Előny:</b> egyszerűbb fordító, kompatibilitás  
          <br/>
          <b>Hátrány:</b> komplex hardver, nagyobb fogyasztás,
          lassabb utasításszintű végrehajtás
        </p>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">6</span>Első generációs szuperskalár CPU-k</div>
    <div class="learn-body">
      <p>
        Más néven: <b>keskeny szuperskalár architektúrák</b>.
      </p>

      <ul>
        <li>
          Kibocsátási ráta:
          <ul>
            <li>RISC: <b>3 utasítás / ciklus</b></li>
            <li>CISC: <b>2 utasítás / ciklus</b></li>
          </ul>
        </li>
        <li>
          Ez kb. <b>2–3× sebességnövekedést</b> jelent a pipeline CPU-khoz képest
        </li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">7</span>Közvetlen kibocsátás</div>
    <div class="learn-body">
      <p>
        A dekódolt utasítás a CPU-ból
        <b>közvetlenül a végrehajtó egységbe kerül</b>.
      </p>

      <p>
        Az <b>utasításablak</b> pufferként működik:
      </p>

      <ul>
        <li>itt történik a dekódolás</li>
        <li>itt történik a függőségvizsgálat</li>
        <li>a független utasítások kibocsáthatók</li>
        <li>a függők bent maradnak</li>
      </ul>

      <p class="muted">
        Az utasításablak funkciója hasonló a későbbi ROB-hoz,
        de jóval egyszerűbb.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">8</span>Végrehajtási modell</div>
    <div class="learn-body">
      <ul>
        <li>
          <b>Első rész:</b>
          utasítás lehívás és az utasításablak feltöltése
        </li>
        <li>
          <b>Utasításablak</b>
        </li>
        <li>
          <b>Hátsó rész:</b>
          dekódolás, függőségellenőrzés, kibocsátás,
          végrehajtás és visszaírás
        </li>
      </ul>

      <p>
        Az alrendszerek átbocsátási képességét nevezzük
        <b>szélességnek</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">9</span>Szűk keresztmetszetek</div>
    <div class="learn-body">
      <ul>
        <li>
          <b>Kibocsátás:</b>
          közvetlen kibocsátás miatt elméletben 2–3,
          gyakorlatban ≈ <b>1 utasítás / ciklus</b>
        </li>

        <li>
          <b>Memória:</b>
          cache bevezetésével csökkenthető
        </li>

        <li>
          <b>Elágazások:</b>
          csak statikus elágazásbecslés volt elérhető
        </li>

        <li>
          <b>Adatfüggőségek:</b>
          RAW és egyéb függőségek kezelése még nem volt megoldott
        </li>
      </ul>
    </div>
  </div>
  `,
};
