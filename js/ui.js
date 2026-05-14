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
  document.getElementById("type-error").style.display = "none";
}

/**
 * Navigate to a specific step
 * @param {number} n - Step number (1, 2, or 3)
 */
function goStep(n) {
  if (n > getState("currentStep") && !validateStep(getState("currentStep"))) return;

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
