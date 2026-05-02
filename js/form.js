/* ════════════════════════════════════════════════════════════════════════ */
/* Form Validation & Summary                                               */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Validate current step
 * @param {number} step - Step to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateStep(step) {
  if (step === 1) {
    if (!getState("selectedTicket")) {
      document.getElementById("ticket-error").textContent =
        getState("currentLang") === "en"
          ? "Please select a ticket"
          : "Bitte wählen Sie ein Ticket";
      document.getElementById("ticket-error").style.display = "block";
      return false;
    }
    return true;
  }

  if (step === 2) {
    let valid = true;

    // Validate participant type
    if (!getState("selectedType")) {
      document.getElementById("type-error").textContent =
        getState("currentLang") === "en"
          ? "Please select who you are"
          : "Bitte wählen Sie, wer Sie sind";
      document.getElementById("type-error").style.display = "block";
      valid = false;
    }

    // Validate university selection for students
    if (getState("selectedType") === "student") {
      const uni = document.getElementById("university");
      if (!uni || !uni.value.trim()) {
        uni.classList.add("error");
        valid = false;
      } else {
        uni.classList.remove("error");
      }
    }

    // Validate friend name for friends
    if (getState("selectedType") === "friend") {
      const friendName = document.getElementById("friend-name");
      if (!friendName || !friendName.value.trim()) {
        friendName.classList.add("error");
        valid = false;
      } else {
        friendName.classList.remove("error");
      }
    }

    // Validate ticket-specific fields
    if (getState("selectedTicket") === "grp") {
      // Group ticket - validate all name fields
      const group = [
        document.getElementById("group-name-1"),
        document.getElementById("group-name-2"),
        document.getElementById("group-name-3"),
      ];
      group.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        } else {
          field.classList.remove("error");
        }
      });
    } else {
      // Single ticket - validate full name
      const fullname = document.getElementById("fullname");
      if (!fullname || !fullname.value.trim()) {
        fullname.classList.add("error");
        valid = false;
      } else {
        fullname.classList.remove("error");
      }
    }

    // Validate email
    const email = document.getElementById("email");
    if (!email || !email.value.trim()) {
      email.classList.add("error");
      valid = false;
    } else {
      email.classList.remove("error");
    }

    // Validate phone
    const phone = document.getElementById("phone");
    if (!phone || !phone.value.trim()) {
      phone.classList.add("error");
      valid = false;
    } else {
      phone.classList.remove("error");
    }

    // Validate rules checkbox
    const rulesCheck = document.getElementById("rules-check");
    if (!rulesCheck || !rulesCheck.checked) {
      const checkmark = document.getElementById("rules-checkmark");
      if (checkmark) checkmark.classList.add("error");
      document.getElementById("rules-error").textContent =
        getState("currentLang") === "en"
          ? "You must agree to the rules"
          : "Sie müssen den Regeln zustimmen";
      document.getElementById("rules-error").style.display = "block";
      valid = false;
    } else {
      const checkmark = document.getElementById("rules-checkmark");
      if (checkmark) checkmark.classList.remove("error");
      document.getElementById("rules-error").style.display = "none";
    }

    return valid;
  }

  return true;
}

/**
 * Build and display summary for payment review
 */
function buildSummary() {
  // Ticket type
  document.getElementById("sum-ticket").textContent = TICKET_LABELS[getState("selectedTicket")] || "—";

  // Names
  let names = "";
  if (getState("selectedTicket") === "grp") {
    names = [
      document.getElementById("group-name-1")?.value.trim(),
      document.getElementById("group-name-2")?.value.trim(),
      document.getElementById("group-name-3")?.value.trim(),
    ]
      .filter(Boolean)
      .join(", ");
  } else {
    names = document.getElementById("fullname")?.value.trim() || "";
  }
  document.getElementById("sum-names").textContent = names;

  // Email
  document.getElementById("sum-email").textContent =
    document.getElementById("email")?.value.trim() || "";

  // University / Friend reference
  let uni = "";
  if (getState("selectedType") === "student") {
    uni = document.getElementById("university")?.value || "";
  } else if (getState("selectedType") === "friend") {
    uni = "Friend of " + (document.getElementById("friend-name")?.value.trim() || "");
  }
  document.getElementById("sum-uni").textContent = uni || "—";

  // Total price
  document.getElementById("sum-total").textContent = TICKET_PRICES[getState("selectedTicket")] || "—";

  // Set copy text for payment (name for Revolut)
  const payerName =
    getState("selectedTicket") === "grp"
      ? document.getElementById("group-name-1")?.value.trim() || ""
      : document.getElementById("fullname")?.value.trim() || "";
  document.getElementById("copy-text").textContent = `Kostenbeteiligung Hawaiian Party — ${payerName}`;
  document.getElementById("modal-link").href = REVOLUT_LINKS[getState("selectedTicket")];
}
