const SHEET_NAME = "Tabellenblatt1";
const SECRET_TOKEN = "hwp-2026-k3tt3l3r";
const SPREADSHEET_ID = "1BZjrkzeD-P9yJhcam0vPdSats1c7Dkxy15nDmZPbISY";

const COL_TIMESTAMP         = 1;
const COL_NAME              = 2;
const COL_EMAIL             = 3;
const COL_TICKET            = 4;
const COL_AMOUNT            = 5;
const COL_UNI               = 6;
const COL_GUEST_NAME        = 7;
const COL_GUEST_EMAIL       = 8;
const COL_CONFIRMED         = 9;
const COL_RESIDENT_NAME     = 10;
const COL_RESIDENT_STATUS   = 11; // "pending" | "approved" | "rejected"

// ── Resident list ──────────────────────────────────────────────────────────
const RESIDENTS = [
  { first: "Tim",                  last: "Ragg",                 wohnheim: "tim.ragg@ketteler-wohnheim.de",                        private: "tim.ragg@gmx.de" },
  { first: "Alexandra",            last: "Cenuse",               wohnheim: "alexandra.cenuse@ketteler-wohnheim.de",                 private: "cenuse.alexandra0@gmail.com" },
  { first: "Mara",                 last: "Neubauer",             wohnheim: "mara.neubauer@ketteler-wohnheim.de",                   private: "mara.neubauer@gmx.de" },
  { first: "Sanjot Singh",         last: "Sachdeva",             wohnheim: "sanjot.singh.sachdeva@ketteler-wohnheim.de",           private: "sanjot105@gmail.com" },
  { first: "Anton",                last: "Kantsemal",            wohnheim: "anton.kantsemal@ketteler-wohnheim.de",                 private: "kantsemal@gmail.com" },
  { first: "Johannes",             last: "Göhde",                wohnheim: "johannes.goehde@ketteler-wohnheim.de",                 private: "johannes.goehde@pm.me" },
  { first: "Saba",                 last: "Nagervadze",           wohnheim: "saba.nagervadze@ketteler-wohnheim.de",                 private: "saba.navergadze.2077@gmail.com" },
  { first: "Thi Quynh Nhu",        last: "Nguyen",               wohnheim: "tnguyen@ketteler-wohnheim.de",                         private: "nhunguyenftu@gmail.com" },
  { first: "Zakaria",              last: "Limame",               wohnheim: "zakaria.limame@ketteler-wohnheim.de",                  private: "Zakarialimame20@gmail.com" },
  { first: "Tamaris",              last: "Kessler",              wohnheim: "tamaris.kessler@ketteler-wohnheim.de",                 private: "kesslertamaris@gmail.com" },
  { first: "Harun",                last: "Khokhar",              wohnheim: "harun.khokhar@ketteler-wohnheim.de",                   private: "harun2611@hotmail.de" },
  { first: "Felix",                last: "Pietrek",              wohnheim: "felix.pietrek@ketteler-wohnheim.de",                   private: "felix-pietrek@t-online.de" },
  { first: "Delaram",              last: "Moeini",               wohnheim: "delaram.moeini@ketteler-wohnheim.de",                  private: "dellaram80@gmail.com" },
  { first: "Pavit Singh",          last: "Sachdeva",             wohnheim: "pavit.singh.sachdeva@ketteler-wohnheim.de",            private: "pavitsingh@gmx.de" },
  { first: "Paul",                 last: "Thiede",               wohnheim: "paul.thiede@ketteler-wohnheim.de",                     private: "paulthied11@gmail.com" },
  { first: "Antoni",               last: "Zarifoglu",            wohnheim: "antoni.zarifoglu@ketteler-wohnheim.de",                private: "antonizarifoglu15@gmail.com" },
  { first: "Kesava Sree Mallika",  last: "Boddapaty",            wohnheim: "kesava.sree.mallika.boddapaty@ketteler-wohnheim.de",   private: "bksmallika@gmail.com" },
  { first: "Sushmitha",            last: "Pais",                 wohnheim: "sushmitha.pais@ketteler-wohnheim.de",                  private: "paissushmitha@gmail.com" },
  { first: "Omar",                 last: "Ghannam",              wohnheim: "omar.ghannam@ketteler-wohnheim.de",                    private: "omar.ghannam@outlook.de" },
  { first: "Anna",                 last: "Schwarzkopf",          wohnheim: "anna.schwarzkopf@ketteler-wohnheim.de",                private: "anna-schwarzkopf@gmx.de" },
  { first: "Malek",                last: "Bediaf",               wohnheim: "malek.bediaf@ketteler-wohnheim.de",                   private: "malekbedhiaf@yahoo.com" },
  { first: "Manish",               last: "Kumar",                wohnheim: "manish.kumar@ketteler-wohnheim.de",                   private: "manishk.1991@gmail.com" },
  { first: "Matthias",             last: "Wicker",               wohnheim: "matthias.wicker@ketteler-wohnheim.de",                private: "matthiaswicker@gmx.de" },
  { first: "Alexander",            last: "Ben Ali",              wohnheim: "alexander.ben.ali@ketteler-wohnheim.de",               private: "alexander.benali@yahoo.com" },
  { first: "Angela",               last: "Boakye",               wohnheim: "angela.boakye@ketteler-wohnheim.de",                  private: "angela.boa94@gmail.com" },
  { first: "Yogesh",               last: "Thakur",               wohnheim: "yogesh.thakur@ketteler-wohnheim.de",                  private: "katalyogesh@gmail.com" },
  { first: "Thomas",               last: "Sierro Cavalcante",    wohnheim: "thomas.sierro.cavalcante@ketteler-wohnheim.de",        private: "thomasscavalcante@hotmail.com" },
  { first: "Mirka",                last: "Barth Bazzani",        wohnheim: "mirka.barth.bazzani@ketteler-wohnheim.de",             private: "mirkabarthbazzani@gmail.com" },
  { first: "Julia",                last: "Gonzalez",             wohnheim: "julia.gonzalez@ketteler-wohnheim.de",                  private: "juliagonzalez5453@gmail.com" },
  { first: "Onur Cem",             last: "Polat",                wohnheim: "onur.cem.polat@ketteler-wohnheim.de",                  private: "onurcempolat@hotmail.com" },
  { first: "Kritika",              last: "Dass",                 wohnheim: "kritika.dass@ketteler-wohnheim.de",                   private: "kritika_dass@yahoo.com" },
  { first: "Carola",               last: "Feldmann",             wohnheim: "carola.feldmann@ketteler-wohnheim.de",                 private: "carolafeldmann@t-online.de" },
  { first: "Esther",               last: "Omurunga",             wohnheim: "esther.omurunga@ketteler-wohnheim.de",                 private: "e.m.omurunga@gmail.com" },
  { first: "Vedant",               last: "Porwal",               wohnheim: "vedant.porwal@ketteler-wohnheim.de",                  private: "vedantporwal@gmail.com" },
  { first: "Margarita",            last: "Makolova",             wohnheim: "margarita.makolova@ketteler-wohnheim.de",              private: "queen.margarita09@gmail.com" },
  { first: "Konstantin",           last: "Diegmüller",           wohnheim: "konstantin.diegmueller@ketteler-wohnheim.de",          private: "konstantin.diegmüller@gmx.de" },
  { first: "Florian",              last: "Schuster",             wohnheim: "florian.schuster@ketteler-wohnheim.de",                private: "florianschuster59@gmx.net" },
  { first: "Lavinia",              last: "Mihut",                wohnheim: "lavinia.mihut@ketteler-wohnheim.de",                   private: "loredana-lavinia.mihut@stud.h-da.de" },
  { first: "Dina",                 last: "Ben Tkhayat",          wohnheim: "dina.ben.tkhayat@ketteler-wohnheim.de",                private: "dinabentkhayat@gmail.com" },
  { first: "Simon",                last: "Wagner",               wohnheim: "simon.wagner@ketteler-wohnheim.de",                   private: "sijo.olymp@gmx.de" },
  { first: "Marcel",               last: "Riess",                wohnheim: "marcel.riess@ketteler-wohnheim.de",                   private: "marcel.riess02@gmail.com" },
  { first: "Aigul",                last: "Akhmetova",            wohnheim: "aigul.akhmetova@ketteler-wohnheim.de",                 private: "aiahri0909@gmail.com" },
  { first: "Maryia",               last: "Vasileuskaya",         wohnheim: "maryia.vasileuskaya@ketteler-wohnheim.de",             private: "maryiavasileuskaya0306@gmail.com" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function normalize(s) {
  return (s || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function findResident(input) {
  const q = normalize(input);

  // 1. Exact full name match
  const exact = RESIDENTS.find(r => normalize(r.first + " " + r.last) === q);
  if (exact) return exact;

  // 2. First name only match (unique)
  const byFirst = RESIDENTS.filter(r => normalize(r.first) === q);
  if (byFirst.length === 1) return byFirst[0];

  // 3. Input starts with first name (e.g. "Alex" matches "Alexander")
  const byPrefix = RESIDENTS.filter(r => normalize(r.first).startsWith(q) || q.startsWith(normalize(r.first)));
  if (byPrefix.length === 1) return byPrefix[0];

  // 4. Fuzzy: input is contained in full name or vice versa
  const words = q.split(" ");
  const fuzzy = RESIDENTS.filter(r => {
    const full = normalize(r.first + " " + r.last);
    return words.every(w => full.includes(w));
  });
  if (fuzzy.length === 1) return fuzzy[0];

  return null;
}

function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}

// ── doGet ──────────────────────────────────────────────────────────────────

function doGet(e) {
  const p = e.parameter;
  const action = p.action || "submit";

  // ── Validate resident name (called from frontend) ──
  if (action === "validate_resident") {
    const found = !!findResident(p.name || "");
    return ContentService
      .createTextOutput(JSON.stringify({ valid: found }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // ── Resident clicks Yes/No in email ──
  if (action === "resident_response") {
    return handleResidentResponse(p);
  }

  // ── Main form submission ──
  if ((p.token || "") !== SECRET_TOKEN) {
    return ContentService.createTextOutput("Forbidden");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!p.email || !emailRegex.test(p.email)) {
    return ContentService.createTextOutput("Invalid email");
  }

  const amount = parseFloat(p.amount_sent || "0");
  if (amount < 1) {
    return ContentService.createTextOutput("Invalid amount");
  }

  const isFriend = (p.uni || "").startsWith("Friend of");
  const residentInputName = isFriend ? p.uni.replace("Friend of ", "").trim() : "";
  const resident = isFriend ? findResident(residentInputName) : null;

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([
    new Date(),
    p.name || "",
    p.email || "",
    p.ticket || "",
    amount,
    p.uni || "",
    p.guest_name || "",
    p.guest_email || "",
    false,
    resident ? (resident.first + " " + resident.last) : residentInputName,
    isFriend ? "pending" : "n/a",
  ]);

  const row = sheet.getLastRow();
  sheet.getRange(row, COL_CONFIRMED).insertCheckboxes();

  if (isFriend && resident) {
    sendResidentNotification(resident, p.name, row);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Send email to resident ─────────────────────────────────────────────────

function sendResidentNotification(resident, guestName, row) {
  const baseUrl = getScriptUrl();
  const yesUrl = baseUrl + "?action=resident_response&row=" + row + "&response=approved";
  const noUrl  = baseUrl + "?action=resident_response&row=" + row + "&response=rejected";

  const subject = "Someone listed you as their friend — Hawaiian Party June 12";

  const plainBody =
`Hi ${resident.first}!

${guestName} just registered for the Hawaiian Party on June 12 and said they know you.

Do you know this person?

YES, I know them: ${yesUrl}

NO, I don't know them: ${noUrl}

If you have any questions, just reply to this email.

The Ketteler Party Team`;

  const htmlBody = `
<div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
  <p style="margin:0 0 6px;font-size:16px;color:#1a1a1a;">Hi <strong>${resident.first}</strong>,</p>
  <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.6;">
    <strong>${guestName}</strong> just registered for the Hawaiian Party on June 12 and listed you as their friend. Do you know this person?
  </p>
  <a href="${yesUrl}" style="display:block;text-align:center;background:#3a8a50;color:#fff;text-decoration:none;padding:14px;border-radius:10px;font-size:15px;font-weight:600;margin-bottom:10px;">
    Yes, I know them
  </a>
  <a href="${noUrl}" style="display:block;text-align:center;background:#f5f5f5;color:#666;text-decoration:none;padding:13px;border-radius:10px;font-size:14px;font-weight:600;">
    No, I don't know them
  </a>
  <p style="margin:24px 0 0;font-size:12px;color:#aaa;">
    Hawaiian Party — Ketteler Wohnheim, June 12
  </p>
</div>`;

  const options = { htmlBody, noReply: true };
  GmailApp.sendEmail(resident.wohnheim, subject, plainBody, options);
  GmailApp.sendEmail(resident.private, subject, plainBody, options);
}

// ── Handle resident Yes/No response ───────────────────────────────────────

function handleResidentResponse(p) {
  const row = parseInt(p.row || "0");
  const response = p.response; // "approved" or "rejected"

  if (!row || !["approved", "rejected"].includes(response)) {
    return HtmlService.createHtmlOutput("<p>Invalid request.</p>");
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const maxRow = sheet.getLastRow();
  if (row < 2 || row > maxRow) {
    return HtmlService.createHtmlOutput("<p>Invalid request.</p>");
  }

  const currentStatus = sheet.getRange(row, COL_RESIDENT_STATUS).getValue();
  if (currentStatus === "approved" || currentStatus === "rejected") {
    return HtmlService.createHtmlOutput("<p>You have already responded. Thank you!</p>");
  }

  sheet.getRange(row, COL_RESIDENT_STATUS).setValue(response);

  const guestName = sheet.getRange(row, COL_NAME).getValue();

  if (response === "approved") {
    return HtmlService.createHtmlOutput(
      "<p>Thank you! We have noted that you know <strong>" + guestName + "</strong>.</p>"
    );
  } else {
    return HtmlService.createHtmlOutput(
      "<p>Thank you for letting us know. We will review this registration manually.</p>"
    );
  }
}

// ── onEdit: send confirmation email when payment is manually confirmed ─────

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== SHEET_NAME) return;
  if (e.range.getColumn() !== COL_CONFIRMED) return;
  if (e.range.getValue() !== true) return;

  const row = e.range.getRow();
  if (row <= 1) return;

  const fullName   = sheet.getRange(row, COL_NAME).getValue();
  const email      = sheet.getRange(row, COL_EMAIL).getValue();
  const ticket     = sheet.getRange(row, COL_TICKET).getValue();
  const amount     = sheet.getRange(row, COL_AMOUNT).getValue();
  const guestName  = sheet.getRange(row, COL_GUEST_NAME).getValue();
  const guestEmail = sheet.getRange(row, COL_GUEST_EMAIL).getValue();

  if (!email) return;

  const isGroup = ticket.toLowerCase().includes("group");
  const isDuo = !!guestName;
  const firstName = fullName.split(",")[0].trim().split(" ")[0];

  const spotText = isGroup
    ? "Your spots are confirmed for all 3 people!"
    : isDuo
    ? "Your spots are confirmed for you and " + guestName + "!"
    : "Your spot is confirmed!";

  const body =
"Hi " + firstName + "!\n\n" +
"We have received your payment of " + amount + " EUR for the Hawaiian Party.\n\n" +
spotText + "\n\n" +
"Date:       Friday, June 12, 2026\n" +
"Location:   Ketteler Wohnheim, Schleiermacherstrasse 14, Darmstadt\n" +
"Time:       21:00\n" +
"Dress code: Hawaiian — the more colourful, the better!\n\n" +
"See you there!\n" +
"The Ketteler Party Team\n\n" +
"---\n" +
"Cancellations: let us know at least 24 hours before the event for a full refund.";

  GmailApp.sendEmail(email, "Payment received — Hawaiian Party June 12!", body);

  if (isDuo && guestEmail && guestEmail !== email) {
    const guestBody =
"Hi " + guestName + "!\n\n" +
fullName + " has registered you for the Hawaiian Party on June 12!\n\n" +
"Date:       Friday, June 12, 2026\n" +
"Location:   Ketteler Wohnheim, Schleiermacherstrasse 14, Darmstadt\n" +
"Time:       21:00\n" +
"Dress code: Hawaiian — the more colourful, the better!\n\n" +
"See you there!\n" +
"The Ketteler Party Team";

    GmailApp.sendEmail(guestEmail, "You're invited — Hawaiian Party June 12!", guestBody);
  }
}
