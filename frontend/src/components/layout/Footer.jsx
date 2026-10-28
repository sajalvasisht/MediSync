import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Twitter, Instagram, Linkedin } from 'lucide-react';
import brand from '../../config/brand';
import './Footer.css';

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer__inner">
      {/* Brand block */}
      <div className="footer__brand">
        <div className="footer__logo">
          <div className="footer__logo-mark" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 7v14M7 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="3" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <span className="footer__logo-name">{brand.name}</span>
            <span className="footer__logo-sub">{brand.subtitle}</span>
          </div>
        </div>
        <p className="footer__tagline">{brand.tagline}</p>
        <div className="footer__contact">
          <a href={`tel:${brand.phone}`} className="footer__contact-link">
            <Phone size={14} aria-hidden="true" /> {brand.phone}
          </a>
          <a href={`mailto:${brand.email}`} className="footer__contact-link">
            <Mail size={14} aria-hidden="true" /> {brand.email}
          </a>
        </div>
        <div className="footer__social">
          <a href={brand.social.twitter} className="footer__social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><Twitter size={16}/></a>
          <a href={brand.social.instagram} className="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram size={16}/></a>
          <a href={brand.social.linkedin} className="footer__social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={16}/></a>
        </div>
      </div>

      {/* Nav columns */}
      {brand.footer.columns.map((col) => (
        <div key={col.heading} className="footer__col">
          <h3 className="footer__col-heading">{col.heading}</h3>
          <ul className="footer__col-links">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="footer__col-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="footer__bottom">
      <span className="footer__copy">{brand.footer.copyright}</span>
      <span className="footer__made">{brand.footer.madeWith}</span>
    </div>
  </footer>
);

export default Footer;
