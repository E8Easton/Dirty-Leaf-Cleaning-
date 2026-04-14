/* ==========================================================
   LEAF CLEANING — Interactions & Animations
   ========================================================== */

/* ----------------------------------------------------------
   NOTIFICATION CONFIG — Fill these in after EmailJS setup
   (see setup instructions at the bottom of this file)
   ---------------------------------------------------------- */
const LEAF_NOTIFY = {
  public_key:   'l9uOWTh2tT3gqUag8',
  service_id:   'service_umf782h',
  template_id:  'template_cry5s9x',
  owner_email:  'dirtyleafcleaning@gmail.com',

  // SMS gateway — fill in your carrier:
  //    Verizon  → 4023090128@vtext.com
  //    AT&T     → 4023090128@txt.att.net
  //    T-Mobile → 4023090128@tmomail.net
  //    Sprint   → 4023090128@messaging.sprintpcs.com
  sms_gateway:  '4023090128@vtext.com',
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initHeroParticles();
  // initHeroParallax(); // disabled — keeps hero image still
  initSmoothScroll();
  initReviewsCarousel();
  initCounterAnimation();
  initQuoteWizard();
  initPageWizard();
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

  // Service cards — single select with deselect toggle
  overlay.querySelectorAll('.service-radio-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const alreadySelected = card.classList.contains('selected');
      overlay.querySelectorAll('.service-radio-card').forEach(c => {
        c.classList.remove('selected');
        const r = c.querySelector('input[type="radio"]');
        if (r) r.checked = false;
      });
      if (!alreadySelected) {
        card.classList.add('selected');
        const rb = card.querySelector('input[type="radio"]');
        if (rb) rb.checked = true;
      }
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
    submitQuoteNotification(); // send email + SMS to owner
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

  // Update step dots — works in both modal and full-page mode
  const dotRoot = overlay || document;
  dotRoot.querySelectorAll('.step-dot').forEach(dot => {
    const dotStep = parseInt(dot.dataset.step);
    dot.classList.remove('active', 'done');
    if (dotStep < step) dot.classList.add('done');
    if (dotStep === step) dot.classList.add('active');
  });

  // Update connectors
  dotRoot.querySelectorAll('.step-connector').forEach((conn, idx) => {
    conn.classList.toggle('done', step > idx + 1);
  });

  // Back button
  const backBtn = document.getElementById('wizard-back');
  if (backBtn) backBtn.style.display = step === 1 ? 'none' : '';

  // Footer & Next button
  const nextBtn = document.getElementById('wizard-next');
  const wizardFooter = document.getElementById('wizard-footer');
  const isPageMode = wizardState.pageMode;

  if (step === 7) {
    if (wizardFooter) wizardFooter.style.display = 'none';
    // Page mode: hide the whole nav bar on confirmation
    const qpNav = document.getElementById('qp-nav');
    if (qpNav) qpNav.style.display = 'none';
  } else {
    if (wizardFooter) wizardFooter.style.display = '';
    const qpNav = document.getElementById('qp-nav');
    if (qpNav) qpNav.style.display = '';
    const isLastStep = step === wizardState.totalSteps;
    if (!isPageMode) {
      const arrowSvg = '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:var(--leaf-navy);stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>';
      if (nextBtn) nextBtn.innerHTML = (isLastStep ? 'Get My Quote ' : 'Next Step ') + arrowSvg;
    } else {
      if (nextBtn) nextBtn.textContent = isLastStep ? 'Get My Quote →' : 'Next →';
    }
  }

  // Scroll to top
  if (overlay) {
    const modal = overlay.querySelector('.wizard-modal');
    if (modal) modal.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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
    if (!document.querySelector('.service-radio-card.selected')) {
      showError('step4-error', 'Please select a service to continue.');
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

  const selectedSvcCard = document.querySelector('.service-radio-card.selected');
  const services = selectedSvcCard
    ? [(selectedSvcCard.querySelector('.qp-svc-name') || selectedSvcCard.querySelector('.service-radio-name'))?.textContent.trim() || selectedSvcCard.dataset.service]
    : [];

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


/* ==========================================================
   QUOTE PAGE — Standalone page-mode wizard
   ========================================================== */

function initPageWizard() {
  // Only runs on quote.html (body.qp, no #wizard-overlay)
  if (!document.body.classList.contains('qp')) return;
  const pageWizard = document.body;

  // Mark wizard state as page mode so renderStep skips modal logic
  wizardState.pageMode = true;

  // Wire up next/back buttons (same IDs as modal wizard)
  const nextBtn = document.getElementById('wizard-next');
  const backBtn = document.getElementById('wizard-back');
  if (nextBtn) nextBtn.addEventListener('click', handleNext);
  if (backBtn) backBtn.addEventListener('click', handleBack);

  // Wire up radio-style cards (location, property, plan)
  ['.location-card', '.property-card', '.plan-card'].forEach(sel => {
    document.querySelectorAll(sel).forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll(sel).forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const rb = card.querySelector('input[type="radio"]');
        if (rb) rb.checked = true;
      });
    });
  });

  // Wire up service cards — single select with deselect toggle
  document.querySelectorAll('.service-radio-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const alreadySelected = card.classList.contains('selected');
      // Clear all
      document.querySelectorAll('.service-radio-card').forEach(c => {
        c.classList.remove('selected');
        const r = c.querySelector('input[type="radio"]');
        if (r) r.checked = false;
      });
      // Toggle: if it wasn't selected, select it; if it was, leave deselected
      if (!alreadySelected) {
        card.classList.add('selected');
        const rb = card.querySelector('input[type="radio"]');
        if (rb) rb.checked = true;
      }
    });
  });

  // Read URL params and pre-select service / plan
  const params = new URLSearchParams(window.location.search);
  const preService = params.get('service');
  const prePlan    = params.get('plan');

  if (preService) {
    const card = pageWizard.querySelector(`[data-service="${preService}"]`);
    if (card) {
      card.classList.add('selected');
      const cb = card.querySelector('input');
      if (cb) cb.checked = true;
    }
  }
  if (prePlan) {
    const card = pageWizard.querySelector(`[data-plan="${prePlan.toLowerCase()}"]`);
    if (card) {
      card.classList.add('selected');
      const rb = card.querySelector('input');
      if (rb) rb.checked = true;
    }
  }

  // Start at step 1
  renderStep(1);
}


