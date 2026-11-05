import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, load, validate, ready, packet, transition, mutate, report } from './workbench.mjs';
import { invocation, verifyResult } from './workbench-agent-review.mjs';

const now = new Date('2026-11-02T03:00:00Z');
function fixture() {
  const d = load(); d.events = []; d.projects = [d.projects[0]]; d.projects[0].reference_ids = [];
  const base = { project_id:d.projects[0].id, description:'Synthetic test only', role:'builder', status:'ready', acceptance:['Pass a real check'], depends_on:[], attempts:0, owner:null, lease_until:null, evidence:[], reviewed_by:null, blocked_reason:null };
  d.tasks = [{...structuredClone(base),id:'first',title:'First'}, {...structuredClone(base),id:'second',title:'Second',depends_on:['first']}]; return d;
}
test('published state validates; handoff includes exact scope, references and revision', () => {
  const d = validate(load()); const p = packet(d, d.tasks[0].id, 'reviewer'); assert.equal(p.revision, d.revision); assert.equal(p.role,'reviewer'); assert.deepEqual(p.project.policy,d.projects[0].policy); assert.ok(p.reading_order.includes('AGENTS.md'));
});
test('dependency, duplicate and cycle failures cannot enter persistent state', () => {
  const d = fixture(); d.tasks[0].depends_on = ['second']; assert.throws(() => validate(d), /cycle/);
  d.tasks[0].depends_on = ['missing']; assert.throws(() => validate(d), /dependency/);
  d.tasks[0].depends_on = []; d.tasks[1].id = 'first'; assert.throws(() => validate(d), /duplicate/);
});
test('dependent task becomes available only after evidence and separate review', () => {
  let d = fixture(); assert.deepEqual(ready(d).map(t => t.id), ['first']);
  assert.throws(() => transition(d,'claim',{task:'second',actor:'builder'},now), /not ready/);
  d = transition(d,'claim',{task:'first',actor:'builder'},now);
  assert.throws(() => transition(d,'submit',{task:'first',actor:'other',summary:'check',ref:'test'},now), /claim/);
  assert.throws(() => transition(d,'submit',{task:'first',actor:'builder'},now), /Evidence/);
  d = transition(d,'submit',{task:'first',actor:'builder',summary:'Check passed',ref:'synthetic-check'},now);
  assert.throws(() => transition(d,'accept',{task:'first',actor:'builder',summary:'yes',ref:'check'},now), /Separate/);
  d = transition(d,'accept',{task:'first',actor:'reviewer',summary:'Reviewed actual result',ref:'synthetic-review'},now);
  assert.deepEqual(ready(d).map(t => t.id), ['second']); assert.equal(d.events.length,3);
});
test('expired claims require explicit retry, cancelled tasks do not restart', () => {
  let d = transition(fixture(),'claim',{task:'first',actor:'builder',minutes:1},now); const later = new Date(+now+120000);
  assert.deepEqual(report(d,later).expired,['first']);
  assert.throws(() => transition(d,'submit',{task:'first',actor:'builder',summary:'late',ref:'check'},later),/claim/);
  d = transition(d,'retry',{task:'first',actor:'coordinator',reason:'Recover expired worker'},later);
  d = transition(d,'cancel',{task:'first',actor:'coordinator',reason:'Owner cancelled'},later);
  assert.equal(ready(d).length,0); assert.throws(() => transition(d,'retry',{task:'first',actor:'coordinator',reason:'resume'},later),/Only/);
});
test('attempt budget and proposal-only policy stop further execution', () => {
  const d = fixture(); d.tasks[0].attempts = d.projects[0].policy.max_attempts; assert.equal(ready(d).length,0);
  assert.throws(() => transition(d,'claim',{task:'first',actor:'builder'},now),/not ready/);
  d.tasks[0].attempts = 0; d.projects[0].policy.execution = 'proposal_only'; assert.throws(() => transition(d,'claim',{task:'first',actor:'builder'},now),/proposal-only/);
});
test('revision mismatch, failed mutation and competing writer preserve original bytes', () => {
  const base = path.join(ROOT,'_workbench_test_tmp'); fs.mkdirSync(base,{recursive:true});
  const dir = fs.mkdtempSync(path.join(base,'test-')); const file = path.join(dir,'state.json'); const text = JSON.stringify(fixture()); fs.writeFileSync(file,text);
  try {
    assert.throws(() => mutate(file,999,d => d),/Revision/); assert.equal(fs.readFileSync(file,'utf8'),text);
    assert.throws(() => mutate(file,fixture().revision,d => { d.tasks[0].depends_on=['missing']; return d; }),/dependency/); assert.equal(fs.readFileSync(file,'utf8'),text);
    fs.writeFileSync(file+'.write-lock',''); assert.throws(() => mutate(file,fixture().revision,d=>d),/Another/); fs.unlinkSync(file+'.write-lock');
    const saved = mutate(file,fixture().revision,d=>transition(d,'claim',{task:'first',actor:'one'},now)); assert.equal(load(file).revision,saved.revision);
    assert.throws(() => mutate(file,fixture().revision,d=>d),/Revision/);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
test('agent adapter fixes read-only scope and validates structured evidence', () => {
  const spec=invocation('reviewer',packet(load(),load().tasks[0].id),'schema.json','result.json');
  assert.ok(spec.args.includes('read-only')); assert.ok(spec.args.includes('--ephemeral')); assert.ok(spec.args.includes('--ignore-user-config'));
  assert.ok(!spec.args.includes('danger-full-access')); assert.ok(spec.prompt.includes('cannot mark a task complete'));
  assert.throws(()=>verifyResult({assessment:'pass',summary:'okay',findings:[{severity:'high',detail:'bad',evidence_ref:''}],next_step:'check'}),/Invalid/);
  assert.equal(verifyResult({assessment:'insufficient_evidence',summary:'Not run',findings:[],next_step:'Run UI check'}).assessment,'insufficient_evidence');
});
test('unverified repository revisions and unsupported completion evidence are rejected', () => {
  const d = load(); d.references[0].revision = 'main'; assert.throws(() => validate(d),/full SHA/);
  const f = fixture(); f.tasks[0].status='complete'; assert.throws(() => validate(f),/evidence/);
});
test('project media must use existing public assets with complete accessible metadata', () => {
  const data = load(); validate(data);
  data.projects[0].media[0].src = '/assets/images/../../private.png';
  assert.throws(() => validate(data), /existing local public asset/);
  data.projects[0].media[0].src = '/assets/images/home-garden.webp';
  data.projects[0].media[1].poster = '/assets/images/missing.jpg';
  assert.throws(() => validate(data), /type\/poster/);
});
test('CLI imports projects and deduplicates input events across coordinator restarts', () => {
  const base=path.join(ROOT,'_workbench_test_tmp'); fs.mkdirSync(base,{recursive:true}); const dir=fs.mkdtempSync(path.join(base,'cli-'));
  const file=path.join(dir,'state.json'), input=path.join(dir,'addition.json'); fs.writeFileSync(file,JSON.stringify(fixture()));
  const run=(command,...args)=>JSON.parse(execFileSync(process.execPath,[path.join(ROOT,'scripts/workbench.mjs'),command,'--file',file,...args],{encoding:'utf8'}));
  try {
    const project=structuredClone(fixture().projects[0]); project.id='another-project';
    fs.writeFileSync(input,JSON.stringify({projects:[project],tasks:[],references:[]}));
    const imported=run('import','--input',input,'--revision',String(fixture().revision)); assert.equal(imported.saved,true); assert.equal(load(file).projects.length,2);
    const first=run('event','--id','material-arrived','--project',project.id,'--summary','Synthetic material received','--revision',String(imported.revision));
    const second=run('event','--id','material-arrived','--project',project.id,'--summary','Synthetic material received','--revision',String(first.revision));
    assert.equal(second.duplicate,true); assert.equal(second.revision,first.revision); assert.equal(load(file).events.filter(e=>e.id==='material-arrived').length,1);
    assert.equal(run('status').revision,first.revision);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});
