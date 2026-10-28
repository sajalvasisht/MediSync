import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Video, ShieldCheck, MapPin, Globe, Award, CheckCircle2, ArrowLeft } from 'lucide-react';
import doctors from '../../data/doctors';
import slotsData from '../../data/slots';
import Badge from '../../components/common/Badge';
import Rating from '../../components/common/Rating';
import './DoctorProfilePage.css';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id) || doctors[0];
  const doctorSlots = slotsData[doctor.id] || slotsData['1'];

  const availableDates = Object.keys(doctorSlots);
  const [selectedDate, setSelectedDate] = useState(availableDates[0] || '2026-10-29');
  const [selectedTime, setSelectedTime] = useState(doctorSlots[selectedDate]?.[0] || '');
  const [imgFailed, setImgFailed] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(doctorSlots[date]?.[0] || '');
  };

  const handleProceedBooking = () => {
    if (!selectedTime) return;
    navigate(`/book/${doctor.id}?date=${selectedDate}&time=${selectedTime}`);
  };

  return (
    <div className="doc-profile-page">
      <div className="doc-profile-container">
        {/* Back navigation */}
        <Link to="/doctors" className="doc-back-link">
          <ArrowLeft size={15} />
          <span>Back to Specialists</span>
        </Link>

        <div className="doc-profile-grid">
          {/* Left Column: Doctor Bio & Credentials */}
          <div className="doc-profile-main">
            <div className="doc-profile-hero-card">
              <div className="profile-hero-top">
                <div className="profile-avatar">
                  {doctor.avatar && !imgFailed ? (
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="profile-avatar-img"
                      onError={() => setImgFailed(true)}
                    />
                  ) : (
                    <span>{doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  )}
                </div>
                <div className="profile-hero-meta">
                  <Badge variant="sage" className="profile-spec-badge">
                    {doctor.specialty}
                  </Badge>
                  <h1 className="profile-name text-display">{doctor.name}</h1>
                  <p className="profile-hosp">{doctor.hospital}</p>
                  <div className="profile-rating-row">
                    <Rating value={doctor.rating} size="md" showValue />
                    <span className="profile-reviews-count">({doctor.reviewCount} verified consults)</span>
                  </div>
                </div>
              </div>

              <div className="profile-quick-stats">
                <div className="quick-stat">
                  <Award size={18} className="stat-icon" />
                  <div>
                    <span className="stat-val">{doctor.yearsExp}+ Years</span>
                    <span className="stat-label">Experience</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <MapPin size={18} className="stat-icon" />
                  <div>
                    <span className="stat-val">{doctor.city}</span>
                    <span className="stat-label">Practice Node</span>
                  </div>
                </div>
                <div className="quick-stat">
                  <Globe size={18} className="stat-icon" />
                  <div>
                    <span className="stat-val">{doctor.language.join(', ')}</span>
                    <span className="stat-label">Languages</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed sections */}
            <div className="profile-section-card">
              <h2 className="section-card-title">Clinical Biography</h2>
              <p className="section-card-text">{doctor.bio}</p>

              <h2 className="section-card-title" style={{ marginTop: '1.5rem' }}>Medical Education &amp; Fellowship</h2>
              <p className="section-card-text">{doctor.education}</p>

              <div className="consult-guarantee">
                <ShieldCheck size={20} className="guarantee-icon" />
                <div>
                  <h3 className="guarantee-title">Encrypted Telemedicine Guarantee</h3>
                  <p className="guarantee-desc">
                    All audio/video consultation streams are end-to-end encrypted. Electronic prescriptions are signed and valid at all registered pharmacies nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Slot Picker Card */}
          <aside className="doc-slot-sidebar">
            <div className="slot-picker-card">
              <div className="slot-picker-header">
                <h2 className="slot-picker-title">Book Video Consultation</h2>
                <div className="slot-fee-pill">
                  <span>Fee:</span>
                  <strong>₹{doctor.fee}</strong>
                </div>
              </div>

              {/* Step 1: Select Date */}
              <div className="picker-step">
                <label className="picker-label">
                  <Calendar size={14} />
                  <span>1. Select Date</span>
                </label>
                <div className="date-chips-row">
                  {availableDates.map((date) => {
                    const isSelected = date === selectedDate;
                    const dateObj = new Date(date);
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

                    return (
                      <button
                        key={date}
                        type="button"
                        className={`date-chip${isSelected ? ' date-chip--active' : ''}`}
                        onClick={() => handleDateChange(date)}
                      >
                        <span className="date-chip-day">{dayName}</span>
                        <span className="date-chip-num">{dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Time Slot */}
              <div className="picker-step">
                <label className="picker-label">
                  <Clock size={14} />
                  <span>2. Select Consultation Time</span>
                </label>
                <div className="time-slots-grid">
                  {(doctorSlots[selectedDate] || []).map((time) => {
                    const isSelected = time === selectedTime;
                    return (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot-tile${isSelected ? ' time-slot-tile--active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected summary */}
              {selectedTime && (
                <div className="slot-selection-summary">
                  <CheckCircle2 size={16} className="summary-check" />
                  <span>
                    Selected: <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>
                  </span>
                </div>
              )}

              {/* Proceed CTA */}
              <button
                type="button"
                className="proceed-book-btn"
                disabled={!selectedTime}
                onClick={handleProceedBooking}
              >
                <Video size={16} />
                <span>Confirm Slot &amp; Proceed</span>
              </button>

              <span className="slot-instant-note">
                ⚡ Instant confirmation &bull; Free cancellation up to 2 hrs before
              </span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
