// script.js — scroll animations, nav, parallax, hamburger, filters

document.addEventListener('DOMContentLoaded', () => {

  // ===== Scroll Animation Observer =====
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animateElements.forEach((el) => scrollObserver.observe(el));

  // ===== Navigation: Active section highlighting =====
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('.section, .hero');

  // Nav scroll background
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Active section spy
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}` || href === `index.html#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    if (section.id) sectionObserver.observe(section);
  });

  // ===== Mobile Hamburger Toggle =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('is-open');
      navLinksContainer.classList.toggle('is-open');
      document.body.style.overflow = navLinksContainer.classList.contains('is-open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-open');
        navLinksContainer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== Hero Parallax Effect =====
  const heroGlow = document.querySelector('.hero__glow');

  if (heroGlow) {
    window.addEventListener(
      'scroll',
      () => {
        const scrolled = window.scrollY;
        heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
      },
      { passive: true }
    );
  }

  // ===== Contact Form =====
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = form.querySelector('#name');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) return;

      if (status) {
        status.textContent = `Thanks, ${name}! This is a demo — connect it to a backend (e.g., Formspree) to receive messages.`;
        status.style.color = 'var(--accent)';
      }
      form.reset();
    });
  }

  // ===== Project Filters (Projects Page) =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-full');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Filter cards
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = '';
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ===== Smooth Scroll for anchor links =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});