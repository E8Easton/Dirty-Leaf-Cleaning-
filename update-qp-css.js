const fs = require('fs');
const path = 'C:/Users/hdhto/.gemini/antigravity/scratch/leaf-cleaning/styles.css';
let c = fs.readFileSync(path, 'utf8');

const startMarker = '/* ==========================================================\n   QUOTE PAGE — Full-screen minimal wizard  (body.qp)\n   ========================================================== */';
const endMarker   = '/* ==========================================================\n   QUOTE PAGE — Standalone full-page wizard\n   ========================================================== */';

const newSection = `/* ==========================================================
   QUOTE PAGE — Full-screen minimal wizard  (body.qp)
   ========================================================== */

body.qp {
  margin: 0; padding: 0;
  background: #f4f6fb;
  min-height: 100vh;
  font-family: var(--font-body);
  overflow-x: hidden;
}

/* Top bar */
.qp-topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 40px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.07);
}
.qp-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.qp-logo img { width: 32px; height: 32px; object-fit: contain; }
.qp-logo span { font-family: var(--font-heading); font-weight: 800; font-size: 1rem; color: var(--leaf-navy); }
.qp-close {
  width: 40px; height: 40px; border-radius: 50%;
  background: #eef0f5;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; color: #555; transition: background 0.2s;
}
.qp-close svg { width: 18px; height: 18px; }
.qp-close:hover { background: #dde0e9; color: var(--leaf-navy); }

/* Progress bar */
.qp-progress-bar {
  background: #ffffff;
  padding: 16px 40px 20px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.qp-progress-bar .wizard-step-dots {
  display: flex; align-items: center;
  max-width: 560px; margin: 0 auto;
}
.qp-progress-bar .step-dot {
  flex: 1; height: 6px; border-radius: 999px;
  background: #dde1ec; transition: background 0.3s; cursor: default;
}
.qp-progress-bar .step-dot.active { background: var(--leaf-green); }
.qp-progress-bar .step-dot.done   { background: var(--leaf-navy); }
.qp-progress-bar .step-connector  { width: 8px; height: 0; flex-shrink: 0; }

/* Main content */
.qp-main {
  display: flex; flex-direction: column; align-items: center;
  padding: 48px 24px 0;
}
.qp-step {
  width: 100%; max-width: 820px;
  display: flex; flex-direction: column; align-items: center;
}
.qp-step[hidden] { display: none !important; }

.qp-title {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  font-weight: 900; color: var(--leaf-navy);
  text-transform: uppercase; letter-spacing: 0.05em;
  text-align: center; margin: 0 0 36px;
}
.qp-subtitle { color: var(--text-muted); font-size: 0.92rem; text-align: center; margin: -24px 0 28px; }
.qp-error { color: #ef4444; font-size: 0.88rem; font-weight: 600; text-align: center; min-height: 20px; margin-top: 16px; }

/* Location / Property big cards */
.qp-card-row {
  display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; width: 100%;
}
.qp-sel-card {
  width: 230px; min-height: 250px;
  background: #ffffff;
  border: 2.5px solid #d6dce8; border-radius: 20px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; padding: 32px 20px 28px;
  cursor: pointer; position: relative;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  user-select: none;
}
.qp-sel-card input[type='radio'] { position: absolute; opacity: 0; pointer-events: none; }
.qp-sel-card:hover:not(.selected) {
  border-color: #9faec8;
  box-shadow: 0 6px 24px rgba(15,27,51,0.08);
  transform: translateY(-2px);
}
.qp-sel-card.selected {
  border-color: var(--leaf-green); border-width: 3px;
  background: #f0fbf5;
  box-shadow: 0 8px 32px rgba(52,168,100,0.15);
}
.qp-card-icon { color: var(--leaf-green); width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }
.qp-card-icon svg { width: 100%; height: 100%; }
.qp-card-label { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--leaf-navy); text-align: center; }
.qp-card-sub { font-size: 0.77rem; color: var(--text-muted); text-align: center; font-weight: 500; }
.qp-card-check {
  position: absolute; top: 14px; right: 14px;
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--leaf-green);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transform: scale(0.5);
  transition: opacity 0.2s, transform 0.2s;
}
.qp-sel-card.selected .qp-card-check,
.qp-svc-card.selected .qp-card-check,
.qp-plan-card.selected .qp-card-check { opacity: 1; transform: scale(1); }
.qp-card-check svg { width: 14px; height: 14px; stroke: #fff; }

/* Service cards — image style like homepage */
.qp-service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 14px; width: 100%;
}
.qp-svc-card {
  aspect-ratio: 4 / 3; border-radius: 16px;
  position: relative; overflow: hidden;
  cursor: pointer;
  background-color: var(--leaf-navy);
  background-size: cover; background-position: center;
  border: 3px solid transparent;
  transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
  user-select: none;
}
.qp-svc-card input[type='checkbox'] { position: absolute; opacity: 0; pointer-events: none; }
.qp-svc-card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,18,40,0.9) 0%, rgba(10,18,40,0.2) 55%, transparent 100%);
  z-index: 1;
}
.qp-svc-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.28); }
.qp-svc-card.selected {
  border-color: var(--leaf-green);
  box-shadow: 0 0 0 3px rgba(52,168,100,0.4), 0 8px 28px rgba(0,0,0,0.25);
}
.qp-svc-name {
  position: absolute; bottom: 12px; left: 12px; right: 40px;
  color: #fff; font-family: var(--font-heading); font-size: 0.82rem;
  font-weight: 700; line-height: 1.3; z-index: 2;
}
.qp-svc-card .qp-card-check {
  position: absolute; top: 10px; right: 10px; z-index: 3;
  background: var(--leaf-green); width: 24px; height: 24px;
}
.qp-svc-card .qp-card-check svg { width: 12px; height: 12px; }

/* Plan grid — 3 side-by-side + one-time full-width row */
.qp-plan-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; width: 100%; max-width: 740px;
}
.qp-plan-card {
  background: #ffffff; border: 2.5px solid #d6dce8; border-radius: 18px;
  padding: 22px 20px;
  display: flex; flex-direction: column; gap: 6px;
  cursor: pointer; position: relative;
  transition: border-color 0.18s, box-shadow 0.18s, transform 0.15s;
  user-select: none;
}
.qp-plan-card input[type='radio'] { position: absolute; opacity: 0; pointer-events: none; }
.qp-plan-card:hover:not(.selected) {
  border-color: #9faec8; transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15,27,51,0.08);
}
.qp-plan-card.selected {
  border-color: var(--leaf-green); border-width: 3px;
  background: #f0fbf5;
  box-shadow: 0 6px 24px rgba(52,168,100,0.2);
}
.qp-plan-card--featured { background: var(--leaf-navy); border-color: var(--leaf-navy); }
.qp-plan-card--featured.selected {
  border-color: var(--leaf-green);
  box-shadow: 0 6px 28px rgba(52,168,100,0.35), 0 0 0 3px rgba(52,168,100,0.18);
  background: var(--leaf-navy);
}
.qp-plan-card--onetime {
  grid-column: 1 / -1;
  flex-direction: row; align-items: center;
  gap: 20px; padding: 18px 24px;
}
.qp-plan-badge { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--leaf-green); margin-bottom: 2px; }
.qp-plan-card--featured .qp-plan-badge { color: var(--leaf-mint); }
.qp-plan-name { font-family: var(--font-heading); font-size: 1rem; font-weight: 800; color: var(--leaf-navy); text-transform: uppercase; letter-spacing: 0.06em; }
.qp-plan-card--featured .qp-plan-name { color: #fff; }
.qp-plan-savings { font-family: var(--font-heading); font-size: 2rem; font-weight: 900; color: var(--leaf-navy); line-height: 1; margin: 6px 0 2px; }
.qp-plan-savings span { font-size: 0.95rem; font-weight: 800; color: var(--leaf-green); }
.qp-plan-card--featured .qp-plan-savings { color: #fff; }
.qp-plan-card--featured .qp-plan-savings span { color: var(--leaf-mint); }
.qp-plan-sub { font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
.qp-plan-card--featured .qp-plan-sub { color: rgba(255,255,255,0.58); }
.qp-plan-card--onetime .qp-plan-name { font-size: 1.05rem; }
.qp-plan-card--onetime .qp-plan-sub { flex: 1; font-size: 0.88rem; }
.qp-plan-card .qp-card-check { position: absolute; top: 12px; right: 12px; }
.qp-plan-card--onetime .qp-card-check { position: static; margin-left: auto; }

/* Forms */
.qp-form { width: 100%; max-width: 540px; display: flex; flex-direction: column; gap: 16px; }
.qp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.qp-form-group { display: flex; flex-direction: column; gap: 6px; }
.qp-form-group label { font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--leaf-navy); }
.qp-form-group .req { color: var(--leaf-green); }
.qp-form-group .optional { color: var(--text-muted); font-weight: 500; text-transform: none; letter-spacing: 0; }
.qp-form-group input,
.qp-form-group select,
.qp-form-group textarea {
  border: 2px solid #d0d6e4; border-radius: 12px;
  padding: 12px 16px; font-size: 0.95rem;
  font-family: var(--font-body); color: var(--text-dark);
  background: #ffffff; outline: none;
  width: 100%; box-sizing: border-box;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.qp-form-group input:focus,
.qp-form-group select:focus,
.qp-form-group textarea:focus {
  border-color: var(--leaf-green);
  box-shadow: 0 0 0 3px rgba(52,168,100,0.12);
}
.qp-form-group textarea { resize: vertical; min-height: 90px; }
.qp-consents { display: flex; flex-direction: column; gap: 10px; padding-top: 6px; }
.qp-consents .consent-row { font-size: 0.84rem; }
.qp-consents .consent-row a { color: var(--leaf-green); }

/* Confirmation */
.qp-step--confirm { text-align: center; padding-top: 20px; }
.qp-confirm-icon { width: 72px; height: 72px; border-radius: 50%; background: var(--leaf-green); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
.qp-confirm-icon svg { width: 34px; height: 34px; stroke: #fff; }
.qp-jobber-note { color: var(--text-muted); font-size: 0.9rem; margin: 24px 0 14px; }
.qp-confirm-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.qp-btn-primary { background: var(--leaf-navy); color: #fff; padding: 13px 28px; border-radius: 999px; font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background 0.2s, transform 0.15s; }
.qp-btn-primary:hover { background: #1e3a6e; transform: translateY(-1px); }
.qp-btn-outline { border: 2px solid var(--leaf-navy); color: var(--leaf-navy); padding: 12px 28px; border-radius: 999px; font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background 0.2s, color 0.2s; }
.qp-btn-outline:hover { background: var(--leaf-navy); color: #fff; }
.wizard-summary { font-size: 0.88rem; color: var(--text-dark); background: #f0f3fa; border-radius: 14px; padding: 16px 22px; max-width: 420px; margin: 0 auto; line-height: 1.9; text-align: left; }

/* Bottom navigation */
.qp-nav {
  display: flex; align-items: center; justify-content: center;
  gap: 16px; padding: 28px 40px 44px;
}
.qp-next-btn {
  background: var(--leaf-navy); color: #fff; border: none;
  padding: 15px 52px; border-radius: 999px;
  font-family: var(--font-heading); font-weight: 800;
  font-size: 0.95rem; letter-spacing: 0.08em; text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(15,27,51,0.22);
}
.qp-next-btn:hover { background: #1e3a6e; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(15,27,51,0.28); }
.qp-back-btn {
  background: transparent; border: 2px solid #c8cfe0; color: #7a849c;
  padding: 14px 28px; border-radius: 999px;
  font-family: var(--font-heading); font-weight: 700; font-size: 0.88rem;
  cursor: pointer; transition: border-color 0.2s, color 0.2s;
}
.qp-back-btn:hover { border-color: var(--leaf-navy); color: var(--leaf-navy); }

/* Responsive */
@media (max-width: 700px) {
  .qp-topbar, .qp-nav { padding-left: 18px; padding-right: 18px; }
  .qp-progress-bar { padding: 14px 18px 16px; }
  .qp-main { padding: 32px 14px 0; }
  .qp-title { font-size: 1.3rem; }
  .qp-sel-card { width: 100%; min-height: auto; flex-direction: row; padding: 18px 20px; }
  .qp-card-icon { width: 48px; height: 48px; flex-shrink: 0; }
  .qp-plan-grid { grid-template-columns: 1fr; }
  .qp-plan-card--onetime { flex-direction: column; align-items: flex-start; }
  .qp-form-row { grid-template-columns: 1fr; }
  .qp-service-grid { grid-template-columns: repeat(2, 1fr); }
  .qp-next-btn { width: 100%; padding: 15px 24px; }
  .qp-back-btn { padding: 14px 20px; }
}

`;

const si = c.indexOf(startMarker);
const ei = c.indexOf(endMarker);
const result = c.slice(0, si) + newSection + '\n' + c.slice(ei);
fs.writeFileSync(path, result, 'utf8');
console.log('CSS updated. Length:', result.length);
