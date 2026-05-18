/* ════════════════════════════════════════════════════════════════════════ */
/* State Management                                                        */
/* ════════════════════════════════════════════════════════════════════════ */

// Global application state
let state = {
  currentLang: "en",
  selectedTicket: null,
  selectedType: null,
  currentStep: 1,
  bringGuest: false,
};

/**
 * Update application state
 * @param {string} key - State key
 * @param {any} value - New value
 */
function updateState(key, value) {
  state[key] = value;
}

/**
 * Get state value
 * @param {string} key - State key
 * @returns {any} State value
 */
function getState(key) {
  return state[key];
}

/**
 * Reset state to initial values
 */
function resetState() {
  state = {
    currentLang: "en",
    selectedTicket: null,
    selectedType: null,
    currentStep: 1,
    bringGuest: false,
  };
}
