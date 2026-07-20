import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

/* ─── FONTS ─── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600&display=swap');`;

/* ─── CSS ─── */
const CSS = `
${FONTS}

:root {
  --obs:   #06040F;
  --obs2:  #0D0A1A;
  --gold:  #BF8C3A;
  --goldl: #E0B050;
  --saff:  #D4720A;
  --verm:  #C23B22;
  --sand:  #E8D5B0;
  --smoke: #6B6480;
  --smokl: #9490A8;
}

html, body { background: var(--obs) !important; }

/* ══ SHELL ══ */
.hdr {
  position: sticky;
  top: 0;
  z-index: 500;
  isolation: isolate;          /* new stacking context */
}

/* ── Animated gradient base ── */
.hdr-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    #06040F 0%,
    #0D0A1A 28%,
    #130C0A 55%,
    #0A0812 78%,
    #06040F 100%
  );
  background-size: 300% 100%;
  animation: bgShift 10s ease-in-out infinite alternate;
}
@keyframes bgShift {
  0%   { background-position: 0%   50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 30%  50%; }
}

/* ── Chromatic border bottom ── */
.hdr-border {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent        0%,
    rgba(191,140,58,.0) 10%,
    #BF8C3A            28%,
    #D4720A            42%,
    #E0B050            50%,
    #C23B22            62%,
    #BF8C3A            75%,
    rgba(191,140,58,.0) 90%,
    transparent        100%
  );
  background-size: 200% 100%;
  animation: borderSlide 5s linear infinite;
}
@keyframes borderSlide {
  from { background-position: 200% 0; }
  to   { background-position:   0% 0; }
}

/* ── Particle canvas ── */
.hdr-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .55;
}

/* ── Inner bar ── */
.hdr-bar {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 52px;
  height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
}

/* ══ BRAND ══ */
.hdr-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}

/* SVG glyph wrapper — outer ring rotates */
.hdr-glyph {
  width: 40px; height: 40px;
  flex-shrink: 0;
  position: relative;
}
.hdr-glyph-outer {
  position: absolute; inset: 0;
  animation: glyphSpin 20s linear infinite;
  transform-origin: center;
}
@keyframes glyphSpin { to { transform: rotate(360deg); } }
.hdr-glyph-inner {
  position: absolute; inset: 0;
  animation: glyphPulse 3s ease-in-out infinite;
}
@keyframes glyphPulse {
  0%,100% { opacity: .7; }
  50%     { opacity: 1;  }
}

.hdr-wordmark { display: flex; flex-direction: column; gap: 2px; }
.hdr-wm-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--sand);
  line-height: 1;
  background: linear-gradient(90deg, var(--sand) 0%, var(--goldl) 50%, var(--sand) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 5s linear infinite;
}
@keyframes shimmer {
  from { background-position: 200% center; }
  to   { background-position:   0% center; }
}
.hdr-wm-main em {
  font-style: italic;
  font-weight: 300;
}
.hdr-wm-sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 8px;
  font-weight: 300;
  letter-spacing: .42em;
  color: var(--smoke);
  text-transform: uppercase;
}

/* ══ NAV ══ */
.hdr-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.hdr-nav a {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--smoke);
  text-decoration: none;
  padding: 0 18px;
  height: 72px;
  display: flex;
  align-items: center;
  position: relative;
  transition: color .3s;
  overflow: hidden;
}
/* Flame underline — expands from center */
.hdr-nav a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 50%;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: 70%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--saff), var(--goldl), var(--saff), transparent);
  transition: transform .35s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 8px var(--saff);
}
/* Warm bg wash on hover */
.hdr-nav a::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center bottom, rgba(212,114,10,.12) 0%, transparent 70%);
  opacity: 0;
  transition: opacity .3s;
}
.hdr-nav a:hover { color: var(--smokl); }
.hdr-nav a:hover::before { opacity: 1; }
.hdr-nav a:hover::after  { transform: translateX(-50%) scaleX(1); }
.hdr-nav a.active { color: var(--sand); }
.hdr-nav a.active::after { transform: translateX(-50%) scaleX(1); }
.hdr-nav a.active::before { opacity: 1; }

/* ══ ACTIONS ══ */
.hdr-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}
.hdr-greeting {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  font-style: italic;
  color: var(--smoke);
  white-space: nowrap;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hdr-greeting b { color: var(--goldl); font-style: normal; font-weight: 600; }

.hdr-btn {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: .22em;
  text-transform: uppercase;
  padding: 9px 18px;
  background: transparent;
  border: 1px solid rgba(191,140,58,.25);
  color: var(--smokl);
  cursor: pointer;
  transition: border-color .25s, color .25s, background .25s, box-shadow .25s;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}
.hdr-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(191,140,58,.12) 0%, transparent 60%);
  opacity: 0;
  transition: opacity .25s;
}
.hdr-btn:hover { border-color: var(--gold); color: var(--sand); }
.hdr-btn:hover::before { opacity: 1; }

.hdr-btn-fill {
  background: linear-gradient(135deg, #D4720A 0%, #A85A08 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 0 16px rgba(212,114,10,.3), inset 0 1px 0 rgba(255,255,255,.1);
}
.hdr-btn-fill:hover {
  box-shadow: 0 0 24px rgba(212,114,10,.5), inset 0 1px 0 rgba(255,255,255,.15);
  background: linear-gradient(135deg, #E07C10 0%, #B86008 100%);
  border-color: transparent;
  color: #fff;
}
.hdr-btn-fill:hover::before { opacity: 0; }

.hdr-btn-admin {
  border-color: rgba(191,140,58,.4);
  color: var(--goldl);
  box-shadow: 0 0 8px rgba(191,140,58,.1);
}
.hdr-btn-admin:hover { box-shadow: 0 0 16px rgba(191,140,58,.25); color: var(--goldl); }

.hdr-btn-out {
  border-color: rgba(180,55,35,.3);
  color: rgba(200,85,65,.85);
}
.hdr-btn-out:hover {
  background: rgba(180,55,35,.1);
  border-color: rgba(180,55,35,.6);
  color: #f09080;
}

/* ══ MOBILE TOGGLE ══ */
.hdr-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}
.hdr-tline {
  display: block;
  height: 1px;
  background: linear-gradient(90deg, var(--gold), var(--saff));
  transition: transform .3s, opacity .3s, width .3s;
  transform-origin: center;
}
.hdr-tline:nth-child(1) { width: 24px; }
.hdr-tline:nth-child(2) { width: 18px; }
.hdr-tline:nth-child(3) { width: 24px; }
.hdr-toggle.open .hdr-tline:nth-child(1) { transform: translateY(6px) rotate(45deg); width: 24px; }
.hdr-toggle.open .hdr-tline:nth-child(2) { opacity: 0; }
.hdr-toggle.open .hdr-tline:nth-child(3) { transform: translateY(-6px) rotate(-45deg); width: 24px; }

/* ══ MOBILE DRAWER ══ */
.hdr-drawer {
  position: fixed;
  top: 72px; right: 0; bottom: 0;
  width: min(380px, 100vw);
  background: var(--obs2);
  border-left: 1px solid rgba(191,140,58,.1);
  z-index: 490;
  display: flex;
  flex-direction: column;
  animation: drawerSlide .35s cubic-bezier(.4,0,.2,1);
  overflow: hidden;
}
/* shimmer strip on drawer edge */
.hdr-drawer::before {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(180deg,
    transparent 0%, var(--saff) 30%, var(--goldl) 50%, var(--saff) 70%, transparent 100%);
  animation: drawerGlow 3s ease-in-out infinite;
}
@keyframes drawerGlow { 0%,100%{opacity:.4} 50%{opacity:1} }
@keyframes drawerSlide {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);   opacity: 1; }
}
.hdr-drawer-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 44px;
  gap: 0;
}
.hdr-drawer-nav a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px;
  font-weight: 300;
  color: rgba(107,100,128,.55);
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid rgba(191,140,58,.05);
  letter-spacing: -.01em;
  transition: color .25s, padding-left .25s;
  position: relative;
}
.hdr-drawer-nav a::before {
  content: '';
  position: absolute;
  left: -44px; top: 50%;
  transform: translateY(-50%);
  width: 0; height: 2px;
  background: linear-gradient(90deg, var(--saff), var(--goldl));
  transition: width .3s;
  box-shadow: 0 0 8px var(--saff);
}
.hdr-drawer-nav a:hover,
.hdr-drawer-nav a.active {
  color: var(--sand);
  padding-left: 12px;
}
.hdr-drawer-nav a:hover::before,
.hdr-drawer-nav a.active::before { width: 28px; }
.hdr-drawer-actions {
  padding: 24px 44px 44px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgba(191,140,58,.07);
}
.hdr-drawer-actions .hdr-btn { display: block; text-align: center; padding: 13px; }

/* ══ OVERLAY ══ */
.hdr-overlay {
  position: fixed;
  inset: 72px 0 0 0;
  background: rgba(6,4,15,.6);
  backdrop-filter: blur(4px);
  z-index: 480;
  animation: fadeIn .3s;
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

@media (max-width: 1024px) {
  .hdr-nav, .hdr-actions { display: none; }
  .hdr-toggle { display: flex; }
  .hdr-bar { grid-template-columns: 1fr auto; padding: 0 24px; }
}
`;

