(() => {
  'use strict';

  function activate(deck) {
    const slides = Array.from(deck.querySelectorAll('[data-slide]'));
    const controls = deck.querySelector('[data-slide-controls]');
    if (!slides.length || !controls) return;

    const previous = controls.querySelector('[data-slide-prev]');
    const next = controls.querySelector('[data-slide-next]');
    const enlarge = controls.querySelector('[data-slide-enlarge]');
    const count = controls.querySelector('[data-slide-count]');
    const status = deck.querySelector('[data-slide-status]');
    const dialog = deck.querySelector('[data-slide-dialog]');
    const dialogImage = dialog.querySelector('[data-slide-dialog-image]');
    const dialogCaption = dialog.querySelector('[data-slide-dialog-caption]');
    const originalLink = dialog.querySelector('[data-slide-original]');
    const close = dialog.querySelector('[data-slide-close]');
    let index = 0;

    function show(position) {
      const focusedControl = document.activeElement;
      index = Math.max(0, Math.min(position, slides.length - 1));
      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== index; });
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
      count.textContent = `${index + 1} / ${slides.length}`;
      status.textContent = `${index + 1} / ${slides.length} 슬라이드: ${slides[index].querySelector('img').alt}`;
      if (focusedControl === next && next.disabled) previous.focus();
      if (focusedControl === previous && previous.disabled) next.focus();
    }

    previous.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    enlarge.addEventListener('click', () => {
      const image = slides[index].querySelector('img');
      if (typeof dialog.showModal !== 'function') {
        window.location.href = image.src;
        return;
      }
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      dialogCaption.textContent = slides[index].querySelector('figcaption').textContent.trim();
      if (originalLink) originalLink.href = image.src;
      dialog.showModal();
      close.focus();
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => enlarge.focus());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    show(0);
    controls.hidden = false;
  }

  function start() {
    document.querySelectorAll('[data-slide-deck]').forEach(activate);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
