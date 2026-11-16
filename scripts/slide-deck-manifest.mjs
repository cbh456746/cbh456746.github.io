import fs from 'node:fs';
import path from 'node:path';

const imagePath = /^\/assets\/images\/presentations\/[a-z0-9]+(?:-[a-z0-9]+)*\/slide-\d{2,}\.(?:webp|png|jpg|jpeg)$/;
const scalar = value => {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) return trimmed.slice(1, -1).trim();
  return trimmed;
};

export function validateSlideDeck(file, source, root) {
  const errors = [];
  const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!front) return errors;
  const body = source.slice(front[0].length);
  const includes = [...body.matchAll(/\{%\s*include\s+slide-deck\.html\b([^%]*)%\}/g)];
  if (!includes.length) return errors;
  if (includes.length > 1) errors.push(`${file}: version 1 supports one slide deck per article`);
  if (includes.some((match) => !/\bslides=page\.slides\b/.test(match[1]))) errors.push(`${file}: slide-deck include must use slides=page.slides`);

  const slideBlock = front[1].match(/^slides:[ \t]*\r?\n((?:[ \t]+[^\r\n]*(?:\r?\n|$))*)/m)?.[1];
  if (!slideBlock) return [...errors, `${file}: slide-deck include needs a slides: front-matter list`];

  const slides = [];
  for (const line of slideBlock.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = line.match(/^  - image:[ \t]*(.*)$/);
    if (item) { slides.push({ image: scalar(item[1]) }); continue; }
    const field = line.match(/^    (alt|caption|width|height):[ \t]*(.*)$/);
    if (!field || !slides.length) { errors.push(`${file}: unsupported slide field or indentation: ${line.trim()}`); continue; }
    if (Object.hasOwn(slides.at(-1), field[1])) errors.push(`${file}: duplicate slide field ${field[1]}`);
    slides.at(-1)[field[1]] = scalar(field[2]);
  }
  if (!slides.length) errors.push(`${file}: slide deck needs at least one slide`);

  const seen = new Set();
  for (const [index, slide] of slides.entries()) {
    const label = `${file}: slide ${index + 1}`;
    if (!imagePath.test(slide.image)) errors.push(`${label}: image must be a local numbered presentation image`);
    else {
      if (seen.has(slide.image)) errors.push(`${label}: duplicate image path`);
      seen.add(slide.image);
      if (!fs.existsSync(path.join(root, slide.image.slice(1)))) errors.push(`${label}: image file is missing`);
    }
    for (const key of ['alt', 'caption']) {
      if (!slide[key] || slide[key].length > 600 || /[<>]|\{%|\{\{/.test(slide[key])) errors.push(`${label}: ${key} needs a one-line, plain-text description (max 600 characters)`);
    }
    for (const key of ['width', 'height']) {
      const value = Number(slide[key]);
      if (!/^[1-9]\d*$/.test(slide[key] ?? '') || value > 20000) errors.push(`${label}: ${key} must be a positive pixel count`);
    }
  }
  return errors;
}
