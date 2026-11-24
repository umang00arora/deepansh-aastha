import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Heart, LoaderCircle } from "lucide-react";
import { ceremonies } from "../data/wedding";

type Status = "accept" | "decline" | "";
const endpoint = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

export default function RSVP() {
  const [status, setStatus] = useState<Status>("");
  const [events, setEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<"accept" | "decline" | "">("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", guests: "1", dietary: "", message: "" });

  const update = (key: keyof typeof form, value: string) => setForm(old => ({ ...old, [key]: value }));
  const toggleEvent = (id: string) => setEvents(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  async function submit(e: FormEvent) {
    e.preventDefault(); setError("");
    if (!status) return setError("Please select whether you can join us.");
    if (status === "accept" && events.length === 0) return setError("Please select at least one celebration.");
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))) return setError("Please enter a valid 10-digit Indian mobile number.");
    if (!endpoint) return setError("RSVP is not connected yet. Configure the Vercel RSVP endpoint using the setup guide.");
    setLoading(true);
    const payload = {
      name: form.name.trim(), phone: form.phone.trim(), status,
      guests: status === "accept" ? Number(form.guests) : 0,
      events: status === "accept" ? events : [],
      dietary: form.dietary.trim(), message: form.message.trim(),
      website: window.location.href
    };
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "The RSVP could not be saved.");
      setDone(status);
      setForm({ name: "", phone: "", guests: "1", dietary: "", message: "" });
      setEvents([]);
      setStatus("");
    } catch {
      setError("We couldn't send your response. Please check your connection and try again.");
    } finally { setLoading(false); }
  }

  if (done) return <div className="rsvp-success">
    <CheckCircle2 size={42} strokeWidth={1.3}/>
    <p className="eyebrow">RSVP RECEIVED</p>
    <h3>{done === "accept" ? "We're so happy you'll be there!" : "Thank you for letting us know."}</h3>
    <p>{done === "accept" ? "Your presence will make our celebrations even more special." : "You'll be missed, and we appreciate your love and blessings."}</p>
    <button className="button button-outline" onClick={() => setDone("")}>Back to invitation</button>
  </div>;

  return <form className="rsvp-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Full name <span>*</span><input required value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name"/></label>
      <label>Mobile number <span>*</span><input required inputMode="numeric" maxLength={10} value={form.phone} onChange={e => update("phone", e.target.value.replace(/\D/g, ""))} placeholder="10-digit mobile number"/></label>
    </div>
    <fieldset>
      <legend>Will you be joining us? <span>*</span></legend>
      <div className="choice-row">
        <button type="button" className={`choice ${status === "accept" ? "selected" : ""}`} onClick={() => setStatus("accept")}><Heart size={16}/> Joyfully accept</button>
        <button type="button" className={`choice ${status === "decline" ? "selected" : ""}`} onClick={() => { setStatus("decline"); setEvents([]); }}>Regretfully decline</button>
      </div>
    </fieldset>
    {status === "accept" && <>
      <label>Number of guests (including yourself)<input type="number" min="1" max="30" value={form.guests} onChange={e => update("guests", e.target.value)}/></label>
      <fieldset>
        <legend>Which celebrations will you attend? <span>*</span></legend>
        <div className="event-checks">
          {ceremonies.map(c => <label className="event-check" key={c.id}>
            <input type="checkbox" checked={events.includes(c.id)} onChange={() => toggleEvent(c.id)}/>
            <span><strong>{c.name}</strong><small>{c.date.replace(/^[^,]+, /, "")} · {c.time}</small></span>
          </label>)}
        </div>
      </fieldset>
      <label>Dietary preferences <small>(optional)</small><input value={form.dietary} onChange={e => update("dietary", e.target.value)} placeholder="e.g. Vegetarian, Jain, allergies"/></label>
    </>}
    <label>A message for the couple <small>(optional)</small><textarea rows={3} value={form.message} onChange={e => update("message", e.target.value)} placeholder="Share your wishes..."/></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-gold submit-button" disabled={loading || !status}>
      {loading ? <><LoaderCircle className="spin" size={17}/> Sending…</> : "Send my RSVP"}
    </button>
    <p className="form-note">Your response will be shared with the wedding hosts for planning purposes.</p>
  </form>;
}