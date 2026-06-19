export default async (req) => {

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  let data;

  try {
    data = await req.json();
  } catch {
    return new Response(
      JSON.stringify({
        error: "Invalid JSON"
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  const name = (data.name || "").trim();
  const pax = (data.pax || "").toString().trim();
  const status = (data.status || "").trim();

  if (!name || !pax || !status) {
    return new Response(
      JSON.stringify({
        error: "Maklumat tidak lengkap"
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbzqjO1XL48NX0f5exbjLf81lgtsRHhb75KvVNAWiq8mqWAhtvhronQVZLpMA4UOu_EN/exec";

    const response = await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          pax,
          status,
          timestamp: new Date().toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        "Google Script returned " + response.status
      );
    }

  } catch (err) {

    console.error(
      "Failed to save RSVP:",
      err
    );

    return new Response(
      JSON.stringify({
        error: "Failed to save RSVP"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: "RSVP berjaya dihantar"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const config = {
  path: "/api/rsvp",
  method: "POST"
};
