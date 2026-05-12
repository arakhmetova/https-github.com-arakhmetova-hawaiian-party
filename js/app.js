/* ════════════════════════════════════════════════════════════════════════ */
/* Application Initialization                                              */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Initialize the application
 */
function initApp() {
  // Initialize spots and progress
  document.getElementById("spots-text").textContent = `${TAKEN_SPOTS} / ${TOTAL_SPOTS}`;
  document.getElementById("progress-fill").style.width = `${Math.round((TAKEN_SPOTS / TOTAL_SPOTS) * 100)}%`;

  // Set initial language
  setLang("en");

  // Set up countdown timer
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // Set up modal closers
  setupPaymentModalClosers();
  setupRulesModalClosers();
}

/**
 * Run initialization when DOM is ready
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
