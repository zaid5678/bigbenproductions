/* ============================================================
   BIGBEN PRODUCTION — main.js
   ============================================================ */

// ---------- Active Nav Link ----------
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('nav-link--active');
  });
})();


// ---------- Sticky Nav ----------
const navbar = document.getElementById('navbar');
function updateNav() {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 70);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


// ---------- Mobile Menu ----------
const menuBtn    = document.getElementById('menuBtn');
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
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuOpen) toggleMenu(false); });


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
  const tick = (ts) => {
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('[data-count]').forEach(el => animateCounter(el, parseInt(el.dataset.count), 1400));
      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}


// ---------- Contact Form (Web3Forms) ----------
const contactForm = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const formError    = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn      = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled    = true;
    if (formError)   formError.classList.remove('is-visible');
    if (formSuccess) formSuccess.classList.remove('is-visible');

    const object = Object.fromEntries(new FormData(contactForm));

    // CC the submitter so they receive a copy of their enquiry
    if (object.email) object.cc = object.email;

    try {
      const res    = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body:    JSON.stringify(object),
      });
      const result = await res.json();

      if (result.success) {
        if (formSuccess) formSuccess.classList.add('is-visible');
        contactForm.reset();
        btn.textContent = 'Sent!';
        btn.classList.add('btn-success');
        setTimeout(() => {
          if (formSuccess) formSuccess.classList.remove('is-visible');
          btn.textContent = original;
          btn.disabled    = false;
          btn.classList.remove('btn-success');
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      if (formError) {
        formError.textContent = 'Something went wrong — please try again or email us directly.';
        formError.classList.add('is-visible');
      }
      btn.textContent = original;
      btn.disabled    = false;
    }
  });
}
