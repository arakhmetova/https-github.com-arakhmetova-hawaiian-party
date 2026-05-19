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
  await getData(); 
  const spotsText = document.getElementById("spots-text");
  if (spotsText) spotsText.textContent = `${party_spots.taken} / ${party_spots.total}`;
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) progressFill.style.width = `${Math.round((party_spots.taken / party_spots.total) * 100)}%`;

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
