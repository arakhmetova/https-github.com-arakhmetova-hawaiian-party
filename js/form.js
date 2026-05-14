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
  const lang = getState("currentLang");

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

    // University (student only)
    if (getState("selectedType") === "student") {
      const uni = document.getElementById("university");
      const uniOk = uni && uni.value.trim();
      setFieldError(uni, document.getElementById("uni-error"), !uniOk);
      if (!uniOk) valid = false;
    }

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

    // Phone
    const phoneEl = document.getElementById("phone");
    const phoneOk = phoneEl && isValidPhone(phoneEl.value);
    setFieldError(phoneEl, document.getElementById("phone-error"), !phoneOk);
    if (!phoneOk) valid = false;

    // Rules checkbox
    const rulesCheck = document.getElementById("rules-check");
    const rulesOk = rulesCheck && rulesCheck.checked;
    const checkmark = document.getElementById("rules-checkmark");
    if (checkmark) checkmark.classList.toggle("error", !rulesOk);
    const rulesErr = document.getElementById("rules-error");
    if (rulesErr) rulesErr.style.display = rulesOk ? "none" : "block";
    if (!rulesOk) valid = false;

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

  document.getElementById("sum-total").textContent = TICKET_PRICES[getState("selectedTicket")] || "—";

  const payerName =
    getState("selectedTicket") === "grp"
      ? document.getElementById("group1")?.value.trim() || ""
      : document.getElementById("fullname")?.value.trim() || "";

  document.getElementById("copy-text").textContent = `Hawaiian Party — ${payerName}`;
  document.getElementById("modal-link").href = PAYPAL_LINKS[getState("selectedTicket")];
}
