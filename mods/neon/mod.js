(function (ASK) {
  // Neon: Lichtkegel folgt der Maus, LIVE-Schild während ASK arbeitet, Aufleuchten wenn fertig, Bewegung ein/aus.
  var html = document.documentElement;
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  var still = false;
  try { still = ASK.speicher.lesen('still') === true; } catch (e) { still = false; }
  html.classList.toggle('neon-still', still);

  ASK.knopf({
    titel: 'Neon-Bewegung ein/aus',
    symbol: '🌆',
    klick: function () {
      still = !still;
      try { ASK.speicher.schreiben('still', still); } catch (e) {}
      html.classList.toggle('neon-still', still);
      ASK.meldung(still ? 'Neon steht still' : 'Neon bewegt sich');
    }
  });

  // Lichtkegel: Mausposition im Chat-Bereich als CSS-Variablen, höchstens einmal pro Bild
  var geplant = false;
  var mx = 0;
  var my = 0;
  document.addEventListener('pointermove', function (e) {
    if (still || leise) return;
    mx = e.clientX; my = e.clientY;
    if (geplant) return;
    geplant = true;
    requestAnimationFrame(function () {
      geplant = false;
      var bereich = document.querySelector('.chat-area');
      if (!bereich) return;
      var r = bereich.getBoundingClientRect();
      html.style.setProperty('--neon-x', Math.round(mx - r.left) + 'px');
      html.style.setProperty('--neon-y', Math.round(my - r.top) + 'px');
    });
  }, { passive: true });

  // LIVE-Schild neben dem Schriftzug ASK
  var schild = document.createElement('span');
  schild.className = 'neon-schild';
  schild.setAttribute('aria-hidden', 'true');
  schild.textContent = 'LIVE';
  function schildAnbringen() {
    var marke = document.querySelector('.topbar .brand');
    if (marke && schild.parentNode !== marke) marke.appendChild(schild);
  }
  schildAnbringen();

  var blitzTimer = null;
  ASK.on('gesendet', function () {
    schildAnbringen();
    html.classList.remove('neon-blitz');
    html.classList.add('neon-arbeitet');
  });
  ASK.on('fertig', function (e) {
    html.classList.remove('neon-arbeitet');
    if (e && (e.fehler || e.gestoppt)) return;
    html.classList.add('neon-blitz');
    if (blitzTimer) clearTimeout(blitzTimer);
    blitzTimer = setTimeout(function () { html.classList.remove('neon-blitz'); }, 900);
  });
  ASK.on('fehler', function () { html.classList.remove('neon-arbeitet'); });
})(ASK);
