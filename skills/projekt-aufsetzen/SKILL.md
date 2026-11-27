---
name: projekt-aufsetzen
description: Startet ein neues Programmierprojekt sauber: Ordner, venv (Python) oder npm (JavaScript), Abhängigkeiten, .gitignore, README, Startbefehl und erster Test, auf Wunsch mit Git. Verwenden, wenn die Person ein neues Projekt beginnt oder ein chaotisches Projekt ordnen will.
---
# Projekt aufsetzen

Ziel: Ein Projekt, das von Anfang an aufgeräumt ist, auf jedem Laptop gleich startet und mit Git verwaltet werden kann.

## Vorgehen
1. **Klären.** Was wird gebaut (Skript, Web-App, API, Spiel)? Welche Sprache und welches Framework? Name des Projekts (Kleinbuchstaben, Bindestriche)? Mit Git?
2. **Prüfen, was installiert ist:** `python --version`, `node --version`, `npm --version`, `git --version`. Fehlt etwas, der Person sagen, was sie installieren muss, statt es heimlich zu tun.
3. **Struktur anlegen** (siehe unten), nur im Arbeitsordner.
4. **Umgebung einrichten:**
   - Python: `python -m venv .venv`, Pakete mit `.venv\Scripts\python -m pip install …`, dann `pip freeze > requirements.txt` (oder nur die direkt gebrauchten Pakete eintragen).
   - JavaScript: `npm init -y`, Pakete mit `npm install`, Skripte `start`, `dev`, `test` in `package.json`.
5. **Grunddateien:** `.gitignore`, `README.md` (siehe Skill `projekt-dokumentieren`), Einstiegsdatei mit einem kleinen «Hallo», ein erster Test.
6. **Einmal starten und testen**, damit sicher ist, dass alles läuft.
7. **Git** auf Wunsch: `git init`, erster Commit (Skill `commit-nachricht`), auf Wunsch GitHub-Repository.
8. **Übergeben:** Wie startet man, wie installiert man auf einem anderen Laptop, wo kommt neuer Code hin.

## Strukturen
**Python**
```
projekt/
  src/projekt/__init__.py
  src/projekt/main.py
  tests/test_main.py
  requirements.txt
  README.md
  .gitignore        (.venv/, __pycache__/, .env, *.pyc)
```
**JavaScript / Web**
```
projekt/
  src/index.js  (oder index.html, style.css, script.js)
  tests/
  package.json
  README.md
  .gitignore        (node_modules/, dist/, .env)
```

## Regeln
- `.venv`, `node_modules` und `.env` nie in Git.
- Geheimnisse in `.env`, dazu eine `.env.beispiel` ohne echte Werte.
- Vorhandenes Werkzeug des Projekts verwenden; nichts doppelt einrichten.
- Nur so viel Struktur, wie das Projekt braucht. Ein kleines Skript braucht keine zehn Ordner.
