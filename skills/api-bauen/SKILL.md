---
name: api-bauen
description: Baut eine REST-API mit Python (FastAPI oder Flask) oder Node.js (Express): Endpunkte, JSON, Prüfung der Eingaben, Fehlercodes, Speicherung in SQLite, Tests und Beispielaufrufe. Verwenden, wenn die Person ein Backend, eine Schnittstelle oder einen Server für ihre App oder Webseite braucht.
---
# API bauen

Ziel: Eine kleine, saubere API, die läuft, getestet ist und die die Person erweitern kann.

## Vorgehen
1. **Klären.** Wofür ist die API (z. B. Aufgabenliste, Highscores, Notizen)? Welche Daten (Felder, Typen)? Welche Sprache ist im Projekt schon da? Ohne Vorgabe: Python mit FastAPI. Wo speichern (im Speicher, JSON-Datei, SQLite)? Ohne Vorgabe: SQLite.
2. **Endpunkte planen** und der Person als Tabelle zeigen:
   | Methode | Pfad | Zweck | Antwort |
   |---|---|---|---|
   | GET | /aufgaben | alle auflisten | 200 + Liste |
   | GET | /aufgaben/{id} | eine holen | 200 oder 404 |
   | POST | /aufgaben | neu anlegen | 201 + neues Objekt |
   | PUT/PATCH | /aufgaben/{id} | ändern | 200 oder 404 |
   | DELETE | /aufgaben/{id} | löschen | 204 oder 404 |
3. **Projekt anlegen** (siehe Skill `projekt-aufsetzen`): virtuelle Umgebung oder `npm init`, Abhängigkeiten in `requirements.txt` bzw. `package.json`.
4. **Bauen:** Datenmodell, Datenbankzugriff, Endpunkte, Eingabeprüfung, Fehlerantworten.
5. **Starten** mit `server_starten` (z. B. `uvicorn main:app --reload --port 8000`) und mit `browser` die automatische Doku öffnen (FastAPI: `/docs`).
6. **Testen:** automatische Tests (pytest mit `TestClient`, oder supertest bei Express) für jeden Endpunkt inklusive Fehlerfall. Tests ausführen.
7. **Übergeben:** Wie starten, Beispielaufrufe (`curl` oder PowerShell `Invoke-RestMethod`), wie man einen Endpunkt hinzufügt.

## Gute Regeln für APIs
- Pfade als Substantive in Mehrzahl (`/aufgaben`), Aktionen über die Methode.
- Immer JSON, mit passendem Statuscode: 200, 201, 204, 400 (falsche Eingabe), 404 (nicht gefunden), 500 nur bei echten Fehlern.
- Fehler als JSON mit verständlicher Meldung: `{"fehler": "Titel darf nicht leer sein"}`.
- **Eingaben immer prüfen** (Pydantic-Modelle bei FastAPI, eigene Prüfung bei Flask/Express).
- **SQL nur mit Platzhaltern** (`?`), nie Texte zusammensetzen (Schutz vor SQL-Injection).
- CORS nur für die eigene Webseite erlauben, wenn ein Frontend darauf zugreift.

## Regeln
- Keine Passwörter, Schlüssel oder Tokens in den Code schreiben; Konfiguration in eine `.env`-Datei, die in `.gitignore` steht.
- Server nur lokal starten. Nichts ins Internet stellen, ohne dass die Person es ausdrücklich will und weiss, was das bedeutet.
- Nicht mehr gebrauchte Server mit `server_stoppen` beenden.
