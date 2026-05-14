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

  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const ticket = TICKET_LABELS[getState("selectedTicket")];

  let uni = "";
  if (getState("selectedType") === "student") {
    uni = document.getElementById("university").value;
  } else if (getState("selectedType") === "friend") {
    uni = "Friend of " + document.getElementById("friend-name").value.trim();
  }

  return new URLSearchParams({ name, email, phone, ticket, amount_sent: amount, uni });
}

function _submitAndRedirect(params) {
  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?" + params.toString();
  document.body.appendChild(script);
  const successUrl = window.location.pathname.replace(/index\.html$/, "") + "success.html";
  setTimeout(() => { window.location.href = successUrl; }, 1500);
}

/**
 * Confirm payment from inside the modal (step B)
 */
function confirmPaymentModal() {
  const amountEl = document.getElementById("confirm-amount-modal");
  const amountErr = document.getElementById("confirm-error-modal");
  const val = parseFloat(amountEl.value);

  if (!val || val < 1) {
    amountErr.style.display = "block";
    amountEl.classList.add("error");
    return;
  }

  amountEl.classList.remove("error");
  amountErr.style.display = "none";
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
