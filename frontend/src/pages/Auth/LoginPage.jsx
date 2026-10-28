import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import './Auth.css';

const LoginPage = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('patient@medisync.health');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleLogin = (e) => {
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
            PORTAL ACCESS &bull; MEDISYNC
          </Badge>

          <h1 className="auth-title text-display">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in to access your digital health vault, past prescriptions, and upcoming video consultations.
          </p>

          <div className="auth-role-tabs">
            <button
              type="button"
              className={`auth-role-btn${role === 'patient' ? ' is-active' : ''}`}
              onClick={() => {
                setRole('patient');
                setEmail('patient@medisync.health');
              }}
            >
              Patient Portal
            </button>
            <button
              type="button"
              className={`auth-role-btn${role === 'doctor' ? ' is-active' : ''}`}
              onClick={() => {
                setRole('doctor');
                setEmail('doctor@medisync.health');
              }}
            >
              Doctor Schedule
            </button>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <input
                type="email"
                required
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                required
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Access {role === 'doctor' ? 'Doctor Workspace' : 'Patient Vault'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <p className="auth-footer-text">
            Don't have a registered health profile?
            <Link to="/register" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
