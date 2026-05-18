/* ════════════════════════════════════════════════════════════════════════ */
/* UI Interactions                                                         */
/* ════════════════════════════════════════════════════════════════════════ */

/**
 * Set language and update UI
 * @param {string} lang - Language code ('en' or 'de')
 */
function setLang(lang) {
  updateState("currentLang", lang);
  document.body.className = `lang-${lang}`;
  document.querySelectorAll(".lang-btn").forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.lang-btn[onclick="setLang('${lang}')"]`).classList.add("active");
}

/**
 * Select a ticket type
 * @param {string} type - Ticket type ('std', 'grp')
 * @param {HTMLElement} el - Clicked element
 */
function selectTicket(type, el) {
  ["ticket-std", "ticket-grp"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.classList.remove("selected");
  });

  el.classList.add("selected");
  updateState("selectedTicket", type);
  document.getElementById("ticket-error").style.display = "none";

  document.getElementById("single-name-wrap").style.display = type === "grp" ? "none" : "block";
  document.getElementById("group-names-wrap").style.display = type === "grp" ? "block" : "none";

  if (type === "grp") {
    document.getElementById("guest-toggle-wrap").style.display = "none";
    if (getState("bringGuest")) {
      updateState("bringGuest", false);
      document.getElementById("guest-toggle-check").classList.remove("checked");
      document.getElementById("guest-fields").style.display = "none";
    }
  }

  const isGrp = type === "grp";
  const onlineAmount = document.getElementById("hero-online-amount");
  const onlineSub = document.getElementById("hero-online-sub");
  const doorAmount = document.getElementById("hero-door-amount");
  const doorSub = document.getElementById("hero-door-sub");
  if (onlineAmount) onlineAmount.textContent = isGrp ? "12 €" : "5 €";
  if (onlineSub) onlineSub.innerHTML = isGrp
    ? '<span data-lang="en">for 3 people · PayPal</span><span data-lang="de">für 3 Personen · PayPal</span>'
    : "PayPal";
  if (doorAmount) doorAmount.textContent = isGrp ? "21 €" : "7 €";
  if (doorSub) doorSub.innerHTML = isGrp
    ? '<span data-lang="en">for 3 at the door</span><span data-lang="de">für 3 an der Abendkasse</span>'
    : '<span data-lang="en">if spots remain</span><span data-lang="de">falls noch Plätze frei</span>';
}

/**
 * Select participant type (student or friend)
 * @param {string} type - Participant type ('student' or 'friend')
 * @param {HTMLElement} el - Clicked element
 */
function selectType(type, el) {
  ["type-student", "type-friend"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.classList.remove("selected");
  });

  el.classList.add("selected");
  updateState("selectedType", type);
  document.getElementById("uni-field").style.display = type === "student" ? "block" : "none";
  document.getElementById("friend-field").style.display = type === "friend" ? "block" : "none";
  const isGrpTicket = getState("selectedTicket") === "grp";
  document.getElementById("guest-toggle-wrap").style.display = (type === "friend" && !isGrpTicket) ? "block" : "none";
  document.getElementById("type-error").style.display = "none";

  // Reset guest state when switching type
  if (type !== "friend" && getState("bringGuest")) {
    updateState("bringGuest", false);
    document.getElementById("guest-toggle-check").classList.remove("checked");
    document.getElementById("guest-fields").style.display = "none";
  }
}

/**
 * Navigate to a specific step
 * @param {number} n - Step number (1, 2, or 3)
 */
async function goStep(n) {
  if (n > getState("currentStep")) {
    if (!validateStep(getState("currentStep"))) return;
    if (getState("currentStep") === 2 && getState("selectedType") === "friend") {
      const friendName = document.getElementById("friend-name");
      const friendErr = document.getElementById("friend-error");
      if (friendName && friendName.value.trim()) {
        const words = friendName.value.trim().split(/\s+/).filter(w => w.length > 0);
        if (words.length < 2) {
          friendErr.textContent = getState("currentLang") === "en"
            ? "Please enter both first and last name."
            : "Bitte Vor- und Nachname eingeben.";
          friendErr.style.display = "block";
          friendName.classList.add("error");
          return;
        }
        const btn = document.getElementById("btn-step2-next");
        const prevHtml = btn ? btn.innerHTML : null;
        if (btn) {
          btn.disabled = true;
          btn.innerHTML = getState("currentLang") === "en" ? "Verifying..." : "Wird geprüft...";
        }
        const valid = await validateResident(friendName.value.trim());
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = prevHtml;
        }
        if (!valid) {
          friendErr.textContent = getState("currentLang") === "en"
            ? "We couldn't find this resident. Please check the name."
            : "Dieser Bewohner wurde nicht gefunden. Bitte Namen prüfen.";
          friendErr.style.display = "block";
          friendName.classList.add("error");
          return;
        }
      }
    }
  }

  document.querySelectorAll(".step-panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`panel-${n}`).classList.add("active");

  for (let i = 1; i <= 3; i++) {
    const ind = document.getElementById(`step-ind-${i}`);
    ind.classList.remove("active", "done");
    if (i < n) ind.classList.add("done");
    else if (i === n) ind.classList.add("active");

    const dot = ind.querySelector(".step-dot");
    if (i < n) dot.textContent = "✓";
    else dot.textContent = i;
  }

  for (let i = 1; i <= 2; i++) {
    const line = document.getElementById(`line-${i}`);
    line.classList.toggle("done", i < n);
  }

  if (n === 3) buildSummary();

  updateState("currentStep", n);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
