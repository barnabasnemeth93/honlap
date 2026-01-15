export const quiz = {
    topicId: "sza7",
    questions: [
      {
        id: "q1",
        type: "single",
        prompt: "Mi a külső buszrendszer elsődleges célja?",
        options: [
          "A CPU belső regisztereinek összekötése",
          "A perifériák csatlakoztatása az alaplaphoz és az I/O vezérlőhöz",
          "A gyorsítótár és a CPU összekapcsolása",
          "A programutasítások dekódolása",
        ],
        answerIndex: 1,
        explanation:
          "A külső buszrendszer célja a perifériák és az alaplap, illetve az I/O vezérlő közti kommunikáció biztosítása.",
      },
  
      {
        id: "q2",
        type: "single",
        prompt: "Miért tekinthető a buszrendszer a felhasználó számára transzparensnek?",
        options: [
          "Mert grafikus felületen megjelenik",
          "Mert a működése a felhasználó számára nem látható",
          "Mert mindig azonos sebességgel működik",
          "Mert csak olvasható",
        ],
        answerIndex: 1,
        explanation:
          "A buszrendszer a kommunikáció infrastrukturális része, a felhasználó közvetlenül nem érzékeli.",
      },
  
      {
        id: "q3",
        type: "single",
        prompt: "Melyik adatátviteli irány NEM kétirányú?",
        options: [
          "Duplex",
          "Fél-duplex",
          "Simplex",
          "Bidirekcionális",
        ],
        answerIndex: 2,
        explanation:
          "A simplex adatátvitel egyirányú, például órajel vagy reset vonalak esetén.",
      },
  
      {
        id: "q4",
        type: "single",
        prompt: "Mi jellemző a dedikált buszrendszerre?",
        options: [
          "Minden eszköz egy közös buszon osztozik",
          "Olcsó és könnyen bővíthető",
          "Minden egység minden egységgel össze van kötve",
          "Csak soros adatátvitelt használ",
        ],
        answerIndex: 2,
        explanation:
          "Dedikált buszrendszernél minden egység minden egységgel összeköttetésben van, ami gyors, de drága.",
      },
  
      {
        id: "q5",
        type: "single",
        prompt: "Mi a megosztott (shared) buszrendszer egyik fő hátránya?",
        options: [
          "Nem bővíthető",
          "Drága megvalósítás",
          "A közös használat vezérlése bonyolult",
          "Nem támogatja a perifériákat",
        ],
        answerIndex: 2,
        explanation:
          "Megosztott buszrendszernél a több eszköz közti hozzáférést bonyolult vezérléssel kell megoldani.",
      },
  
      {
        id: "q6",
        type: "single",
        prompt: "Melyik NEM az átvitt tartalom szerinti busztípus?",
        options: [
          "Adatbusz",
          "Címbusz",
          "Vezérlővonal",
          "Időbusz",
        ],
        answerIndex: 3,
        explanation:
          "A tételben adatbusz, címbusz és vezérlővonal szerepel, időbusz nem.",
      },
  
      {
        id: "q7",
        type: "single",
        prompt: "Mit jelez az R/W vezérlőjel?",
        options: [
          "Az adat méretét",
          "Az adatátvitel irányát",
          "A busz foglaltságát",
          "A megszakítás kérését",
        ],
        answerIndex: 1,
        explanation:
          "Az R/W jel azt mutatja meg, hogy olvasási vagy írási művelet történik-e.",
      },
  
      {
        id: "q8",
        type: "single",
        prompt: "Melyik jel tartozik a megszakítást vezérlő jelek közé?",
        options: [
          "CLK",
          "RST",
          "Megszakítást kérő jel",
          "WD/B",
        ],
        answerIndex: 2,
        explanation:
          "A megszakítást kérő és visszaigazoló jelek a megszakításvezérléshez tartoznak.",
      },
  
      {
        id: "q9",
        type: "single",
        prompt: "Mi jellemző a párhuzamos buszokra?",
        options: [
          "Kevés vezeték, alacsony EMI",
          "Nagy frekvencián jól skálázhatók",
          "Sok vezeték, időeltérés és EMI problémák",
          "Csak soros adatátvitelt használnak",
        ],
        answerIndex: 2,
        explanation:
          "A párhuzamos buszok sok vezetéket igényelnek, ami időeltérést, EMI-t és áthallást okoz.",
      },
  
      {
        id: "q10",
        type: "single",
        prompt: "Hol használatos ma jellemzően párhuzamos buszrendszer?",
        options: [
          "USB perifériáknál",
          "PCIe bővítőkártyáknál",
          "CPU és memória között",
          "Hálózati interfészeknél",
        ],
        answerIndex: 2,
        explanation:
          "Ma gyakorlatilag csak a CPU és a memória között alkalmaznak párhuzamos buszt.",
      },
  
      {
        id: "q11",
        type: "single",
        prompt: "Mi volt a PCI busz egyik fontos előnye?",
        options: [
          "Csak soros adatátvitelt használt",
          "Platformfüggő megoldás volt",
          "A CPU közvetlenül címezhette a perifériákat",
          "Csak grafikus kártyákhoz készült",
        ],
        answerIndex: 2,
        explanation:
          "A PCI buszon a perifériák a CPU számára a rendszerbusz részeként jelentek meg.",
      },
  
      {
        id: "q12",
        type: "single",
        prompt: "Melyik jellemző a PCIe-re?",
        options: [
          "Párhuzamos adatátvitel",
          "Nagy érintkezőszám",
          "Hot-plug támogatás",
          "Alacsony sebesség",
        ],
        answerIndex: 2,
        explanation:
          "A PCIe kevesebb érintkezőt használ, nagy sebességű és támogatja a hot-plug funkciót.",
      },
  
      {
        id: "q13",
        type: "single",
        prompt: "Mi volt az FSB feladata?",
        options: [
          "CPU és perifériák közti soros kapcsolat",
          "CPU és buszvezérlő közti adat- és címbusz",
          "Memória és háttértár közti kapcsolat",
          "Csak grafikus alrendszer kiszolgálása",
        ],
        answerIndex: 1,
        explanation:
          "Az FSB a CPU és a buszvezérlő közötti kapcsolatot biztosította.",
      },
  
      {
        id: "q14",
        type: "single",
        prompt: "Mi jellemző a HyperTransport buszra?",
        options: [
          "Megosztott párhuzamos busz",
          "CPU-ba integrált, alacsony késleltetésű kapcsolat",
          "Csak USB-eszközökhöz használható",
          "Nem skálázható",
        ],
        answerIndex: 1,
        explanation:
          "A HyperTransport tipikusan CPU-ba integrált, nagy sávszélességű, alacsony késleltetésű kapcsolat.",
      },
  
      {
        id: "q15",
        type: "single",
        prompt: "Mi jellemző a QPI architektúrára?",
        options: [
          "Egységes memóriacímzés NUMA nélkül",
          "Distributed shared memory és több rétegű felépítés",
          "Csak párhuzamos adatátvitel",
          "Déli hídra épülő vezérlés",
        ],
        answerIndex: 1,
        explanation:
          "A QPI NUMA-alapú, elosztott megosztott memóriát és 5 rétegű architektúrát használ.",
      },
    ],
  };
  