(() => {
  const root = document.querySelector('[data-stock-root]');
  if (!root) return;

  const links = [...root.querySelectorAll('[data-stock-select]')];
  const panels = [...root.querySelectorAll('[data-stock-panel]')];
  if (!links.length || !panels.length) return;
  const allowed = new Set(links.map((link) => link.dataset.stockSelect));
  const symbolAliases = new Map([['NASDAQ:KHC', 'NYSE:KHC']]);
  const currentSymbol = (symbol) => symbolAliases.get(symbol) || symbol;
  let active = null;

  const list = root.querySelector('.stock-stars');
  const searchInput = root.querySelector('[data-stock-search]');
  const searchStatus = root.querySelector('[data-stock-search-status]');
  const sortMode = root.querySelector('[data-stock-sort-mode]');
  const orderButton = root.querySelector('[data-stock-order-toggle]');
  const resetButton = root.querySelector('[data-stock-order-reset]');
  const orderHelp = root.querySelector('[data-stock-order-help]');
  if (list && searchInput && searchStatus && sortMode && orderButton && resetButton && orderHelp) {
    const storageKey = 'stock-stars-order-v1';
    const sourceItems = [...list.children];
    const bySymbol = new Map(sourceItems.map((item) => [item.dataset.stockItem, item]));
    const collator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });
    let customItems = [...sourceItems];
    let editing = false;
    let canStore = true;

    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (Array.isArray(saved)) {
        const seen = new Set();
        const reordered = saved.map((storedSymbol) => {
          const symbol = currentSymbol(storedSymbol);
          if (seen.has(symbol)) return null;
          seen.add(symbol);
          return bySymbol.get(symbol);
        }).filter(Boolean);
        customItems = [...reordered, ...sourceItems.filter((item) => !seen.has(item.dataset.stockItem))];
        sortMode.value = 'custom';
      }
    } catch {
      canStore = false;
    }

    function applySort(mode) {
      const items = mode === 'custom' ? [...customItems] : [...sourceItems];
      if (mode === 'name-asc' || mode === 'name-desc') {
        const direction = mode === 'name-asc' ? 1 : -1;
        items.sort((a, b) => direction * collator.compare(
          a.querySelector('.stock-star__name').textContent,
          b.querySelector('.stock-star__name').textContent
        ));
      }
      list.append(...items);
      if (editing) updateMoveButtons();
      list.scrollTop = 0;
    }

    function saveOrder() {
      customItems = [...list.children];
      try {
        localStorage.setItem(storageKey, JSON.stringify(customItems.map((item) => item.dataset.stockItem)));
      } catch {
        canStore = false;
        orderHelp.textContent = '브라우저 저장을 사용할 수 없어 현재 화면에만 순서가 적용됩니다.';
      }
    }

    function updateMoveButtons() {
      const items = [...list.children];
      items.forEach((item, index) => {
        item.querySelector('[data-stock-move="up"]').disabled = index === 0;
        item.querySelector('[data-stock-move="down"]').disabled = index === items.length - 1;
        item.querySelector('[data-stock-move="bottom"]').disabled = index === items.length - 1;
      });
    }

    function setEditing(value) {
      editing = value;
      if (value) {
        sortMode.value = 'custom';
        applySort('custom');
      }
      orderButton.setAttribute('aria-pressed', String(value));
      orderButton.textContent = value ? '편집 완료' : '순서 편집';
      resetButton.hidden = !value;
      orderHelp.hidden = !value;
      for (const item of list.children) item.querySelector('.stock-star__move').hidden = !value;
      if (value) updateMoveButtons();
    }

    applySort(sortMode.value);
    sortMode.addEventListener('change', () => {
      if (editing) setEditing(false);
      applySort(sortMode.value);
    });
    orderButton.addEventListener('click', () => setEditing(!editing));
    resetButton.addEventListener('click', () => {
      customItems = [...sourceItems];
      try { localStorage.removeItem(storageKey); } catch { canStore = false; }
      setEditing(false);
      sortMode.value = 'default';
      applySort('default');
    });
    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-stock-move]');
      if (!editing || !button || button.disabled) return;
      const item = button.closest('[data-stock-item]');
      const direction = button.dataset.stockMove;
      if (direction === 'bottom') list.append(item);
      else {
        const neighbor = direction === 'up' ? item.previousElementSibling : item.nextElementSibling;
        if (!neighbor) return;
        if (direction === 'up') list.insertBefore(item, neighbor);
        else list.insertBefore(item, neighbor.nextElementSibling);
      }
      saveOrder();
      updateMoveButtons();
      const nextFocus = button.disabled ? [...item.querySelectorAll('[data-stock-move]')].find((candidate) => !candidate.disabled) : button;
      nextFocus?.focus();
    });
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLocaleLowerCase();
      if (query && editing) setEditing(false);
      orderButton.disabled = Boolean(query);
      let shown = 0;
      for (const item of list.children) {
        const name = item.querySelector('.stock-star__name').textContent;
        const ticker = item.querySelector('.stock-star__ticker').textContent;
        const searchable = `${name} ${ticker} ${item.dataset.stockItem}`.toLocaleLowerCase();
        item.hidden = !searchable.includes(query);
        if (!item.hidden) shown += 1;
      }
      searchStatus.hidden = !query;
      searchStatus.textContent = shown ? `${shown}개 종목 표시 · 순서를 바꾸려면 검색어를 지우세요.` : '검색 결과가 없습니다.';
      list.scrollTop = 0;
    });
    if (!canStore) orderHelp.textContent = '브라우저 저장을 사용할 수 없어 현재 화면에만 순서가 적용됩니다.';
  }

  // The owner-curated YAML is the sole symbol allowlist. Never render a URL query as widget code.
  function embed(host, source, settings, fallback) {
    const container = document.createElement('div');
    container.className = 'tradingview-widget-container';
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    container.append(widget);
    const script = document.createElement('script');
    script.src = source;
    script.async = true;
    script.textContent = JSON.stringify(settings);
    script.addEventListener('error', () => {
      host.replaceChildren(document.createTextNode(fallback));
    }, { once: true });
    host.replaceChildren(container);
    container.append(script);
  }

  function renderChart(panel) {
    const host = panel.querySelector('[data-stock-chart]');
    if (!host) return;
    embed(host, 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js', {
      symbol: panel.dataset.stockPanel,
      interval: 'D',
      range: '12M',
      timezone: 'America/New_York',
      theme: 'light',
      style: '3',
      locale: 'en',
      autosize: true,
      allow_symbol_change: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      details: false,
      hotlist: false,
      calendar: false,
      withdateranges: true,
      backgroundColor: '#ffffff',
      gridColor: 'rgba(35, 53, 48, 0.06)'
    }, '차트를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }

  function select(symbol, updateUrl = false) {
    if (!allowed.has(symbol) || symbol === active) return;
    if (active) {
      const previous = panels.find((panel) => panel.dataset.stockPanel === active);
      if (previous) {
        previous.hidden = true;
        const oldChart = previous.querySelector('[data-stock-chart]');
        if (oldChart) oldChart.replaceChildren();
      }
    }
    active = symbol;
    for (const panel of panels) panel.hidden = panel.dataset.stockPanel !== symbol;
    for (const link of links) {
      if (link.dataset.stockSelect === symbol) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    const panel = panels.find((item) => item.dataset.stockPanel === symbol);
    if (panel) renderChart(panel);
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('symbol', symbol);
      history.pushState({ symbol }, '', url);
    }
  }

  links.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    select(link.dataset.stockSelect, true);
    if (window.matchMedia('(max-width: 760px)').matches) {
      root.querySelector('.stock-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));
  window.addEventListener('popstate', () => {
    const symbol = currentSymbol(new URLSearchParams(location.search).get('symbol'));
    select(allowed.has(symbol) ? symbol : links[0].dataset.stockSelect);
  });

  const requested = currentSymbol(new URLSearchParams(location.search).get('symbol'));
  select(allowed.has(requested) ? requested : links[0].dataset.stockSelect);

  const quoteHosts = [...root.querySelectorAll('[data-stock-quote]')];
  function loadQuote(host) {
    if (host.dataset.loaded) return;
    host.dataset.loaded = 'true';
    embed(host, 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js', {
      symbol: host.dataset.stockQuote,
      width: '100%',
      colorTheme: 'light',
      isTransparent: true,
      locale: 'en'
    }, '시세를 불러오지 못했습니다.');
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        loadQuote(entry.target);
        observer.unobserve(entry.target);
      }
    }, { root: list, rootMargin: '160px 0px' });
    quoteHosts.forEach((host) => observer.observe(host));
  } else quoteHosts.forEach(loadQuote);
})();
