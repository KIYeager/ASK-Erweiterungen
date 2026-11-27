// Prüft den Katalog wie ASK beim Hinzufügen (src-tauri/core/src/mods.rs und skills.rs in KIYeager/ASK-App),
// dazu einfache Warnsignale im Code der Mods. Aufruf: node scripts/pruefen.mjs
import fs from 'node:fs';
import path from 'node:path';

const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const EXT = ['json', 'css', 'js', 'md', 'txt', 'svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp3', 'wav', 'ogg', 'woff2', 'woff', 'ttf'];
const RESERVED = ['neu', 'projekt', 'goal', 'suchen', 'ordner', 'explorer', 'dateien', 'github', 'modell', 'denken', 'web', 'chats', 'einstellungen',
  'update', 'beta', 'neustart', 'abmelden', 'gedaechtnis', 'skills', 'hilfe', 'mods', 'plan', 'auto', 'nachfragen', 'nutzung'];
const KINDS = ['loeschen', 'schreiben', 'befehle', 'web'];
// Was in Mods nicht vorkommen soll (ASK sperrt Netz und eval ohnehin; hier fällt es schon im Pull Request auf)
const SUSPICIOUS = [/\bfetch\s*\(/, /XMLHttpRequest/, /WebSocket/, /\beval\s*\(/, /new\s+Function\s*\(/, /\bimport\s*\(/, /https?:\/\//, /__TAURI/, /\bipc\b/i, /sendBeacon/];
const errors = [];
const fail = (where, text) => errors.push(`${where}: ${text}`);
const read = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const list = (dir) => (fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name) : []);
const walk = (dir, base = dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  return d.isDirectory() ? walk(p, base) : [path.relative(base, p).replaceAll('\\', '/')];
});

for (const name of list('skills')) {
  const where = `skills/${name}`;
  if (!ID.test(name)) fail(where, 'Ordnername nur a-z, 0-9 und Bindestriche');
  const file = path.join('skills', name, 'SKILL.md');
  if (!fs.existsSync(file)) { fail(where, 'SKILL.md fehlt'); continue; }
  const text = read(file);
  const m = /^---\n([\s\S]*?)\n---[ \t]*\n([\s\S]*)$/.exec(text.replace(/^﻿/, ''));
  if (!m) { fail(where, 'Kopf zwischen zwei Zeilen «---» fehlt'); continue; }
  const head = Object.fromEntries(m[1].split('\n').map((l) => /^([A-Za-z_-]+)\s*:\s*(.*)$/.exec(l)).filter(Boolean).map((x) => [x[1], x[2].trim()]));
  if (head.name !== name) fail(where, `name im Kopf («${head.name || ''}») muss «${name}» sein`);
  if (!head.description) fail(where, 'description fehlt');
  else if (head.description.length > 300) fail(where, 'description länger als 300 Zeichen');
  if (!m[2].trim()) fail(where, 'Anleitung leer');
  if (RESERVED.includes(name)) fail(where, `«/${name}» ist ein Befehl von ASK`);
  if (Buffer.byteLength(text) > 100 * 1024) fail(where, 'grösser als 100 KB');
  if (text.replaceAll('«ß»', '').includes('ß')) fail(where, 'Schweizer Rechtschreibung: «ss» statt «ß»');
}

for (const id of list('mods')) {
  const where = `mods/${id}`;
  const dir = path.join('mods', id);
  if (!ID.test(id) || id.length > 40) fail(where, 'Ordnername nur a-z, 0-9 und Bindestriche, höchstens 40 Zeichen');
  const files = walk(dir);
  if (files.length > 60) fail(where, 'mehr als 60 Dateien');
  let total = 0;
  for (const f of files) {
    total += fs.statSync(path.join(dir, f)).size;
    if (f.split('/').some((p) => p.startsWith('.'))) fail(where, `versteckte Datei: ${f}`);
    if (!EXT.includes(f.split('.').pop().toLowerCase())) fail(where, `Dateityp nicht erlaubt: ${f}`);
  }
  if (total > 3 * 1024 * 1024) fail(where, 'grösser als 3 MB');
  let m;
  try { m = JSON.parse(read(path.join(dir, 'mod.json'))); } catch (e) { fail(where, `mod.json fehlt oder ist kein JSON (${e.message})`); continue; }
  if (m.id !== id) fail(where, `id in mod.json («${m.id}») muss «${id}» sein`);
  if (!m.name) fail(where, 'name fehlt');
  for (const [key, ext] of [['style', 'css'], ['script', 'js']]) {
    if (!m[key]) continue;
    if (!m[key].endsWith(`.${ext}`)) fail(where, `${key} muss eine .${ext}-Datei sein`);
    if (!files.includes(m[key])) fail(where, `${m[key]} fehlt`);
  }
  for (const b of m.befehle || []) {
    if (!ID.test(b.name || '')) fail(where, `Befehl «${b.name}»: nur a-z, 0-9 und Bindestriche`);
    if (RESERVED.includes(b.name)) fail(where, `«/${b.name}» ist ein Befehl von ASK`);
    if (!b.prompt) fail(where, `Befehl «/${b.name}» ohne prompt`);
  }
  for (const k of m.nachfragen || []) if (!KINDS.includes(k)) fail(where, `nachfragen: «${k}» gibt es nicht (${KINDS.join(', ')})`);
  if ((m.anweisungen || '').length > 2000) fail(where, 'anweisungen länger als 2000 Zeichen');
  for (const f of files.filter((x) => /\.(js|css)$/.test(x))) {
    const text = read(path.join(dir, f));
    for (const re of SUSPICIOUS) if (re.test(text)) fail(where, `${f}: «${re.source}» gefunden (Netz, eval oder Zugriff auf die App sind nicht erlaubt)`);
  }
  if (m.script && files.includes(m.script) && !/^\s*(\/\/.*\n|\/\*[\s\S]*?\*\/\s*)*\(function \(ASK\) \{[\s\S]*\}\)\(ASK\);\s*$/.test(read(path.join(dir, m.script)))) {
    fail(where, `${m.script} muss mit «(function (ASK) {» beginnen und mit «})(ASK);» enden`);
  }
}

if (errors.length) {
  console.error(`${errors.length} Problem(e):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`Alles in Ordnung: ${list('skills').length} Skills, ${list('mods').length} Mods.`);
