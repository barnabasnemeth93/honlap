// js/topics/sza7.topic.js
// SzA7 – Külső buszrendszer

export const topic = {
    id: "sza7",
    code: "SzA7",
    title: "Külső buszrendszer",
    html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA7</b>
    </div>
    <div class="muted">
      (fogalma; fejlődése; jellemzői; csoportosítása, vezérlővonalak, a párhuzamos és
      soros buszok (előnyök, hátrányok, problémák), a PCI és a PCIe busz, az USB-C,
      az FSB, a HyperTransport és a QPI. Jeltípusok, impulzus amplitúdó modulációs
      eljárás ismertetése, párhuzamos buszok frekvencia korlátja)
    </div>
  </div>
  
  <h2>Fogalma</h2>
  
  <p>
    A külső buszok csatlakoztatják a perifériákat az alaplaphoz és az I/O vezérlőhöz.
    Célja az egységek közti kommunikáció.
  </p>
  
  <p>
    A buszrendszer a felhasználó számára transzparens, nem látható.
    A kommunikáció infrastrukturális része.
  </p>
  
  <p>
    Történelmi fejlődés után jött létre, ez bizonyult a legjobbnak.
  </p>
  
  <p>
    Egy rendszerre több egység is kapcsolódik, így meg kell oldani:
  </p>
  
  <ul>
    <li>Az adatátvitelben résztvevő eszközök kijelölését</li>
    <li>Az átvitel irányát</li>
    <li>Az eszközök összehangolását / szinkronizálását</li>
    <li>A sebesség biztosítását a különböző eszközök között</li>
  </ul>
  
  <h2>Csoportosítása, fajtái</h2>
  
  <div class="learn-block">
    <div class="learn-title">
      <span class="num">1.</span> Adatátvitel iránya szerint
    </div>
    <div class="learn-body">
      <ul>
        <li><b>Simplex:</b> egyirányú (példa: órajel, reset, címbusz)</li>
        <li><b>Fél-duplex:</b> kétirányú, de egy időben csak egy irányba mehet az információ</li>
        <li><b>Duplex:</b> kétirányú (adatbusz stb.)</li>
      </ul>
    </div>
  </div>
  
  <div class="learn-block">
    <div class="learn-title">
      <span class="num">2.</span> Adatátvitel jellege szerint
    </div>
    <div class="learn-body">
  
      <div class="subblock">
        <div class="subblock-title">Dedikált buszrendszer</div>
  
        <p>
          Minden egységet minden egységgel összekötünk (ilyen például az Intel QPI busz,
          ami a CPU magokat köti össze).
        </p>
  
        <div class="grid grid-2">
          <div class="pill">
            <div class="pill-title">Előnyei</div>
            <ul>
              <li>Gyors</li>
              <li>Redundáns és megbízható</li>
            </ul>
          </div>
  
          <div class="pill">
            <div class="pill-title">Hátrányai</div>
            <ul>
              <li>Drága</li>
              <li>Merev</li>
              <li>Nehezen bővíthető</li>
            </ul>
          </div>
        </div>
      </div>
  
      <div class="subblock">
        <div class="subblock-title">Megosztott (shared) buszrendszer</div>
  
        <p>
          Minden eszköz egy közös buszon kommunikál
          (pl. SATA, PCI Express, USB).
        </p>
  
        <div class="grid grid-2">
          <div class="pill">
            <div class="pill-title">Előnyei</div>
            <ul>
              <li>Olcsó</li>
              <li>Rugalmas</li>
              <li>Könnyen bővíthető</li>
            </ul>
          </div>
  
          <div class="pill">
            <div class="pill-title">Hátrányai</div>
            <ul>
              <li>Viszonylag lassú</li>
              <li>A közös használat vezérlése bonyolult</li>
              <li>A busz meghibásodása problémát okoz</li>
            </ul>
          </div>
        </div>
      </div>
  
    </div>
  </div>
  
  <div class="learn-block">
    <div class="learn-title">
      <span class="num">3.</span> Átvitt tartalom alapján
    </div>
  
    <div class="learn-body">
      <ul>
        <li><b>Adatbusz</b> – adatok továbbítása (8 bittől 64 bit)</li>
        <li><b>Címbusz</b> – adat és címbusz időbeli multiplexeléssel valósul meg közös vezetékeken</li>
        <li>
          <b>Vezérlővonal</b> (általában egy-egy vezeték, ezért nem busz, hanem vonal)
          <ul>
            <li>Adatátvitelt vezérlő jelek</li>
            <li>Megszakítást vezérlő jelek</li>
            <li>Buszvezérlő jelek</li>
            <li>Egyéb (időzítő, CLK, RST)</li>
          </ul>
        </li>
      </ul>
  
      <div class="subblock">
        <div class="subblock-title">Vezérlővonal 4 típusú vezérlőjelei</div>
  
        <div class="control-grid">
          <div class="control-card">
            <div class="control-title">Adatátvitelt vezérlő jelek</div>
            <ul>
              <li>M/IO (memória vagy I/O cím van a buszon)</li>
              <li>R/W (read / write): adatátvitel irányát adja meg a CPU felől nézve</li>
              <li>WD/B (word/byte): az átvitt adat méretét adja meg</li>
              <li>D/S (data strobe): adatot helyezünk a buszra</li>
              <li>A/S (address strobe): címet helyezünk a buszra</li>
              <li>RDY (ready): átvitel befejezését vagy a busz rendelkezésre állását jelzi.</li>
            </ul>
          </div>
  
          <div class="control-card">
            <div class="control-title">Megszakítást vezérlő jelek</div>
            <ul>
              <li>Megszakítást kérő jel</li>
              <li>Megszakítást visszaigazoló jel</li>
            </ul>
          </div>
  
          <div class="control-card">
            <div class="control-title">Busz vezérlő jelek</div>
            <ul>
              <li>Buszfoglalás</li>
              <li>Visszaigazolás</li>
            </ul>
          </div>
  
          <div class="control-card">
            <div class="control-title">Egyéb jelek</div>
            <ul>
              <li>RST (RESET)</li>
              <li>CLK (CLOCK/Órajel)</li>
            </ul>
          </div>
        </div>
      </div>
  
    </div>
  </div>
  
  <div class="learn-block">
    <div class="learn-title">
      <span class="num">4.</span> Összekapcsolt területek alapján
    </div>
    <div class="learn-body">
      <ul>
        <li>
          <b>Rendszerbuszok:</b> a CPU és buszvezérlő közötti címbusz + adatbusz
          <br />
          Ide csatlakoznak a memóriaeszközök
        </li>
        <li>
          <b>Bővítőbuszok:</b> perifériák (I/O is ide van rákapcsolva) felé menő busz
          (általában sorosak)
        </li>
      </ul>
    </div>
  </div>
  
  <div class="learn-block">
    <div class="learn-title">
      <span class="num">5.</span> Átvitel módja szerint
    </div>
  
    <div class="learn-body">
      <div class="grid grid-2">
        <div class="pill">
          <div class="pill-title">Soros buszok</div>
          <ul>
            <li>Soros buszok</li>
          </ul>
        </div>
  
        <div class="pill">
          <div class="pill-title">Párhuzamos buszok</div>
          <ul>
            <li>Párhuzamos buszok</li>
          </ul>
        </div>
      </div>
  
      <p>
        A párhuzamos buszok hátránya, hogy sok vezeték, ami által komplex és drága. Nagy csatlakozási felülettel rendelkeznek,
        és a nagyfrekvenciás adatátvitel nem megoldható, mert a vezetékek között időeltérés van (delay skew), tehát konkrétan
        a vezetékek hossza különbözik. Továbbá a sok párhuzamos vezeték elektromágneses interferenciát generál, tehát EMI-t,
        zajt. Illetve a vezetékek között áthallás van. Egyetlen gyors vezetéken több adatot lehet továbbítani, mint több lassún.
        Soros átvitel esetén sorba kell állítani a biteket, ezt bitsorozatokká való kódolással oldották meg.
      </p>
  
      <p>
        Ma csak a CPU és memória közt használunk párhuzamos buszrendszert.
      </p>
    </div>
  </div>
  
  <h2>PCI és PCIe (express)</h2>
  
  <div class="learn-block">
    <div class="learn-body">
      <p>A specifikáció magában foglalja a:</p>
      <ul>
        <li>Fizikai méreteket</li>
        <li>Csatlakozókiosztást</li>
        <li>Adatátviteli időzítést</li>
        <li>Protokollokat</li>
      </ul>
  
      <p>
        Ez egy platformfüggetlen megoldás. A PCI buszra csatlakoztatott perifériákat a CPU úgy látja, mintha azok közvetlenül a
        rendszerbuszra lennének csatlakoztatva. Így a CPU az általa látott címtérből látja el memóriacímekkel, ezáltal pedig
        gyorsabb az átvitel, mivel közvetlenül manipulálható.
      </p>
  
      <p>Szabványosított formában támogatja a rendszerbuszt.</p>
  
      <p>
        Eleinte videókártyák is ezen a buszon mentek, de nem volt elég, így jött az AGP (advanced graphic port), majd később a PCIe (2004).
      </p>
  
      <p><b>PCIe:</b></p>
      <ul>
        <li>Nagyobb sebesség</li>
        <li>Kevesebb érintkező</li>
        <li>Hot plug (menetközben is kikapcsolható)</li>
      </ul>
    </div>
  </div>
  
  <h2>USB</h2>
  
  <div class="learn-block">
    <div class="learn-body">
      <p>
        1994-től kezdték el fejleszteni. Első verzió 1996. Most jelenik majd meg az USB 4.0,
        ennek 40Gbit/sec adatátviteli sebesség. Kihívója a Thunderbolt 3 (Intelnél) – támogatja az USB3-at, PCIe-t.
      </p>
  
      <div class="subblock">
        <div class="subblock-title">USB-C csatlakozó</div>
        <p>
          USB 3.1-től elérhető a legnagyobb előnye (2013): adatátvitel 4 érpáron keresztül történik.
        </p>
        <ul>
          <li>24 pines (24 vezetékcsatlakozás)</li>
        </ul>
      </div>
  
      <p>PCI (párhuzamos) és PCIe</p>
    </div>
  </div>
  
  <h2>FSB (Front Side Bus)</h2>
  
  <div class="learn-block">
    <div class="learn-body">
      <ul>
        <li>Általában 64 bites</li>
        <li>Perifériákkal való kapcsolatot biztosítja</li>
      </ul>
  
      <p>
        FSB chipset (alaplapon elhelyezett szakosodott chipek): északi és déli híd
      </p>
  
      <ul>
        <li><b>Északi híd:</b> gyorsabb, memóriával és grafikus interfésszel való kapcsolat</li>
        <li><b>Déli híd (I/O controller):</b> lassabb perifériák kiszolgálására</li>
      </ul>
  
      <p>
        Későbbiekben a CPU-ba integrálták az északi hidat (NB)
      </p>
  
      <p><b>Fejlődés mozgatórugói:</b></p>
      <p>
        CPU-k sokkal gyorsabbak mint a külső eszközök, a többmagos CPU-k és többprocesszoros rendszerek megjelenése ezt csak tovább fokozta
      </p>
  
      <p><b>A cél az I/O szűk keresztmetszet mérséklése:</b></p>
      <p>
        Megoldás volt a többszintű, lapkán lévő gyorsítótárak bevezetése a memóriakezeléshez, pl.: blokkos adatátvitel alkalmazása.
      </p>
  
      <p>
        Lépést kell tartani a déli híd és az I/O alrendszer közötti interfésznek a CPU sebességével,
        erre a régi párhuzamos buszrendszerek nem voltak alkalmasak.
      </p>
  
      <p>
        Olyan probléma is előfordulhat, hogy a perifériák sebessége nagyobb, mint a buszoké,
        ilyenkor a real-time adatátvitel problémás lehet.
      </p>
    </div>
  </div>
  
  <h2>HyperTransport (AMD) és QPI (Intel)</h2>
  
  <div class="learn-block">
    <div class="learn-body">
      <p>
        Mindkettő a FSB és a PCIe kiváltására jött létre, előbb a HT, aztán válaszként a QPI
      </p>
  
      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">HyperTransport</div>
          <ul>
            <li>Tipikusan a processzor lapkára van integrálva</li>
            <li>2 irányú soros/párhuzamos szélessávú, alacsony késleltetésű kapcsolat</li>
            <li>Hasonlít a PCIe-hez, ugyanúgy rugalmas 4/8/16/32 soros vonalat is tud egyszerre mozgatni, csomagokba ágyazza az adatokat.</li>
            <li>40 bites vagy 64 bites címtér (utóbbi 18 Exabájtot jelent)</li>
          </ul>
  
          <p>Kétféle egységet tartalmaz:</p>
          <ul>
            <li><b>Alagút (tunnel):</b> eredeti funkcionalitásán túlmenően 2 HT portot tartalmaz és 1 további HT hozzáfűzhető -» HT-to-HT bridge, skálázható</li>
            <li><b>Barlang (cave):</b> lezárja a HT láncot, nincs további kapcsolat</li>
          </ul>
        </div>
  
        <div class="subblock">
          <div class="subblock-title">QPI (QuickPath Interconnect)</div>
          <p>
            Processzorok lapkára integrált memóriavezérlőkkel és NUMA (non-uniform memory access)-val rendelkeznek
          </p>
  
          <p>
            Distributed shared memory architektúrát használ, ami azt jelenti, hogy fizikailag elosztott külön memóriák egyetlen logikailag közös címtérben címezhetőek
          </p>
  
          <p><b>5 réteges architektúra:</b></p>
          <ul>
            <li>Fizikai réteg (legalsó): 20 vonalon 20 adatbitet visz át egyetlen órajelre párhuzamosan (tehát egyszerre soros és párhuzamos)</li>
            <li>Kapcsolati réteg</li>
            <li>Routing réteg</li>
            <li>Szállítási réteg</li>
            <li>Protokoll réteg</li>
          </ul>
  
          <p>Nagy sebesség</p>
  
          <p>
            Ha a processzorban 1 vagy több mag van, használhatnak közös gyorsítótárat, de sajátot is
          </p>
  
          <p>
            Crossbar router biztosítja az adatok eljuttatását
          </p>
        </div>
      </div>
    </div>
  </div>
    `,
  };
  