/* ─── Animated incense-smoke particle canvas ─── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const COLORS = ["rgba(191,140,58,", "rgba(212,114,10,", "rgba(224,176,80,"];
    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : H + 4;
        this.r  = Math.random() * 1.2 + 0.3;
        this.vy = -(Math.random() * 0.4 + 0.15);
        this.vx = (Math.random() - 0.5) * 0.25;
        this.life = 0;
        this.maxLife = Math.random() * 120 + 80;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      step() {
        this.x += this.vx + Math.sin(this.life * 0.04) * 0.2;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.y < -4) this.reset();
      }
      draw() {
        const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.65;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + alpha + ")";
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 55 }, () => new Particle());

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.step(); p.draw(); });
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="hdr-canvas" />;
}

/* ─── Sacred glyph SVG ─── */
function Glyph() {
  const spokes = Array.from({ length: 12 }, (_, i) => {
    const a  = (i / 12) * Math.PI * 2;
    const x1 = 20 + 8  * Math.cos(a), y1 = 20 + 8  * Math.sin(a);
    const x2 = 20 + 18 * Math.cos(a), y2 = 20 + 18 * Math.sin(a);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#BF8C3A" strokeWidth=".4" opacity=".45"/>;
  });
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a  = (i / 8) * Math.PI * 2;
    const cx = 20 + 11 * Math.cos(a), cy = 20 + 11 * Math.sin(a);
    return (
      <ellipse key={i} cx={cx} cy={cy} rx="2.8" ry="5.5"
        fill="none" stroke="#BF8C3A" strokeWidth=".45" opacity=".5"
        transform={`rotate(${(i/8)*360+90} ${cx} ${cy})`}/>
    );
  });
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer spinning ring (animated via wrapper div) */}
      <g className="hdr-glyph-outer">
        <circle cx="20" cy="20" r="19" stroke="#BF8C3A" strokeWidth=".5" opacity=".35" strokeDasharray="2 4"/>
        <circle cx="20" cy="20" r="16" stroke="#BF8C3A" strokeWidth=".3" opacity=".2"/>
        {spokes}
      </g>
      {/* Inner static content */}
      <g className="hdr-glyph-inner">
        {petals}
        {/* Flame */}
        <path d="M20 7 C20 7 16 12 16 16.5 C16 19.2 17.8 21.5 20 21.5 C22.2 21.5 24 19.2 24 16.5 C24 12 20 7 20 7Z"
          stroke="#D4A85A" strokeWidth=".8" fill="rgba(191,140,58,.15)" opacity=".9"/>
        <path d="M20 12 C20 12 18.5 14.5 18.5 16.5 C18.5 17.7 19.2 18.5 20 18.5 C20.8 18.5 21.5 17.7 21.5 16.5 C21.5 14.5 20 12 20 12Z"
          fill="#E0B050" opacity=".6"/>
        {/* Base dot */}
        <circle cx="20" cy="24" r="1.2" fill="#BF8C3A" opacity=".6"/>
        {/* Cardinal marks */}
        {[[20,2.5,20,4],[20,36,20,37.5],[2.5,20,4,20],[36,20,37.5,20]].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#BF8C3A" strokeWidth=".6" opacity=".4"/>
        ))}
      </g>
    </svg>
  );
}

