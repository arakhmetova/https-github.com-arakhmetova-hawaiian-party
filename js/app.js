/* ════════════════════════════════════════════════════════════════════════ */
/* Application Initialization                                              */
/* ════════════════════════════════════════════════════════════════════════ */

let _nonce = null;

async function fetchNonce() {
  try {
    const res = await fetch(SCRIPT_URL + "?action=nonce");
    const data = await res.json();
    _nonce = data.nonce || null;
  } catch (e) {
    _nonce = null;
  }
}

function getNonce() {
  return _nonce;
}

async function fetchSpots() {
  try {
    const res = await fetch(SCRIPT_URL + "?action=spots");
    const data = await res.json();
    const taken = data.taken || 0;
    const total = data.total || 250;
    const spotsText = document.getElementById("spots-text");
    if (spotsText) spotsText.textContent = `${taken} / ${total} spots taken`;
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) progressFill.style.width = `${Math.min(100, Math.round((taken / total) * 100))}%`;
  } catch (e) {}
}

async function initApp() {
  fetchSpots();
  setLang("en");
  setupPaymentModalClosers();
  setupRulesModalClosers();
  fetchNonce();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
