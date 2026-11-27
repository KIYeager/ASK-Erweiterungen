(function (ASK) {
  var FERTIG = ['Geschafft!', 'Fertig! Schau es dir in Ruhe an.', 'Das lief gut.', 'Erledigt, nächste Aufgabe?', 'Prima, das wäre geschafft.'];
  var TIPPS_FEHLER = ['Kein Stress. Lies die Fehlermeldung in Ruhe, sie verrät oft schon die Lösung.', 'Fehler gehören zum Lernen. Versuch es nochmals oder formuliere die Aufgabe anders.', 'Atme kurz durch. Frag ASK, was die Meldung bedeutet.'];
  var TIPPS = [
    'Tipp: Je genauer du beschreibst, was du willst, desto besser wird das Ergebnis.',
    'Tipp: Gib ASK ein Beispiel, wie das Ergebnis aussehen soll.',
    'Tipp: Frag nach, wenn du etwas nicht verstehst. Das ist erlaubt!',
    'Tipp: Mach zwischendurch eine kurze Pause. Danach geht vieles leichter.'
  ];

  var figur, blase, menue, blaseTimer = null, tippNr = 0;
  var pos = null;
  try { pos = ASK.speicher.lesen('position'); } catch (e) { pos = null; }
  var versteckt = false;
  try { versteckt = ASK.speicher.lesen('versteckt') === true; } catch (e) { versteckt = false; }

  function zufall(liste) { return liste[Math.floor(Math.random() * liste.length)]; }

  function svg() {
    return '<svg class="robo-helfer-koerper" viewBox="0 0 72 84" role="img" aria-label="Robo-Helfer">' +
      '<line class="robo-helfer-antenne" x1="36" y1="4" x2="36" y2="14"/>' +
      '<circle class="robo-helfer-lampe" cx="36" cy="5" r="4"/>' +
      '<rect class="robo-helfer-kopf" x="10" y="14" width="52" height="38" rx="12"/>' +
      '<ellipse class="robo-helfer-auge" cx="26" cy="31" rx="5" ry="6"/>' +
      '<ellipse class="robo-helfer-auge" cx="46" cy="31" rx="5" ry="6"/>' +
      '<path class="robo-helfer-mund" d="M28 43 Q36 48 44 43"/>' +
      '<rect class="robo-helfer-rumpf" x="18" y="56" width="36" height="24" rx="8"/>' +
      '<circle class="robo-helfer-auge" cx="36" cy="68" r="3"/>' +
      '</svg>';
  }

  function sagen(text, ms) {
    if (versteckt || !blase) return;
    menue.hidden = true;
    blase.textContent = text;
    blase.hidden = false;
    clearTimeout(blaseTimer);
    blaseTimer = setTimeout(function () { blase.hidden = true; }, ms || 4500);
  }

  function ort(x, y) {
    var b = figur.offsetWidth || 72, h = figur.offsetHeight || 84;
    x = Math.max(0, Math.min(window.innerWidth - b, x));
    y = Math.max(0, Math.min(window.innerHeight - h, y));
    figur.style.left = x + 'px';
    figur.style.top = y + 'px';
    figur.style.right = 'auto';
    figur.style.bottom = 'auto';
    return { x: x, y: y };
  }

  function bauen() {
    figur = document.createElement('div');
    figur.className = 'robo-helfer-figur';
    figur.innerHTML = svg();
    blase = document.createElement('div');
    blase.className = 'robo-helfer-blase';
    blase.hidden = true;
    blase.setAttribute('role', 'status');
    menue = document.createElement('div');
    menue.className = 'robo-helfer-menue';
    menue.hidden = true;
    var weg = document.createElement('button');
    weg.type = 'button';
    weg.className = 'robo-helfer-weg';
    weg.textContent = '×';
    weg.title = 'Ausblenden (mit 🤖 oben wieder holen)';
    weg.setAttribute('aria-label', 'Robo-Helfer ausblenden');
    weg.addEventListener('click', function () { verstecken(true); });
    figur.appendChild(blase);
    figur.appendChild(menue);
    figur.appendChild(weg);
    document.body.appendChild(figur);
    if (pos && typeof pos.x === 'number' && typeof pos.y === 'number') ort(pos.x, pos.y);
    figur.hidden = versteckt;
    ziehen();
  }

  function ziehen() {
    var start = null, bewegt = false;
    var koerper = figur.querySelector('.robo-helfer-koerper');
    koerper.addEventListener('pointerdown', function (e) {
      var r = figur.getBoundingClientRect();
      start = { dx: e.clientX - r.left, dy: e.clientY - r.top, x: e.clientX, y: e.clientY };
      bewegt = false;
      koerper.setPointerCapture(e.pointerId);
    });
    koerper.addEventListener('pointermove', function (e) {
      if (!start) return;
      if (Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) > 4) bewegt = true;
      if (!bewegt) return;
      figur.classList.add('robo-helfer-zieht');
      pos = ort(e.clientX - start.dx, e.clientY - start.dy);
    });
    koerper.addEventListener('pointerup', function () {
      if (!start) return;
      figur.classList.remove('robo-helfer-zieht');
      if (bewegt) {
        try { ASK.speicher.schreiben('position', pos); } catch (e) {}
      } else {
        menueUmschalten();
      }
      start = null;
    });
  }

  function menueUmschalten() {
    blase.hidden = true;
    if (!menue.hidden) { menue.hidden = true; return; }
    var a = TIPPS[tippNr % TIPPS.length];
    var b = TIPPS[(tippNr + 1) % TIPPS.length];
    tippNr += 2;
    menue.innerHTML = '<strong>Zwei Tipps</strong><p></p><p></p>';
    var p = menue.querySelectorAll('p');
    p[0].textContent = a;
    p[1].textContent = b;
    menue.hidden = false;
  }

  function verstecken(ja) {
    versteckt = ja;
    figur.hidden = ja;
    try { ASK.speicher.schreiben('versteckt', ja); } catch (e) {}
    if (ja) ASK.meldung('Robo-Helfer ist weg. Mit 🤖 oben holst du ihn zurück.', { dauer: 3500 });
  }

  bauen();

  ASK.knopf({
    titel: 'Robo-Helfer ein- oder ausblenden',
    symbol: '🤖',
    klick: function () { verstecken(!versteckt); if (!versteckt) sagen('Hallo, da bin ich wieder!'); }
  });

  ASK.on('gesendet', function () { sagen('Ich schau mal mit …'); });
  ASK.on('fertig', function () { sagen(zufall(FERTIG)); });
  ASK.on('fehler', function () { sagen(zufall(TIPPS_FEHLER), 7000); });
  ASK.on('frage', function () { sagen('ASK braucht dich!', 6000); });

  window.addEventListener('resize', function () { if (pos) ort(pos.x, pos.y); });
})(ASK);
