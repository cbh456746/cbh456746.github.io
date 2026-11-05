(() => {
  'use strict';
  const root = document.querySelector('[data-workbench]'); if (!root) return;
  const $ = id => document.getElementById(id);
  const labels = { planned:'계획', ready:'진행 가능', active:'작업 중', review:'검토 대기', blocked:'진행 보류', complete:'완료', cancelled:'취소' };
  const roles = { coordinator:'조정', researcher:'조사', builder:'구현', reviewer:'검토' };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeMediaPath = value => typeof value === 'string' && /^\/assets\/(?:images|videos)\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpe?g|svg|mp4|webm)$/.test(value);
  let data, view = 'board', selected;
  const project = () => data.projects.find(p => p.id === $('wb-project').value) ?? data.projects[0];
  const tasks = () => data.tasks.filter(t => t.project_id === project().id);
  function available(t) { return ['planned','ready'].includes(t.status) && project().status === 'active' && t.attempts < project().policy.max_attempts && t.depends_on.every(id => data.tasks.find(x => x.id === id)?.status === 'complete'); }
  function card(t) { const dependencies = t.depends_on.map(id => data.tasks.find(x => x.id === id)); return `<button type="button" class="wb-card" data-task="${esc(t.id)}" aria-pressed="${selected === t.id}"><span class="wb-state" data-state="${esc(t.status)}">${esc(labels[t.status])}${available(t) ? ' · 바로 이어갈 수 있어요' : ''}</span><strong>${esc(t.title)}</strong><span class="wb-caption">${esc(roles[t.role])} · ${esc(t.id)}</span>${view === 'flow' ? `<span class="wb-dependency">${dependencies.length ? '← ' + dependencies.map(d => esc(d.title)).join(' · ') : '시작 작업'}</span>` : ''}</button>`; }
  function detail(t) {
    if (!t) { $('wb-detail').innerHTML = ''; return; }
    $('wb-detail').innerHTML = `<div class="wb-detail"><span class="wb-state" data-state="${esc(t.status)}">${esc(labels[t.status])}</span><h2>${esc(t.title)}</h2><p>${esc(t.description)}</p><h3>완료 기준</h3><ul>${t.acceptance.map(a => `<li>${esc(a)}</li>`).join('')}</ul><h3>선행 작업</h3><p>${t.depends_on.length ? t.depends_on.map(id => esc(data.tasks.find(x => x.id === id).title)).join('<br>') : '선행 작업 없이 시작할 수 있습니다.'}</p>${t.blocked_reason ? `<h3>진행을 기다리는 이유</h3><p>${esc(t.blocked_reason)}</p>` : ''}<h3>확인한 근거</h3>${t.evidence.length ? `<ul>${t.evidence.map(e => `<li>${esc(e.summary)}<br><span class="wb-caption">${esc(e.checked_on)} · ${esc(e.ref)}</span></li>`).join('')}</ul>` : '<p>아직 등록된 검증 근거가 없습니다.</p>'}<p class="wb-caption">시도 ${t.attempts}/${project().policy.max_attempts}${t.owner ? ' · 담당 ' + esc(t.owner) : ''}</p><button type="button" class="wb-action" id="wb-copy">에이전트 작업 지침 복사</button><button type="button" class="wb-action" id="wb-download">인수인계 JSON 받기</button><p class="wb-caption">현재 목표·완료 조건·근거·참고 자료를 함께 전달합니다.</p></div>`;
    $('wb-copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText(JSON.stringify(handoff(t), null, 2)); $('wb-message').textContent = '선택한 작업의 인수인계 내용을 복사했습니다.'; } catch { $('wb-message').textContent = '복사 권한을 사용할 수 없습니다. 인수인계 JSON을 내려받아 주세요.'; } });
    $('wb-download').addEventListener('click', () => { const url = URL.createObjectURL(new Blob([JSON.stringify(handoff(t), null, 2)], {type:'application/json'})); const a = document.createElement('a'); a.href = url; a.download = `${t.id}-handoff.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
  }
  function handoff(t) { const p = project(); return { schema_version:1, revision:data.revision, project:p, task:t, references:data.references.filter(r => p.reference_ids.includes(r.id)), reading_order:['AGENTS.md','docs/BLOG_OPERATIONS_HANDOFF.md','docs/PROJECT_WORKFLOW.md','DECISIONS.md','TASKS.md'], instructions:'Restore current state from the repository. Respect scope and publication policy. Read relevant sources only. Submit evidence for a separate reviewer; coordinator integrates shared files.' }; }
  function render() {
    const p = project(), list = tasks(); if (!list.some(t => t.id === selected)) selected = list.find(available)?.id ?? list[0]?.id;
    const complete = list.filter(t => t.status === 'complete').length;
    $('wb-project-summary').innerHTML = `<section class="wb-summary"><div><h2>${esc(p.title)}</h2><p>${esc(p.goal)}</p><div class="wb-counts"><span>완료 ${complete}/${list.length}개 작업</span><span>진행 가능 ${list.filter(available).length}</span><span>보류 ${list.filter(t => t.status === 'blocked').length}</span></div></div><div class="wb-next"><span class="wb-caption">다음으로 이어갈 일</span><p>${esc(p.next_step)}</p><span class="wb-caption">기록 갱신 ${esc(p.updated_on)}</span></div></section>`;
    const media = (p.media ?? []).filter(m => safeMediaPath(m.src) && (m.kind === 'image' || (m.kind === 'video' && safeMediaPath(m.poster))));
    root.querySelector('.wb-media-section').hidden = media.length === 0;
    $('wb-media').innerHTML = media.map(m => `<figure class="wb-media-card">${m.kind === 'image' ? `<img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async">` : `<video controls preload="none" playsinline poster="${esc(m.poster)}" aria-label="${esc(m.alt)}"><source src="${esc(m.src)}" type="${m.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}">이 브라우저는 영상을 재생할 수 없습니다.</video>`}<figcaption><strong>${esc(m.title)}</strong><span>${esc(m.caption)}</span></figcaption></figure>`).join('');
    if (view === 'references') {
      const refs = data.references.filter(r => p.reference_ids.includes(r.id));
      $('wb-view').innerHTML = refs.length ? refs.map(r => `<article class="wb-reference"><p class="wb-caption">${esc({candidate:'후보',documented:'문서 검토',tested:'실험 검증',adopted:'사용 중',rejected:'제외'}[r.status])} · 확인 ${esc(r.checked_on)}</p><h3><a href="${esc(r.url)}" rel="noopener noreferrer" target="_blank">${esc(r.title)} ↗</a></h3><p>${esc(r.purpose)}</p><p class="wb-caption">${esc(r.limits)}</p><p class="wb-caption">확인 버전: ${esc(r.revision ?? '커밋 고정 전 · 도입 시 재확인')}</p></article>`).join('') : '<p class="wb-empty">연결된 참고 저장소가 없습니다.</p>';
    } else if (view === 'flow') {
      const levels = new Map(); function level(t) { if (levels.has(t.id)) return levels.get(t.id); const n = t.depends_on.length ? Math.max(...t.depends_on.map(id => level(list.find(x => x.id === id)))) + 1 : 0; levels.set(t.id,n); return n; } list.forEach(level);
      $('wb-view').innerHTML = `<div class="wb-flow" aria-label="선행 작업에 따른 흐름">${[...new Set(levels.values())].sort((a,b) => a-b).map(n => `<div><p class="wb-flow-step">${n === 0 ? '시작' : '↓ 연결 단계 ' + n}</p><div class="wb-flow-level">${list.filter(t => levels.get(t.id) === n).map(card).join('')}</div></div>`).join('')}</div>`;
    } else {
      const groups = [['이어갈 작업',['planned','ready']],['진행과 검토',['active','review']],['기다리는 작업',['blocked']],['마친 작업',['complete','cancelled']]];
      $('wb-view').innerHTML = `<div class="wb-board">${groups.map(([name,states]) => { const rows = list.filter(t => states.includes(t.status)); return `<section class="wb-column"><h3>${name} · ${rows.length}</h3>${rows.length ? rows.map(card).join('') : '<p class="wb-empty">등록된 작업이 없습니다.</p>'}</section>`; }).join('')}</div>`;
    }
    root.querySelectorAll('[data-task]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.task; root.querySelectorAll('[data-task]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.task === selected))); detail(list.find(t => t.id === selected)); }));
    detail(list.find(t => t.id === selected));
    $('wb-events').innerHTML = data.events.filter(e => e.project_id === p.id).slice(-8).reverse().map(e => `<li><time datetime="${esc(e.on)}">${esc(e.on)}</time><span>${esc(e.summary)}</span></li>`).join('') || '<li>아직 등록된 변경 기록이 없습니다.</li>';
    $('wb-message').textContent = `${p.title} · 작업 기록 버전 ${data.revision} · ${view === 'board' ? '작업 보드' : view === 'flow' ? '연결 흐름' : '참고 저장소'}`;
  }
  fetch(root.dataset.source, {cache:'no-store'}).then(r => { if (!r.ok) throw new Error('fetch'); return r.json(); }).then(json => { if (json.schema_version !== 1 || json.revision !== Number(root.dataset.revision) || !Array.isArray(json.projects) || !json.projects.length) throw new Error('schema/version'); data = json; const requested = new URLSearchParams(location.search).get('project'); if (data.projects.some(p => p.id === requested)) $('wb-project').value = requested; render(); }).catch(() => { $('wb-message').textContent = '작업 기록을 불러오지 못했거나 배포 버전이 달라졌습니다. 페이지를 다시 열거나 AI용 작업 데이터를 확인해 주세요.'; });
  $('wb-project').addEventListener('change', () => { if (!data) return; const url = new URL(location.href); url.searchParams.set('project', $('wb-project').value); history.replaceState(null, '', url); render(); });
  root.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => { if (!data) return; view = b.dataset.view; root.querySelectorAll('[data-view]').forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); }));
})();
