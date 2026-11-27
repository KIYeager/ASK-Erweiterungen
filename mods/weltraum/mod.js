(function (ASK) {
  // Weltraum: Sternschnuppen ab und zu, eine Rakete beim Absenden, Bewegung ein/aus.
  var html = document.documentElement;
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  var still = false;
  try { still = ASK.speicher.lesen('still') === true; } catch (e) { still = false; }
  html.classList.toggle('weltraum-still', still);

  function ruhig() { return still || leise || document.hidden; }

  ASK.knopf({
    titel: 'Sternschnuppen und Bewegung ein/aus',
    symbol: '🌠',
    klick: function () {
      still = !still;
      try { ASK.speicher.schreiben('still', still); } catch (e) {}
      html.classList.toggle('weltraum-still', still);
      ASK.meldung(still ? 'Das All steht still' : 'Das All bewegt sich');
      if (!still) schnuppe();
    }
  });

  function schnuppe() {
    if (ruhig()) return;
    var s = document.createElement('div');
    s.className = 'weltraum-schnuppe';
    s.style.left = Math.round(window.innerWidth * (0.35 + Math.random() * 0.6)) + 'px';
    s.style.top = Math.round(window.innerHeight * (0.05 + Math.random() * 0.35)) + 'px';
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1300);
  }
  function naechste() {
    setTimeout(function () { schnuppe(); naechste(); }, 7000 + Math.random() * 12000);
  }
  naechste();

  ASK.on('gesendet', function () {
    if (ruhig()) return;
    var feld = document.querySelector('.input-box');
    var r = feld ? feld.getBoundingClientRect() : { right: window.innerWidth / 2, top: window.innerHeight - 120 };
    var rakete = document.createElement('div');
    rakete.className = 'weltraum-rakete';
    rakete.setAttribute('aria-hidden', 'true');
    rakete.textContent = '🚀';
    rakete.style.left = Math.round(r.right - 70) + 'px';
    rakete.style.top = Math.round(r.top - 30) + 'px';
    document.body.appendChild(rakete);
    setTimeout(function () { rakete.remove(); }, 1700);
  });

  ASK.on('fertig', function (e) {
    if (e && !e.fehler && !e.gestoppt) { schnuppe(); setTimeout(schnuppe, 350); }
  });
})(ASK);
