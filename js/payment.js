/* ════════════════════════════════════════════════════════════════════════ */
/* Payment Functions                                                       */
/* ════════════════════════════════════════════════════════════════════════ */

async function validateResident(name) {
  try {
    const nonce = getNonce() || "";
    const url = SCRIPT_URL + "?action=validate_resident&name=" + encodeURIComponent(name) + "&nonce=" + encodeURIComponent(nonce);
    const res = await fetch(url);
    const data = await res.json();
    return data.valid === true;
  } catch (e) {
    return true; // fail open — don't block user if network error
  }
}

/**
 * Open payment modal (always starts at step A)
 */
function openPayModal() {
  document.getElementById("modal").classList.add("open");
  initTurnstile();
  _populateModalSummary();
}

function _populateModalSummary() {
  const el = document.getElementById("modal-summary");
  if (!el) return;
  const isGrp = getState("selectedTicket") === "grp";
  const hasGuest = getState("bringGuest");
  const price = isGrp ? "12 €" : hasGuest ? "10 €" : "5 €";
  let names = "";
  if (isGrp) {
    names = ["group1","group2","group3"].map(id => document.getElementById(id)?.value.trim()).filter(Boolean).join(", ");
  } else {
    names = document.getElementById("fullname")?.value.trim() || "";
    if (hasGuest) names += " + " + (document.getElementById("guest-name")?.value.trim() || "");
  }
  el.innerHTML = `<strong>${names}</strong><br><span style="color:#3aaa7a;font-weight:600;">${price}</span>`;

  const promoEl = document.getElementById("modal-shots-promo");
  const waBtn = document.getElementById("modal-whatsapp-btn");
  if (promoEl && waBtn) {
    const isSolo = !isGrp && !hasGuest;
    promoEl.style.display = isSolo ? "block" : "none";
    if (isSolo) {
      const lang = getState("currentLang") === "de" ? "de" : "en";
      const text = lang === "de"
        ? "Ich hab gerade ein Ticket für die Hawaiian Party am 12. Juni gekauft 🌴 Kauf auch eines – wir bekommen beide 2 Gratis-Shots! Nur noch wenige Plätze: ketteler-party.social"
        : "Just got my ticket for the Hawaiian Party on June 12 🌴 Get yours too — we'll both get 2 free shots at the door! Limited spots: ketteler-party.social";
      waBtn.href = "https://wa.me/?text=" + encodeURIComponent(text);
    }
  }
}

function toggleGuest() {
  const active = !getState("bringGuest");
  updateState("bringGuest", active);
  document.getElementById("guest-toggle-check").classList.toggle("checked", active);
  document.getElementById("guest-fields").style.display = active ? "block" : "none";

  const onlineAmount = document.getElementById("hero-online-amount");
  const onlineSub = document.getElementById("hero-online-sub");
  const doorAmount = document.getElementById("hero-door-amount");
  const doorSub = document.getElementById("hero-door-sub");
  if (active) {
    if (onlineAmount) onlineAmount.textContent = "10 €";
    if (onlineSub) onlineSub.innerHTML = '<span data-lang="en">for 2 people · Stripe</span><span data-lang="de">für 2 Personen · Stripe</span>';
    if (doorAmount) doorAmount.textContent = "14 €";
    if (doorSub) doorSub.innerHTML = '<span data-lang="en">for 2 at the door</span><span data-lang="de">für 2 an der Abendkasse</span>';
  } else {
    if (onlineAmount) onlineAmount.textContent = "5 €";
    if (onlineSub) onlineSub.textContent = "Stripe";
    if (doorAmount) doorAmount.textContent = "7 €";
    if (doorSub) doorSub.innerHTML = '<span data-lang="en">if spots remain</span><span data-lang="de">falls noch Plätze frei</span>';
  }
}


/**
 * Close payment modal
 */
function closePayModal() {
  document.getElementById("modal").classList.remove("open");
}


let _tsWidgetId = null;
let _tsToken = null;

function initTurnstile() {
  const widget = document.getElementById("turnstile-widget");
  if (!widget || typeof turnstile === "undefined" || _tsWidgetId !== null) return;
  _tsWidgetId = turnstile.render(widget, {
    sitekey: "0x4AAAAAADSM6_ICAyQbmf27",
    size: "invisible",
    callback: (token) => { _tsToken = token; },
    "error-callback": () => { _tsToken = null; },
    "expired-callback": () => { _tsToken = null; },
  });
  turnstile.execute(_tsWidgetId);
}

