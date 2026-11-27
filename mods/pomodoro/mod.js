(function (ASK) {
  var ARBEIT = 25 * 60;
  var PAUSE = 5 * 60;
  var phase = 'arbeit';
  var rest = ARBEIT;
  var laeuft = false;
  var ende = 0;
  var timer = null;
  var fertige = 0;
  var el = {};

  try { fertige = Number(ASK.speicher.lesen('fertige')) || 0; } catch (e) { fertige = 0; }

  function zeit(s) {
    var m = Math.floor(s / 60);
    var r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }

  function zeigen() {
    if (!el.zeit) return;
    el.zeit.textContent = zeit(rest);
    el.phase.textContent = phase === 'arbeit' ? 'Arbeiten' : 'Pause';
    el.start.textContent = laeuft ? 'Pause' : 'Start';
    el.zaehler.textContent = 'Fertige Runden: ' + fertige;
  }

  function anhalten() {
    laeuft = false;
    if (timer) { clearInterval(timer); timer = null; }
  }

  function tick() {
    rest = Math.max(0, Math.round((ende - Date.now()) / 1000));
    if (rest <= 0) {
      anhalten();
      if (phase === 'arbeit') {
        fertige += 1;
        try { ASK.speicher.schreiben('fertige', fertige); } catch (e) {}
        ASK.meldung('Geschafft! Zeit für 5 Minuten Pause.', { dauer: 6000 });
        phase = 'pause';
        rest = PAUSE;
      } else {
        ASK.meldung('Pause vorbei. Bereit für die nächste Runde?', { dauer: 6000 });
        phase = 'arbeit';
        rest = ARBEIT;
      }
    }
    zeigen();
  }

  function startPause() {
    if (laeuft) { anhalten(); zeigen(); return; }
    laeuft = true;
    ende = Date.now() + rest * 1000;
    timer = setInterval(tick, 500);
    zeigen();
  }

  function zuruecksetzen() {
    anhalten();
    phase = 'arbeit';
    rest = ARBEIT;
    zeigen();
  }

  function knopf(text, klasse, fn) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    if (klasse) b.className = klasse;
    b.addEventListener('click', fn);
    return b;
  }

  ASK.panel({
    id: 'pomodoro',
    titel: 'Timer',
    render: function (element) {
      element.innerHTML = '';
      var box = document.createElement('div');
      box.className = 'pomodoro-box';
      el.phase = document.createElement('div');
      el.phase.className = 'pomodoro-phase';
      el.zeit = document.createElement('div');
      el.zeit.className = 'pomodoro-zeit';
      el.zeit.setAttribute('role', 'timer');
      var knoepfe = document.createElement('div');
      knoepfe.className = 'pomodoro-knoepfe';
      el.start = knopf('Start', 'pomodoro-start', startPause);
      knoepfe.appendChild(el.start);
      knoepfe.appendChild(knopf('Zurücksetzen', '', zuruecksetzen));
      el.zaehler = document.createElement('div');
      el.zaehler.className = 'pomodoro-zaehler';
      box.appendChild(el.phase);
      box.appendChild(el.zeit);
      box.appendChild(knoepfe);
      box.appendChild(el.zaehler);
      element.appendChild(box);
      zeigen();
    }
  });
})(ASK);
