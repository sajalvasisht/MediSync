import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import useScrollSpy from '../../hooks/useScrollSpy';
import brand from '../../config/brand';
import navLinks from '../../data/navLinks';
import './Navbar.css';

const SECTION_IDS = navLinks.map(l => l.id);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const activeId = useScrollSpy(isLanding ? SECTION_IDS : [], 80);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (link) => {
    if (!isLanding) return false;
    return activeId === link.id;
  };

  const handleNavClick = (link) => {
    setMenuOpen(false);
    if (link.href.startsWith('#') && isLanding) {
      const el = document.getElementById(link.id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label={`${brand.name} home`}>
          <div className="navbar__logo-mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 7v14M7 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="3" fill="currentColor"/>
            </svg>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">{brand.name}</span>
            <span className="navbar__logo-sub">{brand.subtitle}</span>
          </div>
        </Link>

        {/* Center pill nav */}
        <div className="navbar__pill" role="list">
          {navLinks.map((link) => (
            <div key={link.id} role="listitem">
              {link.href.startsWith('#') && isLanding ? (
                <button
                  className={`navbar__pill-item${isActive(link) ? ' navbar__pill-item--active' : ''}`}
                  onClick={() => handleNavClick(link)}
                  aria-current={isActive(link) ? 'true' : undefined}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  to={link.href.startsWith('#') ? '/' : link.href}
                  className={`navbar__pill-item${
                    location.pathname === link.href ? ' navbar__pill-item--active' : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="navbar__actions">
          <a href={`tel:${brand.phone}`} className="navbar__phone" aria-label={`Call ${brand.phone}`}>
            <Phone size={14} aria-hidden="true" />
            <span>{brand.phone}</span>
          </a>
          <Link to="/book/1" className="navbar__cta">
            <Calendar size={14} aria-hidden="true" />
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="navbar__mobile-item"
              onClick={() => handleNavClick(link)}
            >
              {link.label}
            </button>
          ))}
          <Link to="/book/1" className="navbar__mobile-cta" onClick={() => setMenuOpen(false)}>
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
