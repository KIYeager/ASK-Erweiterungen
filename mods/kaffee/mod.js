(function (ASK) {
  // Kaffee: eine Tasse unten in der linken Leiste. Sie leert sich, solange ASK für dich arbeitet
  // (etwa 50 Minuten Arbeit für eine Tasse). Klick: Pause gemacht, frisch nachgefüllt.
  var VOLL_MINUTEN = 50;
  var WARM_MINUTEN = 10;
  var gefuellt = Date.now();
  var verbraucht = 0; // Minuten Arbeit seit dem letzten Nachfüllen
  try {
    gefuellt = Number(ASK.speicher.lesen('gefuellt')) || Date.now();
    verbraucht = Number(ASK.speicher.lesen('verbraucht')) || 0;
  } catch (e) {}
  var start = 0;
  var hinweisGezeigt = false;

  var tasse = document.createElement('button');
  tasse.type = 'button';
  tasse.className = 'kaffee-tasse';
  var becher = document.createElement('span');
  becher.className = 'kaffee-becher';
  var inhalt = document.createElement('span');
  inhalt.className = 'kaffee-inhalt';
  var raum = document.createElement('span');
  raum.className = 'kaffee-fuell-raum';
  raum.appendChild(inhalt);
  becher.appendChild(raum);
  var dampf = document.createElement('span');
  dampf.className = 'kaffee-dampf';
  for (var i = 0; i < 3; i++) dampf.appendChild(document.createElement('i'));
  tasse.appendChild(dampf);
  tasse.appendChild(becher);
  document.body.appendChild(tasse);

  function sichern() {
    try { ASK.speicher.schreiben('gefuellt', gefuellt); ASK.speicher.schreiben('verbraucht', verbraucht); } catch (e) {}
  }

  function jetztVerbraucht() {
    return verbraucht + (start ? (Date.now() - start) / 60000 : 0);
  }

  function zeigen() {
    var rest = Math.max(0, 1 - jetztVerbraucht() / VOLL_MINUTEN);
    inhalt.style.setProperty('--kaffee-stand', Math.round(8 + rest * 74) + '%');
    var warm = (Date.now() - gefuellt) / 60000 < WARM_MINUTEN && rest > 0;
    tasse.classList.toggle('kaffee-warm', warm);
    var text = rest <= 0 ? 'Tasse leer: Zeit für eine Pause! Klick zum Nachfüllen.' : 'Kaffee: noch ' + Math.round(rest * 100) + ' %. Klick nach einer Pause zum Nachfüllen.';
    tasse.title = text;
    tasse.setAttribute('aria-label', text);
    if (rest <= 0 && !hinweisGezeigt) {
      hinweisGezeigt = true;
      ASK.meldung('Deine Tasse ist leer. Zeit für eine kurze Pause!', { dauer: 7000 });
    }
  }

  // Platz: unten rechts in der linken Leiste, über dem Konto
  function platzieren() {
    var leiste = document.querySelector('.chatbar');
    var fuss = document.querySelector('.side-foot');
    if (!leiste || leiste.getBoundingClientRect().width < 120) { tasse.style.display = 'none'; return; }
    tasse.style.display = '';
    var r = leiste.getBoundingClientRect();
    var unten = fuss ? fuss.getBoundingClientRect().top : r.bottom - 80;
    tasse.style.left = Math.round(r.right - 64) + 'px';
    tasse.style.top = Math.round(unten - 66) + 'px';
  }

  tasse.addEventListener('click', function () {
    if (start) { verbraucht = 0; start = Date.now(); } else { verbraucht = 0; }
    gefuellt = Date.now();
    hinweisGezeigt = false;
    sichern();
    zeigen();
    ASK.meldung('Frisch nachgefüllt. Schön, dass du Pause gemacht hast!');
  });

  ASK.on('gesendet', function () { if (!start) start = Date.now(); });
  ASK.on('fertig', function () {
    if (start) { verbraucht += (Date.now() - start) / 60000; start = 0; sichern(); }
    zeigen();
  });

  platzieren();
  zeigen();
  window.addEventListener('resize', platzieren);
  setInterval(function () { platzieren(); zeigen(); }, 3000);
})(ASK);
