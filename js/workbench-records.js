import {createArchive, parseArchive, serializeArchive, MAX_ARCHIVE_BYTES, TURN_ROLES} from './workbench-records-core.js';

const $ = id => document.getElementById(id);
const state = {archive:createArchive(), dirty:false};
const roleLabels = {user:'사용자', assistant:'AI', tool:'도구', system:'시스템'};

function message(value, error = false) { $('wbr-status').textContent = value; $('wbr-status').dataset.error = String(error); }
function changed() { state.dirty = true; message('변경 사항이 있습니다. JSON 저장을 눌러 파일로 보관해 주세요.'); }
function element(tag, className, textContent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent !== undefined) node.textContent = textContent;
  return node;
}
function button(label, handler) {
  const node = element('button','wbr-small-button',label);
  node.type = 'button'; node.addEventListener('click', handler); return node;
}
function field(label, tag, value, onInput, attrs = {}) {
  const wrapper = element('label'); wrapper.append(element('span',null,label));
  const input = element(tag); input.value = value;
  for (const [key, val] of Object.entries(attrs)) input.setAttribute(key, val);
  input.addEventListener('input', () => { onInput(input.value); changed(); });
  wrapper.append(input); return wrapper;
}
function empty(container, text) { container.replaceChildren(element('p','wbr-empty',text)); }

function renderTurns() {
  const list = $('wbr-turns'); list.replaceChildren();
  $('wbr-turn-count').textContent = `${state.archive.turns.length}턴`;
  if (!state.archive.turns.length) { empty(list,'기록된 턴이 없습니다. “턴 추가”로 시작하세요.'); return; }
  state.archive.turns.forEach((turn, index) => {
    const item = element('article','wbr-item');
    const head = element('div','wbr-item__head'); head.append(element('strong',null,`${index + 1}번째 턴`));
    const actions = element('div','wbr-item__actions');
    if (index > 0) actions.append(button('↑ 위로', () => move(state.archive.turns,index,-1,renderTurns)));
    if (index < state.archive.turns.length - 1) actions.append(button('↓ 아래로', () => move(state.archive.turns,index,1,renderTurns)));
    if (turn.role === 'user') actions.append(button('프롬프트로 보관', () => {
      state.archive.prompts.push({id:crypto.randomUUID(), title:`선별 프롬프트 ${state.archive.prompts.length + 1}`, content:turn.content, source_turn_id:turn.id});
      changed(); renderPrompts(); message('선택한 사용자 턴을 프롬프트 목록에 복사했습니다. 제목과 내용을 확인해 주세요.');
    }));
    actions.append(button('삭제', () => {
      if (!confirm(`${index + 1}번째 턴을 삭제할까요?`)) return;
      state.archive.turns.splice(index,1);
      for (const prompt of state.archive.prompts) if (prompt.source_turn_id === turn.id) prompt.source_turn_id = null;
      changed(); renderTurns(); renderPrompts();
    })); head.append(actions); item.append(head);
    const role = element('label'); role.append(element('span',null,'화자'));
    const select = element('select');
    for (const value of TURN_ROLES) { const option = element('option',null,roleLabels[value]); option.value = value; select.append(option); }
    select.value = turn.role;
    select.addEventListener('change', () => { turn.role = select.value; changed(); renderTurns(); });
    role.append(select); item.append(role);
    item.append(field('발화 전문','textarea',turn.content,value => { turn.content = value; },{'aria-label':`${index + 1}번째 턴 전문`}));
    list.append(item);
  });
}
function renderPrompts() {
  const list = $('wbr-prompts'); list.replaceChildren();
  $('wbr-prompt-count').textContent = `${state.archive.prompts.length}개`;
  if (!state.archive.prompts.length) { empty(list,'선별한 프롬프트가 없습니다. 직접 추가하거나 사용자 턴에서 골라 보관하세요.'); return; }
  state.archive.prompts.forEach((prompt, index) => {
    const item = element('article','wbr-item');
    const head = element('div','wbr-item__head'); head.append(element('strong',null,`프롬프트 ${index + 1}`));
    const actions = element('div','wbr-item__actions');
    actions.append(button('복사', async () => { try { await navigator.clipboard.writeText(prompt.content); message('프롬프트 내용을 복사했습니다.'); } catch { message('복사할 수 없습니다. 내용을 직접 선택해 주세요.',true); } }));
    actions.append(button('삭제', () => { if (!confirm(`“${prompt.title || '제목 없음'}” 프롬프트를 삭제할까요?`)) return; state.archive.prompts.splice(index,1); changed(); renderPrompts(); }));
    head.append(actions); item.append(head);
    item.append(field('이름','input',prompt.title,value => { prompt.title = value; },{maxlength:'160'}));
    item.append(field('프롬프트 전문','textarea',prompt.content,value => { prompt.content = value; }));
    if (prompt.source_turn_id) {
      const number = state.archive.turns.findIndex(turn => turn.id === prompt.source_turn_id) + 1;
      item.append(element('p','wbr-source',`출처: ${number}번째 대화 턴`));
    }
    list.append(item);
  });
}
function move(items, index, direction, render) {
  [items[index],items[index + direction]] = [items[index + direction],items[index]];
  changed(); render();
}
function render() {
  $('wbr-title').value = state.archive.title;
  $('wbr-project').value = state.archive.project;
  renderTurns(); renderPrompts();
}

