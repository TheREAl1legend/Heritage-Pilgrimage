import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemples } from "../redux/slices/templeSlice";
import { Search, ArrowRight, MapPin, Star, Landmark, Building2, Mountain } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS  (same as Header)
   obsidian / aged-gold / saffron / sandstone / smoke / vermillion
───────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=IM+Fell+English:ital@0;1&family=Lora:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@300;400;500;600&display=swap');

:root {
  --obs:   #06040F;
  --obs2:  #0D0A1A;
  --obs3:  #110E22;
  --gold:  #BF8C3A;
  --goldl: #D4A85A;
  --goldd: #8C6420;
  --saff:  #D4720A;
  --sand:  #E8D5B0;
  --sand2: #F2E8D0;
  --smoke: #7A7388;
  --verm:  #C23B22;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ══════════════════════════════════════
   PAGE SHELL
══════════════════════════════════════ */
.hp { background: var(--obs); color: var(--sand); overflow-x: hidden; }

/* ══════════════════════════════════════
   HERO — the iris-yantra reveal
══════════════════════════════════════ */
.hp-hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 42% 1fr;
  overflow: hidden;
}

/* Left text panel */
.hp-hero-left {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 80px 56px;
  background: linear-gradient(90deg, var(--obs) 0%, var(--obs) 75%, transparent 100%);
}

/* Right image fills remaining */
.hp-hero-right {
  position: relative;
  overflow: hidden;
}
.hp-hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: saturate(0.7) brightness(0.6);
  animation: heroReveal 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes heroReveal {
  from { transform: scale(1.1); filter: saturate(0) brightness(0.3); }
  to   { transform: scale(1);   filter: saturate(0.7) brightness(0.6); }
}
.hp-hero-right-ov {
  position: absolute;
  inset: 0;
  background: linear-gradient(270deg, rgba(6,4,15,0.2) 0%, rgba(6,4,15,0.85) 100%);
}

/* ── IRIS / YANTRA — the signature element ── */
.hp-iris {
  position: absolute;
  /* sits on the seam between left panel and right image */
  left: calc(42% - 160px);
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  height: 320px;
  z-index: 20;
  pointer-events: none;
  animation: irisOpen 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: center;
}
@keyframes irisOpen {
  from { opacity: 0; transform: translateY(-50%) scale(0.5) rotate(-30deg); }
  to   { opacity: 1; transform: translateY(-50%) scale(1)   rotate(0deg); }
}
.hp-iris svg {
  width: 100%;
  height: 100%;
  animation: irisRotateSlow 60s linear infinite;
}
@keyframes irisRotateSlow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
/* Inner image portal inside iris */
.hp-iris-portal {
  position: absolute;
  inset: 18px;
  border-radius: 50%;
  overflow: hidden;
}
.hp-iris-portal img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  filter: sepia(0.2) brightness(0.75);
}
.hp-iris-portal::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 40px rgba(6,4,15,0.7), inset 0 0 12px rgba(191,140,58,0.2);
}

/* ── HERO TEXT ── */
.hp-hero-kicker {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}
.hp-hero-kicker-rule { width: 36px; height: 1px; background: var(--gold); }
.hp-hero-kicker-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
}

.hp-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(42px, 5.5vw, 82px);
  line-height: 0.92;
  color: var(--sand);
  letter-spacing: -0.02em;
  margin-bottom: 10px;
}
.hp-hero-title strong {
  font-weight: 700;
  display: block;
}
.hp-hero-title em {
  font-style: italic;
  color: var(--goldl);
  font-weight: 300;
}

.hp-hero-fell {
  font-family: 'IM Fell English', serif;
  font-size: clamp(13px, 1.1vw, 16px);
  font-style: italic;
  color: var(--gold);
  letter-spacing: 0.04em;
  margin-bottom: 28px;
  line-height: 1.5;
  opacity: 0.8;
}

.hp-hero-sub {
  font-family: 'Lora', serif;
  font-size: clamp(15px, 1.3vw, 18px);
  color: rgba(232,213,176,0.6);
  line-height: 1.75;
  max-width: 380px;
  margin-bottom: 48px;
}

