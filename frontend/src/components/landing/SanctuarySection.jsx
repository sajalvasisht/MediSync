import React from 'react';
import Badge from '../common/Badge';
import Blueprint from './Blueprint';
import Reviews from './Reviews';
import './SanctuarySection.css';

const SanctuarySection = () => {
  return (
    <section className="sanctuary-section" id="contact" aria-label="Sanctuary and Patient Feedback">
      <div className="sanctuary-container">
        {/* Section Header matching Screenshot 3 */}
        <div className="sanctuary-header">
          <Badge variant="sage" className="sanctuary-eyebrow">
            ✦ STUDIO &amp; REVIEWS
          </Badge>
          <h2 className="sanctuary-title text-display">
            Our Sanctuary &amp; Patient Feedback
          </h2>
          <p className="sanctuary-subtitle">
            Explore our state-of-the-art teleconsultation infrastructure or write a review about your clinical care experience.
          </p>
        </div>

        {/* Top pair: Blueprint + Location & Hours */}
        <Blueprint />

        {/* Bottom pair: Submit Review + Active Testimonials */}
        <Reviews />
      </div>
    </section>
  );
};

export default SanctuarySection;
