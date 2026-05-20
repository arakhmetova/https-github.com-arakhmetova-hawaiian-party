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

async function initApp() {
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
