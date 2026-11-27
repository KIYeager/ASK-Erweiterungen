---
name: ask-mods
description: Mods für ASK erstellen oder ändern, die Desktop-App der TF Bern (Aussehen mit CSS, Code mit der Schnittstelle ASK, eigene /Befehle, Seitenbereiche, Figuren, Regeln). Benutzen, wenn jemand einen ASK-Mod, ein ASK-Theme oder eine ASK-Erweiterung möchte.
---
# Mods für ASK erstellen

Diese Anleitung ist für KI-Agents (Claude, ChatGPT, Codex, Copilot …) und Menschen, die **ausserhalb** von ASK einen Mod bauen. In ASK selbst geht das mit `/mod-erstellen`.

ASK ist eine Desktop-App (Windows, Tauri, Oberfläche mit React). Ein **Mod** passt sie an: Aussehen, eigene Befehle, Bereiche in der Seitenleiste, Figuren, die auf ASK reagieren, Zusatzanweisungen und Regeln. Ein Mod ist ein **Ordner** mit einer `mod.json` und weiteren Dateien.

## Ablauf

1. **Wunsch klären.** Was soll der Mod tun? Arten (kombinierbar): Aussehen (nur CSS) · Befehl (nur `mod.json`) · Bereich in der Seitenleiste · schwebende Figur · Knopf in der Kopfzeile · Reaktion auf Ereignisse · Anweisungen an ASK · Regeln «zuerst fragen».
2. **Kurz planen:** Kennung, Name, welche Dateien, was die Person am Ende sieht.
3. **Dateien schreiben** nach dem Format unten. Klein und lesbar halten.
4. **Checkliste** am Ende durchgehen.
5. **Übergeben** (siehe «Mod in ASK bringen») und der Person sagen: Ein neuer oder geänderter Mod ist in ASK **aus**. Sie schaltet ihn unter **Einstellungen → Mods** nach einer Vorschau ein.

## Ordner

```
robo-helfer/          ← Ordnername = id
  mod.json            ← Pflicht
  style.css           ← optional, Aussehen
  mod.js              ← optional, Code
  robo.svg            ← optional, Bilder, Töne, Schriften
```

Erlaubte Dateien: `json css js md txt svg png jpg jpeg gif webp mp3 wav ogg woff2 woff ttf`. Höchstens 60 Dateien und 3 MB, Textdateien in UTF-8 und höchstens 512 KB. Keine versteckten Dateien (Name mit `.` am Anfang), keine Programme.

## mod.json

```json
{
  "id": "robo-helfer",
  "name": "Robo-Helfer",
  "version": "1.0.0",
  "beschreibung": "Ein kleiner Roboter, der auf ASK reagiert.",
  "autor": "Lea",
  "style": "style.css",
  "script": "mod.js",
  "befehle": [
    { "name": "vokabeln", "beschreibung": "Vokabeln abfragen", "prompt": "Frag mich 10 Vokabeln ab zum Thema: {{text}}" }
  ],
  "anweisungen": "Erkläre mit einem Beispiel aus dem Alltag.",
  "nachfragen": ["loeschen"]
}
```

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `id` | ja | nur `a-z`, `0-9`, `-`, höchstens 40 Zeichen, gleich wie der Ordnername |
| `name` | ja | Anzeigename, höchstens 60 Zeichen |
| `version`, `beschreibung`, `autor` | nein | Anzeige in ASK (Beschreibung höchstens 300 Zeichen) |
| `style` | nein | CSS-Datei im Ordner, wirkt auf das ganze Fenster |
| `script` | nein | JavaScript-Datei im Ordner, läuft im Fenster von ASK |
| `befehle` | nein | höchstens 20 eigene `/name`. `prompt` wird an ASK geschickt; `{{text}}` ist der Text nach dem Befehl (fehlt `{{text}}`, kommt er darunter) |
| `anweisungen` | nein | höchstens 2000 Zeichen, ergänzen die Anweisungen an das Modell. Sie gelten nie gegen Sicherheit und Rückfragen |
| `nachfragen` | nein | ASK fragt immer zuerst vor: `loeschen` (Dateien löschen), `schreiben` (Dateien schreiben), `befehle` (jeder Befehl), `web` (Internet). Macht ASK nur strenger |

