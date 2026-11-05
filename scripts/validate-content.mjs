import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const areas = ['_posts', '_projects', '_research', '_notes', '_stock_analysis'];
const errors = [];
const read = (file) => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
function frontMatter(file) {
  const text = read(file);
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) { errors.push(`${file}: missing YAML front matter`); return {}; }
  const block = match[1];
  for (const field of ['title:', 'date:', 'tags:']) if (!block.match(new RegExp(`^${field}`, 'm'))) errors.push(`${file}: missing ${field.slice(0, -1)}`);
  const tagBlock = block.match(/^tags:[ \t]*\r?\n((?:[ \t]+[^\r\n]*(?:\r?\n|$))*)/m)?.[1] ?? '';
  const tags = [...tagBlock.matchAll(/^\s*-\s+(.+)$/gm)].map((x) => x[1].trim().replace(/^['"]|['"]$/g, ''));
  if (tags.includes('Blog')) errors.push(`${file}: Blog tag is forbidden; use Play`);
  if (tags.includes('Game') && !tags.includes('Play')) errors.push(`${file}: Game entries must also carry Play`);
  if (!/^context:[ \t]*$/m.test(block)) errors.push(`${file}: missing reviewed context block`);
  const summary = block.match(/^  summary:[ \t]*(.*)$/m)?.[1]?.trim();
  if (!summary || ['""', "''", '|', '>'].includes(summary)) errors.push(`${file}: context.summary must contain a reviewed one-line summary`);
  if (!/^  reviewed_on: ['"]?\d{4}-\d{2}-\d{2}['"]?[ \t]*$/m.test(block)) errors.push(`${file}: context.reviewed_on must be YYYY-MM-DD`);
  for (const field of ['findings','limits','followups','keywords','related']) if (!block.match(new RegExp(`^  ${field}:`, 'm'))) errors.push(`${file}: missing context.${field}`);
  return { tags, block };
}
// A public analysis can only target one of the owner's Stars. Exchange-qualified
// symbols are data, never a script URL or a free-form query parameter.
const starsFile = path.join(root, '_data/stock-stars.yml');
const starSymbols = new Set();
if (!fs.existsSync(starsFile)) errors.push('Stock: missing _data/stock-stars.yml');
else {
  const stars = read(starsFile);
  const entries = [...stars.matchAll(/^- symbol: ([^\r\n]+)\r?\n  name: ([^\r\n]+)$/gm)];
  const nonCommentLines = stars.split(/\r?\n/).filter(line => line.trim() && !line.trimStart().startsWith('#'));
  if (entries.length * 2 !== nonCommentLines.length) errors.push('Stock: each Star needs exactly symbol and name');
  for (const [, symbol, name] of entries) {
    if (!/^(NASDAQ|NYSE|AMEX):[A-Z][A-Z0-9.\-]{0,11}$/.test(symbol)) errors.push(`Stock: invalid US-listed symbol ${symbol}`);
    if (!name.trim() || /[<>{}\[\]]/.test(name) || name.length > 90) errors.push(`Stock: invalid display name for ${symbol}`);
    if (starSymbols.has(symbol)) errors.push(`Stock: duplicate Star ${symbol}`);
    starSymbols.add(symbol);
  }
}
for (const area of areas) {
  const dir = path.join(root, area);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const file = path.join(dir, name);
    const meta = frontMatter(file);
    if (area === '_stock_analysis') {
      const symbol = meta.block?.match(/^stock_symbol:\s*['"]?([^'"\r\n]+)['"]?\s*$/m)?.[1]?.trim();
      if (!symbol || !starSymbols.has(symbol)) errors.push(`${file}: stock_symbol must be a current Star`);
      if (!meta.tags?.includes('Stock')) errors.push(`${file}: Stock analysis needs Stock tag`);
    }
  }
}
for (const file of ['_config.yml', '_data/profile.yml', '_data/navigation.yml', '_data/tag-index.yml']) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`missing required file: ${file}`);
}
// Every logical blog task records real current work on Home; factual review remains an agent responsibility.
const homeFile = path.join(root, 'index.md');
if (!fs.existsSync(homeFile)) errors.push('missing Home source: index.md');
else {
  const home = read(homeFile);
  const header = home.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)?.[1] ?? '';
  const current = header.match(/^home_current:[ \t]*\r?\n((?: {2}[^\r\n]*(?:\r?\n|$))*)/m)?.[1] ?? '';
  const field = key => (current.match(new RegExp(`^  ${key}:[ \\t]*(.*)$`, 'm'))?.[1] ?? '').trim().replace(/^['"]|['"]$/g, '');
  const task = field('task_id'), updated = field('updated_on'), summary = field('summary');
  const date = new Date(updated + 'T00:00:00Z');
  if (!/^M-\d+$/.test(task)) errors.push('Home: home_current.task_id must identify a maintenance task');
  else {
    const tasks = path.join(root, 'TASKS.md');
    if (!fs.existsSync(tasks) || !read(tasks).match(new RegExp(`^\\| ${task} \\|`, 'm'))) errors.push('Home: current task must exist in TASKS.md');
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== updated) errors.push('Home: home_current.updated_on must be a real YYYY-MM-DD');
  if (!summary || ['|','>'].includes(summary)) errors.push('Home: home_current.summary must contain an actual one-line work summary');
  for (const key of ['summary','updated_on']) if (!home.match(new RegExp(`\\{\\{\\s*page\\.home_current\\.${key}(?:\\s*\\||\\s*\\}\\})`))) errors.push(`Home: current-work ${key} must be connected to the displayed section`);
  if (!home.includes('id="home-current-title"') || !home.includes('Currently exploring') || !home.includes('지금 만들어가는 것들')) errors.push('Home: preserve the Currently exploring section and headings');
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
