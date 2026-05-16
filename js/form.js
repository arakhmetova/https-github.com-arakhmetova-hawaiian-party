/* ════════════════════════════════════════════════════════════════════════ */
/* Form Validation & Summary                                               */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Validate a full name string.
 * Rules: at least 2 words, each word at least 3 characters,
 * words may contain letters, hyphens, apostrophes (double-barrelled names etc.)
 */
function isValidFullName(name) {
  if (!name || !name.trim()) return false;
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return false;
  return words.every((w) => w.replace(/[-']/g, "").length >= 2 && /^[A-Za-zÀ-ÖØ-öø-ÿ'\-]+$/.test(w));
}

/**
 * Validate email format.
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/**
 * Validate phone number.
 * Accepts international format: optional +, digits, spaces, hyphens, parentheses.
 * Must have at least 7 digits.
 */
function isValidPhone(phone) {
  const stripped = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{7,15}$/.test(stripped);
}

/**
 * Show or hide an error message element.
 */
function setFieldError(fieldEl, errorEl, show) {
  if (fieldEl) fieldEl.classList.toggle("error", show);
  if (errorEl) errorEl.style.display = show ? "block" : "none";
}

/**
 * Validate current step.
 * @param {number} step
 * @returns {boolean}
 */
function validateStep(step) {
  if (step === 1) {
    const hasTicket = !!getState("selectedTicket");
    setFieldError(null, document.getElementById("ticket-error"), !hasTicket);
    return hasTicket;
  }

  if (step === 2) {
    let valid = true;

    // Participant type
    const hasType = !!getState("selectedType");
    setFieldError(null, document.getElementById("type-error"), !hasType);
    if (!hasType) valid = false;

    // Friend name (friend only)
    if (getState("selectedType") === "friend") {
      const friendName = document.getElementById("friend-name");
      const friendOk = friendName && isValidFullName(friendName.value);
      setFieldError(friendName, document.getElementById("friend-error"), !friendOk);
      if (!friendOk) valid = false;
    }

    // Name fields
    if (getState("selectedTicket") === "grp") {
      ["group1", "group2", "group3"].forEach((id) => {
        const el = document.getElementById(id);
        const errEl = document.getElementById(id + "-error");
        const ok = el && isValidFullName(el.value);
        setFieldError(el, errEl, !ok);
        if (!ok) valid = false;
      });
      // Check all three names are different
      const g1 = document.getElementById("group1")?.value.trim().toLowerCase();
      const g2 = document.getElementById("group2")?.value.trim().toLowerCase();
      const g3 = document.getElementById("group3")?.value.trim().toLowerCase();
      if (g1 && g2 && g3 && (g1 === g2 || g2 === g3 || g1 === g3)) {
        ["group1", "group2", "group3"].forEach((id) => {
          const el = document.getElementById(id);
          const errEl = document.getElementById(id + "-error");
          if (errEl) {
            errEl.textContent = getState("currentLang") === "en"
              ? "All three names must be different people"
              : "Alle drei Namen müssen verschiedene Personen sein";
            errEl.style.display = "block";
          }
          if (el) el.classList.add("error");
        });
        valid = false;
      }
    } else {
      const fullname = document.getElementById("fullname");
      const nameOk = fullname && isValidFullName(fullname.value);
      setFieldError(fullname, document.getElementById("name-error"), !nameOk);
      if (!nameOk) valid = false;
    }

    // Email
    const emailEl = document.getElementById("email");
    const emailOk = emailEl && isValidEmail(emailEl.value);
    setFieldError(emailEl, document.getElementById("email-error"), !emailOk);
    if (!emailOk) valid = false;

    // Rules checkbox
    const rulesCheck = document.getElementById("rules-check");
    const rulesOk = rulesCheck && rulesCheck.checked;
    const checkmark = document.getElementById("rules-checkmark");
    if (checkmark) checkmark.classList.toggle("error", !rulesOk);
    const rulesErr = document.getElementById("rules-error");
    if (rulesErr) rulesErr.style.display = rulesOk ? "none" : "block";
    if (!rulesOk) valid = false;

    // Guest fields (if opted in)
    if (getState("bringGuest")) {
      const guestName = document.getElementById("guest-name");
      const guestNameOk = guestName && isValidFullName(guestName.value);
      setFieldError(guestName, document.getElementById("guest-name-error"), !guestNameOk);
      if (!guestNameOk) valid = false;

      const guestEmail = document.getElementById("guest-email");
      const guestEmailOk = guestEmail && isValidEmail(guestEmail.value);
      setFieldError(guestEmail, document.getElementById("guest-email-error"), !guestEmailOk);
      if (!guestEmailOk) valid = false;
    }

    return valid;
  }

  return true;
}

/**
 * Build and display summary for payment review.
 */
function buildSummary() {
  document.getElementById("sum-ticket").textContent = TICKET_LABELS[getState("selectedTicket")] || "—";

  let names = "";
  if (getState("selectedTicket") === "grp") {
    names = ["group1", "group2", "group3"]
      .map((id) => document.getElementById(id)?.value.trim())
      .filter(Boolean)
      .join(", ");
  } else {
    names = document.getElementById("fullname")?.value.trim() || "";
  }
  document.getElementById("sum-names").textContent = names;

  document.getElementById("sum-email").textContent =
    document.getElementById("email")?.value.trim() || "";

  let uni = "";
  if (getState("selectedType") === "student") {
    uni = document.getElementById("university")?.value || "";
  } else if (getState("selectedType") === "friend") {
    uni = "Friend of " + (document.getElementById("friend-name")?.value.trim() || "");
  }
  document.getElementById("sum-uni").textContent = uni || "—";

  const isGrp = getState("selectedTicket") === "grp";
  const hasGuest = getState("bringGuest");

  // Total price
  let totalPrice, totalAmount;
  if (isGrp) {
    totalPrice = "12.00 €"; totalAmount = "12.00";
  } else if (hasGuest) {
    totalPrice = "10.00 €"; totalAmount = "10.00";
  } else {
    totalPrice = "5.00 €"; totalAmount = "5.00";
  }
  document.getElementById("sum-total").textContent = totalPrice;

  // Guest row
  const guestRow = document.getElementById("sum-guest-row");
  const guestEl = document.getElementById("sum-guest");
  if (hasGuest) {
    const gName = document.getElementById("guest-name")?.value.trim() || "";
    const gEmail = document.getElementById("guest-email")?.value.trim() || "";
    guestEl.textContent = `${gName} · ${gEmail}`;
    guestRow.style.display = "";
  } else {
    guestRow.style.display = "none";
  }

  const doorRow = document.getElementById("sum-door-row");
  const doorEl = document.getElementById("sum-door");
  if (isGrp) {
    doorEl.textContent = "21 € (3 × 7 €)";
    doorRow.style.display = "";
  } else {
    doorRow.style.display = "none";
  }

  // Copy text and PayPal link
  let copyText, paypalLink;
  if (isGrp) {
    const g1 = document.getElementById("group1")?.value.trim() || "";
    const g2 = document.getElementById("group2")?.value.trim() || "";
    const g3 = document.getElementById("group3")?.value.trim() || "";
    copyText = `Hawaiian Party — ${g1}, ${g2}, ${g3} — 12 €`;
    paypalLink = PAYPAL_LINKS.grp;
  } else if (hasGuest) {
    const name = document.getElementById("fullname")?.value.trim() || "";
    const gName = document.getElementById("guest-name")?.value.trim() || "";
    copyText = `Hawaiian Party — ${name} + ${gName} — 10 €`;
    paypalLink = PAYPAL_LINKS.duo;
  } else {
    const name = document.getElementById("fullname")?.value.trim() || "";
    copyText = `Hawaiian Party — ${name} — 5 €`;
    paypalLink = PAYPAL_LINKS.std;
  }

  document.getElementById("copy-text").textContent = copyText;
  document.getElementById("modal-link").href = paypalLink;

  // Pre-fill modal confirm amount
  const amountModalEl = document.getElementById("confirm-amount-modal");
  if (amountModalEl) amountModalEl.placeholder = totalAmount;
}
