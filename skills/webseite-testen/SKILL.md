---
name: webseite-testen
description: Testet eine Webseite oder Web-App gründlich im eingebauten Browser: lädt sie, prüft Konsole, Handy- und Desktop-Breite, Links, Formulare, Bilder und Bedienung, und behebt gefundene Fehler. Verwenden, wenn eine Seite fertig ist, etwas komisch aussieht oder die Person «teste das» sagt.
---
# Webseite testen

Ziel: Fehler finden, bevor die Person oder andere sie finden, und sie gezielt beheben.

## Vorgehen
1. **Seite starten.** Statische Seite: HTML-Datei direkt mit `browser` öffnen. Projekt mit `package.json`: Startbefehl aus `scripts` lesen (`npm run dev` o. ä.) und mit `server_starten` starten, dann die Adresse mit `browser` öffnen. Vorher mit `server_liste` prüfen, ob schon ein Server läuft.
2. **Erster Blick.** Lädt die Seite? Fehlt etwas (Bilder, Schrift, Stil)? Sieh das Bild genau an.
3. **Prüfen nach der Liste unten**, der Reihe nach. Funde notieren mit Ort und Schwere.
4. **Beheben.** Zuerst Fehler, die etwas kaputt machen, dann Darstellung, dann Kleinigkeiten. Jede Änderung klein und gezielt mit `edit_file`.
5. **Erneut prüfen**, einmal, nur die betroffenen Stellen.
6. **Bericht** an die Person (siehe unten). Server, die nicht mehr gebraucht werden, mit `server_stoppen` beenden.

## Prüfliste
- **Konsole:** JavaScript-Fehler, 404 für Dateien, Warnungen. Jeder Fehler hat eine Ursache.
- **Breiten:** schmal (etwa 375 px, Handy), mittel (768 px), breit (1280 px und mehr). Nichts läuft seitlich aus dem Bild, Text bleibt lesbar, Menü ist bedienbar.
- **Links und Knöpfe:** Jeder Link führt irgendwohin, Knöpfe reagieren, Anker springen richtig.
- **Formulare:** Pflichtfelder, falsche Eingaben, leeres Absenden, Fehlermeldungen verständlich. Nichts wirklich abschicken, das an Dritte geht.
- **Bilder:** laden, haben `alt`-Text, sind nicht verzerrt oder riesig (Dateigrösse).
- **Tastatur:** Mit Tab durch die Seite, Fokus sichtbar, Reihenfolge sinnvoll.
- **Inhalt:** Tippfehler, Platzhalter wie «Lorem ipsum» oder «TODO», falsche Jahreszahl im Footer.
- **Spiele und Apps:** ein paar Klicks oder Tasten, Start, Neustart, Ende erreichbar.

## Bericht
| Schwere | Was | Wo | Status |
|---|---|---|---|
| 🔴 kaputt | … | Datei/Zeile oder Bereich | behoben / offen |
| 🟠 sieht falsch aus | … | … | … |
| 🟡 Kleinigkeit | … | … | … |

Danach in 2 bis 3 Sätzen: was getestet wurde, was noch die Person selbst prüfen sollte (z. B. längeres Spielen, echte Geräte).

## Regeln
- Nichts kaufen, posten oder an echte Adressen schicken. Keine Passwörter eingeben.
- Keine eigenen Testskripte schreiben, ausser die Person will es (dann Skill `tests-schreiben`).
- Höchstens einmal nach dem Beheben erneut prüfen, nicht endlos.