Befehlsnamen der App sind gesperrt: `neu projekt goal suchen ordner explorer dateien github modell denken web chats einstellungen update beta neustart abmelden gedaechtnis skills hilfe mods plan auto nachfragen nutzung`.

## Aussehen (CSS)

Farben immer über die Variablen der App, dann passt der Mod zu Hell und Dunkel:

`--bg` Hintergrund · `--side` linke Leiste · `--pane` Flächen · `--card` Karten · `--hover` · `--line` Linien · `--text` · `--muted` · `--dim` leise Schrift · `--acc` Akzentfarbe (TF Blau) · `--acc-ink` Schrift auf der Akzentfarbe · `--acc-soft` · `--ok` · `--bad` · `--warn` · `--r-sm` `--r` `--r-lg` Rundungen · `--sans` `--mono` Schriften.

Das Wurzelelement trägt `data-theme="dark"` oder `data-theme="light"`:

```css
:root[data-theme="dark"]  { --acc: #22d3ee; --acc-ink: #04141a; }
:root[data-theme="light"] { --acc: #0e7490; --acc-ink: #ffffff; }
```

**Eigene Schriften:** Nur freie Schriften (z. B. SIL Open Font License) mit Lizenzdatei im Ordner. ASK lädt Schriften aus dem Mod-Ordner nicht über `url("datei.woff2")`, weil die Mod-Adresse für Schriften nicht freigegeben ist. Bette die Schrift darum als `data:`-Adresse ein (`src: url("data:font/woff2;base64,…")`), schreib in einen Kommentar, welche Schrift es ist, und leg die `.woff2` zum Vergleich daneben. Klein halten: nur die nötigen Zeichen (z. B. mit `pyftsubset`). Bilder (`url("bild.svg")`) funktionieren normal.

Eigene Elemente mit Klassen, die mit der Kennung beginnen (`.robo-helfer-blase`), damit nichts mit ASK kollidiert. Nicht pauschal `* { … }` umstellen. `@media (prefers-reduced-motion: reduce)` für Animationen beachten.

<!-- OBERFLAECHE START (gleicher Abschnitt in resources/mod-anleitung/SKILL.md und resources/standard-skills/mod-erstellen/SKILL.md; ein Test prüft jede Klasse) -->
## Aufbau der Oberfläche (Selektoren)

CSS wirkt nur, wenn der Selektor ein Element trifft. Erfinde keine Klassen, nimm diese:

| Bereich | Selektor |
|---|---|
| ganzes Fenster | `.app` |
| Kopfzeile | `.topbar`; Logo `.brand`; Tabs `.tabs`, ein Tab `.tab`, der aktive `.tab.on`; Fensterknöpfe `.win-ctl` |
| linke Leiste (Projekte, Chats) | `.chatbar`; Knopf «Neuer Chat» `.new-chat`; Kopf eines Projekts `.group-head`; Chat in der Liste `.chat-item`, der offene `.chat-item.active`; Profil unten `.account` |
| Chat | `.chat-area`; Verlauf `.transcript` |
| Eingabe der Person | `.msg.user .bubble` |
| Antwort von ASK | `.msg.assistant`; Text darin `.md` (Überschriften, Listen, `code`, `pre`, `table`) |
| Arbeitsschritte, Gedanken | `.msg.tool`, `.msg.thought` |
| Eingabefeld | `.input-box`; Knöpfe darin `.input-tools .chip`; Senden `#send-btn` |
| Vorschläge im leeren Chat | `.examples .example` |
| rechte Seitenleiste | `.sidebar`; Reiter `.rt`; Inhalt `.rp-body` |
| Dialoge und Menüs | `.overlay`, `.dialog`, `.chat-menu` |
| Knöpfe allgemein | `.btn`, `.btn.primary`, `.icon-btn` |
| Teile von Mods | Knöpfe in der Kopfzeile `.mod-btns`; Bereich in der Seitenleiste `.mod-panel-host` |

