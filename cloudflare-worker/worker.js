const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-6KfTQljoOzFdbdjPwlofRXt9ecaW1Qkfer6yk3uq3Xn2oFfwdKqW_ckd9fMObaN1/exec";
const SECRET_TOKEN = "hwp-2026-k3tt3l3r";
const ALLOWED_ORIGIN = "https://ketteler-party.social";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const params = url.searchParams;
    const action = params.get("action") || "submit";

    // Resident validation — return JSON response
    if (action === "validate_resident") {
      const target = `${APPS_SCRIPT_URL}?action=validate_resident&name=${encodeURIComponent(params.get("name") || "")}`;
      try {
        const res = await fetch(target, { redirect: "follow" });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ valid: true }), {
          headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
      }
    }

    // Form submission — fire and forget, redirect to success
    params.set("token", SECRET_TOKEN);
    const target = `${APPS_SCRIPT_URL}?${params.toString()}`;
    await fetch(target, { redirect: "follow" }).catch(() => {});

    return new Response("ok", { headers: CORS_HEADERS });
  },
};
