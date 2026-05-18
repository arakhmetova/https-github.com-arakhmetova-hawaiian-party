/* ════════════════════════════════════════════════════════════════════════ */
/* Application Initialization                                              */
/* ════════════════════════════════════════════════════════════════════════ */

function initApp() {
  document.getElementById("spots-text").textContent = `${TAKEN_SPOTS} / ${TOTAL_SPOTS}`;
  document.getElementById("progress-fill").style.width = `${Math.round((TAKEN_SPOTS / TOTAL_SPOTS) * 100)}%`;

  setLang("en");

  setupPaymentModalClosers();
  setupRulesModalClosers();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
