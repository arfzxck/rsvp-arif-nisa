<script>
  // Firebase config (REPLACE THIS)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // RSVP FORM
  document.getElementById("rsvp-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const btn = document.getElementById("rsvp-submit");

    const name = document.getElementById("rsvp-name").value.trim();
    const pax = document.getElementById("rsvp-pax").value.trim();
    const status = document.getElementById("rsvp-status").value;

    if (!name || !pax || !status) return;

    btn.disabled = true;
    btn.textContent = "Menghantar...";

    try {
      await db.collection("rsvp").add({
        name: name,
        pax: Number(pax),
        status: status,
        createdAt: new Date()
      });

      document.getElementById("rsvp-success").style.display = "block";
      document.getElementById("rsvp-form").reset();

      btn.textContent = "Berjaya ✓";

    } catch (err) {
      console.error(err);
      alert("Gagal hantar RSVP. Cuba lagi.");
      btn.disabled = false;
      btn.textContent = "Hantar RSVP";
    }
  });
</script>
