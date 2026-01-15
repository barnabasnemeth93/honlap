// js/topics/summaries/sza7.summary.js
// SzA7 – Kiemelt jegyzet (összefoglaló)

export const summary = {
    topicId: "sza7",
    title: "SzA7 – Kiemelt jegyzet (summary)",
    html: /* html */ `
      <div class="callout">
        <div>
          <span class="badge">Summary</span> <b>SzA7</b>
        </div>
        <div class="muted">
          Külső buszrendszer – gyors, vizsgabarát áttekintés (ChatGPT készítette)
        </div>
      </div>
  
      <p class="muted" style="margin-top:8px;">
        Cél: <b>ránézésre tudd</b>, miről kell beszélni a tételnél. Kulcsszavak, kiemelések, minimál szöveg.
      </p>
  
      <div class="learn-block">
        <div class="learn-title">Fogalma</div>
        <div class="learn-body">
          <ul>
            <li><b>Külső busz:</b> perifériák ↔ alaplap / I/O vezérlő összekötése</li>
            <li><b>Kommunikáció infrastruktúra</b> (felhasználónak transzparens)</li>
            <li>Tipikus feladatok: <b>ki kommunikál</b>, <b>irány</b>, <b>szinkron</b>, <b>sebesség-illesztés</b></li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Fejlődése</div>
        <div class="learn-body">
          <ul>
            <li>Régi párhuzamos megoldások → <b>korlátok miatt</b> (skew/EMI) terjed a <b>soros</b></li>
            <li><b>FSB + hidak</b> (north/south bridge) → később <b>integráció</b> CPU-ba</li>
            <li>FSB/PCIe kiváltására: <b>HyperTransport</b> (AMD) és <b>QPI</b> (Intel)</li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Jellemzői (amit mindig bedobnak kérdésben)</div>
        <div class="learn-body">
          <ul>
            <li><b>Sávszélesség / késleltetés</b></li>
            <li><b>Szinkronizáció</b> (időzítés, órajel, ready jellegű visszajelzés)</li>
            <li><b>Megosztás kezelése</b> (kié a busz?)</li>
            <li><b>Bővíthetőség</b> + <b>kompatibilitás</b> (specifikációk, szabványok)</li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Csoportosítása – az 5 fő szempont</div>
        <div class="learn-body">
          <ol>
            <li><b>Irány szerint:</b> <span class="tag">simplex</span> / <span class="tag">fél-duplex</span> / <span class="tag">duplex</span></li>
            <li><b>Jelleg szerint:</b> <span class="tag">dedikált</span> vs <span class="tag">shared</span></li>
            <li><b>Átvitt tartalom:</b> <span class="tag">adatbusz</span>, <span class="tag">címbusz</span>, <span class="tag">vezérlővonal</span></li>
            <li><b>Területek alapján:</b> <span class="tag">rendszerbusz</span> vs <span class="tag">bővítőbusz</span></li>
            <li><b>Átvitel módja:</b> <span class="tag">párhuzamos</span> vs <span class="tag">soros</span></li>
          </ol>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Vezérlővonalak – 4 csoport (kulcspont!)</div>
        <div class="learn-body">
          <div class="control-grid">
            <div class="control-card">
              <div class="control-title">Adatátvitelt vezérlő</div>
              <ul>
                <li><b>M/IO</b> – mem / I/O</li>
                <li><b>R/W</b> – irány (read/write)</li>
                <li><b>WD/B</b> – word/byte</li>
                <li><b>D/S</b> – data strobe</li>
                <li><b>A/S</b> – address strobe</li>
                <li><b>RDY</b> – ready / befejezés</li>
              </ul>
            </div>
  
            <div class="control-card">
              <div class="control-title">Megszakítás</div>
              <ul>
                <li>kérő jel</li>
                <li>visszaigazoló jel</li>
              </ul>
            </div>
  
            <div class="control-card">
              <div class="control-title">Buszvezérlés</div>
              <ul>
                <li>buszfoglalás</li>
                <li>visszaigazolás</li>
              </ul>
            </div>
  
            <div class="control-card">
              <div class="control-title">Egyéb</div>
              <ul>
                <li><b>RST</b> – reset</li>
                <li><b>CLK</b> – órajel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Párhuzamos vs soros – előny / hátrány / problémák</div>
        <div class="learn-body">
          <div class="grid grid-2">
            <div class="pill">
              <div class="pill-title">Párhuzamos</div>
              <ul>
                <li><b>Sok vezeték</b> → drága, nagy csatlakozás</li>
                <li><b>Delay skew</b> (vezeték-hossz eltérés) → frekvencia limit</li>
                <li><b>EMI</b>, zaj, <b>áthallás</b></li>
                <li>Ma tipikusan: <b>CPU ↔ memória</b></li>
              </ul>
            </div>
  
            <div class="pill">
              <div class="pill-title">Soros</div>
              <ul>
                <li><b>Kevesebb vezeték</b>, jobb skálázás</li>
                <li><b>Gyorsabb egyetlen vonalon</b>, mint sok lassún</li>
                <li><b>Kódolás</b> (bitek sorba rendezése, bitsorozatok)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">PCI / PCIe</div>
        <div class="learn-body">
          <ul>
            <li><b>PCI:</b> szabvány (fizikai méret, csatlakozó, időzítés, protokoll) → CPU úgy látja, mintha rendszerbusz</li>
            <li><b>AGP</b> (grafika miatt) → később <b>PCIe (2004)</b></li>
            <li><b>PCIe előnyök:</b> <span class="tag">nagyobb sebesség</span> <span class="tag">kevesebb érintkező</span> <span class="tag">hot-plug</span></li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">USB / USB-C</div>
        <div class="learn-body">
          <ul>
            <li><b>USB:</b> ’94 fejlesztés, ’96 első verzió; újabbaknál nagyon nagy sávszélesség (USB 4.0 említve)</li>
            <li><b>USB-C:</b> <span class="tag">24 pin</span>, USB 3.1-től <span class="tag">4 érpár</span> adatátvitel</li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">FSB</div>
        <div class="learn-body">
          <ul>
            <li><b>Front Side Bus:</b> tipikusan <span class="tag">64 bites</span>, perifériás kapcsolat</li>
            <li><b>Chipset:</b> északi híd (memória/grafika) + déli híd (I/O)</li>
            <li><b>Trend:</b> északi híd funkciók <b>CPU-ba integrálva</b> (szűk keresztmetszet csökkentés)</li>
          </ul>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">HyperTransport (AMD) / QPI (Intel)</div>
        <div class="learn-body">
          <div class="grid grid-2">
            <div class="pill">
              <div class="pill-title">HyperTransport</div>
              <ul>
                <li><b>CPU-ba integrált</b>, alacsony késleltetés</li>
                <li><b>2 irányú</b>, szélessáv; rugalmas <span class="tag">4/8/16/32</span> vonal</li>
                <li><b>40/64 bites</b> címtér (64 bit → nagyon nagy címezhetőség)</li>
                <li>Fogalmak: <b>tunnel</b> (láncolható) / <b>cave</b> (lezár)</li>
              </ul>
            </div>
  
            <div class="pill">
              <div class="pill-title">QPI</div>
              <ul>
                <li><b>NUMA</b> + integrált memóriavezérlő</li>
                <li><b>Distributed shared memory</b> (fizikailag több memória, logikailag közös címtér)</li>
                <li><b>5 réteg:</b> fizikai, kapcsolati, routing, szállítási, protokoll</li>
                <li><b>Crossbar router</b> – adat eljuttatás</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  
      <div class="learn-block">
        <div class="learn-title">Jeltípusok • Impulzus amplitúdó moduláció • Frekvencia korlát</div>
        <div class="learn-body">
          <ul>
            <li><b>Jeltípusok:</b> (vizsgán) digitális jelek + vezérlő/órajel jellegű vonalak említése</li>
            <li><b>Impulzus amplitúdó moduláció (PAM):</b> több szintű amplitúdó → több bit/szimbólum (pl. “nem csak 0/1 szint”)</li>
            <li><b>Párhuzamos busz frekvencia korlát:</b> <span class="tag">delay skew</span> + <span class="tag">EMI</span> + <span class="tag">áthallás</span></li>
          </ul>
  
          <p class="muted" style="margin:10px 0 0;">
            Tipp: ha csak 30 mp van → mondd el az 5 csoportosítást + vezérlővonal 4 csoportját + párhuzamos vs soros problémákat.
          </p>
        </div>
      </div>
    `,
  };
  