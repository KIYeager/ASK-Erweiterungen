(function (ASK) {
  // Pastell: kleine Glitzer beim Absenden und wenn ASK fertig ist, Bewegung ein/aus.
  var html = document.documentElement;
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  var still = false;
  try { still = ASK.speicher.lesen('still') === true; } catch (e) { still = false; }
  html.classList.toggle('pastell-still', still);
  var ZEICHEN = ['✿', '♥', '✦', '❀', '★'];
  var FARBEN = ['#f472b6', '#34d399', '#a78bfa', '#fbbf24', '#60a5fa'];

  ASK.knopf({
    titel: 'Pastell-Bewegung ein/aus',
    symbol: '✿',
    klick: function () {
      still = !still;
      try { ASK.speicher.schreiben('still', still); } catch (e) {}
      html.classList.toggle('pastell-still', still);
      ASK.meldung(still ? 'Wolken und Glitzer ruhen' : 'Wolken und Glitzer sind wieder da');
    }
  });

  function glitzern(anzahl) {
    if (still || leise) return;
    var feld = document.querySelector('.input-box');
    if (!feld) return;
    var r = feld.getBoundingClientRect();
    for (var i = 0; i < anzahl; i++) {
      var g = document.createElement('div');
      g.className = 'pastell-glitzer';
      g.setAttribute('aria-hidden', 'true');
      g.textContent = ZEICHEN[i % ZEICHEN.length];
      g.style.color = FARBEN[Math.floor(Math.random() * FARBEN.length)];
      g.style.left = Math.round(r.left + 30 + Math.random() * (r.width - 60)) + 'px';
      g.style.top = Math.round(r.top - 6) + 'px';
      g.style.setProperty('--dx', Math.round((Math.random() - 0.5) * 80) + 'px');
      g.style.setProperty('--dr', Math.round((Math.random() - 0.5) * 120) + 'deg');
      g.style.animationDelay = Math.round(Math.random() * 250) + 'ms';
      document.body.appendChild(g);
      (function (el) { setTimeout(function () { el.remove(); }, 1800); })(g);
    }
  }

  ASK.on('gesendet', function () { glitzern(7); });
  ASK.on('fertig', function (e) { if (e && !e.fehler && !e.gestoppt) glitzern(4); });
})(ASK);
