/* ════════════════════════════════════════════════════════════════════════ */
/* Configuration & Constants                                               */
/* ════════════════════════════════════════════════════════════════════════ */

let party_spots = { total: 30, taken: 3, remaining: 27 };
async function getData() {
  const url = "https://kettelerlife.vercel.app/api/dorm_party/party_spots";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    party_spots = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

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
//const TOTAL_SPOTS = party_spots.total;
//const TAKEN_SPOTS = party_spots.taken;
//const TOTAL_SPOTS = 30;
//const TAKEN_SPOTS = 3;
//const REMAINING_SPOTS = party_spots.remaining;

// Cloudflare Worker URL (proxies to Google Apps Script, adds CORS + token)
const SCRIPT_URL = "https://hawaiian-party.aigul-akhmetova.workers.dev";
