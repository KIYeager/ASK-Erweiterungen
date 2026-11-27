---
name: browser-spiel-bauen
description: Baut Spiele für den Browser mit HTML, Canvas und JavaScript: Spielschleife, Steuerung mit Tastatur, Maus und Touch, Kollisionen, Punkte, Level, Ton, Start- und Endbildschirm. Verwenden, wenn die Person ein eigenes Spiel bauen, erweitern oder verbessern will.
---
# Browser-Spiel bauen

Ziel: Ein Spiel, das sofort startet, sich gut anfühlt und dessen Code die Person versteht und erweitern kann.

## Vorgehen
1. **Idee klären.** Welche Art Spiel (Geschicklichkeit, Jump and Run, Puzzle, Quiz, Schiessen, Rennen)? Ziel des Spiels, Steuerung, Stimmung, für Computer oder Handy? Eigene Idee, keine Kopie eines bekannten Spiels mit dessen Namen, Figuren oder Grafik.
2. **Kleinsten spielbaren Kern bauen:** Figur bewegt sich, ein Hindernis oder Ziel, Punkte. Erst wenn das läuft, mehr.
3. **Dateien:** `index.html`, `style.css`, `spiel.js` im Arbeitsordner, Bilder und Töne in `assets/`. Ohne Build-Werkzeug, ausser das Projekt hat schon eines.
4. **Testen** mit `browser`: starten, ein paar Tasten oder Klicks, verlieren, neu starten.
5. **Ausbauen** Schritt für Schritt mit der Person: Level, Gegner, Power-ups, Highscore, Ton, Effekte.
6. **Erklären,** wo Werte wie Tempo, Schwerkraft oder Lebenspunkte stehen, damit die Person sie anpassen kann.

## Aufbau des Codes
```js
const KONFIG = { tempo: 4, schwerkraft: 0.5 };  // alle Stellschrauben oben
let zustand = 'start';                          // 'start' | 'spiel' | 'pause' | 'ende'
let letzte = 0;
function schleife(zeit) {
  const dt = Math.min((zeit - letzte) / 1000, 0.05); letzte = zeit;
  if (zustand === 'spiel') aktualisieren(dt);
  zeichnen();
  requestAnimationFrame(schleife);
}
requestAnimationFrame(schleife);
```
- Bewegung immer mit `dt` (Zeit seit dem letzten Bild), damit das Spiel auf jedem Bildschirm gleich schnell ist.
- Eingaben in einem Objekt sammeln (`tasten[e.key] = true` bei `keydown`, `false` bei `keyup`), in `aktualisieren` auswerten.
- Kollision bei Rechtecken: Überlappen auf beiden Achsen (AABB). Bei Kreisen: Abstand kleiner als Summe der Radien.
- Canvas scharf auf hochauflösenden Bildschirmen: Grösse mal `devicePixelRatio`, dann `ctx.scale`.
- Highscore mit `localStorage`, Ton mit `new Audio('assets/sprung.wav')`, erst nach erster Eingabe abspielen.

## Spielgefühl
- Sofortige Rückmeldung: kleiner Effekt, Ton oder Wackeln bei Treffern.
- Faire Kollisionen (Trefferfläche etwas kleiner als das Bild).
- Klarer Start («Leertaste drücken»), Pause mit P oder Esc, Endbildschirm mit Punkten und Neustart.
- Schwierigkeit langsam steigern.
- Auf Handy: Touch-Steuerung oder Knöpfe auf dem Bildschirm, wenn gewünscht.

## Regeln
- Eigene Grafik zeichnen (Formen, Emojis, selbst erstellte SVG) oder mit `bild_erstellen` erzeugen. Keine fremden Figuren oder Logos.
- Keine Skripte oder Bilder von fremden Servern.
- Nach jeder grösseren Änderung einmal im Browser testen.
