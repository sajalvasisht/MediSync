import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Video, ChevronRight, Shield, Star } from 'lucide-react';
import Badge from '../common/Badge';
import brand from '../../config/brand';
import './Hero.css';

const AVATAR_COLORS = ['#1C2420', '#6B8F71', '#3A6644'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

const Hero = () => (
  <section className="hero" id="home" aria-label="Hero — platform introduction">
    {/* Decorative background orbits */}
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__orbit hero__orbit--1" />
      <div className="hero__orbit hero__orbit--2" />
      <div className="hero__orbit hero__orbit--3" />
    </div>

    <div className="hero__inner">
      {/* LEFT — text content */}
      <div className="hero__left">
        <motion.div {...fadeUp(0)}>
          <Badge variant="sage" dot className="hero__eyebrow">
            GOOD {getTimeOfDay()} • {brand.name.toUpperCase()}
          </Badge>
        </motion.div>

        <motion.h1 className="hero__headline text-display" {...fadeUp(0.1)}>
          <em>Connecting you with</em>
          <br />
          <em><span className="hero__headline-accent">expert doctors,</span></em>
          <br />
          <em>from anywhere.</em>
        </motion.h1>

        <motion.p className="hero__body" {...fadeUp(0.2)}>
          We've reimagined healthcare into a seamless, private experience.
          Consult top specialists via video in minutes — no waiting rooms,
          no commute, just clear answers and real care.
        </motion.p>

        <motion.div className="hero__ctas" {...fadeUp(0.3)}>
          <Link to="/doctors" className="hero__cta-primary">
            <Video size={16} aria-hidden="true" />
            Begin Your Consultation
          </Link>
          <Link to="/doctors" className="hero__cta-secondary">
            Explore Specialists
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div className="hero__social-proof" {...fadeUp(0.4)}>
          {/* Avatar stack */}
          <div className="hero__avatars" aria-label="Patient avatars">
            {AVATAR_COLORS.map((c, i) => (
              <div
                key={i}
                className="hero__avatar"
                style={{ background: c, zIndex: AVATAR_COLORS.length - i }}
                aria-hidden="true"
              >
                {['P', 'R', 'S'][i]}
              </div>
            ))}
          </div>
          {/* Stars + count */}
          <div className="hero__stars" aria-label="5 star rating, 1200+ patients">
            <div className="hero__star-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="hero__star-icon" aria-hidden="true" />
              ))}
            </div>
            <span className="hero__star-label">1,200+ Patients Helped</span>
          </div>
          {/* Safety */}
          <div className="hero__safety" aria-label="99.4% safety rating">
            <Shield size={14} className="hero__safety-icon" aria-hidden="true" />
            <div>
              <span className="hero__safety-val">99.4% Safety Rating</span>
              <span className="hero__safety-sub">Encrypted &amp; Mercury-Free Care</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — phone frame + floating cards */}
      <motion.div
        className="hero__right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        aria-hidden="true"
      >
        {/* Floating testimonial card */}
        <motion.div
          className="hero__testimonial-card"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="hero__t-avatar">E</div>
          <div className="hero__t-body">
            <div className="hero__t-name">Emily Thorne <span className="hero__t-badge">Verified Patient</span></div>
            <p className="hero__t-text">"It felt like a luxurious high-end experience. Completely painless and beautiful results."</p>
          </div>
        </motion.div>

        {/* Phone-style glass frame */}
        <div className="hero__phone-frame">
          <div className="hero__phone-inner">
            <div className="hero__phone-gradient" />
            {/* Simulated consult UI */}
            <div className="hero__phone-content">
              <div className="hero__phone-video-1" />
              <div className="hero__phone-video-2" />
              <div className="hero__phone-controls">
                <div className="hero__phone-ctrl" />
                <div className="hero__phone-ctrl hero__phone-ctrl--red" />
                <div className="hero__phone-ctrl" />
              </div>
            </div>
            {/* Bottom info card */}
            <div className="hero__phone-card">
              <span className="hero__phone-card-title">Our Virtual Clinic</span>
              <span className="hero__phone-card-sub">Designed for Ultimate Peace ✦</span>
            </div>
          </div>
        </div>

        {/* Rotating badge */}
        <div className="hero__rotate-badge">
          <motion.svg
            viewBox="0 0 120 120"
            width="90"
            height="90"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <path id="circlePath" d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" fill="none"/>
            <text fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="4" fill="#1C2420">
              <textPath href="#circlePath">MEDISYNC • TELECONSULT • MEDISYNC • </textPath>
            </text>
          </motion.svg>
          <div className="hero__rotate-center">
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#1C2420" strokeWidth="1.5"/>
              <path d="M14 8v12M8 14h12" stroke="#1C2420" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Faint curved lines */}
        <svg className="hero__curve" viewBox="0 0 600 400" fill="none" aria-hidden="true">
          <path d="M0 200 Q200 80 400 200 T800 200" stroke="#6B8F71" strokeWidth="1" strokeOpacity="0.18" fill="none"/>
          <path d="M0 250 Q200 130 400 250 T800 250" stroke="#6B8F71" strokeWidth="0.5" strokeOpacity="0.1" fill="none"/>
        </svg>
      </motion.div>
    </div>
  </section>
);

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 17) return 'AFTERNOON';
  return 'EVENING';
}

export default Hero;
