import {test} from 'node:test';
import assert from 'node:assert/strict';
import stats from '../js/visitor-stats.js';

test('Korean midnight splits day buckets even while UTC date stays the same',()=>{
 assert.equal(stats.koreanDay('2026-10-05T14:59:59Z'),'2026-10-05');
 assert.equal(stats.koreanDay('2026-10-05T15:00:00Z'),'2026-10-06');
 assert.deepEqual(stats.dayList('2027-01-01T00:00:00Z',3),['2026-12-30','2026-12-31','2027-01-01']);
 assert(stats.counterUrl('my-blog','2026-10-06').includes('%2Fdaily-visits%2F2026-10-06.json'));
 assert(!stats.counterUrl('my-blog','2026-10-06').includes('TOTAL'));
});
test('real calendar dates and public site codes reject unexpected URLs or credentials',()=>{
 assert(stats.validDay('2028-02-29'));assert(!stats.validDay('2026-02-29'));assert(!stats.validDay('2026-10-32'));
 assert(stats.validCode('my-blog'));for(const code of ['https://site.test','abc/path','x" onload="','abc@def','-abc'])assert(!stats.validCode(code));
 assert.throws(()=>stats.counterUrl('bad/path','2026-10-06'));
});
test('provider integer formatting preserves actual zero and rejects absent or corrupt counts',()=>{
 for(const value of [1234,'1,234','1.234','1 234','1\u202f234'])assert.equal(stats.parseCount(value.replace?.(/\\u202f/,'\u202f')??value),1234);
 assert.equal(stats.parseCount('0'),0);
 for(const value of [null,undefined,'','NaN','<img src=x>',-1,1.2,'1,23','2.5','9007199254740992'])assert.throws(()=>stats.parseCount(value));
});
test('tracking stays off for preview, automation, and explicit privacy preferences',()=>{
 const win={location:{hostname:'cbh456746.github.io'},navigator:{}};assert(stats.canTrack(win));
 assert(!stats.canTrack({...win,location:{hostname:'localhost'}}));assert(!stats.canTrack({...win,navigator:{webdriver:true}}));
 for(const nav of [{globalPrivacyControl:true},{doNotTrack:'1'},{doNotTrack:'yes'}])assert(stats.privacyOptOut(nav));
});
test('API failures remain unavailable; only explicit provider JSON zero is zero',async()=>{
 const make=(status,payload,type='application/json')=>({ok:status===200,status,headers:new Headers({'content-type':type}),json:async()=>payload});
 let options;const win={AbortController,setTimeout,clearTimeout,fetch:async(url,opts)=>{options=opts;return make(404,{count:'0'});}};
 assert.equal(await stats.readDay(win,'my-blog','2026-10-06'),0);assert.equal(options.credentials,'omit');assert.equal(options.referrerPolicy,'no-referrer');
 win.fetch=async()=>make(403,{count:'0'});await assert.rejects(stats.readDay(win,'my-blog','2026-10-06'));
 win.fetch=async()=>make(404,{},'text/html');await assert.rejects(stats.readDay(win,'my-blog','2026-10-06'));
 win.fetch=async()=>make(200,{count:'broken'});await assert.rejects(stats.readDay(win,'my-blog','2026-10-06'));
});
