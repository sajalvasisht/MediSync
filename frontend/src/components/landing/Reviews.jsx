import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import Rating from '../common/Rating';
import initialTestimonials from '../../data/testimonials';
import './Reviews.css';

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    rating: 5,
    text: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;

    const newReview = {
      id: Date.now(),
      name: formData.name,
      location: 'Verified Patient',
      specialty: formData.specialty || 'General Consultation',
      rating: formData.rating,
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
    };

    setReviewsList([newReview, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', specialty: '', rating: 5, text: '' });
    }, 3500);
  };

  return (
    <div className="reviews-wrapper">
      {/* LEFT: Submit Review Form */}
      <div className="review-form-card">
        <div className="review-form-header">
          <div className="review-form-title-row">
            <MessageSquarePlus size={16} className="review-form-icon" />
            <h3 className="review-form-title">Submit Patient Review</h3>
          </div>
          <p className="review-form-subtitle">
            Share your clinical or consultation experience to help potential patients understand our telemedicine approach.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="review-form"
              onSubmit={handleSubmit}
            >
              {/* Star selector */}
              <div className="form-group">
                <label className="form-label">Consultation Rating</label>
                <div className="star-picker" role="radiogroup" aria-label="Select rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-picker-btn${star <= formData.rating ? ' is-active' : ''}`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      aria-label={`${star} star`}
                    >
                      <Star size={18} fill={star <= formData.rating ? '#df9e38' : 'none'} />
                    </button>
                  ))}
                  <span className="star-picker-count">{formData.rating} of 5 Stars</span>
                </div>
              </div>

              {/* Name & Specialty */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="review-name">Your Full Name</label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="review-specialty">Consultation Specialty</label>
                  <input
                    id="review-specialty"
                    type="text"
                    placeholder="e.g. Cardiology Consult"
                    className="form-input"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  />
                </div>
              </div>

              {/* Textarea */}
              <div className="form-group">
                <label className="form-label" htmlFor="review-text">Your Clinical Feedback</label>
                <textarea
                  id="review-text"
                  required
                  rows={3}
                  placeholder="Describe your care experience, doctor communication, and results..."
                  className="form-textarea"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                />
              </div>

              <button type="submit" className="review-submit-btn">
                Publish Patient Feedback
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="review-success-state"
            >
              <CheckCircle2 size={36} className="review-success-icon" />
              <h4 className="review-success-title">Review Submitted with Gratitude</h4>
              <p className="review-success-desc">
                Your feedback has been verified and published to our active patient testimonials.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: Active Patient Testimonials */}
      <div className="testimonials-card">
        <h3 className="testimonials-title">Active Patient Testimonials</h3>

        <div className="testimonials-list">
          {reviewsList.map((item) => (
            <div key={item.id} className="testimonial-row">
              <div className="testimonial-row__header">
                <div>
                  <h4 className="testimonial-patient-name">{item.name}</h4>
                  <span className="testimonial-specialty-badge">{item.specialty}</span>
                </div>
                <Rating value={item.rating} size="sm" />
              </div>
              <p className="testimonial-quote">
                &ldquo;{item.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
