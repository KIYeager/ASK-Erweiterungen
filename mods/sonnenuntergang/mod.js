(function (ASK) {
  // Sonnenuntergang: Sonnenhöhe nach der Uhrzeit, nachts Mond und Sterne, Aufleuchten wenn ASK fertig ist.
  var html = document.documentElement;

  function himmel() {
    var jetzt = new Date();
    var h = jetzt.getHours() + jetzt.getMinutes() / 60;
    var nacht = h >= 21.5 || h < 6;
    html.classList.toggle('sonnenuntergang-nacht', nacht);
    var hoehe;
    if (nacht) {
      hoehe = 62; // Mond hoch am Himmel
    } else {
      // 6 Uhr tief, 13 Uhr am höchsten, 21 Uhr hinter den Hügeln
      var t = (h - 6) / 15;
      hoehe = Math.round(12 + Math.sin(Math.PI * Math.min(Math.max(t, 0), 1)) * 52);
      if (h > 19) hoehe = Math.max(8, hoehe - Math.round((h - 19) * 6));
    }
    html.style.setProperty('--abend-hoehe', hoehe + '%');
  }
  himmel();
  setInterval(himmel, 60000);

  var strahlTimer = null;
  ASK.on('fertig', function (e) {
    if (e && (e.fehler || e.gestoppt)) return;
    html.classList.add('sonnenuntergang-strahlen');
    if (strahlTimer) clearTimeout(strahlTimer);
    strahlTimer = setTimeout(function () { html.classList.remove('sonnenuntergang-strahlen'); }, 1400);
  });
})(ASK);
