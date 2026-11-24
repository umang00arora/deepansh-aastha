/**
 * Deepansh & Astha Wedding RSVP endpoint
 *
 * 1. Create a Google Sheet and copy its ID from the URL.
 * 2. Set SPREADSHEET_ID below.
 * 3. Deploy as a Web App: Execute as Me; access: Anyone.
 * 4. Paste the /exec URL into VITE_RSVP_ENDPOINT.
 *
 * This endpoint writes guest data to the RSVP sheet. Do not add private
 * administrative credentials to the public website.
 */
const SPREADSHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const SHEET_NAME = "RSVP";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const name = String(data.name || "").trim();
    const phone = String(data.phone || "").replace(/\s+/g, "");
    const status = String(data.status || "");
    const guests = Number(data.guests || 0);
    const events = Array.isArray(data.events) ? data.events : [];

    if (!name || !/^[6-9]\d{9}$/.test(phone)) {
      return json_({ ok: false, error: "Invalid name or mobile number." });
    }
    if (!["accept", "decline"].includes(status)) {
      return json_({ ok: false, error: "Invalid attendance status." });
    }
    if (status === "accept" && (guests < 1 || guests > 30 || events.length < 1)) {
      return json_({ ok: false, error: "Please provide guest count and at least one event." });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Guest Name", "Mobile Number", "Attendance Status",
        "Number of Guests", "Selected Events", "Dietary Preferences", "Personal Message"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(), name, phone, status === "accept" ? "Accepted" : "Declined",
      status === "accept" ? guests : 0, events.join(", "),
      String(data.dietary || "").slice(0, 500),
      String(data.message || "").slice(0, 1000)
    ]);
    return json_({ ok: true, message: "RSVP saved." });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "Unable to save RSVP." });
  }
}

function doGet() {
  return json_({ ok: true, service: "Deepansh & Astha RSVP endpoint" });
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run once from the Apps Script editor after setting SPREADSHEET_ID.
 * Creates a basic summary sheet with live counts and ceremony attendance.
 */
function createDashboard() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let dash = ss.getSheetByName("Dashboard");
  if (!dash) dash = ss.insertSheet("Dashboard");
  dash.clear();
  dash.getRange("A1:B1").setValues([["DEEPANSH & ASTHA — RSVP DASHBOARD", ""]]);
  dash.getRange("A3:B8").setValues([
    ["Metric", "Value"],
    ["Total responses", '=COUNTA(RSVP!B2:B)'],
    ["Accepted responses", '=COUNTIF(RSVP!D2:D,"Accepted")'],
    ["Declined responses", '=COUNTIF(RSVP!D2:D,"Declined")'],
    ["Confirmed guests", '=SUM(RSVP!E2:E)'],
    ["Last updated", "=NOW()"]
  ]);
  dash.getRange("A10:B16").setValues([
    ["Ceremony", "Guest selections"],
    ["Haldi", '=COUNTIF(RSVP!F2:F,"*haldi*")'],
    ["Sangeet", '=COUNTIF(RSVP!F2:F,"*sangeet*")'],
    ["Mehndi", '=COUNTIF(RSVP!F2:F,"*mehndi*")'],
    ["Ghudchadi", '=COUNTIF(RSVP!F2:F,"*ghudchadi*")'],
    ["Phere", '=COUNTIF(RSVP!F2:F,"*phere*")'],
    ["Reception", '=COUNTIF(RSVP!F2:F,"*reception*")']
  ]);
  dash.autoResizeColumns(1, 2);
}
