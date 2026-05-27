import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════
   FLOATING LILY PETALS
   ═══════════════════════════════════════════════ */
const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${8 + Math.random() * 10}s`,
  delay: `${Math.random() * 12}s`,
  size: `${12 + Math.random() * 16}px`,
  opacity: 0.25 + Math.random() * 0.35,
  rotation: Math.random() * 360,
  drift: `${-20 + Math.random() * 40}px`,
}));

function LilyPetalSVG({ style }) {
  return (
    <svg viewBox="0 0 40 60" style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="30" rx="10" ry="28" fill="#c5d9b8" opacity="0.7" />
      <path d="M20 4 Q28 20 20 56 Q12 20 20 4" fill="#a8c89a" opacity="0.3" />
    </svg>
  );
}

function FloatingPetals() {
  return (
    <div className="floating-petals-container">
      {petals.map((p) => (
        <div
          key={p.id}
          className="floating-petal"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
            "--drift": p.drift,
          }}
        >
          <LilyPetalSVG
            style={{
              width: p.size,
              height: p.size,
              transform: `rotate(${p.rotation}deg)`,
              filter: "drop-shadow(0 2px 6px rgba(168,200,154,0.3))",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   GOLD SPARKLES
   ═══════════════════════════════════════════════ */
const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: `${2 + Math.random() * 4}px`,
  duration: `${3 + Math.random() * 5}s`,
  delay: `${Math.random() * 6}s`,
}));

function GoldSparkles() {
  return (
    <div className="gold-sparkles">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="gold-sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VINE DECORATION (SVG)
   ═══════════════════════════════════════════════ */
function VineDecoration({ flip = false }) {
  return (
    <svg
      viewBox="0 0 300 60"
      className="vine-decoration"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center vine */}
      <path
        d="M 30 30 Q 80 10 150 30 Q 220 50 270 30"
        stroke="#c5d9b8"
        strokeWidth="1.2"
        fill="none"
        opacity="0.6"
        strokeDasharray="4 3"
      />
      {/* Leaves */}
      {[60, 100, 140, 160, 200, 240].map((x, i) => (
        <ellipse
          key={i}
          cx={x}
          cy={30 + Math.sin((i * Math.PI) / 2.5) * 10}
          rx="6"
          ry="3"
          fill="#c5d9b8"
          opacity="0.45"
          transform={`rotate(${i * 30 - 40}, ${x}, ${30 + Math.sin((i * Math.PI) / 2.5) * 10})`}
        />
      ))}
      {/* Small lily buds */}
      {[80, 150, 220].map((x, i) => (
        <g key={`bud-${i}`} transform={`translate(${x}, ${25 + Math.sin((i * Math.PI) / 1.5) * 8})`}>
          {[-15, 0, 15].map((angle, j) => (
            <ellipse
              key={j}
              cx="0"
              cy="-6"
              rx="3"
              ry="8"
              fill="white"
              opacity={j === 1 ? 0.6 : 0.35}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx="0" cy="0" r="2" fill="#e8d5a0" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SECTION REVEAL HOOK (IntersectionObserver)
   ═══════════════════════════════════════════════ */
function useSectionReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

/* ═══════════════════════════════════════════════
   SECTION ICONS (SVGs)
   ═══════════════════════════════════════════════ */
const icons = {
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  venue: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  hotel: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="10" y2="6" />
      <line x1="14" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  map: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  chevronDown: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════
   DIAMOND DIVIDER
   ═══════════════════════════════════════════════ */
function DiamondDivider() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" style={{ flexShrink: 0, opacity: 0.5 }}>
      <path
        d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z"
        fill="#d4b96a"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SECTION SEPARATOR
   ═══════════════════════════════════════════════ */
function SectionSeparator() {
  return (
    <div className="section-separator">
      <div className="separator-line" />
      <div className="separator-dot" />
      <div className="separator-dot" />
      <div className="separator-dot" />
      <div className="separator-line separator-line-right" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COUNTDOWN SECTION
   ═══════════════════════════════════════════════ */
function CountdownSection() {
  const [ref, revealed] = useSectionReveal(0.2);

  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date("June 26, 2026 16:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section 
      ref={ref} 
      id="countdown-section" 
      className={`section countdown-section section-reveal ${revealed ? "revealed" : ""}`}
      style={{ background: 'linear-gradient(135deg, #2a2520 0%, #1a1a18 100%)', color: '#f5f0e8' }}
    >
      <p className="section-label" style={{ color: '#d4b96a' }}>Counting down the days</p>
      <h2 className="section-title" style={{ color: '#fefdfb' }}>Until the "I Do"s</h2>
      <div className="section-divider" style={{ opacity: 0.3 }} />

      <div className="countdown-grid">
        <div className="countdown-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,185,106,0.2)' }}>
          <span className="countdown-number" style={{ color: '#fefdfb' }}>{timeLeft.days}</span>
          <span className="countdown-label" style={{ color: '#d4b96a' }}>Days</span>
        </div>
        <div className="countdown-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,185,106,0.2)' }}>
          <span className="countdown-number" style={{ color: '#fefdfb' }}>{timeLeft.hours}</span>
          <span className="countdown-label" style={{ color: '#d4b96a' }}>Hours</span>
        </div>
        <div className="countdown-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,185,106,0.2)' }}>
          <span className="countdown-number" style={{ color: '#fefdfb' }}>{timeLeft.minutes}</span>
          <span className="countdown-label" style={{ color: '#d4b96a' }}>Minutes</span>
        </div>
        <div className="countdown-box" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(212,185,106,0.2)' }}>
          <span className="countdown-number" style={{ color: '#fefdfb' }}>{timeLeft.seconds}</span>
          <span className="countdown-label" style={{ color: '#d4b96a' }}>Seconds</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGES HEADER (Second Page Formal View)
   ═══════════════════════════════════════════════ */
function PagesHeader({ opened }) {
  return (
    <div className={`pages-header ${opened ? "animate-in" : ""}`}>
      <div className="pages-header-frame">
        <div className="frame-corner frame-tl"><CornerOrnament /></div>
        <div className="frame-corner frame-tr"><CornerOrnament /></div>
        <div className="frame-corner frame-bl"><CornerOrnament /></div>
        <div className="frame-corner frame-br"><CornerOrnament /></div>

        <p className="pages-header-intro delayed-1">With joyful hearts</p>

        <h2 className="pages-header-names delayed-2">
          Sithum
          <span className="pages-header-amp">&amp;</span>
          Sandy
        </h2>

        <div className="pages-header-divider delayed-3">
          <div className="divider-line" />
          <DiamondDivider />
          <div className="divider-line" />
        </div>

        <p className="pages-header-invite delayed-4" style={{ fontFamily: '"Noto Sans Sinhala", sans-serif', color: '#c9a855', fontWeight: '700', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '15px' }}>
          අපගේ පවුලේ සාමජිකයින් සමඟ එක්ව<br />
          අපගේ විවාහ මංගල්‍යය සඳහා ඔබට<br />
          ඉතාමත් ආදරයෙන් ආරාධනා කරන්නෙමු!
        </p>

        <p className="pages-header-invite delayed-5">
          Joyfully invite you to share in<br />
          a celebration of love and commitment<br />
          as they are united in marriage.
        </p>

        <p className="pages-header-date delayed-6">Friday · 26th June, 2026</p>

        <div className="scroll-down-hint delayed-7">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-icon">{icons.chevronDown}</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   QUOTE SECTION
   ═══════════════════════════════════════════════ */
function QuoteSection() {
  const [ref, revealed] = useSectionReveal(0.2);

  return (
    <section
      ref={ref}
      id="quote-section"
      className={`section section-bg-cream quote-section section-reveal ${revealed ? "revealed" : ""}`}
    >
      <div className="quote-content">
        <div className="quote-border-top" />
        <div className="quote-mark">"</div>
        <p className="quote-text">
          Two souls with but a single thought,
          <br />
          two hearts that beat as one.
        </p>
        <p className="quote-attribution">— Friedrich Halm</p>
        <div className="quote-border-bottom" />
      </div>

      <SectionSeparator />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   DETAILS SECTION
   ═══════════════════════════════════════════════ */
function DetailsSection() {
  const [ref, revealed] = useSectionReveal(0.1);

  const details = [
    {
      icon: icons.calendar,
      label: "Date",
      value: "Friday, 26th June 2026",
    },
    {
      icon: icons.clock,
      label: "Ceremony",
      value: "4:00 PM — Sunset Reception 7:00 PM",
    },
    {
      icon: icons.venue,
      label: "Venue",
      value: "The Grand Lily Ballroom",
    },
    {
      icon: icons.hotel,
      label: "Hotel",
      value: "The White Lily Grand Hotel, Colombo 03",
    },
    {
      icon: icons.phone,
      label: "RSVP",
      value: "By 12th June 2026 · +94 77 123 4567",
    },
    {
      icon: icons.heart,
      label: "Dress Code",
      value: "Ivory & Sage Formal Attire",
    },
  ];

  return (
    <section
      ref={ref}
      id="details-section"
      className="section section-bg-ivory details-section"
    >
      <p className="section-label" style={{ color: '#c9a855', fontWeight: 'bold' }}>Wedding Details</p>
      <h2 className="section-title" style={{ color: '#8a773d' }}>The Celebration</h2>
      <div className="section-divider" />

      <div className="details-grid">
        {details.map((d, i) => (
          <div
            key={i}
            className={`detail-card ${revealed ? "revealed" : ""}`}
            style={{ 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(245,240,225,0.9) 100%)',
              border: '1px solid #d4b96a',
              boxShadow: '0 4px 15px rgba(212, 185, 106, 0.15)',
              transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${i * 0.1}s`
            }}
          >
            <div className="detail-icon" style={{ color: '#c9a855', background: 'rgba(212, 185, 106, 0.1)', padding: '12px', borderRadius: '50%' }}>{d.icon}</div>
            <div className="detail-info">
              <p className="detail-label" style={{ color: '#8a773d', letterSpacing: '2px', fontWeight: 'bold' }}>{d.label}</p>
              <p className="detail-value" style={{ color: '#4a4a4a', fontWeight: '500' }}>{d.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   VENUE SECTION
   ═══════════════════════════════════════════════ */
function VenueSection() {
  const [ref, revealed] = useSectionReveal(0.2);

  return (
    <section
      ref={ref}
      id="venue-section"
      className={`section section-bg-cream venue-section section-reveal ${revealed ? "revealed" : ""}`}
    >
      <p className="section-label">Location</p>
      <h2 className="section-title">The Venue</h2>
      <div className="section-divider" />

      <div className="venue-card">
        <div className="venue-icon-large">{icons.map}</div>
        <h3 className="venue-name">The White Lily Grand Hotel</h3>
        <p className="venue-address">
          Galle Face Center Road,
          <br />
          Colombo 03, Sri Lanka
        </p>
        <a
          href="https://maps.google.com/?q=Galle+Face+Hotel+Colombo"
          target="_blank"
          rel="noopener noreferrer"
          className="maps-button"
          id="maps-link"
        >
          {icons.map}
          <span>Open in Google Maps</span>
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   RSVP SECTION
   ═══════════════════════════════════════════════ */
function RSVPSection() {
  const [ref, revealed] = useSectionReveal(0.2);

  return (
    <section
      ref={ref}
      id="rsvp-section"
      className={`section section-bg-blush rsvp-section section-reveal ${revealed ? "revealed" : ""}`}
    >
      <div className="rsvp-card">
        <h2 className="rsvp-title">Kindly Respond</h2>
        <p className="rsvp-subtitle">
          We would be honored by your presence
          <br />
          on our special day
        </p>

        <div className="rsvp-deadline">
          {icons.calendar}
          <span>By 12th June 2026</span>
        </div>

        <p className="rsvp-contact">+94 77 123 4567</p>
        <p className="rsvp-contact-label">Call or WhatsApp</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER SECTION
   ═══════════════════════════════════════════════ */
function FooterSection() {
  const [ref, revealed] = useSectionReveal(0.2);

  return (
    <section
      ref={ref}
      id="footer-section"
      className={`section section-bg-ivory footer-section section-reveal ${revealed ? "revealed" : ""}`}
    >
      <VineDecoration flip />

      <img
        src="/images/lily-bouquet.png"
        alt="Lily bouquet"
        className="footer-lily-img"
      />

      <h3 className="footer-names">Sithum & Sandy</h3>
      <p className="footer-date">26 · 06 · 2026</p>

      <div className="section-divider" />

      <p className="footer-message">
        With love and joy,
        <br />
        we look forward to celebrating with you.
      </p>

      <span className="footer-heart">♥</span>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CORNER ORNAMENT (SVG)
   ═══════════════════════════════════════════════ */
function CornerOrnament() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 100 0 L 100 2 Q 50 2 2 50 L 2 100 L 0 100 Z" fill="currentColor" />
      <path d="M 12 12 Q 40 12 40 40 Q 12 40 12 12" fill="currentColor" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   MUSIC PLAYER COMPONENT
   ═══════════════════════════════════════════════ */
function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userInteracted = useRef(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted.current && audioRef.current) {
        userInteracted.current = true;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Autoplay prevented:", err);
          setIsPlaying(false);
        });
      }
      document.removeEventListener('click', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      <button 
        className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          userInteracted.current = true;
          togglePlay();
        }}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════
   MAIN WEDDING INVITATION
   ═══════════════════════════════════════════════ */
export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <FloatingPetals />
      <GoldSparkles />

      <div className="book-wrapper">
        <MusicPlayer />
        <div className={`book-backdrop ${opened ? "opened" : ""}`} />

        {/* The Cover */}
        <div 
          className={`book-cover ${opened ? "opened" : ""}`} 
          onClick={() => setOpened(true)}
        >
          <div className="book-cover-inner">
            <div className="cover-double-border" />
            <div className="book-cover-spine" />
            
            <div className="cover-corner-ornament cover-corner-tl"><CornerOrnament /></div>
            <div className="cover-corner-ornament cover-corner-tr"><CornerOrnament /></div>
            <div className="cover-corner-ornament cover-corner-bl"><CornerOrnament /></div>
            <div className="cover-corner-ornament cover-corner-br"><CornerOrnament /></div>

            <div className="cover-content">
              <div className="cover-lily">
                <img src="/images/lily-single.png" alt="White lily" className="cover-lily-img" />
              </div>
              <p className="cover-sinhala-greeting" style={{ fontFamily: '"Noto Sans Sinhala", sans-serif', fontSize: '1.2rem', marginBottom: '10px', fontWeight: '700', color: '#8a773d' }}>ශ්‍රී සුභ මංගලම් !</p>
              <p className="cover-pre-title">Together with their families</p>
              
              <div className="cover-names">
                <h1 className="cover-name">Sithum</h1>
                <div className="cover-ampersand-wrap">
                  <div className="cover-ampersand-line" />
                  <span className="cover-ampersand">&amp;</span>
                  <div className="cover-ampersand-line" />
                </div>
                <h1 className="cover-name">Sandy</h1>
              </div>
              
              <div className="cover-divider">
                <div className="cover-divider-line-l" />
                <DiamondDivider />
                <div className="cover-divider-line-r" />
              </div>

              <p className="cover-message">
                Request the pleasure of your company<br />
                as they celebrate the beginning of<br />
                their forever together
              </p>
              
              <p className="cover-date">Friday · 26th June, 2026</p>

              <div className="cover-cta">
                <span className="cover-cta-text">Open</span>
                <div className="cover-cta-icon">{icons.chevronDown}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Inner Pages */}
        <div className={`book-pages ${opened ? "visible" : ""}`}>
          <div className="book-pages-inner">
            <div className="invitation-container">
              <PagesHeader opened={opened} />
              <QuoteSection />
              <CountdownSection />
              <DetailsSection />
              <VenueSection />
              <RSVPSection />
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}