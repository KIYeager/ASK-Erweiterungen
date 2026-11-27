---
name: sicherheit-pruefen
description: Prüft eigenen Code auf typische Sicherheitslücken: Schlüssel im Code, SQL- und Befehls-Injection, XSS, unsichere Eingaben, schwache Passwortspeicherung, veraltete Pakete, und behebt sie. Verwenden, bevor Code veröffentlicht oder abgegeben wird, oder bei «ist das sicher?».
---
# Sicherheit prüfen

Ziel: Lücken im **eigenen** Code der Person finden, verständlich erklären und schliessen. Es geht ums Verteidigen, nicht ums Angreifen.

## Vorgehen
1. **Umfang klären.** Welches Projekt, welche Teile (Webseite, API, Skript)? Wird es veröffentlicht, nur lokal genutzt oder abgegeben?
2. **Überblick:** Sprache, Framework, wo kommen Eingaben herein (Formulare, URL, Dateien, Befehlszeile), wo werden Daten gespeichert.
3. **Prüfen nach der Liste unten.** Dateien ganz lesen. Mit Suchbefehlen nach verdächtigen Mustern suchen (z. B. `password`, `api_key`, `token`, `secret`, `eval(`, `innerHTML`, `shell=True`, `execute(f"`).
4. **Abhängigkeiten prüfen**, wenn möglich: `npm audit` oder `pip list --outdated` (bzw. `pip-audit`, falls installiert).
5. **Bericht** mit Schwere, Fund, Stelle, Erklärung in einfachen Worten, Lösung.
6. **Beheben**, wenn die Person zustimmt, und kurz nachprüfen.

## Prüfliste
- **Geheimnisse im Code:** Passwörter, API-Schlüssel, Tokens im Quelltext oder in Git. Lösung: in `.env`, `.env` in `.gitignore`, Schlüssel beim Anbieter neu erstellen, wenn er schon in Git war.
- **SQL-Injection:** Texte in SQL zusammengesetzt. Lösung: Platzhalter (`?`, `%s`) bzw. ORM.
- **Befehls-Injection:** Eingaben in `os.system`, `subprocess(..., shell=True)`, `exec`. Lösung: Liste von Argumenten, Eingaben prüfen.
- **XSS:** Benutzereingaben mit `innerHTML` oder ohne Escaping ausgegeben. Lösung: `textContent`, Template-Engine mit Auto-Escaping.
- **Eingaben:** Länge, Typ und erlaubte Werte prüfen, auf dem Server, nicht nur im Browser.
- **Passwörter speichern:** nie im Klartext, nie mit MD5/SHA1; Lösung: `bcrypt`, `argon2` oder `hashlib.scrypt`.
- **Dateipfade:** Eingaben wie `../../` in Pfaden (Path Traversal). Lösung: Pfad auflösen und prüfen, dass er im erlaubten Ordner bleibt.
- **Fehlermeldungen:** keine Stacktraces oder Interna an Benutzer; Debug-Modus aus bei Veröffentlichung.
- **Zugriff:** Kann jemand ohne Anmeldung oder mit fremder ID auf Daten zugreifen?
- **Abhängigkeiten:** bekannte Lücken, sehr alte Versionen.
- **HTTPS und Cookies** bei Web-Apps: `HttpOnly`, `Secure`, `SameSite`.

## Bericht
| Schwere | Fund | Stelle | Warum gefährlich | Lösung |
|---|---|---|---|---|

## Regeln
- Nur Code prüfen, den die Person selbst geschrieben hat oder verantwortet. Keine fremden Systeme testen oder angreifen.
- Gefundene Schlüssel nie im Chat wiederholen; nur sagen, wo sie stehen, und raten, sie zu ersetzen.
- Ehrlich sein: Eine Prüfung findet nicht alles. Unsicheres als «zu prüfen» markieren.
