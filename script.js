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
  initQuoteWizard();
  initFAQ();
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

  function advance() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }

  let autoTimer = setInterval(advance, 5000);

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(advance, 5000);
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
    resetTimer();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
    resetTimer();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}


/* ---------------------------------------------------
   FAQ ACCORDION
   --------------------------------------------------- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(el => el.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });
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


/* ---------------------------------------------------
   QUOTE WIZARD — Multi-step quote modal (6 steps)
   --------------------------------------------------- */
const wizardState = {
  currentStep: 1,
  totalSteps: 6,
  preselectedService: null,
  preselectedPlan: null
};

function initQuoteWizard() {
  const overlay = document.getElementById('wizard-overlay');
  const closeBtn = document.getElementById('wizard-close');
  const nextBtn = document.getElementById('wizard-next');
  const backBtn = document.getElementById('wizard-back');

  if (!overlay) return;

  // Location cards — single select
  overlay.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', () => {
      overlay.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const rb = card.querySelector('input[type="radio"]');
      if (rb) rb.checked = true;
    });
  });

  // Property type cards — single select
  overlay.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', () => {
      overlay.querySelectorAll('.property-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const rb = card.querySelector('input[type="radio"]');
      if (rb) rb.checked = true;
    });
  });

  // Service cards — multi-select checkboxes
  overlay.querySelectorAll('.service-radio-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const cb = card.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = card.classList.contains('selected');
    });
  });

  // Plan cards — single select
  overlay.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', () => {
      overlay.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const rb = card.querySelector('input[type="radio"]');
      if (rb) rb.checked = true;
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeQuoteWizard);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeQuoteWizard();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeQuoteWizard();
    }
  });

  // Navigation
  nextBtn.addEventListener('click', handleNext);
  backBtn.addEventListener('click', handleBack);
}

function openQuoteWizard(serviceId = null, planName = null) {
  const overlay = document.getElementById('wizard-overlay');
  if (!overlay) return;

  // Reset state
  wizardState.currentStep = 1;
  wizardState.preselectedService = serviceId;
  wizardState.preselectedPlan = planName;

  // Clear all radio/checkbox card selections
  overlay.querySelectorAll('.location-card, .property-card, .plan-card').forEach(card => {
    card.classList.remove('selected');
    const rb = card.querySelector('input[type="radio"]');
    if (rb) rb.checked = false;
  });
  overlay.querySelectorAll('.service-radio-card').forEach(card => {
    card.classList.remove('selected');
    const cb = card.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = false;
  });

  // Clear form fields and errors
  overlay.querySelectorAll('.wizard-error').forEach(el => el.textContent = '');
  overlay.querySelectorAll('.wizard-form input, .wizard-form textarea').forEach(el => el.value = '');
  overlay.querySelectorAll('.wizard-form select').forEach(el => el.selectedIndex = 0);
  overlay.querySelectorAll('.wizard-consents input[type="checkbox"]').forEach(cb => cb.checked = false);

  // Pre-select service if specified
  if (serviceId) {
    const card = overlay.querySelector(`.service-radio-card[data-service="${serviceId}"]`);
    if (card) {
      card.classList.add('selected');
      const cb = card.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = true;
    }
  }

  // Pre-select plan if specified
  if (planName) {
    const planKey = planName.toLowerCase().replace('-', '');
    const card = overlay.querySelector(`.plan-card[data-plan="${planKey}"]`);
    if (card) {
      card.classList.add('selected');
      const rb = card.querySelector('input[type="radio"]');
      if (rb) rb.checked = true;
    }
  }

  // Show overlay
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderStep(1);
}

