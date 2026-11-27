---
name: windows-automatisieren
description: Baut sichere PowerShell-Skripte für wiederkehrende Aufgaben unter Windows: Dateien umbenennen, sortieren, kopieren, Ordner aufräumen, Berichte erstellen, Aufgaben planen. Immer mit Probelauf, bevor etwas geändert wird. Verwenden, wenn die Person eine lästige Arbeit am Computer automatisieren möchte.
---
# Windows automatisieren

Ziel: Ein verständliches PowerShell-Skript, das genau das tut, was die Person will, und nichts kaputt macht.

## Vorgehen
1. **Aufgabe genau klären.** Welche Dateien oder Ordner (Pfad)? Was soll passieren (umbenennen, verschieben, kopieren, zusammenfassen)? Nach welcher Regel (Datum, Endung, Name)? Wie oft? Ein Beispiel vorher → nachher erfragen.
2. **Ansehen, nur lesend:** `Get-ChildItem` im betroffenen Ordner, damit klar ist, was da ist. Der Person die Anzahl und ein paar Beispiele zeigen.
3. **Skript schreiben** als `.ps1` im Arbeitsordner, mit Kommentaren und Parametern oben (Ordner, Muster).
4. **Probelauf:** Skript zuerst mit `-WhatIf` oder einem Schalter `$Probelauf = $true`, der nur anzeigt, was passieren würde. Ergebnis der Person zeigen.
5. **Ausführen** erst nach Zustimmung. Danach Ergebnis zeigen (Anzahl, Beispiele).
6. **Übergeben:** wie man das Skript wieder startet (`powershell -ExecutionPolicy Bypass -File .\skript.ps1` nur für dieses eine Skript), was man anpassen kann. Auf Wunsch zeigen, wie man es mit der Aufgabenplanung regelmässig laufen lässt.

## Bausteine
```powershell
param([string]$Ordner = "$HOME\Downloads", [switch]$Probelauf)
Get-ChildItem -Path $Ordner -File -Filter *.pdf | ForEach-Object {
  $ziel = Join-Path $Ordner ("PDF\" + $_.Name)
  if ($Probelauf) { Write-Host "Würde verschieben: $($_.Name)" }
  else { New-Item -ItemType Directory -Force (Split-Path $ziel) | Out-Null; Move-Item $_.FullName $ziel }
}
```
- Namen mit Datum: `$_.LastWriteTime.ToString('yyyy-MM-dd')`.
- Doppelte Namen abfangen: vor dem Verschieben `Test-Path $ziel` prüfen und eine Nummer anhängen.
- Berichte: `Export-Csv -Encoding UTF8 -NoTypeInformation`.
- Fehler sichtbar machen: `$ErrorActionPreference = 'Stop'` und `try { … } catch { Write-Warning $_ }`.

## Regeln
- **Nie ohne Probelauf ändern**, nie ohne Rückfrage löschen. Löschen lieber in einen Ordner «Papierkorb-Skript» verschieben.
- Keine Systemordner (`C:\Windows`, `Program Files`), keine Registry, keine Sicherheitseinstellungen ändern.
- Ausführungsrichtlinie nicht dauerhaft ändern.
- Keine Passwörter im Skript.
