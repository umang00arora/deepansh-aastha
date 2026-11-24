import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed." });

  const scriptUrl = process.env.APPS_SCRIPT_URL;
  if (!scriptUrl) return res.status(500).json({ ok: false, error: "RSVP backend is not configured." });

  try {
    const upstream = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });
    const raw = await upstream.text();
    let result: { ok?: boolean; error?: string };
    try { result = JSON.parse(raw); }
    catch { return res.status(502).json({ ok: false, error: "The RSVP service returned an unreadable response." }); }
    if (!upstream.ok || !result.ok) return res.status(502).json({ ok: false, error: result.error || "The RSVP could not be saved." });
    return res.status(200).json({ ok: true, message: "RSVP saved." });
  } catch {
    return res.status(502).json({ ok: false, error: "Could not reach the RSVP service. Please try again." });
  }
}
