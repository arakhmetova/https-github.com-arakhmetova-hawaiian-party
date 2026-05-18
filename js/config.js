/* ════════════════════════════════════════════════════════════════════════ */
/* Configuration & Constants                                               */
/* ════════════════════════════════════════════════════════════════════════ */

// PayPal payment links for each ticket type
const PAYPAL_LINKS = {
  std: "https://www.paypal.com/pool/9pfOvXkFAc?sr=ancr",
  grp: "https://www.paypal.com/pool/9pfOvXkFAc?sr=ancr",
  duo: "https://www.paypal.com/pool/9pfOvXkFAc?sr=ancr",
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

// Cloudflare Worker URL (proxies to Google Apps Script, adds CORS + token)
const SCRIPT_URL = "https://hawaiian-party.aigul-akhmetova.workers.dev";