/* CTA row */
.hp-hero-ctas {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 64px;
}
.hp-cta-primary {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 14px 32px;
  background: var(--saff);
  color: #fff;
  border: none;
  text-decoration: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.25s, transform 0.2s;
}
.hp-cta-primary:hover { background: #be640a; transform: translateX(2px); }
.hp-cta-secondary {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 13px 28px;
  background: transparent;
  color: var(--smoke);
  border: 1px solid rgba(191,140,58,0.3);
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}
.hp-cta-secondary:hover { border-color: var(--gold); color: var(--sand); }

/* Stat strip */
.hp-hero-stats {
  display: flex;
  gap: 36px;
  padding-top: 32px;
  border-top: 1px solid rgba(191,140,58,0.12);
}
.hp-hero-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px;
  font-weight: 600;
  color: var(--sand);
  line-height: 1;
}
.hp-hero-stat-num span { color: var(--gold); }
.hp-hero-stat-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 5px;
}

/* ══════════════════════════════════════
   SEARCH BAR (sits below hero)
══════════════════════════════════════ */
.hp-search-section {
  background: var(--obs2);
  border-top: 1px solid rgba(191,140,58,0.1);
  border-bottom: 1px solid rgba(191,140,58,0.1);
  position: relative;
}
.hp-search-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 56px;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 68px;
}
.hp-search-icon { color: var(--gold); flex-shrink: 0; }
.hp-search-divider { width: 1px; height: 28px; background: rgba(191,140,58,0.15); }
.hp-search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px;
  font-weight: 300;
  color: var(--sand);
  letter-spacing: 0.02em;
}
.hp-search-input::placeholder { color: rgba(122,115,136,0.5); }
.hp-search-hint {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(122,115,136,0.4);
  white-space: nowrap;
}

/* Search results dropdown */
.hp-search-results {
  position: absolute;
  left: 56px;
  right: 56px;
  top: 100%;
  background: var(--obs3);
  border: 1px solid rgba(191,140,58,0.15);
  border-top: none;
  z-index: 100;
}
.hp-search-result {
  padding: 14px 24px;
  border-bottom: 1px solid rgba(191,140,58,0.06);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
}
.hp-search-result:last-child { border-bottom: none; }
.hp-search-result:hover { background: rgba(191,140,58,0.05); }
.hp-search-result-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  font-weight: 500;
  color: var(--sand);
}
.hp-search-result-loc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--smoke);
  text-transform: uppercase;
}
.hp-search-no-result {
  padding: 16px 24px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  font-style: italic;
  color: var(--smoke);
}

/* ══════════════════════════════════════
   MARQUEE TICKER
══════════════════════════════════════ */
.hp-ticker {
  overflow: hidden;
  border-bottom: 1px solid rgba(191,140,58,0.08);
  padding: 13px 0;
}
.hp-ticker-track {
  display: flex;
  width: max-content;
  animation: tickerMove 28s linear infinite;
}
@keyframes tickerMove {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.hp-ticker-item {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(191,140,58,0.28);
  padding: 0 28px;
  white-space: nowrap;
}
.hp-ticker-sep { color: rgba(191,140,58,0.5); }

/* ══════════════════════════════════════
   SECTION COMMON
══════════════════════════════════════ */
.hp-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 56px;
}
.hp-section-dark { background: var(--obs); }
.hp-section-mid  { background: var(--obs2); }

.hp-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}
.hp-label-rule { width: 28px; height: 1px; background: var(--gold); }

.hp-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(30px, 3.8vw, 56px);
  color: var(--sand);
  letter-spacing: -0.02em;
  line-height: 0.95;
  margin-bottom: 12px;
}
.hp-section-title strong { font-weight: 700; }
.hp-section-title em { font-style: italic; color: var(--goldl); }
.hp-section-body {
  font-family: 'Lora', serif;
  font-size: 17px;
  color: rgba(232,213,176,0.5);
  line-height: 1.75;
  max-width: 480px;
}

