(function (ASK) {
  // Wald: ab und zu fällt ein Blatt, im Dunkeln schwirren Glühwürmchen, Bewegung ein/aus.
  var html = document.documentElement;
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  var still = false;
  try { still = ASK.speicher.lesen('still') === true; } catch (e) { still = false; }
  html.classList.toggle('wald-still', still);
  var BLATTFARBEN = ['#8fb35a', '#c9a24a', '#b8743a', '#6f9e4a', '#d9b35c'];
  var MAX = 6;
  var aktiv = 0;

  function ruhig() { return still || leise || document.hidden; }

  ASK.knopf({
    titel: 'Blätter und Glühwürmchen ein/aus',
    symbol: '🍃',
    klick: function () {
      still = !still;
      try { ASK.speicher.schreiben('still', still); } catch (e) {}
      html.classList.toggle('wald-still', still);
      ASK.meldung(still ? 'Der Wald ist still' : 'Der Wald lebt');
    }
  });

  function weg(el, ms) { setTimeout(function () { el.remove(); aktiv -= 1; }, ms); }

  function blatt() {
    if (ruhig() || aktiv >= MAX) return;
    aktiv += 1;
    var b = document.createElement('div');
    b.className = 'wald-blatt';
    var dauer = 10 + Math.random() * 8;
    b.style.left = Math.round(Math.random() * window.innerWidth) + 'px';
    b.style.setProperty('--wald-blattfarbe', BLATTFARBEN[Math.floor(Math.random() * BLATTFARBEN.length)]);
    b.style.setProperty('--wald-dauer', dauer.toFixed(1) + 's');
    b.style.transform = 'scale(' + (0.7 + Math.random() * 0.6).toFixed(2) + ')';
    document.body.appendChild(b);
    weg(b, dauer * 1000 + 200);
  }

  function gluehwurm() {
    if (ruhig() || !ASK.dunkel() || aktiv >= MAX) return;
    var bereich = document.querySelector('.chat-area');
    if (!bereich) return;
    aktiv += 1;
    var r = bereich.getBoundingClientRect();
    var g = document.createElement('div');
    g.className = 'wald-gluehwurm';
    var dauer = 7 + Math.random() * 5;
    g.style.left = Math.round(r.left + Math.random() * r.width) + 'px';
    g.style.top = Math.round(r.top + r.height * (0.55 + Math.random() * 0.35)) + 'px';
    g.style.setProperty('--wald-dx', Math.round((Math.random() - 0.5) * 160) + 'px');
    g.style.setProperty('--wald-dy', Math.round(-30 - Math.random() * 90) + 'px');
    g.style.setProperty('--wald-dauer', dauer.toFixed(1) + 's');
    document.body.appendChild(g);
    weg(g, dauer * 1000 + 200);
  }

  setInterval(function () {
    if (Math.random() < 0.45) blatt();
    if (Math.random() < 0.7) gluehwurm();
  }, 2500);

  ASK.on('fertig', function (e) {
    if (e && !e.fehler && !e.gestoppt) { blatt(); setTimeout(blatt, 400); }
  });
})(ASK);