Farben, Rundungen und Schriften ändert man am besten über die Variablen (oben); das wirkt überall gleichzeitig. Für einzelne Bereiche die Selektoren aus der Tabelle nehmen, eigene Elemente mit Klassen, die mit der Kennung beginnen.
<!-- OBERFLAECHE ENDE -->

## Code (mod.js)

Ein normales Skript, **kein** `import`/`export`. Immer so einpacken, damit spätere Aufrufe die eigene Ablage und Dateien treffen:

```js
(function (ASK) {
  // Code des Mods
})(ASK);
```

### Schnittstelle `ASK`

| Aufruf | Wirkung |
|---|---|
| `ASK.on(ereignis, fn)` | auf ein Ereignis hören; gibt eine Funktion zum Abmelden zurück |
| `ASK.eingabe.lesen()` | Text im Eingabefeld |
| `ASK.eingabe.setzen(text)` | Eingabefeld ersetzen |
| `ASK.eingabe.einfuegen(text)` | Text an der Schreibmarke einfügen |
| `ASK.senden(text)` | als Person senden (läuft gerade ein Auftrag, kommt der Text ins Eingabefeld) |
| `ASK.chat()` | `{ id, titel, nachrichten: [{ rolle: 'person' \| 'ask', text }] }` |
| `ASK.meldung(text, { dauer })` | kurze Meldung unten (Millisekunden, Standard 4000) |
| `ASK.befehl({ name, beschreibung, ausfuehren(text) })` | eigener `/name`, ausgeführt im Code statt an ASK geschickt |
| `ASK.panel({ id, titel, render(element) })` | Reiter in der rechten Seitenleiste; `render` bekommt einmal ein leeres `div`, das bestehen bleibt |
| `ASK.knopf({ titel, symbol, klick })` | kleiner Knopf in der Kopfzeile (`symbol`: Emoji oder bis 4 Zeichen) |
| `ASK.datei(pfad)` | Adresse einer Datei im Mod-Ordner, z. B. für `img.src` |
| `ASK.speicher.lesen(key)` / `ASK.speicher.schreiben(key, wert)` | kleine Ablage pro Mod (JSON-Werte) |
| `ASK.dunkel()` | `true` im dunklen Farbschema |
| `ASK.mod` | `{ id, name }` des eigenen Mods |

### Ereignisse

| Ereignis | Daten | Wann |
|---|---|---|
| `gesendet` | `{ text }` | die Person hat etwas geschickt |
| `antwort` | `{ text }` | ASK hat fertig geantwortet (letzter Antworttext) |
| `fertig` | `{ gestoppt, fehler }` | der Auftrag ist zu Ende |
| `fehler` | `{ meldung }` | ein Fehler im Chat |
| `frage` | `{ text }` | ASK fragt etwas oder braucht eine Erlaubnis |
| `chat` | `{ id, titel }` | anderer Chat geöffnet |
| `theme` | `{ dunkel }` | Hell/Dunkel gewechselt |

Voller Zugriff auf das DOM ist erlaubt (z. B. `document.body.appendChild` für eine schwebende Figur). Fehler im eigenen Code abfangen, damit ASK weiterläuft.

## Was nicht geht (und nicht versucht werden soll)