/* ══════════════════════════════════════
   ABOUT SPLIT
══════════════════════════════════════ */
.hp-about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.hp-about-img-wrap {
  position: relative;
}
.hp-about-img {
  width: 100%;
  height: 560px;
  object-fit: cover;
  display: block;
  filter: sepia(0.15) brightness(0.8);
}
/* Aged-photo double-border frame */
.hp-about-frame {
  position: absolute;
  inset: -12px;
  border: 1px solid rgba(191,140,58,0.22);
  pointer-events: none;
}
.hp-about-frame::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1px solid rgba(191,140,58,0.09);
}
/* Corner ornaments */
.hp-about-frame::after {
  content: '✦';
  position: absolute;
  bottom: -18px;
  right: -18px;
  font-size: 12px;
  color: var(--gold);
  opacity: 0.5;
}
.hp-about-badge {
  position: absolute;
  bottom: 28px;
  left: -28px;
  background: var(--obs);
  border: 1px solid rgba(191,140,58,0.22);
  padding: 18px 24px;
  z-index: 5;
  display: flex;
  gap: 16px;
  align-items: center;
}
.hp-about-badge-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 700;
  color: var(--sand);
  line-height: 1;
}
.hp-about-badge-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--smoke);
  margin-top: 4px;
}
.hp-about-badge-icon { color: var(--gold); }

.hp-about-right { display: flex; flex-direction: column; gap: 0; }
.hp-about-text-body {
  font-family: 'Lora', serif;
  font-size: 17px;
  color: rgba(232,213,176,0.55);
  line-height: 1.8;
  margin: 20px 0 36px;
}
/* Feature pair */
.hp-feat-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(191,140,58,0.1);
  margin-top: 4px;
}
.hp-feat {
  background: var(--obs);
  padding: 22px 20px;
  transition: background 0.3s;
}
.hp-feat:hover { background: var(--obs3); }
.hp-feat-icon { color: var(--gold); margin-bottom: 10px; }
.hp-feat-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--sand);
  margin-bottom: 6px;
}
.hp-feat-desc {
  font-family: 'Lora', serif;
  font-size: 13px;
  color: rgba(232,213,176,0.45);
  line-height: 1.65;
}

/* ══════════════════════════════════════
   PILGRIMAGE / TEMPLE GRID
══════════════════════════════════════ */
.hp-pil-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}
.hp-pil-see-all {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--smoke);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s;
}
.hp-pil-see-all:hover { color: var(--goldl); }

/* 3-col temple card grid, gap = 1px seam */
.hp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(191,140,58,0.1);
}
.hp-card {
  background: var(--obs);
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.hp-card:hover { transform: translateY(-4px); }
.hp-card-img-wrap { height: 250px; overflow: hidden; position: relative; }
.hp-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.7) brightness(0.8);
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.45s;
}
.hp-card:hover .hp-card-img { transform: scale(1.08); filter: saturate(1) brightness(0.9); }
.hp-card-rating {
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(6,4,15,0.82);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(191,140,58,0.28);
  padding: 4px 9px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.hp-card-rating-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--gold);
}
.hp-card-body { padding: 22px; }
.hp-card-loc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 9px;
}
.hp-card-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 19px;
  font-weight: 600;
  color: var(--sand);
  line-height: 1.15;
  margin-bottom: 13px;
}
.hp-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 18px;
}
.hp-card-tag {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 3px 9px;
  border: 1px solid rgba(191,140,58,0.18);
  color: rgba(212,168,90,0.7);
}
.hp-card-cta {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--smoke);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}
.hp-card:hover .hp-card-cta { color: var(--goldl); }

/* ══════════════════════════════════════
   STATISTICS BAND
══════════════════════════════════════ */
.hp-stats-band {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(191,140,58,0.1);
}
.hp-stat-cell {
  background: var(--obs2);
  padding: 56px 32px;
  text-align: center;
  position: relative;
}
.hp-stat-cell::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 1px;
  background: rgba(191,140,58,0.2);
}
.hp-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(40px, 4.5vw, 64px);
  font-weight: 300;
  color: var(--goldl);
  line-height: 1;
  margin-bottom: 12px;
}
.hp-stat-num strong { font-weight: 700; }
.hp-stat-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--smoke);
}

