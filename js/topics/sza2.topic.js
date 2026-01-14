// js/topics/sza2.topic.js
// SzA2 – Az adattér, adatmanipulációs fa

export const topic = {
  id: "sza2",
  code: "SzA2",
  title: "Az adattér, adatmanipulációs fa",
  html: /* html */ `
    <div class="callout">
      <div>
        <span class="badge">Tétel</span> <b>SzA2</b>
      </div>
      <div class="muted">
        (fogalma; a címtér, a memória-tér, a virtuális és fizikai memória; 
        a regisztertér és fejlődése; egyszerű, adattípusonként különböző, 
        többszörös regisztertér, a regisztercella fizikai kialakítása. 
        Adatmanipulációs fa fogalma, szintjei, adattípusok, címzési módok, indexelés)
      </div>
    </div>

    <h2>1. Az adattér fogalma és részei</h2>

    <p>
      Az adattér a processzor (CPU) által közvetlenül elérhető és manipulálható
      tárolóhelyek összessége. Ez a logikai architektúra egyik legfontosabb része.
      Két fő komponensre oszlik: a <b>memória-térre</b> és a <b>regisztertérre</b>.
    </p>

    <table class="table">
      <thead>
        <tr>
          <th>Adattér</th>
          <th>Memóriatér</th>
          <th>Regisztertér</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td>Nagy</td>
          <td>Kicsi</td>
        </tr>
        <tr>
          <td></td>
          <td>Olcsó</td>
          <td>Drága</td>
        </tr>
        <tr>
          <td></td>
          <td>Lassú</td>
          <td>Gyors</td>
        </tr>
        <tr>
          <td></td>
          <td>Processzor lapkán kívül helyezkedik el</td>
          <td>Processzor lapkán helyezkedik el</td>
        </tr>
        <tr>
          <td></td>
          <td>Közös címtérre lehet az I/O eszközök címtérrel</td>
          <td>Dedikált címtér</td>
        </tr>
        <tr>
          <td></td>
          <td>DRAM-ot használ</td>
          <td>SRAM-ot használ</td>
        </tr>
      </tbody>
    </table>

    <h3>Címtér, memória-tér, virtuális és fizikai memória</h3>

    <ul>
      <li>
        <b>Címtér (Address Space):</b>
        Az összes olyan cím halmaza, amelyet a processzor generálni tud.
        Méretét a címsín szélessége határozza meg
        (pl. 32 bites címsín esetén 2<sup>32</sup> bit, azaz 4 GB).
      </li>
      <li>
        <b>Memória-tér (Memory Space):</b>
        A gép ténylegesen beépített fizikai operatív tár (RAM) mérete.
        Ez gyakran kisebb, mint a címtér.
      </li>
      <li>
        <b>Fizikai memória:</b>
        A tényleges hardveres tárolóegység, ahol az adatok fizikailag elhelyezkednek.
      </li>
      <li>
        <b>Virtuális memória:</b>
        Egy absztrakciós réteg, amely lehetővé teszi, hogy a programozó nagyobb
        memóriát lásson, mint amennyi fizikailag rendelkezésre áll.
        A virtuális címeket az <b>MMU (Memory Management Unit)</b>
        fordítja le fizikai címekre lapozás (paging) segítségével.
      </li>
    </ul>

    <h2>2. A regisztertér és fejlődése</h2>

    <p>
      A regiszterek a processzoron belüli leggyorsabb, de legkisebb kapacitású tárolók.
    </p>

    <ul>
      <li>
        <b>Egyszerű regisztertér:</b>
        A korai processzorokban (pl. 8 bites korszak) kevés,
        általános célú regiszter volt, amelyek bármilyen műveletre használhatóak voltak.
      </li>
      <li>
        <b>Adattípusonként különböző (szelektált) regisztertér:</b>
        A hatékonyság növelése érdekében különválasztották a funkciókat.
        Vannak dedikált <b>adatregiszterek</b> (számításokhoz),
        <b>címregiszterek</b> (indexeléshez, pointerekhez)
        és <b>lebegőpontos regiszterek</b> (FPU).
      </li>
      <li>
        <b>Többszörös regisztertér (regiszterablakok):</b>
        Főleg RISC architektúráknál (pl. SPARC) jellemző.
        A cél a szubrutin-hívások felgyorsítása:
        a hívó és a hívott függvény regiszterei részben átfedik egymást,
        így nincs szükség az adatok lassú memóriába mentésére
        (stack push/pop).
      </li>
      <li>
        <b>A regisztercella fizikai kialakítása:</b>
        A regiszterek általában D-típusú flip-flopokból vagy speciális,
        többkapus (multi-ported) SRAM cellákból épülnek fel,
        hogy egyetlen órajelciklus alatt több olvasási és írási műveletet is
        ki tudjanak szolgálni.
      </li>
    </ul>

    <h2>3. Az adatmanipulációs fa</h2>

    <p>
Megmutatja a potenciális adatmanipulációs lehetőségeket. Bizonyos részfái megmutatják egy
konkrét implementáció adatmanipulációs lehetőségeit.
    </p>

    <ul>
      <li>
        <b>Fogalma:</b>
        Az architektúrának az a része, amely meghatározza,
        milyen adattípusokon milyen műveletek
        (aritmetikai, logikai, léptetés stb.) lehet elvégezni,
        és milyen címzési módokkal érhetők el az operandusok.
      </li>
    </ul>

    <h3>Szintjei</h3>
    <ol>
      <li><b>Adattípusok</b> </li>
      <li><b>Műveletek</b> </li>
            <li><b>Operandusok típusai</b> </li>
      <li><b>Címzési módok</b> </li>
      <li><b>Gépi kódok</b> </li>

    </ol>

    <h3>Adattípusok</h3>
    <p>
      Egész (integer), lebegőpontos (float),
      karakteres (string),
      BCD (binárisan kódolt decimális),
      logikai (boolean)
      és vektor/SIMD típusok.
    </p>

    <h3>Címzési módok</h3>
    <ul>
      <li><b>Azonnali (Immediate):</b> Az adat maga az utasítás része.</li>
      <li><b>Regiszteres:</b> Az adat egy regiszterben van.</li>
      <li>
        <b>Közvetlen (Direct):</b>
        Az utasítás tartalmazza a memória pontos címét.
      </li>
      <li>
        <b>Közvetett (Indirect):</b>
        Egy regiszter vagy memóriahely tartalmazza a tényleges címet.
      </li>
      <li>
        <b>Relatív:</b>
        A programszámlálóhoz (PC) képest megadott eltolás.
      </li>
    </ul>

    <h3>Indexelés</h3>
    <p>
      Egy báziscímhez (pl. tömb kezdete) hozzáadunk egy indexregiszter tartalmát.
      Ez teszi lehetővé a tömbelemek hatékony elérését ciklusokban.
    </p>
  `,
};
