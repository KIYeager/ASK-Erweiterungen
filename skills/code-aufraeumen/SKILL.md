---
name: code-aufraeumen
description: Räumt Code auf (Refactoring), ohne das Verhalten zu ändern: bessere Namen, kleinere Funktionen, Doppeltes zusammenfassen, toten Code entfernen, klare Struktur. Sichert das Verhalten vorher mit Tests oder Probeläufen ab. Verwenden, wenn Code unübersichtlich, gewachsen oder schwer zu ändern ist.
---
# Code aufräumen

Ziel: Der Code macht danach genau dasselbe wie vorher, ist aber leichter zu lesen, zu ändern und zu testen.

## Vorgehen
1. **Umfang klären.** Welche Dateien oder Teile? Wie weit soll es gehen (nur Namen und Formatierung, oder auch Struktur)? Gibt es Vorgaben (Stil, Sprache, Framework)?
2. **Code lesen und verstehen.** Ganze Dateien lesen, nicht nur Ausschnitte. Kurz zusammenfassen, was der Code tut.
3. **Verhalten absichern.** Vorhandene Tests ausführen. Gibt es keine, das aktuelle Verhalten festhalten: Programm mit typischen Eingaben laufen lassen und die Ausgaben notieren, oder mit der Person einfache Tests schreiben (Skill `tests-schreiben`).
4. **Plan zeigen.** Liste der geplanten Änderungen, sortiert nach Nutzen. Auf Zustimmung warten bei grösseren Umbauten.
5. **In kleinen Schritten umbauen.** Nach jedem Schritt Tests oder Probelauf wiederholen. Schlägt etwas fehl, den letzten Schritt prüfen statt weiterzumachen.
6. **Abschluss:** Was wurde geändert und warum, Ergebnis der Tests, was noch verbessert werden könnte.

## Typische Verbesserungen
- **Namen**, die sagen, was etwas ist oder tut (`anzahl_lernende` statt `x`, `berechne_note()` statt `f()`).
- **Lange Funktionen** in kleinere teilen, eine Aufgabe pro Funktion.
- **Doppelten Code** in eine Funktion zusammenfassen.
- **Magische Zahlen** als benannte Konstanten (`MAX_VERSUCHE = 3`).
- **Tiefe Verschachtelung** mit frühem `return` auflösen.
- **Toten Code** und auskommentierte Blöcke entfernen (Git bewahrt ihn auf).
- **Globale Variablen** durch Parameter und Rückgabewerte ersetzen.
- **Fehlerbehandlung** an einer Stelle statt verstreut.
- **Formatierung** mit dem üblichen Werkzeug der Sprache (z. B. `ruff format`, `prettier`), wenn das Projekt es schon nutzt.

## Regeln
- **Kein neues Verhalten** einbauen und keine Fehler «nebenbei» beheben, ohne es zu sagen. Gefundene Fehler melden und die Person entscheiden lassen.
- Öffentliche Schnittstellen (Funktionsnamen, die andere Dateien nutzen) nur ändern, wenn alle Aufrufe angepasst werden.
- Den Stil des Projekts übernehmen, nicht den eigenen aufzwingen.
- Ist der Code in Git, vorher auf einen sauberen Stand achten, damit sich alles vergleichen lässt.
