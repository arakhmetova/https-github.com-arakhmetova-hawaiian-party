/* ════════════════════════════════════════════════════════════════════════ */
/* Payment Functions                                                       */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Open payment modal (always starts at step A)
 */
function openPayModal() {
  showModalPaypal();
  document.getElementById("modal").classList.add("open");
}

function showModalPaypal() {
  document.getElementById("modal-step-a").style.display = "block";
  document.getElementById("modal-step-b").style.display = "none";
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
    if (onlineSub) onlineSub.innerHTML = '<span data-lang="en">for 2 people · PayPal</span><span data-lang="de">für 2 Personen · PayPal</span>';
    if (doorAmount) doorAmount.textContent = "14 €";
    if (doorSub) doorSub.innerHTML = '<span data-lang="en">for 2 at the door</span><span data-lang="de">für 2 an der Abendkasse</span>';
  } else {
    if (onlineAmount) onlineAmount.textContent = "5 €";
    if (onlineSub) onlineSub.textContent = "PayPal";
    if (doorAmount) doorAmount.textContent = "7 €";
    if (doorSub) doorSub.innerHTML = '<span data-lang="en">if spots remain</span><span data-lang="de">falls noch Plätze frei</span>';
  }
}

function showModalConfirm() {
  setTimeout(() => {
    document.getElementById("modal-step-a").style.display = "none";
    document.getElementById("modal-step-b").style.display = "block";
    document.getElementById("confirm-amount-modal").value = "";
    document.getElementById("confirm-error-modal").style.display = "none";
  }, 300);
}

/**
 * Close payment modal
 */
function closePayModal() {
  document.getElementById("modal").classList.remove("open");
}

/**
 * Copy participant name to clipboard for PayPal note
 */
function copyName() {
  const text = document.getElementById("copy-text").textContent;
  const btn = document.getElementById("copy-btn");
  const prev = btn.innerHTML;

  const done = () => {
    btn.classList.add("copied");
    btn.innerHTML = getState("currentLang") === "en" ? "Copied!" : "Kopiert!";
    setTimeout(() => {
      btn.innerHTML = prev;
      btn.classList.remove("copied");
    }, 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) {}
  document.body.removeChild(ta);
}

function _buildSubmitParams(amount) {
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

  const paymentNote = document.getElementById("payment-note")?.value.trim() || "";
  return new URLSearchParams({ name, email, ticket, amount_sent: amount, uni, guest_name: guestName, guest_email: guestEmail, payment_note: paymentNote });
}

let _submitting = false;

function _submitAndRedirect(params) {
  if (_submitting) return;
  _submitting = true;
  const successUrl = window.location.pathname.replace(/index\.html$/, "") + "success.html";
  fetch(SCRIPT_URL + "?" + params.toString(), { method: "GET", mode: "no-cors" })
    .catch(() => {})
    .finally(() => { window.location.href = successUrl; });
}

/**
 * Confirm payment from inside the modal (step B)
 */
function confirmPaymentModal() {
  const amountEl = document.getElementById("confirm-amount-modal");
  const amountErr = document.getElementById("confirm-error-modal");
  const val = parseFloat(amountEl.value);
  if (!val || val < 5) {
    amountErr.textContent = getState("currentLang") === "en"
      ? "Please enter the amount you sent (minimum 5 €)"
      : "Bitte gib den gesendeten Betrag ein (mindestens 5 €)";
    amountErr.style.display = "block";
    amountEl.classList.add("error");
    return;
  }

  amountEl.classList.remove("error");
  amountErr.style.display = "none";

  const btn = document.getElementById("confirm-btn");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = getState("currentLang") === "en" ? "Sending..." : "Wird gesendet...";
    btn.style.opacity = "0.7";
  }

  _submitAndRedirect(_buildSubmitParams(val.toFixed(2)));
}

/**
 * Set up payment modal click-outside closing
 */
function setupPaymentModalClosers() {
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) closePayModal();
  });
}