/* ==========================================================
   ADMIN TEST MODE — type "leafcleaning18" anywhere
   ========================================================== */

function initAdminTestMode() {
  // Tiny trigger button in bottom-left (only on quote page)
  const triggerBtn = document.getElementById('admin-trigger');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', promptAdminCode);
  }

  // Also activate by typing the passphrase anywhere on page
  let keyBuffer = '';
  document.addEventListener('keydown', e => {
    // Don't capture while typing in inputs
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
    keyBuffer += e.key.toLowerCase();
    if (keyBuffer.includes('leafcleaning18')) {
      keyBuffer = '';
      activateTestMode();
    }
    if (keyBuffer.length > 30) keyBuffer = keyBuffer.slice(-30);
  });
}

function promptAdminCode() {
  const code = window.prompt('Enter admin code:');
  if (code && code.toLowerCase() === 'leafcleaning18') {
    activateTestMode();
  } else if (code !== null) {
    alert('Incorrect code.');
  }
}

function activateTestMode() {
  if (document.getElementById('admin-test-banner')) return; // already active

  // Show banner
  const banner = document.createElement('div');
  banner.id = 'admin-test-banner';
  banner.className = 'admin-test-banner';
  banner.textContent = '🧪 TEST MODE ACTIVE';
  document.body.appendChild(banner);

  // Fill all wizard fields with fake test data
  const fill = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  fill('contact-first', 'Test');
  fill('contact-last',  'User');
  fill('contact-email', 'test@leafcleaning.com');
  fill('contact-phone', '(402) 555-0000');
  fill('contact-heard', 'google');
  fill('contact-promo', 'TEST2025');
  fill('prop-street',   '123 Test Street');
  fill('prop-city',     'Kearney');
  fill('prop-zip',      '68847');
  fill('prop-notes',    'This is a test submission — please ignore.');

  // Check all consent boxes
  ['consent-sms-alerts','consent-sms-promo','consent-marketing','consent-privacy']
    .forEach(id => { const el = document.getElementById(id); if (el) el.checked = true; });

  // Select location: Kearney
  const locationCard = document.querySelector('[data-location="kearney"]');
  if (locationCard) {
    document.querySelectorAll('.location-card').forEach(c => c.classList.remove('selected'));
    locationCard.classList.add('selected');
    const rb = locationCard.querySelector('input');
    if (rb) rb.checked = true;
  }

  // Select property: residential
  const propCard = document.querySelector('[data-property="residential"]');
  if (propCard) {
    document.querySelectorAll('.property-card').forEach(c => c.classList.remove('selected'));
    propCard.classList.add('selected');
    const rb = propCard.querySelector('input');
    if (rb) rb.checked = true;
  }

  // Select service: exterior-windows
  const svcCard = document.querySelector('[data-service="exterior-windows"]');
  if (svcCard) {
    svcCard.classList.add('selected');
    const cb = svcCard.querySelector('input');
    if (cb) cb.checked = true;
  }

  // Select plan: quarterly
  const planCard = document.querySelector('[data-plan="quarterly"]');
  if (planCard) {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
    planCard.classList.add('selected');
    const rb = planCard.querySelector('input');
    if (rb) rb.checked = true;
  }

  // Add floating "Submit Test" button
  const submitBtn = document.createElement('button');
  submitBtn.textContent = '🧪 Submit Test Booking';
  submitBtn.style.cssText = [
    'position:fixed', 'bottom:60px', 'right:20px',
    'background:#f59e0b', 'color:#1a1a1a', 'border:none',
    'padding:12px 22px', 'border-radius:999px', 'font-weight:800',
    'font-size:0.9rem', 'cursor:pointer', 'z-index:99999',
    'box-shadow:0 4px 20px rgba(0,0,0,0.25)', 'font-family:sans-serif',
  ].join(';');
  submitBtn.onclick = () => {
    buildConfirmationSummary();
    submitQuoteNotification();
    renderStep(7);
    submitBtn.remove();
  };
  document.body.appendChild(submitBtn);

  console.info('[Leaf Admin] Test mode active — fields pre-filled, click the yellow button to submit.');
}


