import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { validateSlideDeck } from './slide-deck-manifest.mjs';

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'slide-deck-test-'));
const relative = path.relative(os.tmpdir(), temporaryRoot);
if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Unsafe temporary test directory');
process.on('exit', () => fs.rmSync(temporaryRoot, { recursive: true, force: true }));
const imageDirectory = path.join(temporaryRoot, 'assets/images/presentations/checked-deck');
fs.mkdirSync(imageDirectory, { recursive: true });
fs.writeFileSync(path.join(imageDirectory, 'slide-01.webp'), 'fixture');

const article = ({ image = '/assets/images/presentations/checked-deck/slide-01.webp', alt = 'A labeled chart', caption = 'The chart result', width = 1920, height = 1080, include = '{% include slide-deck.html slides=page.slides %}' } = {}) => `---
slides:
  - image: ${image}
    alt: "${alt}"
    caption: "${caption}"
    width: ${width}
    height: ${height}
---
${include}
`;

test('accepts a complete local slide manifest', () => {
  assert.deepEqual(validateSlideDeck('article.md', article(), temporaryRoot), []);
});

test('rejects traversal and external slide paths', () => {
  for (const image of ['../../private.webp', 'https://example.com/slide.webp']) {
    assert.match(validateSlideDeck('article.md', article({ image }), temporaryRoot).join('\n'), /local numbered presentation image/);
  }
});

test('rejects missing assets and descriptions', () => {
  assert.match(validateSlideDeck('article.md', article({ image: '/assets/images/presentations/checked-deck/slide-02.webp' }), temporaryRoot).join('\n'), /image file is missing/);
  assert.match(validateSlideDeck('article.md', article({ alt: '' }), temporaryRoot).join('\n'), /alt needs/);
  assert.match(validateSlideDeck('article.md', article({ caption: '' }), temporaryRoot).join('\n'), /caption needs/);
});

test('rejects unusable dimensions and unsupported include data', () => {
  assert.match(validateSlideDeck('article.md', article({ width: 0 }), temporaryRoot).join('\n'), /width must be/);
  assert.match(validateSlideDeck('article.md', article({ include: '{% include slide-deck.html slides=site.data.unreviewed %}' }), temporaryRoot).join('\n'), /slides=page.slides/);
});
