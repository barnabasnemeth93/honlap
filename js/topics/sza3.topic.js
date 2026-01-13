// js/topics/sza3.topic.js
// Forrás: a feltöltött SzA3.docx teljes tartalma alapján. :contentReference[oaicite:1]{index=1}

export const topic = {
  id: "sza3",
  code: "SzA3",
  title:
    "A szekvenciális utasításvégrehajtás menete, az utasítás- és operandus típusok, állapottér, állapotműveletek",
html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA3</b>
    </div>
    <div class="muted">
      (az aritmetikai utasítások, lehívás, tárolás és a feltétlen vezérlés-átadási utasítás 
      végrehajtásának sémája, utasítás- és operandus típusok; architektúrák osztályozása, 
      szabályos architektúrák, állapottér, állapot műveletek)
    </div>
  </div>


    <h2>Szekvenciális utasításvégrehajtás menete</h2>
    <p>
      Az utasítás tipikusan <b>műveleti kód</b>ból és <b>címrész</b>ből áll (több cím is lehet).
    </p>

    <h3>1) Utasítás lehívás (Fetch)</h3>
    <ul>
      <li><code class="kbd">MAR</code> (memória címregiszter) <code class="kbd">&larr; PC</code></li>
      <li>
        <code class="kbd">MDR</code> (memória adat regiszter) <code class="kbd">&larr; [MAR]</code>
        <span class="muted">— szögletes zárójel: a MAR-ban lévő <i>cím</i> által mutatott memóriaérték</span>
      </li>
      <li><code class="kbd">IR</code> (utasításregiszter) <code class="kbd">&larr; MDR</code></li>
      <li><code class="kbd">PC &larr; PC + 1</code> <span class="muted">— autoinkrement (egység)</span></li>
    </ul>

    <h3>2) Dekódolás és operandus betöltés</h3>
    <ul>
      <li><code class="kbd">DEC</code> (dekóder) <code class="kbd">&larr; IR</code></li>
      <li><code class="kbd">MAR &larr; DEC.címrész</code> <span class="muted">— (1. adat)</span></li>
      <li><code class="kbd">MDR &larr; [MAR]</code></li>
      <li>
        <code class="kbd">AC</code> (akkumulátor regiszter, ALU-ban) <code class="kbd">&larr; MDR</code>
      </li>
    </ul>

    <h3>3) Műveletvégrehajtás (aritmetikai művelet)</h3>
    <p class="muted">
      Megjegyzés: a <code class="kbd">DEC &larr; IR</code> a dekódolásnál már benne van, de leírásokban gyakran ezzel kezdik a sémát.
    </p>
    <ul>
      <li><code class="kbd">DEC &larr; IR</code></li>
      <li><code class="kbd">MAR &larr; DEC.címrész</code> <span class="muted">— (2. adat)</span></li>
      <li><code class="kbd">MDR &larr; [MAR]</code></li>
      <li><code class="kbd">AC &larr; AC + MDR</code> <span class="muted">— (példában: összeadás)</span></li>
    </ul>

    <h3>4) WriteBack / Store</h3>
    <ul>
      <li><code class="kbd">DEC &larr; IR</code></li>
      <li><code class="kbd">MAR &larr; DEC.címrész</code></li>
      <li>
        <code class="kbd">MDR &larr; AC</code>
        <span class="muted">— az eredmény AC-ben van, nincs közvetlen buszkapcsolat → MDR-be töltjük</span>
      </li>
      <li>
        <code class="kbd">[MAR] &larr; MDR</code>
        <span class="muted">— a MAR által mutatott memóriacímre írunk</span>
      </li>
    </ul>

    <h3>+ Példa: vezérlésátadó utasítás (JMP – feltétlen vezérlésátadás)</h3>
    <p>
      Fetch ugyanaz, dekód ugyanaz. A Jump lényegében <b>lehívás + végrehajtás</b>:
      végrehajtáskor a PC értéke felülíródik.
    </p>
    <ul>
      <li><code class="kbd">DEC &larr; IR</code></li>
      <li><code class="kbd">PC &larr; DEC.címrész</code></li>
    </ul>

    <h2>Utasítástípusok (címek száma szerint)</h2>
    <p>
      Az utasítások <b>MK</b>-ból (műveleti kód) és <b>címrész</b>ből állnak. Az alapján osztályozunk, hogy hány címet tartalmaznak.
      Jelölések: céloperandus <b>d</b> (destination), forrásoperandus <b>s</b> (source), az <b>@</b> az operátor helye (pl. +, −, *, /).
    </p>

    <table class="table">
      <thead>
        <tr>
          <th>Típus</th>
          <th>Általános alak</th>
          <th>Jellemzők</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>4 címes</b></td>
          <td><code class="kbd">opd = ops1 @ ops2</code>, <code class="kbd">op4 = következő utasítás címe</code></td>
          <td>
            Merev, nehéz módosítani. Később a “következő utasítás címe” mezőt a <b>PC</b> váltotta ki (autoinkrementálódik),
            így nem kell manuálisan tárolni a következő címet.
          </td>
        </tr>
        <tr>
          <td><b>3 címes</b></td>
          <td><code class="kbd">opd = ops1 @ ops2</code></td>
          <td>
            Tipikus <b>RISC</b> architektúráknál. Előny: a céloperandus nem kényszeríti felülírásra a forrásoperandusokat,
            az eredményt “bárhova” írhatjuk. Előny: <b>párhuzamosítás</b> — mivel a cél külön regiszter,
            WriteBack alatt már párhuzamosan tölthető a következő utasítás forrásoperandusai. Hátrány: sok cím tárolása.
          </td>
        </tr>
        <tr>
          <td><b>2 címes</b></td>
          <td><code class="kbd">ops1 = ops1 @ ops2</code></td>
          <td>
            Tipikus <b>CISC</b> (pl. x86). Az eredmény általában az <b>első operandus</b> helyén keletkezik (felülírja).
            Az első operandus kizárólag <b>regiszter</b> lehet. (so1, so2: source operand 1/2; az eredmény felülírja so1-et.)
          </td>
        </tr>
        <tr>
          <td><b>1 címes</b></td>
          <td><code class="kbd">AC = AC @ op</code></td>
          <td>
            Akkumulátoros modell: az egyik operandust az <b>AC</b>-be töltjük, majd a következő operandussal módosítjuk
            (pl. hozzáadjuk).
          </td>
        </tr>
        <tr>
          <td><b>0 címes</b></td>
          <td>STACK jellegű (pl. <code class="kbd">PUSH</code>, <code class="kbd">POP</code>, <code class="kbd">NOP</code>, <code class="kbd">CLEAR D</code>)</td>
          <td>Nincs explicit címrész (verem tetejével dolgozik / speciális műveletek).</td>
        </tr>
      </tbody>
    </table>

    <h2>Operandus típusok</h2>
    <ul>
      <li><b>Akkumulátor (AC)</b>: csak 1 van belőle, gyors.</li>
      <li><b>Memória (m)</b>: nagy, hosszú cím, lassú.</li>
      <li><b>Regiszter (r)</b>: gyors, korlátozott számú.</li>
      <li><b>Verem (s)</b>: gyors, de csak a teteje látszik.</li>
      <li><b>Immediate (i)</b>: az operandus értéke közvetlenül az utasításban van (pl. <code class="kbd">ADD r1, 3</code>).</li>
    </ul>

    <h2>Architektúrák osztályozása operandus típusok szerint</h2>
    <div class="grid">
      <div class="callout">
        <b>Szabályos (homogén)</b>
        <div class="muted">
          Csak egyfajta operandustípus (AC kivétel lehet). Ugyanazt az operandustípust biztosítja valamennyi adatmanipulációhoz,
          ezért könnyebb kezelni, áttekinthetőbb és gyorsabb.
        </div>
        <div>Példa: RISC – <code class="kbd">r, r, r</code></div>
      </div>

      <div class="callout">
        <b>Kombinált (heterogén)</b>
        <div class="muted">
          Különböző operandustípusok megengedettek egy utasításon belül (nem homogén).
        </div>
        <div>Példa: regiszter + memória; CISC (x86)</div>
      </div>
    </div>

    <h2>Állapottér</h2>
    <p>
      Olyan <b>programból látható</b> és <b>programtranszparens</b> tárolókból áll, amelyek az adott programra vonatkozó
      állapotinformációkat hordozzák.
    </p>

    <h2>Állapotműveletek</h2>
    <p>Állapotjelzőket (flageket) speciális utasításokkal lehet manipulálni.</p>

    <h3>PC esetén</h3>
    <ul>
      <li>Increment</li>
      <li>Decrement</li>
      <li>Felülírás (egy utasításból vett címmel)</li>
    </ul>

    <h3>Flagek esetén</h3>
    <ul>
      <li>Save</li>
      <li>Set (1/0)</li>
      <li>Reset (alapállapotba hozás)</li>
      <li>Load</li>
      <li>Clear (törlés)</li>
    </ul>
  `,
};
