// js/topics/sza14.topic.js
// Forrás: SzA14.pdf teljes tartalma alapján.

export const topic = {
  id: "sza14",
  code: "SzA14",
  title:
    "Második generációs (széles) szuperskalár processzorok",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA14</b>
    </div>
    <div class="muted">
      (a kibocsátási szűk keresztmetszet kiküszöbölése: dinamikus utasítás-ütemezés és
      regiszter-átnevezés, végrehajtási modelljük, ROB működése,
      operandus-lehívás és értékelés)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>Kibocsátási szűk keresztmetszet</div>
    <div class="learn-body">
      <p>
        Az <b>első generációs szuperskalár CPU-knál</b> több súlyos korlát jelentkezett:
      </p>

      <ul>
        <li>
          <b>Kibocsátás</b> – közvetlen kibocsátás miatt nem volt kezelhető  
          <br/>
          → elméletben:
          <b>2 utasítás/ciklus (CISC)</b>,
          <b>3 utasítás/ciklus (RISC)</b>  
          <br/>
          → gyakorlatban: <b>1 utasítás/ciklus</b>
        </li>

        <li>
          <b>Memória</b> – cache bevezetésével csökkenthető
        </li>

        <li>
          <b>Elágazások</b> – csak statikus elágazásbecslés
        </li>

        <li>
          <b>RAW és adatfüggőségek</b> által okozott szűk keresztmetszet
          <div class="muted">
            (t3 időpontban szükség lenne r3 értékére, de az csak t4 végén áll elő)
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>A szűk keresztmetszet kiküszöbölése</div>
    <div class="learn-body">
      <p>
        Az átbocsátóképesség növeléséhez az architektúrát
        <b>teljesen át kellett tervezni</b>.
      </p>

      <p>
        Ennek eredménye lett a
        <b>második generációs (széles) szuperskalár CPU</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">3</span>Dinamikus utasítás-ütemezés</div>
    <div class="learn-body">
      <p>
        A megoldás:
        <b>pufferelt utasításkibocsátás</b> és
        <b>sorrenden kívüli kiküldés</b>.
      </p>

      <div class="subblock">
        <div class="subblock-title">Stréber modell</div>
        <ul>
          <li>
            <b>Kibocsátás:</b>
            sorrendben, a dekódolóból a
            <b>várakoztató állomásba</b>
          </li>
          <li>
            <b>Kiküldés:</b>
            a várakoztató állomásból
            <b>sorrenden kívül</b>
            a végrehajtó egységek felé
          </li>
        </ul>
      </div>

      <p>
        Ez jelentősen növeli a mikroarchitektúra elejének
        <b>átbocsátóképességét</b>,
        és megszünteti a kibocsátási szűk keresztmetszetet.
      </p>

      <p class="muted">
        Ami készen van → kiküldhető.  
        Ami függ → várakozik.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">4</span>Regiszter-átnevezés</div>
    <div class="learn-body">
      <p>
        Nem tényleges átnevezés történik, hanem:
      </p>

      <p>
        az architekturális regiszterekhez egy
        <b>átnevezési regiszterkészlet</b> kerül hozzárendelésre.
      </p>

      <p>
        Cél:
        <b>ál adatfüggőségek megszüntetése</b>
        (<b>WAR</b>, <b>WAW</b>).
      </p>

      <div class="subblock">
        <div class="subblock-title">Működés</div>
        <ul>
          <li>utasítás kibocsátásakor új átnevezési regisztert kap</li>
          <li>a forrásregiszterek is átnevezésre kerülnek</li>
          <li>végrehajtás után visszaírás az architekturális regiszterbe</li>
          <li>átnevezési regiszter felszabadítása</li>
        </ul>
      </div>

      <p class="muted">
        Hibás elágazás esetén sem sérül az architekturális állapot,
        mert minden csak <b>piszkozatban</b> történik.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">5</span>ROB – Reorder Buffer</div>
    <div class="learn-body">

      <div class="figure">
        <img
          src="https://i.ibb.co/pBvPYgkx/image.png"
          alt="Reorder Buffer működése"
        />
      </div>

      <p>
        A <b>ROB (Reorder Buffer)</b> kulcsszerepet játszik:
      </p>

      <ul>
        <li>tartalmazza az <b>átnevezési regisztereket</b></li>
        <li>vezérli a <b>várakoztató állomást</b></li>
        <li>vezérli a <b>memória-átrendező puffert</b></li>
        <li>kiíráskor elvégzi a <b>rekonverziót</b></li>
      </ul>

      <p>
        A ROB-ot folyamatosan frissíteni kell,
        hogy a függőségek minél hamarabb feloldódjanak.
      </p>

      <p>
        Ha előáll egy eredmény, a processzor
        <b>asszociatív keresést</b> végez:
      </p>

      <ul>
        <li>keresi, mely utasítások várnak erre az operandusra</li>
        <li>beírja az értéket</li>
        <li>állapotbitet 1-re állítja</li>
      </ul>

      <p>
        Ha mindkét forrás operandus készen van,
        az utasítás <b>kiküldhető</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">6</span>Spekulatív végrehajtás ROB-ban</div>
    <div class="learn-body">
      <p>
        Minden utasításhoz tartozik egy
        <b>spekulatív bit</b>.
      </p>

      <ul>
        <li>
          <b>1:</b> még nem biztos a végrehajtás szükségessége
        </li>
        <li>
          <b>0:</b> végrehajtható és kiírható
        </li>
      </ul>

      <p>
        Helyes elágazás esetén:
        <b>bit = 0 → kiírás engedélyezett</b>
      </p>

      <p>
        Hibás becslésnél:
      </p>

      <ul>
        <li>utasítás törlése a ROB-ból</li>
        <li>átnevezési regiszterek felszabadítása</li>
        <li>utasításlehívás a helyes irányba</li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">7</span>Kiírási szabályok</div>
    <div class="learn-body">
      <ul>
        <li>
          Egy utasítás csak akkor írható ki,
          ha <b>minden előtte levő</b> már kiírásra került
        </li>

        <li>
          <b>Spekulatív állapotú</b> utasítás nem írható ki
        </li>

        <li>
          CISC esetén:
          egy CISC utasítás több RISC műveletre bontható,
          de csak akkor írható ki,
          ha <b>mindegyik eredménye előállt</b>
        </li>
      </ul>
    </div>
  </div>
  `,
};
