(function (ASK) {
  var text = '';
  var feld = null;
  var info = null;
  var speicherTimer = null;
  var leerenBereit = false;

  try { text = ASK.speicher.lesen('text') || ''; } catch (e) { text = ''; }

  function speichern() {
    try { ASK.speicher.schreiben('text', text); } catch (e) {}
    zeigeInfo('Gespeichert');
  }

  function spaeterSpeichern() {
    if (speicherTimer) clearTimeout(speicherTimer);
    speicherTimer = setTimeout(speichern, 400);
  }

  function zeigeInfo(zusatz) {
    if (!info) return;
    var woerter = text.trim() ? text.trim().split(/\s+/).length : 0;
    info.textContent = woerter + ' Wörter' + (zusatz ? ' · ' + zusatz : '');
  }

  function anhaengen(neu) {
    var zeit = new Date().toLocaleString('de-CH', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    text = (text ? text.replace(/\s+$/, '') + '\n\n' : '') + '— ' + zeit + '\n' + neu.trim() + '\n';
    if (feld) { feld.value = text; feld.scrollTop = feld.scrollHeight; }
    speichern();
  }

  function letzteAntwort() {
    try {
      var chat = ASK.chat();
      var liste = (chat && chat.nachrichten) || [];
      for (var i = liste.length - 1; i >= 0; i--) {
        if (liste[i].rolle === 'ask' && liste[i].text) return liste[i].text;
      }
    } catch (e) {}
    return '';
  }

  function knopf(beschriftung, fn, klasse) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = beschriftung;
    if (klasse) b.className = klasse;
    b.addEventListener('click', fn);
    return b;
  }

  ASK.panel({
    id: 'notizblock',
    titel: 'Notizen',
    render: function (element) {
      element.innerHTML = '';
      var box = document.createElement('div');
      box.className = 'notizblock-box';

      feld = document.createElement('textarea');
      feld.className = 'notizblock-feld';
      feld.placeholder = 'Deine Notizen … (werden automatisch gespeichert)';
      feld.setAttribute('aria-label', 'Notizen');
      feld.value = text;
      feld.addEventListener('input', function () { text = feld.value; zeigeInfo('…'); spaeterSpeichern(); });

      var knoepfe = document.createElement('div');
      knoepfe.className = 'notizblock-knoepfe';
      knoepfe.appendChild(knopf('Letzte Antwort merken', function () {
        var a = letzteAntwort();
        if (a) { anhaengen(a); ASK.meldung('Antwort im Notizblock gespeichert'); }
        else ASK.meldung('Noch keine Antwort von ASK in diesem Chat');
      }));
      knoepfe.appendChild(knopf('In Chat einfügen', function () {
        var auswahl = feld.value.substring(feld.selectionStart, feld.selectionEnd);
        var stueck = auswahl || feld.value;
        if (stueck.trim()) ASK.eingabe.einfuegen(stueck);
      }));
      var leeren = knopf('Leeren', function () {
        if (!leerenBereit) {
          leerenBereit = true;
          leeren.textContent = 'Wirklich leeren?';
          setTimeout(function () { leerenBereit = false; leeren.textContent = 'Leeren'; }, 3000);
          return;
        }
        leerenBereit = false;
        leeren.textContent = 'Leeren';
        text = '';
        feld.value = '';
        speichern();
      }, 'notizblock-gefahr');
      knoepfe.appendChild(leeren);

      info = document.createElement('div');
      info.className = 'notizblock-info';

      box.appendChild(feld);
      box.appendChild(knoepfe);
      box.appendChild(info);
      element.appendChild(box);
      zeigeInfo();
    }
  });

  ASK.befehl({
    name: 'notiz',
    beschreibung: 'Text in den Notizblock schreiben',
    ausfuehren: function (eingabe) {
      if (!eingabe || !eingabe.trim()) { ASK.meldung('Schreib den Text hinter /notiz'); return; }
      anhaengen(eingabe);
      ASK.meldung('Notiert ✓');
    }
  });
})(ASK);
