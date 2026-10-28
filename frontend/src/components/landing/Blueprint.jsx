import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  MessageCircle,
  FileText,
  Shield,
  Clock,
  Heart,
  MapPin,
  Calendar,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import blueprintZones from '../../data/blueprintZones';
import brand from '../../config/brand';
import './Blueprint.css';

const ICON_MAP = {
  Video,
  MessageCircle,
  FileText,
  Shield,
  Clock,
  Heart,
};

const Blueprint = () => {
  const [activeZoneId, setActiveZoneId] = useState(blueprintZones[0].id);

  const activeZone = blueprintZones.find(z => z.id === activeZoneId) || blueprintZones[0];
  const ActiveIcon = ICON_MAP[activeZone.icon] || Sparkles;

  return (
    <div className="blueprint-wrapper">
      {/* LEFT: Blueprint interactive map */}
      <div className="blueprint-card">
        <div className="blueprint-card__header">
          <div className="blueprint-card__title-row">
            <Sparkles size={16} className="blueprint-card__icon" />
            <h3 className="blueprint-card__title">Interactive Virtual Clinic Blueprint</h3>
          </div>
          <p className="blueprint-card__subtitle">
            Click different zones on our clinical layout blueprint to explore how we engineered a medical-grade space focused completely on patient peace.
          </p>
        </div>

        {/* The dashed blueprint room drawing */}
        <div className="blueprint-canvas" role="region" aria-label="Virtual clinic floor plan">
          {/* Room walls SVG dashed lines */}
          <svg className="blueprint-walls" viewBox="0 0 500 320" fill="none">
            {/* Outer boundary */}
            <rect
              x="8"
              y="8"
              width="484"
              height="304"
              rx="18"
              stroke="#BACBBF"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              fill="rgba(240, 246, 241, 0.45)"
            />
            {/* Dividing walls */}
            <line
              x1="180"
              y1="8"
              x2="180"
              y2="312"
              stroke="#BACBBF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1="180"
              y1="160"
              x2="380"
              y2="160"
              stroke="#BACBBF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1="380"
              y1="8"
              x2="380"
              y2="312"
              stroke="#BACBBF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <line
              x1="8"
              y1="180"
              x2="180"
              y2="180"
              stroke="#BACBBF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
          </svg>

          {/* Interactive Clickable Zone Pins */}
          {blueprintZones.map((zone) => {
            const ZoneIcon = ICON_MAP[zone.icon] || Sparkles;
            const isSelected = zone.id === activeZoneId;

            return (
              <button
                key={zone.id}
                type="button"
                className={`blueprint-pin${isSelected ? ' blueprint-pin--active' : ''}`}
                style={{ top: zone.position.top, left: zone.position.left }}
                onClick={() => setActiveZoneId(zone.id)}
                aria-pressed={isSelected}
                aria-label={`Inspect ${zone.label}`}
              >
                <ZoneIcon size={16} />
              </button>
            );
          })}
        </div>

        {/* Selected Zone Detail Card Beneath */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="blueprint-detail-card"
          >
            <div className="blueprint-detail-header">
              <div className="blueprint-detail-icon-wrap">
                <ActiveIcon size={18} />
              </div>
              <h4 className="blueprint-detail-title">{activeZone.title}</h4>
            </div>
            <p className="blueprint-detail-desc">{activeZone.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT: Clinic Location & Hours Card */}
      <div className="location-hours-card">
        <h3 className="location-hours-title">Virtual Clinic &amp; Care Hub</h3>

        {/* Address */}
        <div className="location-info-block">
          <div className="location-info-icon-wrap">
            <MapPin size={18} />
          </div>
          <div className="location-info-text">
            <h4 className="location-info-heading">Digital Care Headquarters</h4>
            <p className="location-info-address">
              SCO 45, Sector 9-D, Madhya Marg<br />
              Chandigarh, 160009 &bull; Global Telehealth Node
            </p>
            <span className="location-info-sub">
              &bull; Encrypted consultations across all 28 states &amp; territories.
            </span>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="location-info-block">
          <div className="location-info-icon-wrap">
            <Calendar size={18} />
          </div>
          <div className="location-info-text">
            <h4 className="location-info-heading">Consultation Hours</h4>
            <div className="hours-grid">
              <div className="hours-row">
                <span className="hours-days">Mon &ndash; Thu:</span>
                <span className="hours-time">8:00 AM &ndash; 8:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="hours-days">Friday:</span>
                <span className="hours-time">8:00 AM &ndash; 3:00 PM</span>
              </div>
              <div className="hours-row">
                <span className="hours-days">Sat &ndash; Sun:</span>
                <span className="hours-time hours-time--highlight">BY SANCTUARY CALL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Inquiries */}
        <div className="location-info-block">
          <div className="location-info-icon-wrap">
            <PhoneCall size={18} />
          </div>
          <div className="location-info-text">
            <h4 className="location-info-heading">Direct Inquiries</h4>
            <p className="location-info-phone">
              Support: <strong>{brand.phone}</strong>
            </p>
            <span className="location-info-sub">
              Emergency Concierge available 24/7 for registered patients.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
