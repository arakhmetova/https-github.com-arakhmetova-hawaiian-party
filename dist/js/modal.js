/* ════════════════════════════════════════════════════════════════════════ */
/* Rules Modal Functions                                                   */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Open rules modal
 * @param {Event} e - Click event
 */
function openRules(e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("rules-modal").classList.add("open");
}

/**
 * Close rules modal and confirm agreement
 */
function closeRules() {
  document.getElementById("rules-modal").classList.remove("open");
  document.getElementById("rules-check").checked = true;
  const checkmark = document.getElementById("rules-checkmark");
  if (checkmark) checkmark.classList.remove("error");
  document.getElementById("rules-error").style.display = "none";
}

/**
 * Set up rules modal click-outside closing
 */
function setupRulesModalClosers() {
  document.getElementById("rules-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("rules-modal")) closeRules();
  });
}
