---
name: animationen-gestalten
description: Gestaltet flüssige, schöne Animationen und Micro-Interactions für Webseiten mit CSS und JavaScript: Hover, Übergänge, Einblenden beim Scrollen, Lade-Animationen, Keyframes. Verwenden, wenn eine Seite lebendiger wirken soll oder die Person eine bestimmte Animation möchte.
---
# Animationen gestalten

Ziel: Bewegung, die etwas bedeutet (Rückmeldung, Orientierung, Freude), flüssig läuft und niemanden stört.

## Vorgehen
1. **Zweck klären.** Was soll die Animation bewirken: Aufmerksamkeit lenken, Rückmeldung auf einen Klick, Übergang zwischen Zuständen, Stimmung? Welche Elemente? Wie auffällig (dezent, verspielt, spektakulär)?
2. **Bestehendes ansehen.** Vorhandenes CSS und Framework übernehmen, Farben und Abstände aus den vorhandenen Variablen nutzen.
3. **Bauen** nach den Regeln unten, zuerst mit CSS.
4. **Im Browser ansehen** (`browser`), Hover und Klick ausprobieren, auch in schmaler Breite.
5. **Erklären**, wo Dauer und Kurve eingestellt sind, damit die Person sie anpassen kann.

## Technik
- **Nur `transform` und `opacity` animieren** (läuft auf der Grafikkarte). `width`, `height`, `top`, `left`, `margin` vermeiden.
- **Dauer:** kleine Rückmeldungen 120 bis 200 ms, Übergänge 200 bis 400 ms, grosse Auftritte bis 700 ms. Nicht länger.
- **Kurven:** Hereinkommen `cubic-bezier(.2,.8,.2,1)` (ease-out), Hinausgehen ease-in. Nie `linear` für Bewegung, ausser bei Drehen und Laufbändern.
- **Variablen** am Anfang: `--dauer: 240ms; --kurve: cubic-bezier(.2,.8,.2,1);`
- **Gestaffelt:** Listen nacheinander einblenden mit `animation-delay: calc(var(--i) * 60ms)`.
- **Beim Scrollen einblenden:** `IntersectionObserver` setzt eine Klasse `ist-sichtbar`, CSS macht die Bewegung. Keine Scroll-Events in jeder Millisekunde.
- **Keyframes** für Wiederholungen (Laden, Puls), mit `animation-iteration-count` sparsam.
- **JavaScript-Animationen** mit `requestAnimationFrame` oder der Web Animations API (`element.animate`), nie mit `setInterval`.
- Keine Bibliothek laden, wenn CSS reicht. Keine Skripte von fremden Servern.

## Barrierefreiheit (Pflicht)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```
- Nichts blinkt mehr als dreimal pro Sekunde.
- Inhalt bleibt ohne Animation sichtbar und bedienbar (Startzustand nicht `opacity: 0` ohne JavaScript-Rückfall).

## Regeln
- Weniger ist mehr: Ein bis zwei starke Effekte statt überall Bewegung.
- Gleiche Dauer und Kurve auf der ganzen Seite, damit es zusammenpasst.
