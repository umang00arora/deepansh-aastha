import { useEffect, useState } from "react";
const target = new Date("2027-01-16T00:00:00+05:30").getTime();
export default function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, target - now);
  const values = [
    ["Days", Math.floor(diff / 86400000)],
    ["Hours", Math.floor((diff / 3600000) % 24)],
    ["Minutes", Math.floor((diff / 60000) % 60)],
    ["Seconds", Math.floor((diff / 1000) % 60)],
  ];
  return <div className="countdown" aria-label="Countdown to the wedding">
    {values.map(([label, value]) => <div className="countdown-unit" key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}