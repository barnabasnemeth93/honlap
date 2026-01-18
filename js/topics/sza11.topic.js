// js/topics/sza11.topic.js
// Forrás: a felhasználó által megadott SzA11 tételszöveg (változtatás nélkül, csak tanulóbarát formázással).

export const topic = {
  id: "sza11",
  code: "SzA11",
  title:
    "Vezérlésfüggőségek, teljesítmény korlátozó hatásuk csökkentése és a szekvenciális konzisztencia",
  html: /* html */ `
  <div class="callout">
    <div>
      <span class="badge">Tétel</span> <b>SzA11</b>
    </div>
    <div class="muted">
      (vezérlésfüggőségek fogalma, teljesítmény korlátozó hatása és annak csökkentése, a
      feltétlen vezérlésátadás, a statikus és dinamikus elágazásbecslés, valamint a
      spekulatív elágazáskezelés elve, az utasítás-feldolgozás és a kivételkezelés soros
      konzisztenciája, a precíz megszakítás-kezelés)
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">0</span>Három függőség létezik</div>
    <div class="learn-body">
      <ul>
        <li><b>Adat</b></li>
        <li><b>Vezérlés</b></li>
        <li><b>Erőforrás</b></li>
      </ul>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">1</span>Vezérlésfüggőség</div>
    <div class="learn-body">
      <p>
        Vezérlésfüggőség akkor léphet fel, ha <b>feltétlen</b> vagy <b>feltételes elágazáshoz</b> érkezünk.
        Ilyenkor az elágazás dönti el, hogy melyiknek kellene lennie a <b>következő utasításnak</b> az utasítássorozatban.
      </p>

      <div class="subblock">
        <div class="subblock-title">Az utasítás négy fázisa</div>
        <ul>
          <li><b>Fetch</b></li>
          <li><b>Decode</b></li>
          <li><b>Execute</b></li>
          <li><b>Write Back (WB)</b></li>
        </ul>
      </div>
    </div>
  </div>

  <hr class="sep"/>

  <div class="learn-block">
    <div class="learn-title"><span class="num">2</span>Feltétlen elágazásoknál</div>
    <div class="learn-body">
      <p>
        A párhuzamos végrehajtásnál pl. ilyen egy <b>JMP</b> utasítás (ha Assemblyben kódolva nézzük ezt a példát),
        hiszen amint elkezdődik a JMP utasítás <b>Dekódolása</b>, majd <b>Fetchelése</b>, párhuzamosan már a következő
        utasítás <b>Fetcheslése</b> elkezdődik.
      </p>

      <p>
        De a JMP utasítás végrehajtása (<b>Execute</b>) részére már akár egy következő, ami nem az utasítássorozat következő eleme
        lesz, hiszen <b>ugrunk</b>, Fetchelésre és Dekódolásra került. (Egyes esetekben végrehajtásra is.)
        -> Ez <b>feleslegesen</b> történik.
      </p>

      <div class="subblock">
        <div class="subblock-title">Megjegyzés</div>
        <div class="muted">
          Kiküszöbölni 100%-ig nem lehet, de kezelni igen. Három módja van:
          <b>Statikus</b>, <b>Dinamikus</b>, <b>Spekulatív</b>.
        </div>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">3</span>Statikus</div>
    <div class="learn-body">
      <p>
        Statikus: <b>JMP</b> (ugró) utasítás mögé több <code class="kbd">NOP</code> utasítást teszünk be.
        Feltétele: a cacheből előre be kell olvasni az utasításokat, hogy létezik-e <b>JMP</b> utasítás
        (vagy más vezérlésátadó). Ez az <b>ugrási buborék</b>: ha látjuk, hogy JMP utasítás jön, utána NOP utasításokat teszünk.
        Tehát <code class="kbd">NOP</code> <code class="kbd">NOP</code> <code class="kbd">NOP</code> Fetch.
        Így a NOP NOP NOP alatt eldől, hogy mi történik a JMP utasításban.
      </p>

      <p>
        NOP utasítások száma: <b>n-1</b> (ahol <b>n</b> a futószalagok száma).
        Így nem veszélyeztetjük a <b>regisztertartalmakat</b>.
      </p>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">4</span>Dinamikus</div>
    <div class="learn-body">
      <p>
        Dinamikus: <b>optimalizáló compiler</b> segítségével: a compiler a fordítás során megpróbálja
        <b>átrendezni</b> az utasítások sorrendjét. Ha JMP van, megpróbálja előbb végrehajtani.
        Így, amíg a JMP utasítás végrehajtásra kerül, nem kell NOP-okat betenni (vagy kevesebbet),
        hanem előtte lévő <b>aritmetikai utasítások</b> mennek végbe.
      </p>

      <p>
        Hátránya: minél hosszabb a futószalag, annál több utasítást kéne mögé tenni.
        <b>Rövid futószalagoknál</b> hatékony.
      </p>
    </div>
  </div>

  <hr class="sep"/>

  <div class="learn-block">
    <div class="learn-title"><span class="num">5</span>Feltételes elágazásoknál</div>
    <div class="learn-body">
      <p>
        Feltételes elágazásoknál: <b>elágazásbecslés</b> (branch prediction) szükséges.
      </p>

      <div class="subblock">
        <div class="subblock-title">Kezelés</div>
        <ul>
          <li><b>dinamikusan</b> (pl. történet bitekkel)</li>
          <li><b>spekulatívan</b></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">6</span>Spekulatív</div>
    <div class="learn-body">
      <p>
        Spekulatív: A várakoztató állomásban tárolt adatok alapján spekulál a processzor.
        Használata: <b>feloldatlan</b> (vagy függő) elágazás esetén, vagyis, ha a feltétel kiértékelése
        valamilyen <b>nagy késleltetésű</b> művelet eredményétől függ (pl. <b>div</b>).
      </p>

      <p>
        Megbecsüli a futtatási irányt, és annak megfelelően hívja le az utasításokat.
        Ha a becslés helyes volt, folytatódik a feldolgozás, amennyiben hibás, akkor a hibás irányba hívott utasításokat
        <b>eldobják</b> és megkezdődik a lehívás a helyes irányba. <b>Erőforrás igényes.</b>
      </p>

      <div class="subblock">
        <div class="subblock-title">Hol jellemző?</div>
        <p class="muted">II. generációs szuperskalároknál találkozhatunk vele.</p>
      </div>

      <div class="subblock">
        <div class="subblock-title">Reorder Buffer (ROB)</div>
        <p>
          Reorder Buffer (ROB) segítségével történik. Van egy <b>bemeneti mutatója</b> és egy <b>végmutatója</b>,
          az utasítások ott várakoznak a kettő között. (várakoztató állomás).
        </p>

        <p>
          Itt kell kiválasztania a <b>függetleneket</b>, amelyek kiküldhetők a végrehajtó egységek felé.
          Egy utasítás addig nem írható ki a ROB-ból, amíg az összes előtte levő utasítás nem lett végrehajtva.
          Megnézi, hogy van-e olyan utasítás, ami a <b>célregiszterre</b> mutat, tehát egy utasítás eredményét akarja használni.
        </p>

        <p>
          Minden utasításhoz tartozik a ROB-ban egy <b>állapotbit</b>. Ez a <b>spekulatív bit</b>.
          Amíg ez a spekulatív bit áll, lehet, hogy ez az utasítás függetlenné válik (vagy eleve az).
          Ilyenkor is a spekulatív bit be van billentve, tehát nem tudni, hogy valóban jó irányba történt-e meg a becslés.
          Ilyenkor nem írható ki az utasítás még a ROB-ból.
          Ha végre kell hajtani az utasítást, a spekulatív bit 0-ra változik és kiírásra kerül.
        </p>
      </div>
    </div>
  </div>

  <hr class="sep"/>

  <div class="learn-block">
    <div class="learn-title"><span class="num">7</span>Szekvenciális konzisztencia megőrzése</div>
    <div class="learn-body">
      <p>
        A prgramozó a programoz szekvenciális (soros) logika szerint készíti el. Feltételezi, hogy az utasítások
        egy megadott sorrendben, egymás után és egymásra épülve hajtódnak végre.
      </p>

      <div class="subblock">
        <div class="subblock-title">Két típus</div>
        <ul>
          <li><b>Utasításfeldolgozás</b></li>
          <li><b>Kivételkezelés</b> (=megszakításkezelés)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">8</span>Utasításfeldolgozás</div>
    <div class="learn-body">
      <div class="subblock">
        <div class="subblock-title">Két csoport</div>
        <ul>
          <li>
            <b>Utasításvégrehajtás soros konzisztenciája</b> (ez a <b>CPU konzisztencia</b>):
            <ul>
              <li>
                egy <b>DIV</b> és egy <b>ADD</b> utasítás egymás után és a végén egy <b>JZ</b>.
                A DIV lényegeseb lassabb, mint az ADD, így lehet, hogy az ADD később hajtódik végre,
                így a JZ rosszul interpretálja
              </li>
            </ul>
          </li>
          <li><b>Memóriakonzisztencia</b></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">9</span>Kivételkezelés</div>
    <div class="learn-body">
      <div class="subblock">
        <div class="subblock-title">Két csoport</div>
        <ul>
          <li>
            <b>Pontatlan kivételkezelés</b> (gyenge konzisztencia):
            <ul>
              <li>
                egy <b>MUL</b>, <b>ADD</b> és egy <b>JZ</b>. Lehet, hogy nem tudja lekezelni az eredményt (túlcsordul)
                és megszakítás történik. Itt is ADD előbb fejeződik be, de, ha ez túlcsordul és megszakítást generál
                -> a program kontextusát el kell menteni (flagek állapota, regiszterek tartalma).
                Ilyenkor a MUL regiszterei (mondjuk <b>r3</b>,<b>r2</b>,<b>r1</b>) definiálatlanok.
                Nem tudjuk, mi lesz benne, mert megszakadt és mentett. (Ilyenkor volt pl. Windows 98-on kékhalál.)
              </li>
            </ul>
          </li>
          <li><b>Precíz (pontos) kivételkezelés</b> (erős konzisztencia)</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="learn-block">
    <div class="learn-title"><span class="num">10</span>Precíz megszakításkezelés</div>
    <div class="learn-body">
      <p>
        Csak az utasítások <b>eredeti sorrendjében</b> fogadja el a megszakításkéréseket.
        Az előző példához: a processzor megnézi előbb, hogy befejeződtek-e a korábbi utasításokat, addig nem fogadja el.
      </p>

      <div class="subblock">
        <div class="subblock-title">Megvalósítás</div>
        <p class="muted">
          Intelnél megvalósítása ennek: <b>ROB</b> (reorder buffer) vagy <b>címkézés</b>.
        </p>
      </div>
    </div>
  </div>
  `,
};
