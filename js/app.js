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

function initApp() {
  const spotsText = document.getElementById("spots-text");
  if (spotsText) spotsText.textContent = `${TAKEN_SPOTS} / ${TOTAL_SPOTS}`;
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) progressFill.style.width = `${Math.round((TAKEN_SPOTS / TOTAL_SPOTS) * 100)}%`;

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