$('wbr-title').addEventListener('input', event => { state.archive.title = event.target.value; changed(); });
$('wbr-project').addEventListener('input', event => { state.archive.project = event.target.value; changed(); });
$('wbr-add-turn').addEventListener('click', () => { state.archive.turns.push({id:crypto.randomUUID(),role:'user',content:''}); changed(); renderTurns(); $('wbr-turns').lastElementChild.querySelector('textarea').focus(); });
$('wbr-add-prompt').addEventListener('click', () => { state.archive.prompts.push({id:crypto.randomUUID(),title:'',content:'',source_turn_id:null}); changed(); renderPrompts(); $('wbr-prompts').lastElementChild.querySelector('input').focus(); });
$('wbr-reset').addEventListener('click', () => {
  if (state.dirty && !confirm('저장하지 않은 변경 사항을 버리고 새 기록을 시작할까요?')) return;
  state.archive = createArchive(); state.dirty = false; render(); message('새 기록을 시작했습니다. 이 화면의 내용은 아직 파일로 저장되지 않았습니다.');
});
$('wbr-import').addEventListener('change', async event => {
  const file = event.target.files?.[0]; event.target.value = '';
  if (!file) return;
  if (state.dirty && !confirm('현재의 저장하지 않은 변경 사항을 버리고 파일을 불러올까요?')) return;
  try {
    if (file.size > MAX_ARCHIVE_BYTES) throw new Error('20 MiB 이하의 JSON 파일을 선택해 주세요.');
    state.archive = parseArchive(await file.text()); state.dirty = false; render();
    message(`“${state.archive.title || '제목 없음'}” 기록을 불러왔습니다. ${state.archive.turns.length}턴, 프롬프트 ${state.archive.prompts.length}개.`);
  } catch (error) { message(`불러오기 실패: ${error.message}`,true); }
});
$('wbr-export').addEventListener('click', () => {
  try {
    const content = serializeArchive(state.archive);
    state.archive.updated_at = JSON.parse(content).updated_at;
    const name = state.archive.title.normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'').slice(0,60) || 'conversation';
    const url = URL.createObjectURL(new Blob([content],{type:'application/json;charset=utf-8'}));
    const link = element('a'); link.href = url; link.download = `${name}.json`; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url),5000);
    state.dirty = false; message('JSON 다운로드를 요청했습니다. 실제 저장된 파일을 확인한 뒤 페이지를 닫아 주세요.');
  } catch (error) { message(`저장 실패: ${error.message}`,true); }
});
window.addEventListener('beforeunload', event => { if (state.dirty) { event.preventDefault(); event.returnValue = ''; } });
render();
