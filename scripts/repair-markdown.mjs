import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

for (const path of await walk(join(process.cwd(), '_articles'))) {
  const source = await readFile(path, 'utf8');
  const repaired = source
    .replace(/([^\n])```/g, '$1\n```')
    .replace(/```\r?\n(?=(?:lua|json|js|ts|tsx|jsx|xml|css|shell|bash|diff|yaml|typescript)\b)/gi, (match) => match.replace(/\r?\n$/, ''));
  if (repaired !== source) await writeFile(path, repaired, 'utf8');
}
