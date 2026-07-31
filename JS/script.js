// script.js — active tab highlighting on scroll + demo contact form

document.addEventListener('DOMContentLoaded', () => {
  const tabs = Array.from(document.querySelectorAll('.tabbar__tabs a'));
  const sections = tabs
    .map(tab => document.querySelector(tab.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(section => observer.observe(section));
  }

  // Demo contact form — no backend, just a friendly confirmation.
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      if (!name) return;
      status.textContent = `Thanks, ${name} — this is a static demo, so wire this up to a form endpoint (e.g. Formspree) or your own backend to actually receive messages.`;
      form.reset();
    });
  }
});