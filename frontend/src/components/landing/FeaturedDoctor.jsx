import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Clock, Calendar, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';
import doctors from '../../data/doctors';
import './FeaturedDoctor.css';

const FeaturedDoctor = () => {
  const featured = doctors[0]; // Dr. Priya Sharma
  const [imgError, setImgError] = useState(false);

  return (
    <section className="featured-doc-section" id="doctors" aria-label="Featured Chief Specialist">
      <div className="featured-doc-container">
        <div className="featured-doc-card">
          {/* Left: Doctor Profile and Credentials */}
          <div className="featured-doc-left">
            <Badge variant="sage" className="featured-doc-badge">
              ✦ CLINICAL DIRECTOR &bull; CARDIOLOGY
            </Badge>

            <h2 className="featured-doc-name text-display">
              {featured.name}
            </h2>

            <p className="featured-doc-lead">
              {featured.bio}
            </p>

            <div className="featured-doc-grid">
              <div className="featured-doc-metric">
                <Award size={18} className="featured-doc-icon" />
                <div>
                  <span className="featured-metric-val">{featured.yearsExp}+ Years</span>
                  <span className="featured-metric-label">Clinical Mastery</span>
                </div>
              </div>
              <div className="featured-doc-metric">
                <Star size={18} className="featured-doc-icon featured-doc-icon--star" />
                <div>
                  <span className="featured-metric-val">{featured.rating} ★★★★★</span>
                  <span className="featured-metric-label">{featured.reviewCount} Verified Consults</span>
                </div>
              </div>
              <div className="featured-doc-metric">
                <ShieldCheck size={18} className="featured-doc-icon" />
                <div>
                  <span className="featured-metric-val">AIIMS &amp; Cleveland</span>
                  <span className="featured-metric-label">Academic Pedigree</span>
                </div>
              </div>
              <div className="featured-doc-metric">
                <Clock size={18} className="featured-doc-icon" />
                <div>
                  <span className="featured-metric-val">Next Slot Today</span>
                  <span className="featured-metric-label">Instant Video Consult</span>
                </div>
              </div>
            </div>

            <div className="featured-doc-actions">
              <Link to={`/doctors/${featured.id}`} className="featured-doc-cta">
                <Calendar size={15} />
                <span>Book Consult with {featured.name.split(' ')[1]}</span>
              </Link>
              <Link to="/doctors" className="featured-doc-link">
                <span>View All Specialists ({doctors.length})</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right: Doctor Visual Glass Frame */}
          <div className="featured-doc-right">
            <div className="featured-doc-portrait">
              <div className="featured-doc-portrait-art">
                {featured.avatar && !imgError ? (
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="featured-doc-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="featured-doc-initials">PS</div>
                )}
              </div>

              {/* Floating verified badge */}
              <div className="featured-doc-float-tag">
                <span className="featured-tag-dot" />
                <span>ACCEPTING NEW PATIENTS</span>
              </div>

              {/* Hospital affiliation plate */}
              <div className="featured-doc-plate">
                <span className="featured-plate-title">{featured.hospital}</span>
                <span className="featured-plate-sub">{featured.city} &bull; Consult Fee: ₹{featured.fee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctor;
