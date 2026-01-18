// js/topics/sza10.topic.js
// Forrás: a feltöltött SzA10.docx teljes tartalma alapján.

export const topic = {
  id: "sza10",
  code: "SzA10",
  title: "Számítógép architektúrák osztályozása és az adatfüggőségek",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA10</b>
    </div>
    <div class="muted">
      (Flynn-féle, illetve korszerű osztályozás, az adatfüggőség fogalma, főbb fajtái,
      teljesítmény-korlátozó hatásuk)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>Számítógép architektúrák osztályozása</div>
    <div class="learn-body">
      <h3>Flynn-féle osztályozás (klasszikus modell)</h3>
      <p>
        A Flynn-féle osztályozás a rendelkezésre álló <b>vezérlő</b> és <b>feldolgozó</b> egységek számán alapul.
      </p>

      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Utasításfolyam</div>
          <ul>
            <li><b>SI</b> (single instruction stream): <b>egyszeres</b> utasításfolyam.</li>
            <li><b>MI</b> (multiple instruction stream): <b>többszörös</b> utasításfolyam.</li>
          </ul>
        </div>

        <div class="subblock">
          <div class="subblock-title">Adatfolyam</div>
          <ul>
            <li><b>SD</b> (single data stream): <b>egyszeres</b> adatfolyam.</li>
            <li><b>MD</b> (multiple data stream): <b>többszörös</b> adatfolyam.</li>
          </ul>
        </div>
      </div>

      <div class="subblock">
        <div class="subblock-title">Megjegyzés</div>
        <div class="muted">
          A modell egyszerű, de <b>nem mutatja</b> a párhuzamosság <b>módját</b>.
        </div>
      </div>

      <h3>Modern osztályozás</h3>
      <p>
        A modern osztályozás nem a <code class="kbd">SISD</code>, <code class="kbd">SIMD</code>, <code class="kbd">MISD</code>,
        <code class="kbd">MIMD</code> felosztást alkalmazza, hanem a <b>párhuzamosság módja</b> alapján különböztet meg:
      </p>

      <div class="control-grid">
        <div class="control-card">
          <div class="control-title">adatpárhuzamos architektúrákat</div>
        </div>
        <div class="control-card">
          <div class="control-title">funkcionálisan párhuzamos architektúrákat</div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Adatpárhuzamos architektúrák</div>
          <ul>
            <li><b>vektor</b></li>
            <li><b>asszociatív / neurális</b></li>
            <li><b>szisztolikus</b></li>
            <li><b>SIMD</b></li>
          </ul>
        </div>

        <div class="subblock">
          <div class="subblock-title">Funkcionálisan párhuzamos architektúrák</div>
          <ul>
            <li><b>ILP</b> (futószalag, VLIW, szuperskalár)</li>
            <li><b>SMT</b></li>
            <li><b>folyamat szintű párhuzamosság</b></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <hr class="sep"/>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>Adatfüggőség</div>
    <div class="learn-body">
      <p>
        Adatfüggőségről beszélünk, ha egymást követő utasítások <b>ugyanazt az adatot</b> használják.
      </p>

      <h3>Jellege szerint</h3>

      <div class="subblock">
        <div class="subblock-title">Utasítás szekvenciában jelenlevő (lineáris utasításfeldolgozás)</div>

        <ul>
          <li>
            <b>valós adatfüggőség</b> (<b>RAW</b> – Read After Write)
            <ul>
              <li><b>műveleti adatfüggőség</b></li>
              <li><b>behívási adatfüggőség</b></li>
            </ul>
          </li>

          <li>
            <b>ál adatfüggőség</b>
            <ul>
              <li><b>WAR</b> (Write After Read)</li>
              <li><b>WAW</b> (Write After Write)</li>
            </ul>
          </li>

          <li><b>ciklusban jelenlevő</b></li>
        </ul>
      </div>

      <h3>Operandus típus szerint</h3>
      <ul>
        <li><b>regiszter</b></li>
        <li><b>memória</b></li>
      </ul>

      <h3>RAW – valós adatfüggőség</h3>
      <p><b>Az adat még nem áll rendelkezésre</b> a következő utasítás számára.</p>

      <h4>Példán keresztül bemutatva (probléma felvetés)</h4>
      <p class="muted">
        Feltételezzük, hogy a CPU 3 operandusos utasításokat használ, valamint egy 4 fokozatú futószalagot (F, D, E, W/B).
        Két számot össze akarunk szorozni, majd az eredményeket össze akarjuk adni.
      </p>

      <table class="table">
        <thead>
          <tr>
            <th>Utasítás</th>
            <th>Művelet</th>
            <th>Magyarázat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>I1</b></td>
            <td><code class="kbd">MUL r3 , r2 , r1</code></td>
            <td>(r1 , r2 tartalmát összeszorozzuk r3 -ba)</td>
          </tr>
          <tr>
            <td><b>I2</b></td>
            <td><code class="kbd">SHL r3</code></td>
            <td>(r3 értéket eltolással megduplázzuk)</td>
          </tr>
        </tbody>
      </table>

      <div class="learn-block">
        <div class="learn-title"><span class="num">!</span>Probléma</div>
        <div class="learn-body muted" style="font-size:14px; line-height:1.65;">
          <b>t3</b> időpontban szükségünk van <b>r3</b> értékére a <b>dekódoláshoz</b>, viszont az csak <b>t4 végén</b> fog előállni.
          <b>Valós műveleti adatfüggőség</b>, mert műveletet akarunk végezni egy regiszter tartalmával, ami <b>nem áll rendelkezésre</b>.
          Ilyen futószalagos párhuzamos végrehajtásnál fordulhat elő, ahol az utasítás lehívás (<b>Fetch</b>) és végrehajtás (<b>Execute</b>)
          átfedheti egymást. Ilyenkor a művelet <b>nem folytatódhat</b>, míg a függősége fel nem oldódik -> <b>elakadás</b>,
          <b>várakozás</b> következik be (<b>csökken a hatékonyság</b>!).
        </div>
      </div>

      <h4>Kezelés</h4>
      <ul>
        <li><code class="kbd">NOP</code> utasítás -> két óraciklussal hosszabb ideig tart az utasításvégrehajtás</li>
        <li><b>operandus előrehozás</b></li>
      </ul>

      <h4>Műveleti valós adatfüggőség (RAW-nál)</h4>
      <p class="muted">
        Egy extra hardver segítségével az eredményt <b>visszavezetjük</b> valamelyik forrásregiszterbe
        (tehát megspóroljuk a <b>W/B</b>-t). Ezt minden mai CPU használja. Természetesen az eredményt a regiszterbe is vissza kell írni.
      </p>

      <h4>Lehívási valós adatfüggőség (RAW-nál)</h4>

      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Probléma</div>
          <div class="muted">
            A regiszterekbe az <b>operatív tárból</b> vagy <b>adatcache-ből</b> töltjük be a szükséges operandusokat,
            majd az ALU a regiszterekből hívja le. Amennyiben a kért adat még nem érhető el a reigszterben,
            be kell oda tölteni, de ezeknek az elérése <b>sok időt</b> vesz igénybe.
          </div>
        </div>

        <div class="subblock">
          <div class="subblock-title">Megoldás</div>
          <div class="muted">
            <b>Betöltési operandus előrehozás.</b> Extra hardver segítségével nemcsak a regiszterekbe töltjük be,
            hanem az <b>ALU bemenetére</b> is. Legalább <b>1 óraciklussal</b> gyorsítjuk a végrehajtást.
          </div>
        </div>
      </div>

      <h3>WAR és WAW (ál-adatfüggőségek)</h3>

      <h4>WAR (write after read)</h4>
      <p><b>Megszüntethető teljesen.</b></p>

      <div class="learn-block">
        <div class="learn-title"><span class="num">!</span>Probléma</div>
        <div class="learn-body">
          <table class="table">
            <thead>
              <tr>
                <th>Utasítás</th>
                <th>Művelet</th>
                <th>Magyarázat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>I1</b></td>
                <td><code class="kbd">MUL r3 r2 r1</code></td>
                <td>r3-ba szorozzunk össze két számot</td>
              </tr>
              <tr>
                <td><b>I2</b></td>
                <td><code class="kbd">ADD r2 r4 r5</code></td>
                <td>a szorzó forrás regiszterébe töltjük egy gyorsabb művelet eredményét</td>
              </tr>
            </tbody>
          </table>

          <div class="muted" style="margin-top:10px; font-size:14px; line-height:1.65;">
            <code class="kbd">ADD</code> lehet, hogy <b>gyorsabb</b>, mint a <code class="kbd">MUL</code>,
            így az utasítás <b>hibás eredményt</b> fog adni és sérül a <b>szekvenciális konzisztencia</b>.
          </div>
        </div>
      </div>

      <div class="subblock">
        <div class="subblock-title">Megoldás</div>
        <div class="muted">
          <b>r2</b> tartalmát egy ideiglenes regiszterbe irányítjuk (<b>r23</b>), ezt nevezzük <b>átnevezési regiszternek</b>.
        </div>
      </div>

      <h4>Átnevezési regiszterek tulajdonságai</h4>
      <ul>
        <li><b>új</b>, önálló regiszterek</li>
        <li><b>saját címtartományuk</b> van</li>
        <li>programozó számára <b>transzparens</b></li>
        <li><b>extra hardvernek</b> számít</li>
      </ul>

      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Architekturális regiszterkészlet</div>
          <div class="muted">ezeket látja a programozó (AX, BX, CX, stb.)</div>
        </div>
        <div class="subblock">
          <div class="subblock-title">Átnevezési regiszterkészlet</div>
          <div class="muted">vezérlés használja, programozó nem látja (transzparens)</div>
        </div>
      </div>

      <h4>WAW (write after write)</h4>

      <div class="learn-block">
        <div class="learn-title"><span class="num">!</span>Probléma</div>
        <div class="learn-body">
          <table class="table">
            <thead>
              <tr>
                <th>Utasítás</th>
                <th>Művelet</th>
                <th>Magyarázat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>I1</b></td>
                <td><code class="kbd">MUL r3 r2 r1</code></td>
                <td>r3 -ba szorozzunk össze két számot</td>
              </tr>
              <tr>
                <td><b>I2</b></td>
                <td><code class="kbd">ADD r3 r4 r5</code></td>
                <td>majd ugyanabba a regiszterbe töltjük egy gyorsabb művelet eredményét</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="subblock">
        <div class="subblock-title">Megoldás</div>
        <div class="muted"><b>átnevezési regiszter</b></div>
      </div>

      <h3>Ciklusbeli adatfüggőség</h3>

      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Probléma</div>
          <div class="muted">
            Egy ciklus mindig az <b>eggyele korábbi iteráció</b> eredményét használja, azaz az aktuális eredményhez szükség van
            az <b>előző iteráció</b> eredményére
          </div>
        </div>

        <div class="subblock">
          <div class="subblock-title">Megoldás</div>
          <div class="muted"><b>algoritmus áttervezése</b></div>
        </div>
      </div>
    </div>
  </div>
  `,
};