/* ==========================================================
   QUOTE NOTIFICATIONS — Email + SMS via EmailJS
   ========================================================== */

function loadEmailJS(callback) {
  if (window.emailjs) {
    callback();
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  s.onload = () => {
    emailjs.init(LEAF_NOTIFY.public_key);
    callback();
  };
  s.onerror = () => console.warn('[Leaf] Failed to load EmailJS SDK');
  document.head.appendChild(s);
}

function collectQuoteData() {
  const locationCard = document.querySelector('.location-card.selected');
  const location = locationCard
    ? (locationCard.dataset.location === 'kearney' ? 'Kearney, NE' : 'Lincoln, NE')
    : 'Not specified';

  const propertyCard = document.querySelector('.property-card.selected');
  const property = propertyCard
    ? (propertyCard.dataset.property === 'residential' ? 'Residential' : 'Commercial')
    : 'Not specified';

  const svcCard = document.querySelector('.service-radio-card.selected');
  const services = svcCard
    ? (svcCard.querySelector('.qp-svc-name') || svcCard.querySelector('.service-radio-name'))?.textContent.trim() || svcCard.dataset.service
    : 'Not specified';

  const planCard = document.querySelector('.plan-card.selected');
  const planMap = {
    monthly:    'Monthly ($150 OFF per cleaning)',
    quarterly:  'Quarterly ($100 OFF per cleaning)',
    biannual:   'Bi-Annual ($50 OFF per cleaning)',
    'one-time': 'One-Time Visit',
  };
  const plan = planCard ? (planMap[planCard.dataset.plan] || planCard.dataset.plan) : 'Not specified';

  const firstName  = document.getElementById('contact-first')?.value.trim()  || '';
  const lastName   = document.getElementById('contact-last')?.value.trim()   || '';
  const phone      = document.getElementById('contact-phone')?.value.trim()  || '';
  const email      = document.getElementById('contact-email')?.value.trim()  || '';
  const street     = document.getElementById('prop-street')?.value.trim()    || '';
  const city       = document.getElementById('prop-city')?.value.trim()      || '';
  const zip        = document.getElementById('prop-zip')?.value.trim()       || '';
  const notes      = document.getElementById('prop-notes')?.value.trim()     || 'None';

  const now = new Date();
  const submittedAt = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const fullName = `${firstName} ${lastName}`.trim() || 'Unknown';
  const addressFull = [street, city ? `${city}, NE` : '', zip].filter(Boolean).join(' ');

  const message = [
    `=== NEW QUOTE REQUEST ===`,
    `Submitted: ${submittedAt}`,
    ``,
    `--- CONTACT ---`,
    `Name:    ${fullName}`,
    `Email:   ${email || 'Not provided'}`,
    `Phone:   ${phone || 'Not provided'}`,
    ``,
    `--- JOB DETAILS ---`,
    `Location:  ${location}`,
    `Property:  ${property}`,
    `Service:   ${services}`,
    `Plan:      ${plan}`,
    ``,
    `--- ADDRESS ---`,
    `${addressFull || 'Not provided'}`,
    ``,
    `--- NOTES ---`,
    `${notes}`,
  ].join('\n');

  return {
    // Contact
    customer_name:    fullName,
    first_name:       firstName,
    customer_email:   email,
    customer_phone:   phone,
    // Job details
    location,
    property_type:    property,
    services:         services,
    plan:             plan,
    // Address
    street_address:   street,
    city_state_zip:   `${city}, NE ${zip}`,
    special_notes:    notes,
    // Full formatted message (use {{message}} in EmailJS template)
    message,
    // Meta
    submitted_at:     submittedAt,
    to_email:         LEAF_NOTIFY.owner_email,
    reply_to:         email,
  };
}

function submitQuoteNotification() {
  // Skip if EmailJS hasn't been configured yet
  if (!LEAF_NOTIFY.public_key || LEAF_NOTIFY.public_key === 'YOUR_EMAILJS_PUBLIC_KEY') {
    console.info('[Leaf] EmailJS not configured — skipping notification');
    return;
  }

  const data = collectQuoteData();

  loadEmailJS(() => {
    // ── Owner email ───────────────────────────────────────
    emailjs.send(LEAF_NOTIFY.service_id, LEAF_NOTIFY.template_id, data)
      .then(() => console.info('[Leaf] Owner email sent ✓'))
      .catch(err => console.warn('[Leaf] Owner email failed:', err));

    // ── SMS via carrier email gateway ─────────────────────
    if (LEAF_NOTIFY.sms_gateway) {
      const smsData = {
        to_email:  LEAF_NOTIFY.sms_gateway,
        reply_to:  data.customer_email,
        sms_text:  [
          '🌿 NEW LEAF QUOTE',
          `${data.customer_name}`,
          `📞 ${data.customer_phone}`,
          `📍 ${data.street_address}, ${data.city_state_zip}`,
          `🧹 ${data.services}`,
          `📋 ${data.plan}`,
          `⏰ ${data.submitted_at}`,
        ].join('\n'),
      };
      emailjs.send(LEAF_NOTIFY.service_id, LEAF_NOTIFY.template_id, smsData)
        .then(() => console.info('[Leaf] SMS gateway sent ✓'))
        .catch(err => console.warn('[Leaf] SMS failed:', err));
    }
  });
}

/* ==========================================================
   EMAILJS SETUP INSTRUCTIONS
   ===========================================================

   STEP 1 — Create your free EmailJS account
   → Go to https://www.emailjs.com and sign up (free = 200 emails/month)

   STEP 2 — Connect your Gmail
   → Dashboard → Email Services → Add New Service → Gmail
   → Sign in with your Gmail → copy the Service ID it gives you
   → Paste it as: service_id: 'service_xxxxxxx'

   STEP 3 — Create your email template
   → Dashboard → Email Templates → Create New Template
   → Set "To Email": {{to_email}}
   → Set "Reply To": {{reply_to}}
   → Set "Subject":  🌿 New Quote Request — {{customer_name}}
   → Paste this into the Body (HTML or text):

   ─────────────────────────────────────────
   NEW QUOTE REQUEST — Leaf Cleaning
   Submitted: {{submitted_at}}

   CUSTOMER
   Name:    {{customer_name}}
   Email:   {{customer_email}}
   Phone:   {{customer_phone}}
   Heard:   {{heard_from}}
   Promo:   {{promo_code}}

   JOB DETAILS
   Location:  {{location}}
   Property:  {{property_type}}
   Services:  {{services}}
   Plan:      {{plan}}

   ADDRESS
   {{street_address}}
   {{city_state_zip}}

   NOTES
   {{special_notes}}

   CONSENTS
   SMS Alerts:  {{consent_sms}}
   Promo SMS:   {{consent_promo}}
   ─────────────────────────────────────────

   → Save → copy the Template ID
   → Paste as: template_id: 'template_xxxxxxx'

   STEP 4 — Get your Public Key
   → Dashboard → Account → API Keys → Public Key
   → Paste as: public_key: 'xxxxxxxxxxxxxxx'

   STEP 5 — Set your email & SMS gateway
   → Set owner_email to your Gmail address
   → Find your phone carrier's SMS email gateway:
       Verizon:  YOUR_NUMBER@vtext.com
       AT&T:     YOUR_NUMBER@txt.att.net
       T-Mobile: YOUR_NUMBER@tmomail.net
       Sprint:   YOUR_NUMBER@messaging.sprintpcs.com
   → Paste as: sms_gateway: '4023090128@vtext.com'

   STEP 6 — Gmail auto-label (one-time, 2 minutes)
   → In Gmail → Settings (gear) → See all settings
   → Filters and Blocked Addresses → Create a new filter
   → In "Subject" box type:  New Quote Request — Leaf Cleaning
   → Click "Create filter"
   → Check "Apply the label" → New label → name it "Leaf Quotes"
   → Check "Also apply filter to matching conversations"
   → Click "Create filter"
   → Every new booking email will auto-land in that label!

   ========================================================== */
