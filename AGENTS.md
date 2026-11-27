# Anweisungen für KI-Agents

Gilt für alle Agents, die in diesem Repository arbeiten oder für ASK etwas bauen (Claude Code, Codex, Copilot, ChatGPT und andere).

Dieses Repository ist der **Katalog von ASK**, der Desktop-App der TF Bern. ASK zeigt jeden Ordner mit `SKILL.md` (Skill) oder `mod.json` (Mod) unter Einstellungen → Skills bzw. Mods zum Hinzufügen an.

## Einen Mod bauen

Lies zuerst **`.claude/skills/ask-mods/SKILL.md`**: Format von `mod.json`, CSS-Variablen, die JavaScript-Schnittstelle `ASK`, Ereignisse, Grenzen, Beispiele und Checkliste. (In Claude Code ist das der Skill `ask-mods`.) Neue Mods kommen nach `mods/<id>/`.

## Einen Skill bauen

`skills/<name>/SKILL.md`: Kopf zwischen zwei Zeilen `---` mit `name` (gleich wie der Ordner, nur `a-z`, `0-9`, `-`) und `description` (höchstens 300 Zeichen: was der Skill macht **und wann** ASK ihn benutzen soll), danach die Anleitung in Befehlsform. ASK liest nur die `SKILL.md`, keine Skripte daneben. Das Modell in ASK hat Werkzeuge zum Lesen und Schreiben von Dateien, zum Ausführen von Befehlen (PowerShell, Python) und `frage_stellen` für Rückfragen.

## Regeln

- Deutsch mit Schweizer Rechtschreibung («ss» statt «ß», Anführungszeichen « »), einfach und freundlich, für Lernende.
- Kein Internet in Mods, kein `eval`, nichts verschleiert, keine Zugangsdaten, nichts, was Sicherheit oder Rückfragen in ASK umgehen soll.
- Keine fremden Figuren, Logos oder Bilder ohne Erlaubnis.
- Vor dem Pull Request `node scripts/pruefen.mjs` ausführen; die gleiche Prüfung läuft auf GitHub.
- Pull Request mit kurzer Beschreibung: was der Eintrag tut und für wen er gedacht ist. Wer zusammenführt, liest jede Datei (siehe Prüfliste in der README).
