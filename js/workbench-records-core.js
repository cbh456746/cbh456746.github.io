export const ARCHIVE_KIND = 'workbench-private-conversation';
export const MAX_ARCHIVE_BYTES = 20 * 1024 * 1024;
export const TURN_ROLES = ['user', 'assistant', 'tool', 'system'];

const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const text = (value, label, max = Infinity) => {
  if (typeof value !== 'string' || value.length > max) throw new Error(`${label}: 올바른 텍스트가 아닙니다.`);
  return value;
};
const identifier = (value, label) => {
  if (typeof value !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(value)) throw new Error(`${label}: ID가 올바르지 않습니다.`);
  return value;
};
const date = (value, label) => {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) throw new Error(`${label}: 날짜가 올바르지 않습니다.`);
  return value;
};
const only = (value, keys, label) => {
  if (!plain(value) || Object.keys(value).some(key => !keys.includes(key))) throw new Error(`${label}: 지원하지 않는 형식입니다.`);
};

export function createArchive(now = new Date()) {
  return {schema_version:1, kind:ARCHIVE_KIND, id:crypto.randomUUID(), title:'', project:'', created_at:now.toISOString(), updated_at:now.toISOString(), turns:[], prompts:[]};
}

export function validateArchive(raw) {
  only(raw, ['schema_version','kind','id','title','project','created_at','updated_at','turns','prompts'], '기록');
  if (raw.schema_version !== 1 || raw.kind !== ARCHIVE_KIND) throw new Error('지원하지 않는 기록 버전입니다.');
  const archive = {schema_version:1, kind:ARCHIVE_KIND, id:identifier(raw.id,'기록'), title:text(raw.title,'제목',160), project:text(raw.project,'프로젝트',160), created_at:date(raw.created_at,'생성일'), updated_at:date(raw.updated_at,'수정일'), turns:[], prompts:[]};
  if (!Array.isArray(raw.turns) || raw.turns.length > 10000 || !Array.isArray(raw.prompts) || raw.prompts.length > 10000) throw new Error('턴 또는 프롬프트 목록이 올바르지 않습니다.');
  const turnIds = new Set();
  for (const item of raw.turns) {
    only(item, ['id','role','content'], '턴');
    const id = identifier(item.id,'턴');
    if (turnIds.has(id) || !TURN_ROLES.includes(item.role)) throw new Error('중복된 턴 ID 또는 잘못된 화자입니다.');
    turnIds.add(id);
    archive.turns.push({id, role:item.role, content:text(item.content,'턴 내용')});
  }
  const promptIds = new Set();
  for (const item of raw.prompts) {
    only(item, ['id','title','content','source_turn_id'], '프롬프트');
    const id = identifier(item.id,'프롬프트');
    if (promptIds.has(id) || !(item.source_turn_id === null || turnIds.has(item.source_turn_id))) throw new Error('중복된 프롬프트 ID 또는 없는 출처 턴입니다.');
    promptIds.add(id);
    archive.prompts.push({id, title:text(item.title,'프롬프트 제목',160), content:text(item.content,'프롬프트 내용'), source_turn_id:item.source_turn_id});
  }
  if (new TextEncoder().encode(JSON.stringify(archive)).length > MAX_ARCHIVE_BYTES) throw new Error('기록 파일이 20 MiB를 넘었습니다.');
  return archive;
}

export function parseArchive(json) {
  if (new TextEncoder().encode(json).length > MAX_ARCHIVE_BYTES) throw new Error('20 MiB 이하의 JSON 파일을 선택해 주세요.');
  let value;
  try { value = JSON.parse(json); } catch { throw new Error('JSON 형식을 읽을 수 없습니다.'); }
  return validateArchive(value);
}

export function serializeArchive(raw, now = new Date()) {
  const archive = validateArchive({...raw, updated_at:now.toISOString()});
  if (!archive.title.trim()) throw new Error('대화 제목을 적어 주세요.');
  if (archive.turns.some(turn => !turn.content.trim()) || archive.prompts.some(prompt => !prompt.title.trim() || !prompt.content.trim())) throw new Error('빈 턴·프롬프트 제목·내용을 채우거나 삭제해 주세요.');
  const json = JSON.stringify(archive, null, 2) + '\n';
  if (new TextEncoder().encode(json).length > MAX_ARCHIVE_BYTES) throw new Error('저장 파일이 20 MiB를 넘었습니다. 대화를 나눠 저장해 주세요.');
  return json;
}
