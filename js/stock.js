(() => {
  const root = document.querySelector('[data-stock-root]');
  if (!root) return;

  const links = [...root.querySelectorAll('[data-stock-select]')];
  const panels = [...root.querySelectorAll('[data-stock-panel]')];
  if (!links.length || !panels.length) return;
  const allowed = new Set(links.map((link) => link.dataset.stockSelect));
  let active = null;

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
      timezone: 'America/New_York',
      theme: 'light',
      style: '1',
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
    const symbol = new URLSearchParams(location.search).get('symbol');
    select(allowed.has(symbol) ? symbol : links[0].dataset.stockSelect);
  });

  const requested = new URLSearchParams(location.search).get('symbol');
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
    const list = root.querySelector('.stock-stars');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        loadQuote(entry.target);
        observer.unobserve(entry.target);
      }
    }, { root: list, rootMargin: '160px 0px' });
    quoteHosts.forEach((host) => observer.observe(host));
  } else quoteHosts.forEach(loadQuote);
})();
