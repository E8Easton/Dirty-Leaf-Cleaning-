const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'quote.html');
let html = fs.readFileSync(filePath, 'utf8');

// ── 1. Remove qp-topbar header block ──────────────────────────────────────
html = html.replace(/\n\n  <!-- TOP BAR -->[\s\S]*?<\/header>/, '');

// ── 2. Add floating close button right after opening <body class="qp"> ────
html = html.replace(
  /<body class="qp">/,
  `<body class="qp">

  <!-- Floating close button -->
  <a href="index.html" class="qp-close-float" aria-label="Back to site">
    <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>
  </a>`
);

// ── 3. Replace entire Step 4 service grid with icon-based cards ─────────────
const newStep4 = `    <!-- STEP 4 — Services -->
    <div class="qp-step" id="wizard-step-4" hidden>
      <h2 class="qp-title">Select Your Service</h2>
      <p class="qp-subtitle">Pick the service you need a quote for</p>
      <div class="qp-service-grid">

        <label class="qp-svc-card service-radio-card" data-service="exterior-windows">
          <input type="radio" name="service" value="exterior-windows">
          <div class="qp-svc-icon" style="color:#4baee6">
            <svg viewBox="0 0 60 60" fill="none"><rect x="6" y="6" width="48" height="48" rx="5" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/><line x1="30" y1="6" x2="30" y2="54" stroke="currentColor" stroke-width="3"/><line x1="6" y1="30" x2="54" y2="30" stroke="currentColor" stroke-width="3"/><line x1="6" y1="6" x2="54" y2="6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
          </div>
          <span class="qp-svc-name">Exterior Windows</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="interior-windows">
          <input type="radio" name="service" value="interior-windows">
          <div class="qp-svc-icon" style="color:#34d1bf">
            <svg viewBox="0 0 60 60" fill="none"><rect x="6" y="10" width="48" height="44" rx="4" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/><line x1="30" y1="10" x2="30" y2="54" stroke="currentColor" stroke-width="3"/><line x1="6" y1="32" x2="54" y2="32" stroke="currentColor" stroke-width="3"/><path d="M6 10 Q8 6 12 6 L20 6" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M40 6 L48 6 Q52 6 54 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
          </div>
          <span class="qp-svc-name">Interior Windows</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="gutters">
          <input type="radio" name="service" value="gutters">
          <div class="qp-svc-icon" style="color:#1a3a6e">
            <svg viewBox="0 0 60 60" fill="none"><path d="M4 20 H56 V30 Q56 36 50 36 H10 Q4 36 4 30 V20Z" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.12"/><path d="M10 36 L8 54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M50 36 L52 54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M16 12 L20 20 M30 8 L30 20 M44 12 L40 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
          </div>
          <span class="qp-svc-name">Gutter Cleaning</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="pressure-washing">
          <input type="radio" name="service" value="pressure-washing">
          <div class="qp-svc-icon" style="color:#34a864">
            <svg viewBox="0 0 60 60" fill="none"><path d="M10 18 Q14 14 18 18 Q22 22 26 18 L30 14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><rect x="28" y="8" width="14" height="20" rx="4" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.12"/><path d="M34 28 L34 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M26 40 L42 40" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M20 44 L24 52 M28 43 L28 52 M36 44 L32 52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
          </div>
          <span class="qp-svc-name">Pressure Washing</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="screen-cleaning">
          <input type="radio" name="service" value="screen-cleaning">
          <div class="qp-svc-icon" style="color:#8b5cf6">
            <svg viewBox="0 0 60 60" fill="none"><rect x="8" y="8" width="44" height="44" rx="4" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/><line x1="8" y1="20" x2="52" y2="20" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="8" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="8" y1="40" x2="52" y2="40" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="20" y1="8" x2="20" y2="52" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="30" y1="8" x2="30" y2="52" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="40" y1="8" x2="40" y2="52" stroke="currentColor" stroke-width="2" opacity="0.6"/></svg>
          </div>
          <span class="qp-svc-name">Screen Cleaning</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="track-detailing">
          <input type="radio" name="service" value="track-detailing">
          <div class="qp-svc-icon" style="color:#f97316">
            <svg viewBox="0 0 60 60" fill="none"><rect x="6" y="22" width="48" height="8" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><rect x="6" y="34" width="48" height="8" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><circle cx="16" cy="26" r="3" fill="currentColor"/><circle cx="30" cy="26" r="3" fill="currentColor"/><circle cx="44" cy="26" r="3" fill="currentColor"/><circle cx="16" cy="38" r="3" fill="currentColor"/><circle cx="30" cy="38" r="3" fill="currentColor"/><circle cx="44" cy="38" r="3" fill="currentColor"/></svg>
          </div>
          <span class="qp-svc-name">Track Detailing</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="solar-panel">
          <input type="radio" name="service" value="solar-panel">
          <div class="qp-svc-icon" style="color:#f59e0b">
            <svg viewBox="0 0 60 60" fill="none"><rect x="4" y="12" width="24" height="16" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><rect x="32" y="12" width="24" height="16" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><rect x="4" y="32" width="24" height="16" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><rect x="32" y="32" width="24" height="16" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.15"/><line x1="16" y1="48" x2="16" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="44" y1="48" x2="44" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="10" y1="54" x2="50" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
          </div>
          <span class="qp-svc-name">Solar Panel Cleaning</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="soft-washing">
          <input type="radio" name="service" value="soft-washing">
          <div class="qp-svc-icon" style="color:#06b6d4">
            <svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="34" r="18" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/><path d="M30 16 Q26 8 22 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="16" r="4" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.15"/><circle cx="42" cy="18" r="3" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.15"/></svg>
          </div>
          <span class="qp-svc-name">Soft Washing</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="christmas-lights">
          <input type="radio" name="service" value="christmas-lights">
          <div class="qp-svc-icon" style="color:#ef4444">
            <svg viewBox="0 0 60 60" fill="none"><path d="M6 20 Q20 14 30 20 Q40 26 54 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="14" cy="28" r="5" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.2"/><line x1="14" y1="23" x2="14" y2="20" stroke="currentColor" stroke-width="2"/><circle cx="30" cy="30" r="5" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.2"/><line x1="30" y1="25" x2="30" y2="20" stroke="currentColor" stroke-width="2"/><circle cx="46" cy="28" r="5" stroke="currentColor" stroke-width="2.5" fill="currentColor" fill-opacity="0.2"/><line x1="46" y1="23" x2="46" y2="20" stroke="currentColor" stroke-width="2"/></svg>
          </div>
          <span class="qp-svc-name">Christmas Lights</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

        <label class="qp-svc-card service-radio-card" data-service="commercial-cleaning">
          <input type="radio" name="service" value="commercial-cleaning">
          <div class="qp-svc-icon" style="color:#64748b">
            <svg viewBox="0 0 60 60" fill="none"><rect x="8" y="16" width="44" height="38" rx="3" stroke="currentColor" stroke-width="3" fill="currentColor" fill-opacity="0.1"/><path d="M20 16 V10 Q20 6 24 6 H36 Q40 6 40 10 V16" stroke="currentColor" stroke-width="3"/><rect x="16" y="26" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.2"/><rect x="30" y="26" width="8" height="8" rx="1" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.2"/><rect x="22" y="40" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.15"/></svg>
          </div>
          <span class="qp-svc-name">Commercial Cleaning</span>
          <div class="qp-card-check"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></div>
        </label>

      </div>
      <p class="qp-error" id="step4-error"></p>
    </div>`;

// Replace the old step 4 block
html = html.replace(
  /    <!-- STEP 4 — Services -->[\s\S]*?    <\/div>\s*\n\s*\n\s*    <!-- STEP 5/,
  newStep4 + '\n\n    <!-- STEP 5'
);

// ── 4. Remove consent checkboxes from Step 2 (keep promo code row) ──────────
html = html.replace(
  /\s*<div class="qp-consents">[\s\S]*?<\/div>\s*\n(\s*<\/div>\s*\n\s*<p class="qp-error" id="step2-error">)/,
  '\n$1'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('quote.html rewritten. Length:', html.length);
