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
  document.getElementById("spots-text").textContent = `${TAKEN_SPOTS} / ${TOTAL_SPOTS}`;
  document.getElementById("progress-fill").style.width = `${Math.round((TAKEN_SPOTS / TOTAL_SPOTS) * 100)}%`;

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
