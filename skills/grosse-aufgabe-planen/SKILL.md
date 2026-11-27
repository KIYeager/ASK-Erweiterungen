---
name: grosse-aufgabe-planen
description: Plant grössere Programmieraufgaben, bevor gebaut wird: Ziel und Umfang klären, bestehenden Code verstehen, in kleine prüfbare Schritte teilen, Schritt für Schritt umsetzen und nach jedem Schritt testen. Verwenden bei neuen Features, Umbauten oder Projekten, die mehr als ein paar Minuten Arbeit sind.
---
# Grosse Aufgabe planen und umsetzen

Ziel: Grosse Aufgaben ohne Chaos erledigen. Jeder Schritt ist klein, läuft und ist geprüft, bevor der nächste kommt.

## Vorgehen
1. **Ziel klären.** Was soll am Ende funktionieren? Woran merkt man, dass es fertig ist (Abnahmekriterien)? Was gehört ausdrücklich **nicht** dazu? Offene Punkte mit `frage_stellen` klären, nicht raten.
2. **Bestand verstehen.** Projektstruktur ansehen, betroffene Dateien ganz lesen, Startbefehl und Tests finden. Kurz zusammenfassen, wie der Code aufgebaut ist.
3. **Plan schreiben** und der Person zeigen:
   - Ansatz in 2 bis 3 Sätzen, mit Begründung, warum dieser Weg.
   - Schritte, jeder in sich lauffähig und prüfbar (z. B. «Datenmodell», «Speichern», «Anzeige», «Fehlerfälle»).
   - Betroffene Dateien pro Schritt.
   - Risiken und offene Fragen.
   Schritte mit `update_tasks` als Aufgabenliste festhalten.
4. **Zustimmung abwarten**, bevor umfangreich gebaut wird.
5. **Schritt für Schritt umsetzen.** Pro Schritt: bauen → ausführen oder testen → Aufgabe abhaken. Läuft ein Schritt nicht, zuerst diesen reparieren.
6. **Zwischenstand** nach wichtigen Schritten kurz melden. Ändert sich etwas am Plan, das sagen und den Plan anpassen.
7. **Abschluss:** Abnahmekriterien durchgehen, alles einmal gesamthaft testen, Zusammenfassung (was gebaut, wo, wie testen, was offen ist). Auf Wunsch Commit (Skill `commit-nachricht`).

## Gute Schritte
- Klein: ein Schritt ist in wenigen Minuten umgesetzt und geprüft.
- Senkrecht statt waagrecht: lieber zuerst eine Funktion ganz durch (Eingabe bis Anzeige) als zuerst alle Datenbanktabellen.
- Das Riskanteste früh, damit Probleme sich zeigen, solange Änderungen noch billig sind.

## Regeln
- Nicht alles auf einmal schreiben und erst am Ende testen.
- Bestehenden Stil und Aufbau übernehmen, keine unnötigen neuen Werkzeuge.
- Nichts ausserhalb des Arbeitsordners ändern, nichts löschen ohne Rückfrage.
- Ehrlich berichten: Was nicht getestet oder nicht fertig ist, klar sagen.