const NAV = [
  { label: "Home",       to: "/",          end: true  },
  { label: "Temples",    to: "/templeList", end: false },
  { label: "Pilgrimage", to: "/circuits",   end: false },
  { label: "About",      to: "/about",      end: false },
];

export default function Header() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const dispatch   = useDispatch();
  const { userInfo } = useSelector((s) => s.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  const handleLogout = () => { dispatch(logout()); navigate("/login"); };

  return (
    <>
      <style>{CSS}</style>

      <header className="hdr">
        {/* Animated gradient base */}
        <div className="hdr-bg" />
        {/* Chromatic shifting border */}
        <div className="hdr-border" />
        {/* Incense-smoke particles */}
        <Particles />

        <div className="hdr-bar">
          {/* ── BRAND ── */}
          <div className="hdr-brand" onClick={() => navigate("/")}>
            <div className="hdr-glyph"><Glyph /></div>
            <div className="hdr-wordmark">
              <span className="hdr-wm-main">India <em>Temple</em></span>
              <span className="hdr-wm-sub">Heritage &amp; Pilgrimage</span>
            </div>
          </div>

          {/* ── DESKTOP NAV ── */}
          <nav className="hdr-nav">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => isActive ? "active" : ""}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* ── DESKTOP ACTIONS ── */}
          <div className="hdr-actions">
            {userInfo ? (
              <>
                <span className="hdr-greeting">
                  <b>{userInfo.name?.split(" ")[0]}</b>
                </span>
                {userInfo.role === "admin" && (
                  <button className="hdr-btn hdr-btn-admin"
                    onClick={() => navigate("/admin/upload")}>Admin</button>
                )}
                <button className="hdr-btn hdr-btn-out" onClick={handleLogout}>Sign out</button>
              </>
            ) : (
              <>
                <button className="hdr-btn" onClick={() => navigate("/login")}>Sign in</button>
                <button className="hdr-btn hdr-btn-fill" onClick={() => navigate("/register")}>Register</button>
              </>
            )}
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button className={`hdr-toggle${open ? " open" : ""}`}
            onClick={() => setOpen(v => !v)} aria-label="Menu">
            <span className="hdr-tline" />
            <span className="hdr-tline" />
            <span className="hdr-tline" />
          </button>
        </div>
      </header>

      {/* ── MOBILE OVERLAY + DRAWER ── */}
      {open && (
        <>
          <div className="hdr-overlay" onClick={() => setOpen(false)} />
          <div className="hdr-drawer">
            <nav className="hdr-drawer-nav">
              {NAV.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => isActive ? "active" : ""}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="hdr-drawer-actions">
              {userInfo ? (
                <>
                  {userInfo.role === "admin" && (
                    <button className="hdr-btn hdr-btn-admin"
                      onClick={() => { navigate("/admin/upload"); setOpen(false); }}>
                      Admin Panel
                    </button>
                  )}
                  <button className="hdr-btn hdr-btn-out" onClick={() => { handleLogout(); setOpen(false); }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button className="hdr-btn" onClick={() => { navigate("/login"); setOpen(false); }}>
                    Sign in
                  </button>
                  <button className="hdr-btn hdr-btn-fill" onClick={() => { navigate("/register"); setOpen(false); }}>
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}