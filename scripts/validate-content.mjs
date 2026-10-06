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
// Public profile is limited to the fields approved by the owner.
const profileFile = path.join(root, '_data/profile.yml');
if (fs.existsSync(profileFile)) {
  const profile = read(profileFile);
  const keys = [...profile.matchAll(/^([a-z_]+):/gm)].map(match => match[1]);
  const allowed = ['name', 'headline', 'summary', 'interests', 'education'];
  for (const key of keys) if (!allowed.includes(key)) errors.push(`profile contains unapproved field: ${key}`);
  if (!/^name: BH CHOI$/m.test(profile)) errors.push('public profile name must be BH CHOI');
}
const configFile = path.join(root, '_config.yml');
if (fs.existsSync(configFile) && /^email:\s*\S+/m.test(read(configFile))) errors.push('public contact email is not approved');
// The visitor adapter only accepts a public GoatCounter code, never a URL or API token.
const visitsFile = path.join(root, '_data/visitor-stats.yml');
if (fs.existsSync(visitsFile)) {
  const visits = read(visitsFile);
  const keys = [...visits.matchAll(/^([a-z_]+):/gm)].map(match => match[1]);
  if (keys.some(key => !['enabled','site_code','started_on'].includes(key))) errors.push('visitor statistics: unsupported setting; private credentials must not be stored here');
  const setting = key => (visits.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'))?.[1] ?? '').replace(/^['"]|['"]$/g, '').trim();
  const enabled = setting('enabled'), code = setting('site_code'), start = setting('started_on');
  if (!['true','false'].includes(enabled)) errors.push('visitor statistics: enabled must be true or false');
  if (code && !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(code)) errors.push('visitor statistics: use a public site code, not a URL or credential');
  const date = new Date(start + 'T00:00:00Z');
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(start) && Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === start;
  if (start && !validDate) errors.push('visitor statistics: started_on must be a real YYYY-MM-DD');
  if (enabled === 'true' && (!code || !validDate)) errors.push('visitor statistics: an active counter needs its public site code and collection start date');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Content validation passed.');
