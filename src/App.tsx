import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, ArrowUpRight, CalendarDays, Check, Clock3, Flower2, Heart, MapPin, Menu, Music2, Sparkles, X } from "lucide-react";
import { ceremonies, families, wedding } from "./data/wedding";
import Countdown from "./components/Countdown";
import { CornerOrnament, Mandala, Petals } from "./components/Ornaments";

const reveal = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: .85, ease: [0.22, 1, 0.36, 1] } } };
const nav = [["Home", "home"], ["Invitation", "invitation"], ["Our Family", "families"], ["Celebrations", "celebrations"], ["Venue", "venue"], ["Gallery", "gallery"]];

function Opening({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  useEffect(() => {
    if (!isOpening) return;
    const timer = window.setTimeout(onOpen, 1750);
    return () => window.clearTimeout(timer);
  }, [isOpening, onOpen]);
  return (
    <motion.div className="opening-screen" animate={isOpening ? { opacity: 0, transition: { delay: 1.35, duration: .4 } } : { opacity: 1 }}>
      <div className="opening-grain" />
      <CornerOrnament className="opening-corner top-left" />
      <CornerOrnament className="opening-corner bottom-right" />
      <div className="opening-blessing" aria-label="Ganesh invocation">
        <img src="/ganpati.svg" alt="Shri Ganesh" />
        <p lang="sa">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br/>निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥</p>
      </div>
      <motion.div className={`invitation-envelope ${isOpening ? "is-opening" : ""}`}
        initial={{ opacity: 0, y: 30, scale: .94 }}
        animate={isOpening ? { opacity: 0, scale: 2.7, y: -15, transition: { delay: .85, duration: 3.5, ease: [0.22, 1, 0.36, 1] } } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1 }}>
        <div className="envelope-top" />
        <div className="envelope-card">
          <Mandala className="card-mandala" />
          <p className="eyebrow">A CELEBRATION OF LOVE</p>
          <div className="script-title">Deepansh <i>&</i> Astha</div>
          <div className="tiny-rule"><span>✦</span></div>
          <p className="card-date">16 — 18 JANUARY 2027</p><p className="card-place">SITAPUR · INDIA</p>
        </div>
        <motion.div className="envelope-flap" animate={isOpening ? { rotateX: 180, opacity: .2 } : { rotateX: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.7, 0, .2, 1] }} />
        <motion.div className="wax-seal" style={{ x: "-50%", y: "-50%" }} animate={isOpening ? { opacity: 0, scale: .5 } : { opacity: 1, scale: 1 }} transition={{ duration: .3 }}><span>D&amp;A</span></motion.div>
      </motion.div>
      <motion.button type="button" className="open-button" onClick={() => setIsOpening(true)} disabled={isOpening} animate={isOpening ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }} aria-label="Open wedding invitation">
        {isOpening ? "Opening your invitation…" : <>Open your invitation <ArrowDown size={15} /></>}
      </motion.button>
      {!isOpening && <button type="button" className="skip-opening" onClick={onOpen}>Skip intro</button>}
    </motion.div>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 650);
      const current = nav.map(([, id]) => id).reverse().find(id => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top < window.innerHeight * .45;
      });
      if (current) setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActive(id); setMenuOpen(false); }
  async function share() {
    const url = wedding.siteUrl;
    const text = `You're invited to celebrate the wedding of Deepansh & Astha!\n16–18 January 2027\nRudra Imperial Resort, Sitapur.\nExplore the wedding invitation: ${url}`;
    if (navigator.share) { try { await navigator.share({ title: "Deepansh & Astha — Wedding Invitation", text, url }); } catch { /* share dismissed */ } }
    else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }
  function addCalendar() {
    const lines = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Deepansh and Astha//Wedding//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH"];
    ceremonies.forEach(c => {
      const d = new Date(c.start);
      const end = new Date(d.getTime() + 90 * 60000);
      const fmt = (v: Date) => v.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      lines.push("BEGIN:VEVENT",`UID:${c.id}-deepansh-astha-2027@wedding` ,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(d)}`,`DTEND:${fmt(end)}`,`SUMMARY:${c.name} — Deepansh & Astha`,`LOCATION:${wedding.venue}, ${wedding.city}`,`DESCRIPTION:Wedding celebration of Deepansh and Astha.`,`END:VEVENT`);
    });
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "deepansh-astha-wedding.ics"; a.click(); URL.revokeObjectURL(a.href);
  }

  if (!entered) return <Opening onOpen={() => setEntered(true)}/>;

  return <motion.div className="site-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
    <Petals/>
    <header className="site-header">
      <button className="brand-mark" onClick={() => go("home")} aria-label="Go to home">D<span>&</span>A</button>
      <nav className="desktop-nav">{nav.map(([label, id]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{nav.map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</motion.nav>}</AnimatePresence>

    <main>
      <section className="hero" id="home">
        <div className="hero-bg"/>
        <CornerOrnament className="hero-ornament top-left"/><CornerOrnament className="hero-ornament bottom-right"/>
        <div className="hero-content">
          <motion.p className="eyebrow gold-text" initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.28em" }} transition={{ delay: .2, duration: 1.2 }}>TOGETHER WITH HIS FAMILY</motion.p>
          <motion.div className="hero-names" initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: 1.1 }}>
            <span>{wedding.groom.name}</span><i>&</i><span>{wedding.bride.name}</span>
          </motion.div>
          <motion.div className="parents-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <div><small>SON OF</small><span>{wedding.groom.father} & {wedding.groom.mother}</span></div>
            <b>✦</b>
            <div><small>DAUGHTER OF</small><span>{wedding.bride.father} & {wedding.bride.mother}</span></div>
          </motion.div>
          <motion.div className="hero-divider" initial={{ width: 0 }} animate={{ width: 170 }} transition={{ delay: 1.2, duration: 1 }}/>
          <motion.p className="hero-invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}>Request the pleasure of your company<br/>at their wedding celebrations</motion.p>
          <motion.p className="hero-date" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55 }}>16 <span>—</span> 18 JANUARY 2027</motion.p>
          <motion.p className="hero-venue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.75 }}>{wedding.venue} · {wedding.city}</motion.p>
          <motion.button className="scroll-cue" onClick={() => go("invitation")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></motion.button>
        </div>
        <div className="hero-bottom-note">A NEW CHAPTER · A TIMELESS PROMISE</div>
      </section>

      <section className="intro-section section-pad" id="invitation">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>01 — THE INVITATION</motion.div>
        <motion.div className="intro-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Mandala className="intro-mandala"/>
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILIES</p>
          <h2>Two souls, one beautiful journey.</h2>
          <div className="tiny-rule"><span>✦</span></div>
          <p className="invitation-copy">With immense joy, we invite you to be a part of the wedding celebrations of <strong>Deepansh & Astha</strong>.</p>
          <p className="invitation-copy">As two families come together and two hearts begin a beautiful journey, your presence and blessings will make these moments even more memorable.</p>
          <p className="invitation-copy">Join us for three days of love, laughter, traditions, and celebrations.</p>
          <div className="signature">With love & joy</div>
        </motion.div>
      </section>

      <section className="families-section section-pad" id="families">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>02 — THE PEOPLE WHO MAKE US</motion.div>
        <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="eyebrow">WITH THE BLESSINGS OF OUR FAMILY</p><h2>Our <em>Family</em></h2>
          <p>With the love, blessings, and support of our family, we invite you to celebrate this beautiful beginning.</p>
        </motion.div>
        <div className="family-grid">
          <motion.article className="family-card groom-family-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Mandala className="family-watermark"/><span className="family-index">01</span>
            <p className="eyebrow">THE GROOM'S SIDE</p><h3>{families.groom.title}</h3>
            <div className="family-list">{families.groom.members.map(m => <div key={m.role}><small>{m.role}</small><p>{m.names}</p></div>)}</div>
          </motion.article>
        </div>
        <p className="family-closing">With the blessings of our elders and the love of our families, we look forward to celebrating this joyous occasion with you.</p>
      </section>

      <section className="events-section section-pad" id="celebrations">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>03 — THE WEDDING FESTIVITIES</motion.div>
        <motion.div className="section-heading light-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="eyebrow">SIX MOMENTS · THREE DAYS</p><h2>Let the <em>celebrations</em> begin</h2>
          <p>Every ritual, every laugh, every little moment — we can't wait to celebrate with you.</p>
        </motion.div>
        <div className="events-list">{ceremonies.map((c, i) => <motion.article className={`event-card ${c.mood}`} key={c.id} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }}>
          <div className="event-number">0{i+1}</div>
          <div className="event-symbol">{c.symbol}</div>
          <div className="event-info"><p className="eyebrow">{c.date}</p><h3>{c.name}</h3><p>{c.description}</p><div className="event-meta"><span><Clock3 size={14}/>{c.time}</span><span><MapPin size={14}/>{wedding.venue}</span></div></div>
          <div className="event-flourish"><Flower2 size={54} strokeWidth={.8}/></div>
        </motion.article>)}</div>
      </section>

      <section className="countdown-section section-pad">
        <Mandala className="countdown-mandala"/>
        <p className="eyebrow">THE MOMENT WE'VE BEEN WAITING FOR</p>
        <h2>Until we say <em>“I do”</em></h2>
        <Countdown/>
        <p className="countdown-caption">16 JANUARY 2027 · THE CELEBRATIONS BEGIN</p>
      </section>

      <section className="venue-section section-pad" id="venue">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>04 — THE DESTINATION</motion.div>
        <div className="venue-layout">
          <motion.div className="venue-art" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="venue-arch"><div className="venue-arch-inner"><span>✦</span><b>R</b><span>✦</span></div></div>
            <div className="venue-art-caption">A PLACE FOR OUR<br/>FAVOURITE PEOPLE</div>
          </motion.div>
          <motion.div className="venue-copy" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="eyebrow">SAVE THE LOCATION</p><h2>Meet us at<br/><em>the celebration.</em></h2>
            <h3>{wedding.venue}</h3><p>{wedding.city}</p>
            <a className="button button-gold" href={wedding.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a>
            <button className="calendar-button" onClick={addCalendar}><CalendarDays size={16}/> Add all celebrations to calendar</button>
          </motion.div>
        </div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>05 — LITTLE GLIMPSES</motion.div>
        <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="eyebrow">A STORY STILL UNFOLDING</p><h2>Moments to <em>remember</em></h2><p>A few frames from the beginning of forever.</p>
        </motion.div>
        <div className="gallery-grid">
          <div className="gallery-tile tile-one"><span>THE BEGINNING</span></div>
          <div className="gallery-tile tile-two"><span>TOGETHER</span></div>
          <div className="gallery-tile tile-three"><span>FOREVER, IN THE MAKING</span></div>
        </div>
        <p className="gallery-note">Your photographs can be added in <code>public/images</code> and connected in the gallery styles.</p>
      </section>

    </main>

    <footer className="site-footer">
      <Mandala className="footer-mandala"/>
      <p className="eyebrow">WITH LOVE & BLESSINGS</p>
      <div className="footer-names">Deepansh <i>&</i> Astha</div>
      <p>16 — 18 JANUARY 2027</p>
      <p className="footer-venue">{wedding.venue} · {wedding.city}</p>
      <div className="footer-actions"><button onClick={share}>Share invitation <ArrowUpRight size={14}/></button><button onClick={addCalendar}>Save the dates <CalendarDays size={14}/></button></div>
      <div className="footer-bottom">MADE WITH LOVE · D & A · 2027</div>
    </footer>

    <button className="floating-share" onClick={share} aria-label="Share invitation"><Heart size={17}/></button>
    <AnimatePresence>{showTop && <motion.button className="back-top" onClick={() => go("home")} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} aria-label="Back to top"><ArrowUp size={17}/></motion.button>}</AnimatePresence>
  </motion.div>;
}

export default App;