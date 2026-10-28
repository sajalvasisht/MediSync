import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, Video, Calendar, ShieldCheck, MapPin, Globe } from 'lucide-react';
import doctorsData from '../../data/doctors';
import Badge from '../../components/common/Badge';
import Rating from '../../components/common/Rating';
import './DoctorsPage.css';

const SPECIALTIES = [
  'All',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Gynecology',
  'Neurology',
  'Psychiatry',
  'General Medicine',
];

const CITIES = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kochi', 'Pune'];
const LANGUAGES = ['All', 'English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'];

const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSpecialty = searchParams.get('specialty') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [maxFee, setMaxFee] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(q);
        const matchesHosp = doc.hospital.toLowerCase().includes(q);
        const matchesSpec = doc.specialty.toLowerCase().includes(q);
        if (!matchesName && !matchesHosp && !matchesSpec) return false;
      }
      if (selectedSpecialty !== 'All' && doc.specialty !== selectedSpecialty) return false;
      if (selectedCity !== 'All' && doc.city !== selectedCity) return false;
      if (selectedLanguage !== 'All' && !doc.language.includes(selectedLanguage)) return false;
      if (doc.fee > maxFee) return false;
      if (doc.rating < minRating) return false;
      return true;
    });
  }, [searchQuery, selectedSpecialty, selectedCity, selectedLanguage, maxFee, minRating]);

  return (
    <div className="doctors-page">
      {/* Page Header */}
      <section className="doctors-hero">
        <div className="doctors-hero__inner">
          <Badge variant="sage" className="doctors-hero__badge">
            ✦ ACCREDITED CLINICIANS
          </Badge>
          <h1 className="doctors-hero__title text-display">
            Find Your Medical Specialist
          </h1>
          <p className="doctors-hero__desc">
            Browse world-class physicians, cardiologists, dermatologists, and mental health specialists. Book instant HD video consults with verified credentials.
          </p>

          {/* Search bar */}
          <div className="doctors-search-bar">
            <Search size={18} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or hospital affiliation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Filters + Doctor Grid */}
      <div className="doctors-layout">
        {/* Left Filter Sidebar */}
        <aside className="doctors-sidebar" aria-label="Filters">
          <div className="sidebar-card">
            <div className="sidebar-header">
              <Filter size={16} />
              <h2 className="sidebar-title">Filter Specialists</h2>
            </div>

            {/* Specialty Pills */}
            <div className="filter-group">
              <label className="filter-label">Specialisation</label>
              <div className="specialty-pills">
                {SPECIALTIES.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    className={`filter-pill${selectedSpecialty === spec ? ' filter-pill--active' : ''}`}
                    onClick={() => {
                      setSelectedSpecialty(spec);
                      if (spec === 'All') searchParams.delete('specialty');
                      else searchParams.set('specialty', spec);
                      setSearchParams(searchParams);
                    }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="city-select">Location / City</label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="filter-select"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Locations' : c}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="lang-select">Consultation Language</label>
              <select
                id="lang-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="filter-select"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l === 'All' ? 'All Languages' : l}</option>
                ))}
              </select>
            </div>

            {/* Max Fee Slider */}
            <div className="filter-group">
              <div className="fee-label-row">
                <label className="filter-label" htmlFor="fee-slider">Max Consultation Fee</label>
                <span className="fee-value">₹{maxFee}</span>
              </div>
              <input
                id="fee-slider"
                type="range"
                min="300"
                max="1200"
                step="50"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="filter-range"
              />
            </div>

            {/* Min Rating */}
            <div className="filter-group">
              <label className="filter-label">Minimum Rating</label>
              <div className="rating-options">
                {[0, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    type="button"
                    className={`rating-pill${minRating === r ? ' rating-pill--active' : ''}`}
                    onClick={() => setMinRating(r)}
                  >
                    {r === 0 ? 'Any Rating' : `${r}★ & above`}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              type="button"
              className="filter-reset-btn"
              onClick={() => {
                setSelectedSpecialty('All');
                setSelectedCity('All');
                setSelectedLanguage('All');
                setMaxFee(1000);
                setMinRating(0);
                setSearchQuery('');
                setSearchParams({});
              }}
            >
              Reset All Filters
            </button>
          </div>
        </aside>

        {/* Right: Doctors Results Grid */}
        <main className="doctors-grid-container">
          <div className="doctors-results-header">
            <span className="results-count">
              Showing <strong>{filteredDoctors.length}</strong> available clinicians
            </span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="no-doctors-card">
              <p className="no-doctors-title">No specialists match your criteria</p>
              <p className="no-doctors-sub">Try expanding your price range or clearing specialty filters.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map((doc) => (
                <div key={doc.id} className="doctor-card">
                  <div className="doc-card-top">
                    <div className="doc-avatar">
                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="doc-meta">
                      <span className="doc-specialty-tag">{doc.specialty}</span>
                      <h3 className="doc-name text-display">{doc.name}</h3>
                      <p className="doc-hosp">{doc.hospital}</p>
                    </div>
                  </div>

                  <div className="doc-info-chips">
                    <div className="doc-chip">
                      <MapPin size={12} />
                      <span>{doc.city}</span>
                    </div>
                    <div className="doc-chip">
                      <Globe size={12} />
                      <span>{doc.language.join(', ')}</span>
                    </div>
                    <div className="doc-chip">
                      <ShieldCheck size={12} />
                      <span>{doc.yearsExp}+ Yrs Exp</span>
                    </div>
                  </div>

                  <p className="doc-bio-snippet">{doc.bio}</p>

                  <div className="doc-card-bottom">
                    <div className="doc-rating-fee">
                      <Rating value={doc.rating} size="sm" showValue />
                      <span className="doc-review-count">({doc.reviewCount} reviews)</span>
                      <div className="doc-fee-tag">
                        Fee: <strong>₹{doc.fee}</strong>
                      </div>
                    </div>

                    <div className="doc-card-actions">
                      <Link to={`/doctors/${doc.id}`} className="doc-view-btn">
                        Profile &amp; Slots
                      </Link>
                      <Link to={`/book/${doc.id}`} className="doc-book-btn">
                        <Video size={13} />
                        <span>Book</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorsPage;