async function getTurnstileToken() {
  if (_tsToken) {
    const t = _tsToken;
    _tsToken = null;
    if (_tsWidgetId !== null) turnstile.reset(_tsWidgetId);
    return t;
  }
  // Wait up to 5s for token
  return new Promise((resolve) => {
    let attempts = 0;
    const interval = setInterval(() => {
      if (_tsToken) {
        clearInterval(interval);
        const t = _tsToken;
        _tsToken = null;
        if (_tsWidgetId !== null) turnstile.reset(_tsWidgetId);
        resolve(t);
      } else if (++attempts > 50) {
        clearInterval(interval);
        resolve("");
      }
    }, 100);
  });
}

function _buildSubmitParams() {
  const name =
    getState("selectedTicket") === "grp"
      ? [
          document.getElementById("group1")?.value.trim() || "",
          document.getElementById("group2")?.value.trim() || "",
          document.getElementById("group3")?.value.trim() || "",
        ]
          .filter(Boolean)
          .join(", ")
      : document.getElementById("fullname")?.value.trim() || "";

  const email = document.getElementById("email")?.value.trim() || "";
  const ticket = TICKET_LABELS[getState("selectedTicket")];

  let uni = "";
  if (getState("selectedType") === "student") {
    uni = "student";
  } else if (getState("selectedType") === "friend") {
    uni = "Friend of " + (document.getElementById("friend-name")?.value.trim() || "");
  }

  const guestName = getState("bringGuest") ? (document.getElementById("guest-name")?.value.trim() || "") : "";
  const guestEmail = getState("bringGuest") ? (document.getElementById("guest-email")?.value.trim() || "") : "";

  const honeypot = document.getElementById("website")?.value || "";
  const nonce = getNonce() || "";
  return new URLSearchParams({ name, email, ticket, uni, guest_name: guestName, guest_email: guestEmail, website: honeypot, nonce });
}

let _submitting = false;

function _submitAndRedirect(params) {
  if (_submitting) return;
  _submitting = true;

  const btn = document.getElementById("confirm-btn");
  const err = document.getElementById("confirm-error-modal");

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    mode: "cors",
  })
    .then(async res => {
      if (res.status === 429) {
        _submitting = false;
        if (btn) { btn.disabled = false; btn.innerHTML = getState("currentLang") === "en" ? "Pay now ✓" : "Jetzt zahlen ✓"; btn.style.opacity = "1"; }
        if (err) {
          err.textContent = getState("currentLang") === "en"
            ? "You have already submitted. Please try again in 1 hour."
            : "Du hast bereits eine Anfrage gesendet. Bitte versuche es in 1 Stunde erneut.";
          err.style.display = "block";
        }
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        _submitting = false;
        if (btn) { btn.disabled = false; btn.innerHTML = getState("currentLang") === "en" ? "Pay now ✓" : "Jetzt zahlen ✓"; btn.style.opacity = "1"; }
        if (err) { err.textContent = "Something went wrong. Please try again."; err.style.display = "block"; }
      }
    })
    .catch(() => {
      _submitting = false;
      if (btn) { btn.disabled = false; btn.innerHTML = getState("currentLang") === "en" ? "Pay now ✓" : "Jetzt zahlen ✓"; btn.style.opacity = "1"; }
      if (err) { err.textContent = "Something went wrong. Please try again."; err.style.display = "block"; }
    });
}

/**
 * Confirm payment — redirects to Stripe Checkout
 */
async function confirmPaymentModal() {
  const err = document.getElementById("confirm-error-modal");
  if (err) err.style.display = "none";

  const btn = document.getElementById("confirm-btn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = getState("currentLang") === "en" ? "Redirecting..." : "Weiterleitung...";
    btn.style.opacity = "0.7";
  }

  // Always fetch a fresh nonce right before submitting
  await fetchNonce();

  const tsToken = await getTurnstileToken();
  const params = _buildSubmitParams();
  if (tsToken) params.set("ts_token", tsToken);
  _submitAndRedirect(params);
}

/**
 * Set up payment modal click-outside closing
 */
function setupPaymentModalClosers() {
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) closePayModal();
  });
}
