document.addEventListener('DOMContentLoaded', () => {
  // Mark JavaScript as ready only after this file has loaded.
  document.documentElement.classList.add('js-ready');

  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menuBtn.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Reveal cards as they enter the screen; show all if unsupported.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Highlight current navigation item on scroll.
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
});