function closeQuoteWizard() {
  const overlay = document.getElementById('wizard-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function handleNext() {
  const { currentStep, totalSteps } = wizardState;
  if (!validateStep(currentStep)) return;

  if (currentStep === totalSteps) {
    buildConfirmationSummary();
    renderStep(7); // confirmation
  } else {
    renderStep(currentStep + 1);
  }
}

function handleBack() {
  const { currentStep } = wizardState;
  if (currentStep > 1) {
    renderStep(currentStep - 1);
  }
}

function renderStep(step) {
  const overlay = document.getElementById('wizard-overlay');

  // Hide all steps 1-7
  for (let i = 1; i <= 7; i++) {
    const el = document.getElementById(`wizard-step-${i}`);
    if (el) el.hidden = true;
  }

  // Show target step
  const target = document.getElementById(`wizard-step-${step}`);
  if (target) target.hidden = false;

  wizardState.currentStep = step;

  // Update step label
  const label = document.getElementById('wizard-step-label');
  if (label) {
    label.textContent = step <= 6 ? `Step ${step} of 6` : 'Quote Submitted';
  }

  // Update step dots (only dots 1-6, step 7 = confirmation, no dot)
  overlay.querySelectorAll('.step-dot').forEach(dot => {
    const dotStep = parseInt(dot.dataset.step);
    dot.classList.remove('active', 'done');
    if (dotStep < step) dot.classList.add('done');
    if (dotStep === step) dot.classList.add('active');
  });

  // Update connectors
  overlay.querySelectorAll('.step-connector').forEach((conn, idx) => {
    conn.classList.toggle('done', step > idx + 1);
  });

  // Back button
  const backBtn = document.getElementById('wizard-back');
  if (backBtn) backBtn.style.display = step === 1 ? 'none' : '';

  // Footer & Next button
  const nextBtn = document.getElementById('wizard-next');
  const wizardFooter = document.getElementById('wizard-footer');

  if (step === 7) {
    if (wizardFooter) wizardFooter.style.display = 'none';
  } else {
    if (wizardFooter) wizardFooter.style.display = '';
    const isLastStep = step === wizardState.totalSteps;
    const arrowSvg = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:var(--leaf-navy);stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>';
    if (nextBtn) nextBtn.innerHTML = (isLastStep ? 'Get My Quote ' : 'Next Step ') + arrowSvg;
  }

  // Scroll modal to top
  const modal = overlay.querySelector('.wizard-modal');
  if (modal) modal.scrollTop = 0;
}

function validateStep(step) {
  clearErrors();

  if (step === 1) {
    if (!document.querySelector('.location-card.selected')) {
      showError('step1-error', 'Please select your location to continue.');
      return false;
    }
    return true;
  }

  if (step === 2) {
    const firstName = document.getElementById('contact-first');
    const lastName = document.getElementById('contact-last');
    const phone = document.getElementById('contact-phone');
    const email = document.getElementById('contact-email');
    const privacy = document.getElementById('consent-privacy');

    if (!firstName.value.trim() || !lastName.value.trim()) {
      showError('step2-error', 'Please enter your first and last name.');
      firstName.focus();
      return false;
    }
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError('step2-error', 'Please enter a valid email address.');
      email.focus();
      return false;
    }
    if (!phone.value.trim()) {
      showError('step2-error', 'Please enter your phone number.');
      phone.focus();
      return false;
    }
    if (!privacy.checked) {
      showError('step2-error', 'Please agree to the Privacy Policy & Terms of Service to continue.');
      return false;
    }
    return true;
  }

  if (step === 3) {
    if (!document.querySelector('.property-card.selected')) {
      showError('step3-error', 'Please select your property type to continue.');
      return false;
    }
    return true;
  }

  if (step === 4) {
    if (!document.querySelectorAll('.service-radio-card.selected').length) {
      showError('step4-error', 'Please select at least one service to continue.');
      return false;
    }
    return true;
  }

  if (step === 5) {
    if (!document.querySelector('.plan-card.selected')) {
      showError('step5-error', 'Please choose a plan to continue.');
      return false;
    }
    return true;
  }

  if (step === 6) {
    const street = document.getElementById('prop-street');
    const city = document.getElementById('prop-city');
    const zip = document.getElementById('prop-zip');

    if (!street.value.trim()) {
      showError('step6-error', 'Please enter your street address.');
      street.focus();
      return false;
    }
    if (!city.value.trim()) {
      showError('step6-error', 'Please enter your city.');
      city.focus();
      return false;
    }
    if (!zip.value.trim()) {
      showError('step6-error', 'Please enter your zip code.');
      zip.focus();
      return false;
    }
    return true;
  }

  return true;
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.wizard-error').forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildConfirmationSummary() {
  const summaryEl = document.getElementById('wizard-summary');
  if (!summaryEl) return;

  const locationCard = document.querySelector('.location-card.selected');
  const location = locationCard ? (locationCard.dataset.location === 'kearney' ? 'Kearney, NE' : 'Lincoln, NE') : '';

  const propertyCard = document.querySelector('.property-card.selected');
  const property = propertyCard ? propertyCard.dataset.property : '';

  const services = [...document.querySelectorAll('.service-radio-card.selected')]
    .map(c => c.querySelector('.service-radio-name').textContent.trim());

  const planCard = document.querySelector('.plan-card.selected');
  const plan = planCard ? planCard.dataset.plan : '';

  const firstName = document.getElementById('contact-first')?.value || '';
  const lastName = document.getElementById('contact-last')?.value || '';
  const phone = document.getElementById('contact-phone')?.value || '';
  const email = document.getElementById('contact-email')?.value || '';
  const street = document.getElementById('prop-street')?.value || '';
  const city = document.getElementById('prop-city')?.value || '';
  const zip = document.getElementById('prop-zip')?.value || '';

  const capitalize = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  const planLabels = { monthly: 'Monthly ($60 OFF)', quarterly: 'Quarterly ($35 OFF)', biannual: 'Bi-Annual ($20 OFF)', 'one-time': 'One-Time' };

  summaryEl.innerHTML = `
    ${location ? `<strong>Location:</strong> ${location}<br>` : ''}
    ${property ? `<strong>Property:</strong> ${capitalize(property)}<br>` : ''}
    ${services.length ? `<strong>Services:</strong> ${services.join(', ')}<br>` : ''}
    ${plan ? `<strong>Plan:</strong> ${planLabels[plan] || capitalize(plan)}<br>` : ''}
    <strong>Address:</strong> ${street}, ${city} ${zip}<br>
    <strong>Contact:</strong> ${firstName} ${lastName} · ${phone} · ${email}
  `;
}
