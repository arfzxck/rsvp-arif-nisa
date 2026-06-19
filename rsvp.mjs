const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby8VYhfnv1wQFtFgyCM4fBXf54_brtUwB-4dVq_cvBZjT8l8dI1P_ES-jHOG4WMxumv/exec";

async function submitRSVP() {
  const name = document.getElementById("name").value;
  const pax = document.getElementById("pax").value;
  const status = document.querySelector("input[name='status']:checked")?.value;

  if (!name || !pax || !status) {
    alert("Sila lengkapkan maklumat RSVP");
    return;
  }

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({
        name,
        pax,
        status,
        timestamp: new Date().toISOString()
      })
    });

    const result = await res.json();

    if (result.ok) {
      alert("RSVP berjaya dihantar!");
      document.getElementById("rsvp-form").reset();
    } else {
      alert("Gagal hantar RSVP");
    }

  } catch (err) {
    console.error(err);
    alert("Error semasa hantar RSVP");
  }
}
