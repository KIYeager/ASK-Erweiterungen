---
name: daten-auswerten
description: Wertet Daten aus CSV-, Excel- oder JSON-Dateien mit Python und pandas aus: einlesen, bereinigen, filtern, gruppieren, Kennzahlen berechnen und klare Diagramme mit matplotlib erstellen. Verwenden, wenn die Person Daten analysieren, Fragen an eine Tabelle stellen oder Diagramme daraus machen möchte.
---
# Daten auswerten

Ziel: Richtige Antworten aus den Daten, klar gezeigt, nachvollziehbar gerechnet.

## Vorgehen
1. **Frage klären.** Was will die Person wissen? Für wen ist das Ergebnis (eigene Übersicht, Bericht, Präsentation)?
2. **Daten einlesen** mit pandas (`read_csv`, `read_excel`, `read_json`). Bei CSV Trennzeichen und Kodierung prüfen (Schweizer Dateien oft `sep=";"`, `encoding="utf-8-sig"` oder `"latin-1"`).
3. **Daten anschauen:** Anzahl Zeilen und Spalten, Spaltennamen, Datentypen, erste Zeilen, fehlende Werte, Duplikate, auffällige Werte. Der Person kurz berichten.
4. **Bereinigen**, nur mit Begründung: Datentypen korrigieren (Datum, Zahlen mit Komma), Leerzeichen entfernen, Duplikate, fehlende Werte. Originaldatei nie überschreiben.
5. **Auswerten:** filtern, gruppieren (`groupby`), Summen, Durchschnitte, Anteile, Verläufe. Zwischenergebnisse als Tabelle zeigen.
6. **Diagramm** passend zur Frage (siehe unten), als PNG im Arbeitsordner speichern und mit `view_file` kontrollieren.
7. **Ergebnis** in 3 bis 5 Sätzen: Antwort auf die Frage, wichtigste Zahlen, Einschränkungen der Daten.
8. **Auf Wunsch:** Skript als `.py` speichern, damit es wiederholbar ist, oder Ergebnis als Excel (Skill `excel`).

## Welches Diagramm?
- Vergleich von Kategorien → Balken (waagrecht, wenn die Namen lang sind), sortiert.
- Verlauf über Zeit → Linie.
- Anteile → gestapelter Balken; Kuchen nur bei 2 bis 4 Teilen.
- Verteilung → Histogramm oder Boxplot.
- Zusammenhang zweier Zahlen → Streudiagramm.

## Gute Diagramme
- Titel, der die Aussage sagt («Verkauf im Dezember am höchsten»), Achsen mit Einheit beschriftet.
- Wenig Farben; eine Akzentfarbe für das Wichtige, Rest grau.
- Keine 3D-Effekte, Achse bei Balken beginnt bei 0.
- Gross genug speichern (`dpi=150`), `plt.tight_layout()`.

## Regeln
- Jede Zahl rechnen, nie schätzen oder erfinden.
- Zeigen, wie gerechnet wurde, damit die Person es nachprüfen kann.
- Personendaten vertraulich behandeln; nichts davon ins Internet.
- Ehrlich über Grenzen: kleine Stichprobe, fehlende Werte, Korrelation ist keine Ursache.