/* ══════════════════════════════════════
   CTA BANNER
══════════════════════════════════════ */
.hp-cta-band {
  background: var(--obs3);
  border-top: 1px solid rgba(191,140,58,0.1);
  border-bottom: 1px solid rgba(191,140,58,0.1);
  position: relative;
  overflow: hidden;
}
/* Big watermark OM */
.hp-cta-om {
  position: absolute;
  right: 6vw;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Cormorant Garamond', serif;
  font-size: 200px;
  font-weight: 700;
  color: rgba(191,140,58,0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.hp-cta-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 96px 56px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
}
.hp-cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-size: clamp(28px, 3.5vw, 52px);
  color: var(--sand);
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 14px;
}
.hp-cta-title strong { font-weight: 700; }
.hp-cta-sub {
  font-family: 'Lora', serif;
  font-size: 17px;
  color: rgba(232,213,176,0.45);
  line-height: 1.7;
}

/* ══════════════════════════════════════
   ADMIN BADGE
══════════════════════════════════════ */
.hp-admin-dock {
  position: fixed;
  top: 88px;
  right: 24px;
  z-index: 90;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hp-admin-btn {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  padding: 10px 18px;
  background: rgba(6,4,15,0.9);
  border: 1px solid rgba(191,140,58,0.25);
  color: var(--gold);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.2s, color 0.2s;
}
.hp-admin-btn:hover { border-color: var(--gold); color: var(--goldl); }

/* ══════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════ */
@media (max-width: 1024px) {
  .hp-hero               { grid-template-columns: 1fr; min-height: 100svh; }
  .hp-hero-left          { padding: 100px 24px 60px; background: linear-gradient(to top, var(--obs) 0%, rgba(6,4,15,0.85) 100%); }
  .hp-hero-right         { position: absolute; inset: 0; }
  .hp-hero-right-ov      { background: linear-gradient(to top, rgba(6,4,15,0.95) 0%, rgba(6,4,15,0.4) 100%); }
  .hp-iris               { display: none; }
  .hp-hero-sub           { max-width: 100%; }
  .hp-section            { padding: 72px 24px; }
  .hp-search-inner       { padding: 0 24px; }
  .hp-search-results     { left: 24px; right: 24px; }
  .hp-search-hint        { display: none; }
  .hp-about              { grid-template-columns: 1fr; }
  .hp-about-img-wrap     { order: -1; }
  .hp-about-badge        { left: 12px; bottom: 16px; }
  .hp-grid               { grid-template-columns: 1fr 1fr; }
  .hp-stats-band         { grid-template-columns: 1fr 1fr; }
  .hp-cta-inner          { grid-template-columns: 1fr; padding: 72px 24px; }
  .hp-feat-pair          { grid-template-columns: 1fr; }
  .hp-pil-header         { flex-direction: column; align-items: flex-start; gap: 12px; }
}
@media (max-width: 600px) {
  .hp-grid               { grid-template-columns: 1fr; }
  .hp-stats-band         { grid-template-columns: 1fr 1fr; }
  .hp-hero-title         { font-size: 42px; }
  .hp-hero-stats         { flex-direction: column; gap: 20px; }
}
`;

/* ── Mandala / Yantra SVG geometry ── */
function YantraSVG() {
  const pts = (n, r, cx = 160, cy = 160) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });

  const star = (cx, cy, r1, r2, n) => {
    const pts2 = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
      pts2.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    return pts2.join(" ");
  };

  const GOLD = "#BF8C3A";
  const FAINT = "rgba(191,140,58,0.25)";

  return (
    <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer rings */}
      {[155, 145, 132].map((r, i) => (
        <circle key={i} cx="160" cy="160" r={r} stroke={GOLD} strokeWidth={i === 0 ? 0.6 : 0.3} opacity={i === 0 ? 0.7 : 0.3} />
      ))}

      {/* 16-petal lotus outer */}
      {pts(16, 132).map(([x, y], i) => (
        <ellipse
          key={i}
          cx={160 + (x - 160) * 0.5}
          cy={160 + (y - 160) * 0.5}
          rx="18"
          ry="36"
          fill="none"
          stroke={GOLD}
          strokeWidth="0.4"
          opacity="0.35"
          transform={`rotate(${(i / 16) * 360} 160 160)`}
        />
      ))}

      {/* 8-pointed star */}
      <polygon points={star(160, 160, 110, 72, 8)} fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.55" />

      {/* 6-pointed star */}
      <polygon points={star(160, 160, 88, 58, 6)} fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />

      {/* 24 radial spokes */}
      {pts(24, 130).map(([x2, y2], i) => {
        const [x1, y1] = pts(24, 24)[i];
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={GOLD} strokeWidth="0.3" opacity="0.2" />;
      })}

      {/* Inner rings */}
      {[58, 42, 24].map((r, i) => (
        <circle key={i} cx="160" cy="160" r={r} stroke={GOLD} strokeWidth={i === 0 ? 0.5 : 0.3} opacity={i === 0 ? 0.5 : 0.3} />
      ))}

      {/* 8-petal inner lotus */}
      {pts(8, 42).map(([x, y], i) => (
        <ellipse
          key={i}
          cx={160 + (x - 160) * 0.5}
          cy={160 + (y - 160) * 0.5}
          rx="10"
          ry="22"
          fill="none"
          stroke={GOLD}
          strokeWidth="0.4"
          opacity="0.3"
          transform={`rotate(${(i / 8) * 360} 160 160)`}
        />
      ))}

      {/* Central dot */}
      <circle cx="160" cy="160" r="3" fill={GOLD} opacity="0.6" />

      {/* Outer dashed ring */}
      <circle cx="160" cy="160" r="158" stroke={GOLD} strokeWidth="0.4" strokeDasharray="3 6" opacity="0.3" />
    </svg>
  );
}

const TICKER = ["Char Dham", "Jyotirlinga", "Shakti Peeth", "Divya Desam", "Sapta Puri", "Panch Kedar", "Ashtavinayak", "Kumbh Mela", "Amarnath Yatra", "Kanwar Yatra"];
const PIL_TYPES = ["Char Dham", "Jyotirlinga", "Shakti Peeth", "Divya Desam"];

export default function Home() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { userInfo }    = useSelector((s) => s.auth);
  const { temples = [] } = useSelector((s) => s.temple);
  const [search, setSearch] = useState("");

  useEffect(() => { dispatch(fetchTemples({ page: 1 })); }, [dispatch]);

  const suggestions = temples
    .filter((t) => {
      const q = search.toLowerCase();
      return (
        t.templeName?.toLowerCase().includes(q) ||
        t.state?.toLowerCase().includes(q) ||
        t.city?.toLowerCase().includes(q)
      );
    })
    .slice(0, 6);

  const archTemples = temples.filter((t) => t.categories?.includes("architecture")).slice(0, 3);

  return (
    <>
      <style>{CSS}</style>
      <div className="hp">

        {/* ── ADMIN DOCK ── */}
        {userInfo?.role === "admin" && (
          <div className="hp-admin-dock">
            <button className="hp-admin-btn" onClick={() => navigate("/admin/upload")}>
              <Landmark size={13} /> Create Temple
            </button>
            <button className="hp-admin-btn" onClick={() => navigate("/admin/category")}>
              <Building2 size={13} /> Create Category
            </button>
          </div>
        )}

        {/* ══════════ HERO ══════════ */}
        <section className="hp-hero">
          {/* LEFT — text */}
          <div className="hp-hero-left">
            <div className="hp-hero-kicker">
              <div className="hp-hero-kicker-rule" />
              <span className="hp-hero-kicker-text">Spiritual Journey Across India</span>
            </div>

            <h1 className="hp-hero-title">
              India<br />
              <strong>Temple</strong><br />
              <em>Heritage</em>
            </h1>

            <p className="hp-hero-fell">
              "Where stone becomes prayer, and silence speaks."
            </p>

            <p className="hp-hero-sub">
              Explore sacred pilgrimage circuits, ancient temple architecture,
              and the timeless divine heritage spanning five thousand years.
            </p>

            <div className="hp-hero-ctas">
              <Link to="/templeList" className="hp-cta-primary">
                Explore Temples <ArrowRight size={14} />
              </Link>
              <Link to="/circuits" className="hp-cta-secondary">
                Pilgrimage Circuits
              </Link>
            </div>

            <div className="hp-hero-stats">
              {[["500", "+", "Temples Listed"], ["28", "", "States Covered"], ["12", "", "Sacred Circuits"]].map(
                ([n, s, l], i) => (
                  <div key={i}>
                    <div className="hp-hero-stat-num">
                      {n}<span>{s}</span>
                    </div>
                    <div className="hp-hero-stat-label">{l}</div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT — image */}
          <div className="hp-hero-right">
            <img
              className="hp-hero-img"
              src="https://res.cloudinary.com/duhrdx0vn/image/upload/q_auto/f_auto/v1778727475/pilgrimage_matipf.jpg"
              alt="Sacred India"
            />
            <div className="hp-hero-right-ov" />
          </div>

          {/* ── IRIS / YANTRA — the signature element ── */}
          <div className="hp-iris">
            <div className="hp-iris-portal">
              <img
                src="https://www.purbaholidays.com/storage/destinations/F8mVRwsyWdp77lW9rleOZoulryL07825rThOWfgc.webp"
                alt=""
              />
            </div>
            <YantraSVG />
          </div>
        </section>

        {/* ══════════ SEARCH ══════════ */}
        <div className="hp-search-section">
          <div className="hp-search-inner">
            <Search size={18} className="hp-search-icon" />
            <div className="hp-search-divider" />
            <input
              className="hp-search-input"
              placeholder="Search by temple, city or state…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="hp-search-hint">500+ temples</span>
          </div>

          {search.trim() && (
            <div className="hp-search-results">
              {suggestions.length > 0 ? (
                suggestions.map((t) => (
                  <div
                    key={t._id}
                    className="hp-search-result"
                    onClick={() => { navigate(`/templeDetails/${t._id}`); setSearch(""); }}
                  >
                    <span className="hp-search-result-name">{t.templeName}</span>
                    <span className="hp-search-result-loc">
                      <MapPin size={10} style={{ display: "inline", marginRight: 4 }} />
                      {t.city}, {t.state}
                    </span>
                  </div>
                ))
              ) : (
                <div className="hp-search-no-result">No temples found for "{search}"</div>
              )}
            </div>
          )}
        </div>

        {/* ══════════ TICKER ══════════ */}
        <div className="hp-ticker">
          <div className="hp-ticker-track">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i} className="hp-ticker-item">
                {item} <span className="hp-ticker-sep">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════ ABOUT ══════════ */}
        <div className="hp-section-dark">
          <div className="hp-section">
            <div className="hp-about">
              {/* Image */}
              <div className="hp-about-img-wrap">
                <div className="hp-about-frame" />
                <img
                  className="hp-about-img"
                  src="https://www.purbaholidays.com/storage/destinations/F8mVRwsyWdp77lW9rleOZoulryL07825rThOWfgc.webp"
                  alt="Sacred India"
                />
                <div className="hp-about-badge">
                  <Star size={22} className="hp-about-badge-icon" />
                  <div>
                    <div className="hp-about-badge-num">500+</div>
                    <div className="hp-about-badge-label">Famous Temples</div>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="hp-about-right">
                <div className="hp-label">
                  <div className="hp-label-rule" /> About Spiritual India
                </div>
                <h2 className="hp-section-title">
                  Discover India's<br />
                  <strong>Sacred</strong> <em>Heritage</em>
                </h2>
                <p className="hp-about-text-body">
                  India is home to thousands of ancient temples, pilgrimage circuits,
                  and architectural marvels. This portal brings them together — one
                  sacred destination at a time.
                </p>

                <div className="hp-feat-pair">
                  {[
                    { icon: <Landmark size={20} />, title: "Pilgrimage Circuits", desc: "Char Dham, Jyotirlinga, Shakti Peeth and beyond." },
                    { icon: <Building2 size={20} />, title: "Temple Architecture", desc: "Ancient carvings, Dravidian spires, Nagara shikhara." },
                    { icon: <MapPin size={20} />, title: "Location Guides", desc: "Timings, dress codes, and travel directions." },
                    { icon: <Mountain size={20} />, title: "Himalayan Shrines", desc: "High-altitude temples and mountain pilgrimages." },
                  ].map((f, i) => (
                    <div key={i} className="hp-feat">
                      <div className="hp-feat-icon">{f.icon}</div>
                      <div className="hp-feat-title">{f.title}</div>
                      <div className="hp-feat-desc">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ PILGRIMAGE SECTIONS ══════════ */}
        {PIL_TYPES.map((type, si) => {
          const byType = temples.filter((t) => t.pilgrimageCircuits?.includes(type)).slice(0, 3);
          if (!byType.length) return null;
          return (
            <div key={type} className={si % 2 === 0 ? "hp-section-mid" : "hp-section-dark"}>
              <div className="hp-section">
                <div className="hp-pil-header">
                  <div>
                    <div className="hp-label"><div className="hp-label-rule" /> Sacred Pilgrimage</div>
                    <h2 className="hp-section-title">
                      <em>{type}</em> <strong>Temples</strong>
                    </h2>
                  </div>
                  <Link to={`/travel/${encodeURIComponent(type)}`} className="hp-pil-see-all">
                    View all <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="hp-grid">
                  {byType.map((t) => (
                    <div key={t._id} className="hp-card" onClick={() => navigate(`/templeDetails/${t._id}`)}>
                      <div className="hp-card-img-wrap">
                        <img className="hp-card-img" src={t.images?.[0]?.url || t.images?.[0]} alt={t.templeName} />
                        {t.rating && (
                          <div className="hp-card-rating">
                            <Star size={10} fill="#BF8C3A" color="#BF8C3A" />
                            <span className="hp-card-rating-num">{t.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="hp-card-body">
                        <div className="hp-card-loc"><MapPin size={10} />{t.city}</div>
                        <div className="hp-card-name">{t.templeName}</div>
                        <div className="hp-card-tags">
                          {t.pilgrimageCircuits?.slice(0, 3).map((c, i) => (
                            <span key={i} className="hp-card-tag">{c}</span>
                          ))}
                        </div>
                        <div className="hp-card-cta">Explore <ArrowRight size={11} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* ══════════ ARCHITECTURE ══════════ */}
        {archTemples.length > 0 && (
          <div className="hp-section-mid">
            <div className="hp-section">
              <div className="hp-pil-header">
                <div>
                  <div className="hp-label"><div className="hp-label-rule" /> Ancient Architecture</div>
                  <h2 className="hp-section-title"><strong>Architectural</strong> <em>Marvels</em></h2>
                </div>
              </div>
              <div className="hp-grid">
                {archTemples.map((t) => (
                  <div key={t._id} className="hp-card" onClick={() => navigate(`/templeDetails/${t._id}`)}>
                    <div className="hp-card-img-wrap">
                      <img className="hp-card-img" src={t.images?.[0]?.url || t.images?.[0]} alt={t.templeName} />
                    </div>
                    <div className="hp-card-body">
                      <div className="hp-card-loc"><Mountain size={10} />{t.city}</div>
                      <div className="hp-card-name">{t.templeName}</div>
                      <div className="hp-card-cta">Discover <ArrowRight size={11} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ STATS BAND ══════════ */}
        <div className="hp-stats-band">
          {[
            ["500", "+", "Temples Listed"],
            ["28", "", "States Covered"],
            ["1000", "+", "Temple Images"],
            ["12", "", "Pilgrimage Circuits"],
          ].map(([n, s, l], i) => (
            <div key={i} className="hp-stat-cell">
              <div className="hp-stat-num">
                {n}<strong>{s}</strong>
              </div>
              <div className="hp-stat-label">{l}</div>
            </div>
          ))}
        </div>

        {/* ══════════ CTA BAND ══════════ */}
        <div className="hp-cta-band">
          <div className="hp-cta-om">ॐ</div>
          <div className="hp-cta-inner">
            <div>
              <h2 className="hp-cta-title">
                Begin Your <em style={{ fontStyle: "italic", color: "var(--goldl)" }}>Spiritual</em><br />
                <strong>Journey Across India</strong>
              </h2>
              <p className="hp-cta-sub">
                Discover divine destinations, sacred traditions, and five millennia of temple heritage.
              </p>
            </div>
            <Link to="/circuits" className="hp-cta-primary" style={{ alignSelf: "center" }}>
              All Circuits <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}