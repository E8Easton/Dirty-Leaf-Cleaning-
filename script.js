/* ==========================================================
   LEAF CLEANING — Interactions & Animations
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initHeroParticles();
  initHeroParallax();
  initSmoothScroll();
  initReviewsCarousel();
  initCounterAnimation();
});


/* ---------------------------------------------------
   NAVBAR — Glassmorphism on scroll
   --------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const threshold = 60;

  function handleScroll() {
    if (window.scrollY > threshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check
}


/* ---------------------------------------------------
   MOBILE MENU — Hamburger toggle
   --------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const body = document.body;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    }
  });
}


/* ---------------------------------------------------
   SCROLL REVEAL — Intersection Observer
   --------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Don't unobserve — allows re-animation if wanted
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}


/* ---------------------------------------------------
   HERO — Floating Particles
   --------------------------------------------------- */
function initHeroParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Randomize properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 12;
    const opacity = Math.random() * 0.5 + 0.2;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${opacity};
    `;

    container.appendChild(particle);
  }
}


/* ---------------------------------------------------
   HERO — Parallax on scroll
   --------------------------------------------------- */
function initHeroParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrolled < heroHeight) {
      const parallaxY = scrolled * 0.35;
      heroBg.style.transform = `scale(1.05) translateY(${parallaxY}px)`;
    }
  }, { passive: true });
}


/* ---------------------------------------------------
   SMOOTH SCROLL — Anchor links
   --------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbarH = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navbarH - 20;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    });
  });
}


/* ---------------------------------------------------
   REVIEWS CAROUSEL (Mobile)
   --------------------------------------------------- */
function initReviewsCarousel() {
  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');
  const grid = document.querySelector('.reviews-grid');

  if (!prevBtn || !nextBtn || !grid) return;

  const cards = grid.querySelectorAll('.review-card');
  let currentIndex = 0;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateCarousel() {
    if (!isMobile()) {
      // Show all on desktop
      cards.forEach(card => {
        card.style.display = '';
        card.style.opacity = '';
        card.style.transform = '';
      });
      return;
    }

    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      } else {
        card.style.display = 'none';
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}


/* ---------------------------------------------------
   COUNTER ANIMATION — Process step numbers
   --------------------------------------------------- */
function initCounterAnimation() {
  const steps = document.querySelectorAll('.process-step-number');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'));
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  steps.forEach(step => observer.observe(step));
}

function animateCounter(el, target) {
  let current = 0;
  const duration = 600;
  const stepTime = duration / target;

  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}
