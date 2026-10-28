import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '../common/Badge';
import Tabs from '../common/Tabs';
import caseStudies from '../../data/caseStudies';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = () => {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const activeCase = caseStudies.find(c => c.id === activeTab) || caseStudies[0];

  const tabItems = caseStudies.map(c => ({ id: c.id, label: c.tab }));

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="results-section" id="results" aria-label="Clinical Results and Transformations">
      <div className="results-container">
        {/* Section Heading matching Screenshot 2 */}
        <div className="results-header">
          <Badge variant="sage" className="results-eyebrow">
            ✦ CLINICAL OUTCOMES
          </Badge>
          <h2 className="results-title text-display">
            Our Patient Masterpieces
          </h2>
          <p className="results-subtitle">
            Interact with real patient results using our precision sliding comparer. Witness the biological restoration of nature and health.
          </p>

          <Tabs
            items={tabItems}
            activeId={activeTab}
            onChange={(id) => {
              setActiveTab(id);
              setSliderPos(50);
            }}
            className="results-tabs"
          />
        </div>

        {/* Case Study Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="case-study-card"
          >
            {/* Left: Interactive Before/After slider */}
            <div
              className="comparer-container"
              ref={containerRef}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              role="slider"
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Before and after clinical comparison slider"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setSliderPos(p => Math.max(5, p - 5));
                if (e.key === 'ArrowRight') setSliderPos(p => Math.min(95, p + 5));
              }}
            >
              {/* "After" Layer (Background base) */}
              <div className="comparer-layer comparer-layer--after">
                <img
                  src={activeCase.afterImage}
                  alt={activeCase.afterLabel}
                  className="comparer-layer-img"
                />
                <div className="comparer-overlay-scrim" />
                <div className="comparer-visual-graphic">
                  <div className="comparer-state-badge comparer-state-badge--after">
                    {activeCase.afterLabel}
                  </div>
                  <div className="comparer-metric-chip">
                    <span className="comparer-chip-dot" />
                    <span>RESTORED HEALTH</span>
                  </div>
                </div>
              </div>

              {/* "Before" Layer (Clipped on top) */}
              <div
                className="comparer-layer comparer-layer--before"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
              >
                <img
                  src={activeCase.beforeImage}
                  alt={activeCase.beforeLabel}
                  className="comparer-layer-img"
                />
                <div className="comparer-overlay-scrim" />
                <div className="comparer-visual-graphic">
                  <div className="comparer-state-badge comparer-state-badge--before">
                    {activeCase.beforeLabel}
                  </div>
                  <div className="comparer-metric-chip comparer-metric-chip--before">
                    <span>BASELINE CLINICAL STATE</span>
                  </div>
                </div>
              </div>

              {/* Divider line and handle */}
              <div
                className="comparer-handle"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="comparer-handle-line" />
                <div className="comparer-handle-pill">
                  <span className="comparer-arrows">‹ ›</span>
                </div>
              </div>
            </div>

            {/* Right: Clinical Description & Stats */}
            <div className="case-study-details">
              <Badge variant="sage" className="case-study-eyebrow">
                ✦ {activeCase.eyebrow}
              </Badge>
              <h3 className="case-study-title text-display">
                {activeCase.title}
              </h3>
              <p className="case-study-subtitle">
                {activeCase.subtitle}
              </p>

              {/* Stats table */}
              <div className="case-study-stats">
                {activeCase.stats.map((st, i) => (
                  <div key={i} className="case-study-stat-row">
                    <span className="case-study-stat-label">{st.label}</span>
                    <div className="case-study-stat-values">
                      <span className="case-study-stat-before">{st.before}</span>
                      <span className="case-study-stat-arrow">→</span>
                      <span className="case-study-stat-after">{st.after}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="case-study-desc">
                {activeCase.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
