---
name: react-app-bauen
description: Baut moderne Web-Apps mit React und Vite: Projekt anlegen, Komponenten, Zustand mit Hooks, Formulare, Daten laden, Routing, Styling und Build. Startet den Entwicklungsserver und testet im Browser. Verwenden, wenn die Person eine interaktive Web-App, ein Dashboard oder ein Frontend mit React will.
---
# React-App bauen

Ziel: Eine React-App, die läuft, gut aussieht und deren Aufbau die Person versteht.

## Vorgehen
1. **Klären.** Was soll die App können (Hauptfunktionen, Seiten)? Für wen? Gibt es schon ein Projekt (`package.json` mit `react`)? Dann darin weiterarbeiten. JavaScript oder TypeScript? Ohne Vorgabe: JavaScript.
2. **Voraussetzungen prüfen:** `node --version` (ab 18) und `npm --version`.
3. **Projekt anlegen** (nur wenn keines da ist): `npm create vite@latest app-name -- --template react`, dann `npm install` im neuen Ordner.
4. **Aufräumen:** Beispielinhalt aus `App.jsx` und `App.css` entfernen, Titel in `index.html` setzen, `lang="de"`.
5. **Komponenten planen**, als kleiner Baum gezeigt (z. B. `App` → `Kopfzeile`, `AufgabenListe` → `AufgabenEintrag`, `NeueAufgabe`).
6. **Bauen** Komponente für Komponente. Dateien in `src/components/`.
7. **Starten** mit `server_starten` (`npm run dev`), Adresse mit `browser` öffnen, bedienen und Konsole prüfen.
8. **Fertigstellen:** `npm run build` einmal ausführen, damit klar ist, dass der Build klappt. Erklären, wie man startet und wo was steht.

## React-Regeln
- Komponenten klein, eine Aufgabe, Namen gross geschrieben (`AufgabenListe.jsx`).
- Zustand mit `useState` dort, wo er gebraucht wird; teilen über Props, bei Bedarf hochziehen. Erst bei viel geteiltem Zustand `useContext`.
- Listen mit stabilem `key` (eine ID, nicht der Index).
- Nebenwirkungen (Daten laden, Timer) in `useEffect` mit Aufräumfunktion und korrekten Abhängigkeiten.
- Formulare kontrolliert (`value` + `onChange`), Eingaben prüfen, Fehlermeldungen anzeigen.
- Daten speichern ohne Backend: `localStorage`. Mit Backend: siehe Skill `api-bauen`.
- Routing nur bei mehreren Seiten (`react-router-dom`).
- Styling: CSS-Dateien mit Variablen oder CSS-Module; Gestaltung siehe Skill `webseite-gestalten`.
- Zustände für Laden, leer und Fehler immer mitdenken.

## Regeln
- Nur nötige Pakete installieren, vorher sagen, welche und wofür.
- Keine Schlüssel im Frontend-Code; alles im Frontend ist für alle sichtbar.
- Den Entwicklungsserver nicht mehrmals starten (`server_liste`), am Ende auf Wunsch stoppen.