- **Kein Internet:** `fetch`, externe Bilder, Schriften, Skripte oder CDNs sind gesperrt (Content Security Policy). Alles gehört in den Mod-Ordner.
- **Kein `eval`, kein `new Function`, keine `<script>`-Blöcke im HTML:** nur die eine `mod.js`.
- **Sicherheit bleibt bei der Person:** Rückfragen bestätigen, Modus «Auto», Tokens, Adresse von ASK, Skills, Gedächtnis oder Mods einschalten verlangen bei laufendem Mod-Code eine Bestätigung in einem Fenster von Windows. Ein Mod kann das nicht umgehen. Nichts davon einbauen.
- **Kein verschleierter oder minifizierter Code.** Die Person sieht den Code vor dem Einschalten und soll ihn verstehen können.
- Keine Zugangsdaten, keine Daten an Dritte, keine Tastenkürzel von ASK überschreiben (Ctrl+Shift+M schaltet alle Mods aus).

## Beispiele

**Aussehen:** `mod.json` mit `"style": "style.css"`, dazu:

```css
:root[data-theme="dark"]  { --bg: #0b0f1a; --pane: #0f1524; --acc: #22d3ee; --acc-ink: #04141a; --r: 14px; }
:root[data-theme="light"] { --acc: #0e7490; --r: 14px; }
```

**Meldung, wenn ASK fertig ist, und Knopf in der Kopfzeile:**

```js
(function (ASK) {
  var an = ASK.speicher.lesen('an') !== false;
  ASK.knopf({ titel: 'Jubel ein/aus', symbol: '🎉', klick: function () {
    an = !an;
    ASK.speicher.schreiben('an', an);
    ASK.meldung(an ? 'Jubel an' : 'Jubel aus');
  } });
  ASK.on('fertig', function (e) {
    if (an && !e.fehler && !e.gestoppt) ASK.meldung('Geschafft! 🎉', { dauer: 2500 });
  });
})(ASK);
```

**Bereich in der Seitenleiste:**

```js
(function (ASK) {
  ASK.panel({ id: 'notizen', titel: 'Notizen', render: function (el) {
    var feld = document.createElement('textarea');
    feld.className = 'notizen-feld';
    feld.value = ASK.speicher.lesen('text') || '';
    feld.addEventListener('input', function () { ASK.speicher.schreiben('text', feld.value); });
    el.appendChild(feld);
  } });
})(ASK);
```

Weitere vollständige Beispiele (Neon, Robo-Helfer, Pomodoro, Vokabeln) liegen in ASK unter Einstellungen → Mods → Beispiele und im Repository `KIYeager/ASK-Erweiterungen` im Ordner `mods/`.

## Checkliste

- [ ] Ordnername = `id`, `mod.json` ist gültiges JSON mit `id` und `name`
- [ ] jede Datei aus `style` und `script` liegt im Ordner
- [ ] `mod.js` beginnt mit `(function (ASK) {` und endet mit `})(ASK);`
- [ ] keine Adressen ins Internet, kein `eval`, nichts verschleiert
- [ ] Farben über die Variablen, Klassen beginnen mit der Kennung
- [ ] Befehlsnamen nicht aus der gesperrten Liste
- [ ] der Person gesagt: In ASK ist der Mod zuerst aus; einschalten unter Einstellungen → Mods nach der Vorschau

## Mod in ASK bringen

- **Als Ordner:** Den Ordner mit allen Dateien auf dem Laptop anlegen (z. B. `Dokumente\Mods\robo-helfer`), dann in ASK **Einstellungen → Mods → «Aus Ordner importieren …»** und den Ordner wählen. Kannst du keine Dateien anlegen, gib jede Datei einzeln mit ihrem Namen aus, damit die Person sie speichern kann.
- **Über GitHub:** Den Ordner in ein öffentliches Repository legen, dann in ASK **Einstellungen → Mods → «Von Link hinzufügen»** mit dem Link auf den Ordner (`https://github.com/<besitzer>/<repo>/tree/main/<ordner>`). Mehrere Mods in einem Repository lassen sich als Katalog hinzufügen.
- **Ändern:** Ordner erneut importieren; ASK fragt, ob er den alten ersetzt. Danach ist der Mod wieder aus, bis die Person ihn in der Vorschau einschaltet.
