(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else api.init(document, window);
}(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  var DAY = 86400000, PATH = '/daily-visits/';
  function koreanDay(now) {
    return new Date(new Date(now).getTime() + 9 * 3600000).toISOString().slice(0, 10);
  }
  function validDay(day) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day || '')) return false;
    var date = new Date(day + 'T00:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === day;
  }
  function dayList(now, count) {
    var length = count || 7, last = Date.parse(koreanDay(now) + 'T00:00:00Z');
    return Array.from({length: length}, function (_, i) { return new Date(last - (length - 1 - i) * DAY).toISOString().slice(0, 10); });
  }
  function validCode(code) { return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(code || ''); }
  function counterUrl(code, day) {
    if (!validCode(code) || !validDay(day)) throw new Error('Invalid public counter configuration');
    return 'https://' + code + '.goatcounter.com/counter/' + encodeURIComponent(PATH + day) + '.json';
  }
  function parseCount(value) {
    if (typeof value === 'number') { if (Number.isSafeInteger(value) && value >= 0) return value; throw new Error('Invalid count'); }
    var text = String(value == null ? '' : value).trim().replace(/[\u00a0\u202f]/g, ' ');
    if (!/^\d+$/.test(text) && !/^\d{1,3}(?:[, .]\d{3})+$/.test(text)) throw new Error('Invalid count');
    var number = Number(text.replace(/[, .]/g, ''));
    if (!Number.isSafeInteger(number) || number < 0) throw new Error('Invalid count');
    return number;
  }
  function privacyOptOut(nav) { return nav.globalPrivacyControl === true || ['1', 'yes'].indexOf(String(nav.doNotTrack || '').toLowerCase()) !== -1; }
  function canTrack(win) { return win.location.hostname === 'cbh456746.github.io' && !win.navigator.webdriver && !privacyOptOut(win.navigator); }
  function formatted(value) { return value === null ? '—' : new Intl.NumberFormat('ko-KR').format(value); }
  function paint(doc, widget, days, counts) {
    var max = Math.max.apply(null, [1].concat(counts.filter(function (n) { return n !== null; })));
    widget.querySelector('[data-visitor-today]').textContent = formatted(counts[6]);
    widget.querySelector('[data-visitor-yesterday]').textContent = formatted(counts[5]);
    var chart = widget.querySelector('[data-visitor-chart]'); chart.replaceChildren();
    days.forEach(function (day, i) {
      var li = doc.createElement('li'), value = doc.createElement('span'), track = doc.createElement('span'), bar = doc.createElement('span'), time = doc.createElement('time');
      value.className = 'visitor-chart__value'; value.textContent = formatted(counts[i]);
      track.className = 'visitor-chart__track'; track.setAttribute('aria-hidden', 'true');
      bar.className = 'visitor-chart__bar' + (i === 6 ? ' is-today' : '') + (counts[i] === null ? ' is-missing' : '');
      if (counts[i] !== null) bar.style.height = Math.max(1, Math.round(counts[i] / max * 68)) + 'px';
      time.dateTime = day; time.textContent = day.slice(5).replace('-', '/');
      li.setAttribute('aria-label', day + ' ' + (counts[i] === null ? '집계 없음' : counts[i] + '회 방문'));
      track.appendChild(bar); li.append(value, track, time); chart.appendChild(li);
    });
  }
  async function readDay(win, code, day) {
    var controller = new win.AbortController(), timer = win.setTimeout(function () { controller.abort(); }, 8000);
    try {
      var response = await win.fetch(counterUrl(code, day), {signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'});
      // GoatCounter documents an explicit JSON zero for a path with no visits.
      if (!response.ok && response.status !== 404) throw new Error('Counter unavailable');
      if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Counter unavailable');
      var data = await response.json(), count = parseCount(data.count);
      if (response.status === 404 && count !== 0) throw new Error('Invalid counter response');
      return count;
    } finally { win.clearTimeout(timer); }
  }
  function startTracking(doc, win, code) {
    if (!canTrack(win)) return;
    var script = doc.createElement('script'); script.src = 'https://gc.zgo.at/count.v5.js'; script.async = true;
    script.crossOrigin = 'anonymous'; script.integrity = 'sha384-atnOLvQb9t+jTSipvd75X2yginT4PjVbqDdlJAmxMm+wYElFmeR6EmLP5bYeoRVQ';
    script.dataset.goatcounter = 'https://' + code + '.goatcounter.com/count';
    // One day bucket across the whole blog: no page title, URL query or referrer.
    script.dataset.goatcounterSettings = JSON.stringify({no_onload:true,no_events:true});
    script.onload = function () {
      if (!win.goatcounter || typeof win.goatcounter.count !== 'function') return;
      // The pinned provider adds q=location.search and screen size by default.
      // Override its packet builder before the first count; never send either.
      var providerData = win.goatcounter.get_data;
      win.goatcounter.get_data = function () { return {p:PATH+koreanDay(new Date()),t:'Daily blog visits',r:'',e:false,b:providerData({}).b}; };
      win.goatcounter.count({});
    };
    doc.head.appendChild(script);
  }
  async function init(doc, win) {
    var loader = doc.querySelector('script[data-visits-enabled]'); if (!loader) return;
    var widget = doc.querySelector('[data-visitor-widget]'), code = loader.dataset.visitsCode, start = loader.dataset.visitsStart;
    var enabled = loader.dataset.visitsEnabled === 'true', ready = enabled && validCode(code) && validDay(start);
    var days = dayList(new Date(), 7), counts = days.map(function () { return null; });
    if (widget) paint(doc, widget, days, counts);
    if (!ready) return;
    if (privacyOptOut(win.navigator)) {
      if (widget) widget.querySelector('[data-visitor-state]').textContent = '브라우저의 추적 차단 설정을 존중하여 통계 요청을 생략했습니다.';
      return;
    }
    startTracking(doc, win, code); if (!widget) return;
    var status = widget.querySelector('[data-visitor-state]'), generation = 0, shownDay, midnightTimer;
    async function refresh() {
      var request = ++generation, date = new Date(), currentDays = dayList(date, 7), currentCounts = currentDays.map(function () { return null; }), failed = 0;
      shownDay = koreanDay(date); paint(doc, widget, currentDays, currentCounts);
      status.textContent = '방문 기록을 불러오는 중입니다.';
      await Promise.all(currentDays.map(async function (day, i) {
        if (day < start) return;
        try { currentCounts[i] = await readDay(win, code, day); } catch (_) { failed += 1; }
      }));
      if (request !== generation) return;
      paint(doc, widget, currentDays, currentCounts);
      status.textContent = failed ? '일부 방문 기록을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.' : '일별 기록 · 집계 시작 ' + start.replace(/-/g,'.');
    }
    function scheduleMidnight() {
      win.clearTimeout(midnightTimer);
      var now = new Date(), next = Date.parse(koreanDay(now) + 'T00:00:00Z') - 9 * 3600000 + DAY;
      midnightTimer = win.setTimeout(function () { void refresh(); scheduleMidnight(); }, Math.max(1000, next - now.getTime() + 100));
    }
    doc.addEventListener('visibilitychange', function () { if (!doc.hidden && koreanDay(new Date()) !== shownDay) void refresh(); });
    win.addEventListener('pagehide', function () { win.clearTimeout(midnightTimer); });
    win.addEventListener('pageshow', function () { scheduleMidnight(); if (shownDay && koreanDay(new Date()) !== shownDay) void refresh(); });
    scheduleMidnight(); await refresh();
  }
  return {koreanDay:koreanDay,validDay:validDay,dayList:dayList,validCode:validCode,counterUrl:counterUrl,parseCount:parseCount,privacyOptOut:privacyOptOut,canTrack:canTrack,readDay:readDay,init:init};
}));
