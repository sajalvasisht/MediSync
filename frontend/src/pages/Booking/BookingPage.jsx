import React, { useState } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Video, CreditCard, QrCode, Building, CheckCircle2, Calendar, Clock, ArrowRight } from 'lucide-react';
import doctors from '../../data/doctors';
import Badge from '../../components/common/Badge';
import './BookingPage.css';

const BookingPage = () => {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctor = doctors.find(d => d.id === doctorId) || doctors[0];
  const date = searchParams.get('date') || '2026-10-29';
  const time = searchParams.get('time') || '10:00 AM';

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    symptoms: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
    upiId: 'patient@okhdfcbank',
  });

  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.email || !formData.phone) return;

    const roomId = `room-${Math.random().toString(36).substring(2, 9)}`;
    setConfirmedBooking({
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      roomId,
      doctor,
      date,
      time,
      patientName: formData.patientName,
      fee: doctor.fee,
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {!confirmedBooking ? (
          <div className="booking-flow-grid">
            {/* Left: Patient Info & Mock Payment */}
            <div className="booking-form-col">
              <div className="booking-step-card">
                <Badge variant="sage" className="booking-badge">
                  SECURE CHECKOUT &bull; STEP 1 OF 2
                </Badge>
                <h1 className="booking-title text-display">Confirm &amp; Book Consultation</h1>
                <p className="booking-subtitle">
                  Please review your consultation details and provide patient contact information for teleconsult invitation.
                </p>

                <form onSubmit={handleConfirm} className="booking-form">
                  <div className="form-section-title">1. Patient Details</div>

                  <div className="booking-field-row">
                    <div className="booking-field">
                      <label className="booking-label">Patient Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sanya Kapoor"
                        className="booking-input"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      />
                    </div>
                    <div className="booking-field">
                      <label className="booking-label">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="sanya@example.com"
                        className="booking-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="booking-field-row">
                    <div className="booking-field">
                      <label className="booking-label">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="booking-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="booking-field">
                      <label className="booking-label">Chief Medical Concern</label>
                      <input
                        type="text"
                        placeholder="e.g. Chest pain follow-up"
                        className="booking-input"
                        value={formData.symptoms}
                        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Payment Step */}
                  <div className="form-section-title" style={{ marginTop: '1.5rem' }}>
                    2. Select Payment Method
                  </div>

                  <div className="payment-options-grid">
                    <button
                      type="button"
                      className={`payment-method-card${paymentMethod === 'card' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard size={18} />
                      <span>Credit / Debit Card</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method-card${paymentMethod === 'upi' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <QrCode size={18} />
                      <span>UPI Instant Pay</span>
                    </button>
                    <button
                      type="button"
                      className={`payment-method-card${paymentMethod === 'netbanking' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <Building size={18} />
                      <span>Net Banking</span>
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="payment-fields-mock">
                      <div className="booking-field">
                        <label className="booking-label">Card Number (Mock Sandbox)</label>
                        <input
                          type="text"
                          className="booking-input"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="booking-field-row">
                        <div className="booking-field">
                          <label className="booking-label">Expires</label>
                          <input
                            type="text"
                            className="booking-input"
                            value={formData.cardExp}
                            onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          />
                        </div>
                        <div className="booking-field">
                          <label className="booking-label">Security Code</label>
                          <input
                            type="text"
                            className="booking-input"
                            value={formData.cardCvc}
                            onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="payment-fields-mock">
                      <div className="booking-field">
                        <label className="booking-label">Virtual Payment Address (VPA / UPI ID)</label>
                        <input
                          type="text"
                          className="booking-input"
                          value={formData.upiId}
                          onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'netbanking' && (
                    <div className="payment-fields-mock">
                      <div className="booking-field">
                        <label className="booking-label">Popular Banks</label>
                        <select className="booking-input">
                          <option>HDFC Bank</option>
                          <option>State Bank of India</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="booking-submit-btn">
                    <span>Pay ₹{doctor.fee} &amp; Complete Booking</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Booking Summary Receipt */}
            <aside className="booking-summary-col">
              <div className="summary-receipt-card">
                <h2 className="summary-title">Consultation Summary</h2>

                <div className="summary-doc-brief">
                  <div className="summary-avatar">
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="summary-doc-name">{doctor.name}</h3>
                    <span className="summary-doc-spec">{doctor.specialty}</span>
                    <p className="summary-doc-hosp">{doctor.hospital}</p>
                  </div>
                </div>

                <div className="summary-slot-info">
                  <div className="slot-info-item">
                    <Calendar size={15} />
                    <span>{date}</span>
                  </div>
                  <div className="slot-info-item">
                    <Clock size={15} />
                    <span>{time}</span>
                  </div>
                  <div className="slot-info-item">
                    <Video size={15} />
                    <span>Encrypted Video Consult</span>
                  </div>
                </div>

                <div className="summary-breakdown">
                  <div className="breakdown-row">
                    <span>Doctor Consultation Fee</span>
                    <span>₹{doctor.fee}</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Medical Platform &amp; Encryption</span>
                    <span className="free-tag">FREE</span>
                  </div>
                  <div className="breakdown-row breakdown-row--total">
                    <span>Total Amount Payable</span>
                    <span className="total-fee">₹{doctor.fee}</span>
                  </div>
                </div>

                <div className="summary-security-note">
                  <ShieldCheck size={16} className="security-check-icon" />
                  <span>256-bit HIPAA compliant clinical security. 100% refund guarantee if consult is cancelled.</span>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Confirmation Success View */
          <div className="booking-confirmed-card">
            <div className="confirmed-icon-wrap">
              <CheckCircle2 size={44} className="confirmed-icon" />
            </div>
            <Badge variant="sage" className="confirmed-badge">
              APPOINTMENT CONFIRMED &bull; {confirmedBooking.id}
            </Badge>

            <h1 className="confirmed-title text-display">
              You are booked with {confirmedBooking.doctor.name}
            </h1>

            <p className="confirmed-desc">
              A calendar invite and SMS link have been dispatched to your mobile. You can enter the waiting room 10 minutes prior to your consultation time.
            </p>

            <div className="confirmed-details-box">
              <div className="detail-item">
                <span className="detail-label">DATE &amp; TIME</span>
                <span className="detail-val">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PATIENT NAME</span>
                <span className="detail-val">{confirmedBooking.patientName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">SPECIALTY</span>
                <span className="detail-val">{confirmedBooking.doctor.specialty}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ROOM ID</span>
                <span className="detail-val font-mono">{confirmedBooking.roomId}</span>
              </div>
            </div>

            <div className="confirmed-actions">
              <Link to={`/consult/${confirmedBooking.roomId}`} className="confirmed-join-btn">
                <Video size={16} />
                <span>Enter Video Consultation Room</span>
              </Link>
              <Link to="/dashboard/patient" className="confirmed-dash-btn">
                View in Patient Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
