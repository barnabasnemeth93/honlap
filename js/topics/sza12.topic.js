// js/topics/sza12.topic.js
// Forrás: SzA 12.pdf teljes tartalma alapján.

export const topic = {
  id: "sza12",
  code: "SzA12",
  title:
    "A futószalag (pipeline) elvű utasítás-végrehajtás, pipeline CPU-k",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA12</b>
    </div>
    <div class="muted">
      (a futószalag elve; jellemzői; logikai felépítés és fizikai megvalósítás,
      prefetching, átlapolt utasítás végrehajtás, újrafeldolgozás.
      A futószalag elvű feldolgozás következményei, az ebből adódó szűk keresztmetszetek
      és ezek kezelése)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>A futószalag elve</div>
    <div class="learn-body">
      <p>
        Az utasítást több részre bontjuk (általában
        <b>Fetch</b>, <b>Decode</b>, <b>Execute</b>, <b>Write Back</b>),
        majd ezeket a részeket <b>külön, egymással párhuzamosan</b> hajtjuk végre.
      </p>

      <p>
        Miközben egy utasítás végrehajtási fázisban van,
        a következő már <b>dekódolás</b> alatt áll,
        a harmadik pedig <b>lehívásra</b> kerül.
        (klasszikus példa: <b>autógyártás</b>).
      </p>

      <p>
        Cél: egységnyi idő alatt <b>több utasítás</b> haladjon át a processzoron.
        Ideális esetben <b>minden órajelciklusban elkészül egy utasítás</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>Előfeltételek (2 fokozat esetén)</div>
    <div class="learn-body">
      <ol>
        <li>A számítógép két egymástól <b>teljesen független végrehajtóegységgel</b> rendelkezik</li>
        <li>Mindkét fokozat végrehajtása <b>egyforma időt igényel</b></li>
        <li>Egyik fokozat kimenete a másik fokozat <b>bemenete</b></li>
        <li>
          A fokozatok <b>órajelre szinkronizáltak</b>
          (input az órajel kezdetén, és lehetőleg egy ciklus alatt végrehajtják a feladatot)
        </li>
      </ol>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">3</span>Jellemzői</div>
    <div class="learn-body">
      <p>
        A futószalag feldolgozás <b>időbeli párhuzamosságot</b> valósít meg:
        a végrehajtó egységek időben egymás után vannak kapcsolva.
      </p>

      <p>
        Elméletben az utasítások <b>n részre</b> osztásával a sebesség
        <b>n-szeresére növekszik</b>, amennyiben minden rész azonos idő alatt hajtódik végre.
      </p>

      <p>
        A gyakorlatban ez korlátozott a
        <b>függőségek</b> miatt:
        <b>adat</b>, <b>vezérlés</b>, <b>erőforrás</b>.
      </p>

      <div class="subblock">
        <div class="subblock-title">Hatékonyság</div>
        <div class="muted">
          A maximális hatékonyság jellemzően
          <b>15–30 fokozatú</b> futószalag esetén érhető el.
        </div>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">4</span>Logikai felépítés és fizikai megvalósítás</div>
    <div class="learn-body">
      <div class="grid grid-2">
        <div class="subblock">
          <div class="subblock-title">Univerzális futószalag</div>
          <p class="muted">
            Minden utasítást végre tud hajtani.
          </p>
        </div>

        <div class="subblock">
          <div class="subblock-title">Dedikált futószalag</div>
          <p class="muted">
            Csak meghatározott utasításokat tud végrehajtani →
            <b>kisebb</b>, <b>gyorsabb</b>.
          </p>
        </div>
      </div>

      <div class="subblock">
        <div class="subblock-title">Dedikált futószalag típusai</div>
        <ul>
          <li>
            <b>Aritmetikai</b>
            <ul>
              <li>FX egyszerű (+, −, léptetés, eltolás)</li>
              <li>FX összetett (szorzás, osztás)</li>
              <li>FP (lebegőpontos)</li>
            </ul>
          </li>
          <li><b>Ugrási (branch)</b></li>
          <li><b>LOAD / STORE</b></li>
        </ul>
      </div>

      <div class="subblock">
        <div class="subblock-title">Fizikai megvalósítás</div>
        <p class="muted">
          Dedikált futószalagok alkalmazása →
          kevesebb logikai kapu, gyorsabb végrehajtás,
          egyszerűbb tervezés.
        </p>

        <p class="muted">
          A fokozatok között <b>elválasztó pufferregiszterek</b> (rejtett)
          találhatók, amelyek kiegyenlítik az eltérő végrehajtási időket.
        </p>

        <p>
          A pipeline sebességét mindig a <b>leglassabb fokozat</b> határozza meg,
          ezért tervezési cél az <b>egyenletes fokozathossz</b>.
        </p>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">5</span>Prefetching (előlehívás)</div>
    <div class="learn-body">
      <p>
        A pipeline <b>legegyszerűbb formája</b>, ahol csak a lehívás van átfedésben.
      </p>

      <p>
        A visszaírással egyidőben történik a
        <b>következő utasítás lehívása</b>.
      </p>

      <p class="muted">
        Gyorsulást eredményez, de nem túl jelentős.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">6</span>Átlapolt utasítás-végrehajtás és újrafeldolgozás</div>
    <div class="learn-body">
      <div class="subblock">
        <div class="subblock-title">Átlapolt végrehajtás</div>
        <p>
          Az egyik utasítás <b>utolsó lépése</b> és a következő
          <b>első lépése</b> van átfedésben.
        </p>

        <p class="muted">
          Ez kb. <b>25% teljesítménynövekedést</b> eredményez
          (WB alatt történik a másik utasítás Fetch-e).
        </p>
      </div>

      <div class="subblock">
        <div class="subblock-title">Újrafeldolgozás</div>
        <p>
          Leggyakrabban az <b>Execute fokozat többszöri egymás utáni végrehajtását</b> jelenti.
        </p>

        <p>
          Ez lassítja a futószalagot, de összességében
          <b>jobb teljesítményt</b> biztosít.
        </p>

        <p class="muted">
          Iteratív számításoknál nem szükséges minden lépésnél újra betölteni az adatokat,
          így csökken a <b>memóriaelérések száma</b>.
        </p>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">7</span>A futószalagos feldolgozás következményei</div>
    <div class="learn-body">
      <p>
        Jelentősen felgyorsult az <b>utasítás lehívás</b>
        és az <b>operandus betöltés</b>.
      </p>

      <div class="subblock">
        <div class="subblock-title">Problémák</div>
        <ul>
          <li>
            <b>Memóriasávszélesség</b> – sebességolló jelenség:
            a CPU-k sebessége gyorsabban nőtt, mint a memória sebessége.
            <br/>
            Megoldás: <b>cache</b>.
          </li>
          <li>
            <b>Elágazások</b> – megszakítják a pipeline folytonosságát.
            <br/>
            Kezelés: <b>elágazásbecslés</b> és <b>spekulatív technikák</b>.
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
};
