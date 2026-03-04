(() => {
  const body = document.body;
  const focusables = 'a[href], button, input, [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, event) {
    const nodes = [...container.querySelectorAll(focusables)].filter(el => !el.disabled);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setupLang(scope = document) {
    scope.querySelectorAll('.lang-wrap').forEach((wrap) => {
      const btn = wrap.querySelector('.lang-toggle');
      btn?.addEventListener('click', () => wrap.classList.toggle('open'));
    });
  }
  setupLang();

  const drawer = document.querySelector('.drawer');
  const drawerBtn = document.querySelector('.burger');
  const drawerClose = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('show');
    body.classList.remove('lock-scroll');
  }
  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('show');
    body.classList.add('lock-scroll');
    drawer?.querySelector('a,button,input')?.focus();
  }

  drawerBtn?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  const modal = document.querySelector('.modal');
  const modalTriggers = document.querySelectorAll('[data-open-privacy]');
  const closeModalBtns = document.querySelectorAll('[data-close-privacy]');

  function closeModal() {
    modal?.classList.remove('show');
    body.classList.remove('lock-scroll');
  }
  function openModal() {
    modal?.classList.add('show');
    body.classList.add('lock-scroll');
    modal?.querySelector('.modal-close-x')?.focus();
  }

  modalTriggers.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));
  closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
  modal?.querySelector('.modal-bg')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      document.querySelectorAll('.lang-wrap.open').forEach(el => el.classList.remove('open'));
    }
    if (e.key === 'Tab') {
      if (drawer?.classList.contains('open')) trapFocus(drawer, e);
      if (modal?.classList.contains('show')) trapFocus(modal.querySelector('.modal-panel'), e);
    }
  });

  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach((item) => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      faqItems.forEach(i => i !== item && i.classList.remove('open'));
      item.classList.toggle('open');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
