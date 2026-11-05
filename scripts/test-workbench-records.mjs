import test from 'node:test';
import assert from 'node:assert/strict';
import {createArchive, parseArchive, serializeArchive, validateArchive, ARCHIVE_KIND} from '../js/workbench-records-core.js';

const timestamp = new Date('2026-11-05T00:00:00.000Z');
function sample() {
  const value = createArchive(timestamp);
  value.title = '작업실 논의'; value.project = 'blog-evolution';
  value.turns = [{id:'turn-1',role:'user',content:'첫 줄\n둘째 줄'}, {id:'turn-2',role:'assistant',content:'응답 전문'}];
  value.prompts = [{id:'prompt-1',title:'계속하기',content:'첫 줄\n둘째 줄',source_turn_id:'turn-1'}];
  return value;
}
test('full turns and selected prompt survive a JSON save and reload without text changes', () => {
  const original = sample(); const saved = serializeArchive(original,timestamp); const restored = parseArchive(saved);
  assert.equal(restored.kind,ARCHIVE_KIND);
  assert.deepEqual(restored.turns,original.turns);
  assert.deepEqual(restored.prompts,original.prompts);
  assert.equal(restored.project,'blog-evolution');
});
test('unrecognized fields, broken prompt sources and blank content are rejected', () => {
  const extra = sample(); extra.private_token = 'must not be kept'; assert.throws(() => validateArchive(extra),/지원하지 않는/);
  const broken = sample(); broken.prompts[0].source_turn_id = 'missing'; assert.throws(() => validateArchive(broken),/출처 턴/);
  const blank = sample(); blank.turns[0].content = '  '; assert.throws(() => serializeArchive(blank,timestamp),/빈 턴/);
});
test('oversized or malformed imports fail without silently truncating turns', () => {
  assert.throws(() => parseArchive('{'),/JSON 형식/);
  assert.throws(() => parseArchive(' '.repeat(20 * 1024 * 1024 + 1)),/20 MiB/);
});
