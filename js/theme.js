(() => {
  const root = document.documentElement;
  const storageKey = 'blog-color-theme-v1';
  let theme = 'light';

  try {
    if (localStorage.getItem(storageKey) === 'dark') theme = 'dark';
  } catch {
    // The toggle still works for this page when browser storage is unavailable.
  }

  root.dataset.theme = theme;
  root.classList.add('has-theme-toggle');

  function updateControls() {
    const dark = root.dataset.theme === 'dark';
    const label = dark ? '라이트 모드로 전환' : '다크 모드로 전환';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.setAttribute('aria-label', label);
      button.setAttribute('aria-pressed', String(dark));
      button.title = label;
    });
    const browserColor = document.querySelector('meta[name="theme-color"]');
    if (browserColor) browserColor.content = dark ? '#151917' : '#fbfaf7';
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateControls();
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        try { localStorage.setItem(storageKey, next); } catch { /* Page-only preference. */ }
        updateControls();
        document.dispatchEvent(new CustomEvent('site-themechange', { detail: { theme: next } }));
      });
    });
  });
})();
