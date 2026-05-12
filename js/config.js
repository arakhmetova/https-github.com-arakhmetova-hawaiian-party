/* ════════════════════════════════════════════════════════════════════════ */
/* Configuration & Constants                                               */
/* ════════════════════════════════════════════════════════════════════════ */

// Revolut payment links for each ticket type
const REVOLUT_LINKS = {
  eb: "https://revolut.me/arakhmetova09?currency=EUR&amount=1700&note=Hawaiian%20Party%20-%20Early%20Bird",
  std: "https://revolut.me/arakhmetova09?currency=EUR&amount=2000&note=Hawaiian%20Party%20-%20Standard",
  grp: "https://revolut.me/arakhmetova09?currency=EUR&amount=4800&note=Hawaiian%20Party%20-%20Group%203%20Persons",
};

// Ticket display labels
const TICKET_LABELS = {
  eb: "Early Bird — 17 €",
  std: "Standard — 20 €",
  grp: "Group 3 people — 48 €",
};

// Ticket prices in euros
const TICKET_PRICES = {
  eb: "17.00 €",
  std: "20.00 €",
  grp: "48.00 €",
};

// Early bird deadline
const EARLY_BIRD_DEADLINE = new Date("2026-05-15T23:59:59");

// Event capacity
const TOTAL_SPOTS = 30;
const TAKEN_SPOTS = 14;

// Google Sheets Script URL for data submission
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyblrE-JHvdrLLxwqMxVR7yk2lAVq_lfPrIyYRleeE_bIWy6QOqPvQX4ty_mjKTBEo/exec";
