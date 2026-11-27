---
name: projekt-dokumentieren
description: Schreibt eine gute Doku für ein Programmierprojekt: README mit Zweck, Installation, Start, Bedienung und Aufbau, bei Bedarf Docstrings und Kommentare. Liest dafür den echten Code. Verwenden, wenn ein Projekt erklärt, abgegeben oder auf GitHub gestellt werden soll.
---
# Projekt dokumentieren

Ziel: Jemand, der das Projekt nicht kennt, versteht in fünf Minuten, was es ist, und bringt es zum Laufen.

## Vorgehen
1. **Klären.** Für wen ist die Doku (Lehrperson, Team, Öffentlichkeit auf GitHub, die Person selbst in einem Jahr)? Was gibt es schon? Gibt es Vorgaben (Abgabe, Vorlage)?
2. **Projekt lesen.** Struktur, `package.json`/`requirements.txt`, Einstiegsdatei, Startbefehle, Tests, Konfiguration. Nur dokumentieren, was wirklich da ist.
3. **Ausprobieren:** Installations- und Startbefehle einmal wirklich ausführen, damit sie stimmen.
4. **README schreiben** nach dem Aufbau unten.
5. **Bei Bedarf Code dokumentieren:** Docstrings bzw. JSDoc für öffentliche Funktionen, Kommentare nur dort, wo das **Warum** nicht offensichtlich ist.
6. **Zeigen und anpassen.** Offene Punkte (z. B. Lizenz, Screenshots) als Liste nennen.

## Aufbau README.md
```
# Projektname
Ein Satz: was es ist und für wen.

![Screenshot](docs/screenshot.png)   (wenn vorhanden)

## Funktionen
- …

## Voraussetzungen
Python 3.12 / Node 20 …

## Installation
Befehle Schritt für Schritt (Windows-PowerShell zuerst)

## Starten
…

## Bedienung
kurzes Beispiel

## Aufbau des Projekts
Ordner und wichtigste Dateien mit einem Satz

## Tests
…

## Bekannte Grenzen und Ideen
## Autor/in, Lizenz
```

## Regeln
- Nichts erfinden: keine Funktionen, die es nicht gibt, keine Befehle, die nicht getestet sind.
- Einfache Sprache, kurze Sätze, Befehle in Codeblöcken zum Kopieren.
- Keine Passwörter, Schlüssel oder internen Adressen in die Doku.
- Kommentare erklären das Warum, nicht das, was der Code schon sagt.
- Bei einer Abgabe: Die Doku beschreibt die eigene Arbeit der Person ehrlich.
