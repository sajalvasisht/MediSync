import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import './Auth.css';

const RegisterPage = () => {
  const [role, setRole] = useState('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (role === 'doctor') {
      navigate('/dashboard/doctor');
    } else {
      navigate('/dashboard/patient');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Badge variant="sage" className="auth-badge">
            NEW REGISTRATION &bull; SECURE CARE
          </Badge>

          <h1 className="auth-title text-display">Join MediSync</h1>
          <p className="auth-subtitle">
            Create your unified health account for frictionless telemedicine, encrypted records, and priority specialist booking.
          </p>

          <div className="auth-role-tabs">
            <button
              type="button"
              className={`auth-role-btn${role === 'patient' ? ' is-active' : ''}`}
              onClick={() => setRole('patient')}
            >
              As a Patient
            </button>
            <button
              type="button"
              className={`auth-role-btn${role === 'doctor' ? ' is-active' : ''}`}
              onClick={() => setRole('doctor')}
            >
              As a Clinician
            </button>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya Sen"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                required
                placeholder="vikram@example.com"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Set Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Create {role === 'doctor' ? 'Clinician Profile' : 'Patient Vault'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p className="auth-footer-text">
            Already registered with MediSync?
            <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
