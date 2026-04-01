/* ============================================================
   BIGBEN PRODUCTION — main.js
   ============================================================ */

// ---------- Sticky Nav ----------
const navbar = document.getElementById('navbar');

function updateNav() {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 70);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


// ---------- Mobile Menu ----------
const menuBtn   = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu(open) {
  menuOpen = open;
  mobileMenu.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => toggleMenu(!menuOpen));

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) toggleMenu(false);
});


// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ---------- Staggered Service Cards ----------
const servicesGrid = document.querySelector('.services-grid');

if (servicesGrid) {
  const cardObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.07}s`;
        card.classList.add('is-visible');
      });
      cardObserver.disconnect();
    }
  }, { threshold: 0.1 });

  cardObserver.observe(servicesGrid);
}


// ---------- Stats Counter ----------
function animateCounter(el, target, duration) {
  const start = performance.now();
  const suffix = el.dataset.suffix || '';

  const tick = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('.stats-grid');

if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count), 1400);
      });
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });

  statsObserver.observe(statsSection);
}


// ---------- Contact Form — loading state on submit ----------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Native form POST to formsubmit.co takes over from here
  });
}
