import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), '_articles');
const cache = new Map();
const protectedToken = /(`[^`\n]+`|!?(?:\[[^\]]*\]\([^)]*\)|<[^>\n]+>)|https?:\/\/[^\s)]+|\{\{[^}]+\}\})/g;

async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await files(path)));
    else if (entry.name.endsWith('.md')) result.push(path);
  }
  return result;
}

async function translate(text) {
  if (!text.trim()) return text;
  if (cache.has(text)) return cache.get(text);
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', 'ru');
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', text);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const data = await response.json();
  const result = data[0].map((part) => part[0]).join('');
  cache.set(text, result);
  return result;
}

async function translateLine(line) {
  if (!line.trim() || /^\s*(---|:::|[-*+]\s*```|\{#|<!--)/.test(line)) return line;
  const protectedParts = [];
  const marked = line.replace(protectedToken, (part) => {
    const token = `ZXQPROTECTED${protectedParts.length}QXZ`;
    protectedParts.push(part);
    return token;
  });
  const prefix = marked.match(/^(\s*(?:#{1,6}\s+|[-*+]\s+|\d+[.)]\s+|>\s+))/)?.[1] ?? '';
  const body = prefix ? marked.slice(prefix.length) : marked;
  const latin = (body.match(/[A-Za-z]{2,}/g) ?? []).join('').length;
  const cyrillic = (body.match(/[А-Яа-яЁё]{2,}/g) ?? []).join('').length;
  if (latin < 12 || latin <= cyrillic) return line;
  let translated = await translate(body);
  for (let i = 0; i < protectedParts.length; i++) {
    translated = translated.replaceAll(`ZXQPROTECTED${i}QXZ`, protectedParts[i]);
  }
  return prefix + translated;
}

async function translateDocument(source) {
  const frontmatterMatch = source.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  let frontmatter = frontmatterMatch?.[0] ?? '';
  const titleMatch = frontmatter.match(/^(title:\s*)(.*)$/m);
  if (titleMatch && /[A-Za-z]{3,}/.test(titleMatch[2])) {
    const translatedTitle = await translate(titleMatch[2].replace(/\s+#.*$/, ''));
    frontmatter = frontmatter.replace(titleMatch[0], `${titleMatch[1]}${translatedTitle}`);
  }
  const body = source.slice(frontmatter.length);
  const sections = body.split(/(```[\s\S]*?```)/g);
  let output = frontmatter;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.startsWith('```')) {
      output += section;
      continue;
    }
    const lines = section.split('\n');
    for (let j = 0; j < lines.length; j += 12) {
      const group = lines.slice(j, j + 12);
      const line = group.join('\n');
      output += (await translateLine(line)) + (j + group.length === lines.length ? '' : '\n');
    }
  }
  return output;
}

const paths = await files(root);
for (let index = 0; index < paths.length; index++) {
  const path = paths[index];
  const source = await readFile(path, 'utf8');
  const translated = await translateDocument(source);
  if (translated !== source) await writeFile(path, translated, 'utf8');
  console.log(`[${index + 1}/${paths.length}] ${path}`);
}
