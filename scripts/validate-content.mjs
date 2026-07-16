import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const areas = ['_posts', '_projects', '_research', '_notes'];
const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
function frontMatter(file) {
  const text = read(file);
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { errors.push(`${file}: missing YAML front matter`); return {}; }
  const block = match[1];
  for (const field of ['title:', 'date:', 'tags:']) if (!block.match(new RegExp(`^${field}`, 'm'))) errors.push(`${file}: missing ${field.slice(0, -1)}`);
  const tags = [...block.matchAll(/^\s*-\s+(.+)$/gm)].map((x) => x[1].trim().replace(/^['"]|['"]$/g, ''));
  if (tags.includes('Blog')) errors.push(`${file}: Blog tag is forbidden; use Play`);
  if (tags.includes('Game') && !tags.includes('Play')) errors.push(`${file}: Game entries must also carry Play`);
  return { tags };
}
for (const area of areas) {
  const dir = path.join(root, area);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) frontMatter(path.join(dir, name));
}
for (const file of ['_config.yml', '_data/profile.yml', '_data/navigation.yml', '_data/tag-index.yml']) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`missing required file: ${file}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Content validation passed.');
