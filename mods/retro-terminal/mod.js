(function (ASK) {
  // Retro-Terminal: Startbildschirm, Statuszeile während ASK arbeitet, Knopf für die Röhren-Effekte.
  var html = document.documentElement;
  var leise = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  function lesen(key, standard) {
    try { var v = ASK.speicher.lesen(key); return v === null || v === undefined ? standard : v; } catch (e) { return standard; }
  }
  function schreiben(key, wert) { try { ASK.speicher.schreiben(key, wert); } catch (e) {} }

  // --- Röhren-Effekte ein/aus ---
  var crt = lesen('crt', true);
  html.classList.toggle('retro-terminal-ohne-crt', !crt);
  ASK.knopf({
    titel: 'Röhren-Effekte ein/aus',
    symbol: '📺',
    klick: function () {
      crt = !crt;
      schreiben('crt', crt);
      html.classList.toggle('retro-terminal-ohne-crt', !crt);
      ASK.meldung(crt ? 'Röhre an: Linien und Flackern' : 'Röhre aus: ruhiges Bild');
    }
  });

  // --- Startbildschirm (einmal pro Start, nicht bei reduzierter Bewegung) ---
  var ZEILEN = [
    'ASK BIOS v2.6',
    '',
    'Speichertest ......... 640K OK',
    'Tastatur ............. OK',
    'Lade Sprachmodell .... OK',
    'Verbinde mit ASK ..... OK',
    '',
    'C:\\ASK> start',
    'Bereit.'
  ];
  function booten() {
    var box = document.createElement('div');
    box.className = 'retro-terminal-boot';
    box.setAttribute('aria-hidden', 'true');
    var text = document.createElement('div');
    var hinweis = document.createElement('div');
    hinweis.className = 'retro-terminal-boot-hinweis';
    hinweis.textContent = '[ Klick oder Taste: überspringen ]';
    box.appendChild(text);
    box.appendChild(hinweis);
    document.body.appendChild(box);
    var i = 0;
    var fertig = false;
    var timer = null;
    function weg() {
      if (fertig) return;
      fertig = true;
      if (timer) clearInterval(timer);
      document.removeEventListener('keydown', weg, true);
      box.classList.add('retro-terminal-weg');
      setTimeout(function () { box.remove(); }, 400);
    }
    timer = setInterval(function () {
      if (i < ZEILEN.length) { text.textContent += ZEILEN[i] + '\n'; i += 1; }
      else { clearInterval(timer); timer = null; setTimeout(weg, 450); }
    }, 170);
    box.addEventListener('click', weg);
    document.addEventListener('keydown', weg, true);
  }
  if (!leise && lesen('boot', true)) booten();

  // --- Statuszeile ---
  var status = document.createElement('div');
  status.className = 'retro-terminal-status';
  status.setAttribute('aria-hidden', 'true');
  document.body.appendChild(status);
  var DREH = ['|', '/', '-', '\\'];
  var schritt = 0;
  var dreher = null;
  var ausblenden = null;

  function zeigen(text, fehler) {
    if (ausblenden) { clearTimeout(ausblenden); ausblenden = null; }
    status.textContent = text;
    // rechts in der Kopfzeile, über dem Ende des Chat-Bereichs
    var bereich = document.querySelector('.chat-area');
    if (bereich) status.style.right = Math.max(8, window.innerWidth - bereich.getBoundingClientRect().right + 12) + 'px';
    status.classList.toggle('retro-terminal-fehler', !!fehler);
    status.classList.add('retro-terminal-zeigen');
  }
  function stoppen(text, fehler) {
    if (dreher) { clearInterval(dreher); dreher = null; }
    zeigen(text, fehler);
    ausblenden = setTimeout(function () { status.classList.remove('retro-terminal-zeigen'); }, 2200);
  }
  function balken(n) {
    var voll = n % 9;
    return '▓▓▓▓▓▓▓▓'.slice(0, voll) + '░░░░░░░░'.slice(0, 8 - voll);
  }

  ASK.on('gesendet', function () {
    if (dreher) clearInterval(dreher);
    schritt = 0;
    zeigen('[ ARBEITE ' + DREH[0] + ' ' + balken(0) + ' ]');
    if (leise) return;
    dreher = setInterval(function () {
      schritt += 1;
      zeigen('[ ARBEITE ' + DREH[schritt % 4] + ' ' + balken(Math.floor(schritt / 2)) + ' ]');
    }, 140);
  });
  ASK.on('fertig', function (e) {
    if (e && e.fehler) stoppen('[ FEHLER  ✗ ]', true);
    else if (e && e.gestoppt) stoppen('[ ABGEBROCHEN ]');
    else stoppen('[ FERTIG  ✓ ]');
  });
  ASK.on('fehler', function () { stoppen('[ FEHLER  ✗ ]', true); });
})(ASK);
