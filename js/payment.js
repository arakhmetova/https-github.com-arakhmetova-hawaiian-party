/* ════════════════════════════════════════════════════════════════════════ */
/* Payment Functions                                                       */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Open payment modal
 */
function openPayModal() {
  document.getElementById("modal").classList.add("open");
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

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    btn.innerHTML = getState("currentLang") === "en" ? "Copied!" : "Kopiert!";
    setTimeout(() => {
      btn.innerHTML = prev;
      btn.classList.remove("copied");
    }, 2000);
  });
}

/**
 * Confirm payment and submit form data
 */
function confirmPayment() {
  const amountEl = document.getElementById("confirm-amount");
  const amountErr = document.getElementById("confirm-error");
  const val = parseFloat(amountEl.value);

  if (!val || val < 1) {
    amountErr.textContent =
      getState("currentLang") === "en"
        ? "Please enter a valid amount"
        : "Bitte geben Sie einen gültigen Betrag ein";
    amountErr.style.display = "block";
    amountEl.classList.add("error");
    return;
  }

  amountEl.classList.remove("error");
  amountErr.style.display = "none";

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
  const amount = val.toFixed(2);

  let uni = "";
  if (getState("selectedType") === "student") {
    uni = document.getElementById("university").value;
  } else if (getState("selectedType") === "friend") {
    uni = "Friend of " + document.getElementById("friend-name").value.trim();
  }

  const successUrl = window.location.pathname.replace(/index\.html$/, "") + "success.html";

  const params = new URLSearchParams({
    name,
    email,
    phone,
    ticket,
    amount_sent: amount,
    uni,
  });

  const script = document.createElement("script");
  script.src = SCRIPT_URL + "?" + params.toString();
  document.body.appendChild(script);

  setTimeout(() => {
    window.location.href = successUrl;
  }, 1500);
}

/**
 * Set up payment modal click-outside closing
 */
function setupPaymentModalClosers() {
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal")) closePayModal();
  });
}
