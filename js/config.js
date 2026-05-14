/* ════════════════════════════════════════════════════════════════════════ */
/* Configuration & Constants                                               */
/* ════════════════════════════════════════════════════════════════════════ */

// PayPal payment links for each ticket type
const PAYPAL_LINKS = {
  std: "https://www.paypal.me/arakhmetova09/5",
  grp: "https://www.paypal.me/arakhmetova09/12",
};

// Ticket display labels
const TICKET_LABELS = {
  std: "Online — 5 €",
  grp: "Group 3 people — 12 €",
};

// Ticket prices in euros
const TICKET_PRICES = {
  std: "5.00 €",
  grp: "12.00 €",
};

// Event capacity
const TOTAL_SPOTS = 30;
const TAKEN_SPOTS = 14;

// Google Sheets Script URL for data submission
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyblrE-JHvdrLLxwqMxVR7yk2lAVq_lfPrIyYRleeE_bIWy6QOqPvQX4ty_mjKTBEo/exec";
