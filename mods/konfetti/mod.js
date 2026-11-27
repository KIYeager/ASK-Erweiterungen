(function (ASK) {
  // Wann wird gefeiert?
  var ERFOLG_PERSON = /\b(geschafft|hat geklappt|es klappt|es funktioniert|funktioniert jetzt|läuft jetzt|endlich|juhu|yay|bestanden)\b/i;
  var ERFOLG_ASK = /(alle\s+(\d+\s+)?tests?\s+(sind\s+)?(bestanden|erfolgreich|grün)|\b\d+\s+passed\b)/i;
  // Verneinungen und Fragen («funktioniert nicht», «geschafft?») sind kein Erfolg
  var NEIN_PERSON = /\b(nicht|nichts|kein\w*|nie|noch nicht)\b|\?/i;
  var NEIN_ASK = /\b(nicht alle|nicht bestanden|fehlgeschlagen|\d*[1-9]\d*\s+failed)\b/i;
  var ANZAHL = 140;
  var DAUER = 2600; // Millisekunden

  var an = true;
  try { an = ASK.speicher.lesen('an') !== false; } catch (e) { an = true; }
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var laeuft = false;

  function farben() {
    var s = getComputedStyle(document.documentElement);
    var liste = ['--acc', '--ok', '--warn', '--bad', '--think-2', '--think-4'].map(function (n) { return s.getPropertyValue(n).trim(); });
    return liste.filter(Boolean).length ? liste.filter(Boolean) : ['#0082b4', '#2c8a45', '#e7bb5a', '#ec7b6e'];
  }

  function feiern(text) {
    if (leise.matches) { ASK.meldung(text || '🎉 Geschafft!', { dauer: 3000 }); return; }
    if (laeuft) return;
    laeuft = true;
    var flaeche = document.createElement('canvas');
    flaeche.className = 'konfetti-flaeche';
    flaeche.setAttribute('aria-hidden', 'true');
    document.body.appendChild(flaeche);
    var dpr = window.devicePixelRatio || 1;
    var b = window.innerWidth, h = window.innerHeight;
    flaeche.width = b * dpr; flaeche.height = h * dpr;
    var ctx = flaeche.getContext('2d');
    ctx.scale(dpr, dpr);
    var bunt = farben();
    var teile = [];
    for (var i = 0; i < ANZAHL; i++) {
      var links = i % 2 === 0;
      teile.push({
        x: links ? 0 : b, y: h * 0.75,
        vx: (links ? 1 : -1) * (4 + Math.random() * 9), vy: -(9 + Math.random() * 11),
        w: 6 + Math.random() * 6, l: 9 + Math.random() * 8,
        dreh: Math.random() * Math.PI, vd: (Math.random() - 0.5) * 0.3,
        farbe: bunt[Math.floor(Math.random() * bunt.length)]
      });
    }
    var start = performance.now();
    var letzte = start;
    function bild(jetzt) {
      var dt = Math.min((jetzt - letzte) / 16.7, 3); letzte = jetzt;
      var t = jetzt - start;
      ctx.clearRect(0, 0, b, h);
      ctx.globalAlpha = t > DAUER - 600 ? Math.max(0, (DAUER - t) / 600) : 1;
      teile.forEach(function (p) {
        p.vy += 0.32 * dt; p.vx *= Math.pow(0.985, dt);
        p.x += p.vx * dt; p.y += p.vy * dt; p.dreh += p.vd * dt;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.dreh);
        ctx.fillStyle = p.farbe;
        ctx.fillRect(-p.w / 2, -p.l / 2, p.w, p.l * Math.abs(Math.cos(p.dreh * 2)) + 2);
        ctx.restore();
      });
      if (t < DAUER) requestAnimationFrame(bild);
      else { flaeche.remove(); laeuft = false; }
    }
    requestAnimationFrame(bild);
  }

  ASK.knopf({
    titel: 'Konfetti ein/aus',
    symbol: '🎉',
    klick: function () {
      an = !an;
      try { ASK.speicher.schreiben('an', an); } catch (e) {}
      ASK.meldung(an ? 'Konfetti ist an 🎉' : 'Konfetti ist aus');
      if (an) feiern();
    }
  });

  ASK.befehl({
    name: 'konfetti',
    beschreibung: 'Konfetti werfen',
    ausfuehren: function () { feiern('🎉 Juhu!'); }
  });

  ASK.on('gesendet', function (e) {
    try { if (an && e && ERFOLG_PERSON.test(e.text || '') && !NEIN_PERSON.test(e.text || '')) feiern('🎉 Super gemacht!'); } catch (err) {}
  });

  ASK.on('antwort', function (e) {
    try { if (an && e && ERFOLG_ASK.test(e.text || '') && !NEIN_ASK.test(e.text || '')) feiern('🎉 Alle Tests bestanden!'); } catch (err) {}
  });
})(ASK);
