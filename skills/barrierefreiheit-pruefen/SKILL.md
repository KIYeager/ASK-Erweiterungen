---
name: barrierefreiheit-pruefen
description: Prüft Webseiten und Web-Apps auf Barrierefreiheit nach WCAG: Kontrast, Tastaturbedienung, Fokus, Alt-Texte, Überschriften, Formular-Labels, ARIA, Sprache, Bewegung. Listet Funde nach Wichtigkeit und korrigiert sie. Verwenden, wenn eine Seite für alle zugänglich sein soll oder vor einer Abgabe.
---
# Barrierefreiheit prüfen

Ziel: Die Seite ist für Menschen mit Seh-, Hör-, Bewegungs- oder Lerneinschränkungen gut nutzbar (Richtwert WCAG 2.2, Stufe AA).

## Vorgehen
1. **Dateien lesen** (`read_file`): HTML, CSS, bei Apps die Komponenten.
2. **Seite öffnen** mit `browser` und ansehen.
3. **Prüfen nach der Liste unten.** Kontraste mit Python nachrechnen statt schätzen (Formel: relative Helligkeit nach WCAG, Verhältnis (L1 + 0.05) / (L2 + 0.05)).
4. **Bericht** als Tabelle mit Schwere, Fund, Stelle, Lösung.
5. **Korrigieren**, wenn die Person es will, mit kleinen gezielten Änderungen. Gestaltung so wenig wie möglich verändern.
6. **Kurz nachprüfen.**

## Prüfliste
- **Kontrast:** Text mindestens 4.5 : 1, grosser Text (ab 24 px oder 18.7 px fett) und Bedienelemente 3 : 1.
- **Farbe allein:** Fehler, Links und Zustände nicht nur durch Farbe zeigen (auch Symbol, Text oder Unterstreichung).
- **Tastatur:** Alles mit Tab, Enter, Leertaste und Pfeilen bedienbar. Keine Falle, aus der man nicht herauskommt. Fokus immer sichtbar (`:focus-visible`).
- **Echte Elemente:** `<button>` für Aktionen, `<a href>` für Links, nicht `<div onclick>`.
- **Bilder:** sinnvoller `alt`-Text; rein dekorative Bilder `alt=""`. Symbole ohne Text brauchen `aria-label`.
- **Struktur:** `lang="de"`, ein `<h1>`, Überschriften ohne Sprünge, Landmarken (`header`, `nav`, `main`, `footer`), Link «Zum Inhalt springen» bei langen Menüs.
- **Formulare:** jedes Feld mit `<label for>`, Pflichtfelder gekennzeichnet, Fehlermeldungen beim Feld und verständlich, `autocomplete` wo passend.
- **ARIA sparsam:** lieber echtes HTML. Wenn ARIA, dann korrekt (`aria-expanded` bei Menüs, `aria-live` für Meldungen).
- **Zoom und Textgrösse:** bei 200 % Zoom nichts abgeschnitten, kein seitliches Scrollen bei 320 px Breite.
- **Bewegung:** `prefers-reduced-motion` beachtet, nichts blinkt schnell, Autoplay von Video und Ton aus oder stoppbar.
- **Zielgrösse:** Klickflächen mindestens 24 × 24 px.
- **Medien:** Videos mit Untertiteln, Audio mit Abschrift, wenn vorhanden.

## Bericht
| Schwere | Fund | Stelle | Lösung |
|---|---|---|---|
| 🔴 sperrt Personen aus | … | … | … |
| 🟠 erschwert stark | … | … | … |
| 🟡 Verbesserung | … | … | … |

## Regeln
- Ehrlich bleiben: Automatisch lässt sich nicht alles prüfen. Sag, was ein Mensch mit Screenreader oder Tastatur noch testen sollte.
- Keine erfundenen Kontrastwerte; immer nachrechnen.
