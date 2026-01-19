// js/topics/sza15.topic.js
// Forrás: SzA15.pdf teljes tartalma alapján.

export const topic = {
  id: "sza15",
  code: "SzA15",
  title:
    "Harmadik generációs szuperskalár processzorok – utasításon belüli párhuzamos végrehajtás",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA15</b>
    </div>
    <div class="muted">
      (utasításon belüli párhuzamosság elve, megvalósítási példák,
      háromoperandusú utasítások, SIMD, MMX, SSE,
      2D-s és 3D-s multimédia feldolgozás)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>Miért volt szükség a 3. generációra?</div>
    <div class="learn-body">
      <p>
        A <b>második generációs szuperskalár processzorok</b>
        elérték az architektúra
        <b>teljesítménybeli korlátait</b>.
      </p>

      <p>
        További gyorsításhoz már nem volt elegendő:
      </p>

      <ul>
        <li>több futószalag</li>
        <li>sorrenden kívüli végrehajtás</li>
        <li>ROB és regiszter-átnevezés</li>
      </ul>

      <p>
        Megoldás:
        <b>utasításon belüli párhuzamosság</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>Utasításon belüli párhuzamosság (ILP)</div>
    <div class="learn-body">
      <p>
        Egyetlen utasítás
        <b>egyszerre több műveletet vagy több adatot</b>
        képes feldolgozni.
      </p>

      <p>
        Különösen fontos:
      </p>

      <ul>
        <li>multimédiás feldolgozásnál</li>
        <li>hang- és képfeldolgozásnál</li>
        <li>vektoros számításoknál</li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">3</span>Megvalósítási példák</div>
    <div class="learn-body">
      <ul>
        <li>
          <b>Duál műveleti utasítások</b>
          <div class="muted">
            Pl. multiply–add: <code class="kbd">y = a · x + b</code>  
            Egyetlen utasítással több művelet hajtható végre.
          </div>
        </li>

        <li>
          <b>SIMD</b> – Single Instruction Multiple Data
        </li>

        <li>
          <b>VLIW architektúrák</b>
        </li>
      </ul>

      <p class="muted">
        A duál műveleti utasítások ritkák, főként numerikus számításoknál használatosak.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">4</span>SIMD alapelve</div>
    <div class="learn-body">
      <p>
        <b>Egyetlen utasítás</b>
        <b>több operanduson</b>
        hajtja végre
        <b>ugyanazt a műveletet</b>.
      </p>

      <ul>
        <li>kibővített multimédiás utasításkészlet</li>
        <li>logikai architektúra kiterjesztése</li>
        <li>jelentősen nő a memóriasávszélesség igény</li>
        <li>L2 cache a processzor lapkára kerül</li>
        <li>buszrendszer bővítése szükséges</li>
      </ul>

      <p>
        A SIMD tette lehetővé:
        <b>3D játékokat, grafikus és multimédiás alkalmazásokat</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">5</span>Multimédia probléma</div>
    <div class="learn-body">
      <p>
        Hang- és képfeldolgozásnál a fő probléma:
      </p>

      <ul>
        <li>óriási mennyiségű adat</li>
        <li>gyors feldolgozási igény</li>
      </ul>

      <p>
        Kezdetben:
        <b>külön multimédiás kártyák</b> oldották meg.
      </p>

      <p>
        Később:
        <b>a CPU multimédiás bővítést kapott</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">6</span>Fixpontos SIMD utasítások</div>
    <div class="learn-body">
      <p>
        Elsősorban:
        <b>hangfeldolgozás</b> és
        <b>pixeles multimédia</b>.
      </p>

      <ul>
        <li>2–8 operandus / utasítás</li>
      </ul>

      <div class="subblock">
        <div class="subblock-title">Hangfeldolgozás</div>
        <ul>
          <li>mintavételezés adott frekvenciával</li>
          <li>digitalizálás</li>
          <li>nagy felbontásnál jelentős terhelés</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">7</span>Lebegőpontos SIMD utasítások</div>
    <div class="learn-body">
      <p>
        Főként:
        <b>vektoros és 3D képfeldolgozás</b>.
      </p>

      <ul>
        <li>2–4 operandus / utasítás</li>
      </ul>

      <div class="subblock">
        <div class="subblock-title">Képfeldolgozás</div>
        <ul>
          <li>színinformáció tárolása</li>
          <li>alpha (átlátszóság)</li>
          <li>RGB színkódolás</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">8</span>Intel MMX – 2D multimédia</div>
    <div class="learn-body">
      <ul>
        <li>MultiMedia eXtension</li>
        <li>bit-blokkos adatátvitel</li>
        <li>1920×1080 @ 30 FPS ≈ 180 MB/s adat</li>
      </ul>

      <p>
        A képernyőt <b>bitblokkokként</b> kezeli,
        nem pixelenként.
      </p>

      <div class="subblock">
        <div class="subblock-title">Pakolt adattípusok (64 bit)</div>
        <ul>
          <li>8 × 8 bit (byte)</li>
          <li>4 × 16 bit (félszó)</li>
          <li>2 × 32 bit (szó)</li>
        </ul>
      </div>

      <p class="muted">
        A pakolt adatok az FP regiszterek mantisszájában kerültek tárolásra.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">9</span>Vektoros 3D képfeldolgozás</div>
    <div class="learn-body">
      <p>
        A képeket <b>sokszögekre bontjuk</b>.
      </p>

      <ul>
        <li>könnyen mozgatható</li>
        <li>méretezhető</li>
        <li>textúrázható</li>
      </ul>

      <p>
        3D-ben:
      </p>

      <ul>
        <li>perspektivikus ábrázolás</li>
        <li>távolságfüggő méret</li>
        <li>atmoszferikus hatások</li>
        <li>minimum 15–30 FPS</li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">10</span>SSE – Streaming SIMD Extension</div>
    <div class="learn-body">
      <ul>
        <li>lebegőpontos SIMD műveletekhez</li>
        <li>≈ 70 új utasítás</li>
        <li>128 bites pakolt adattípus</li>
      </ul>

      <div class="subblock">
        <div class="subblock-title">Adatformátum</div>
        <ul>
          <li>4 × 32 bit (egyszeres pontosság)</li>
          <li>2 × 64 bit (kétszeres pontosság)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="callout">
    <b>Fontos megjegyzés</b>
    <div class="muted">
      A SIMD nem növelte jelentősen a processzor általános teljesítményét,
      viszont a multimédiás alkalmazásokat
      <b>nagyságrendekkel felgyorsította</b>,
      mivel ezek nagy mennyiségű,
      egymástól független adattal dolgoznak.
    </div>
  </div>
  `,
};
