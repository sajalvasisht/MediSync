import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Clock, FileText, Download, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import Badge from '../../components/common/Badge';
import './PatientDashboard.css';

const MOCK_APPOINTMENTS = [
  {
    id: 'APT-8921',
    doctor: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    date: 'Today, 2:30 PM',
    status: 'Ready to Join',
    roomId: 'room-priya-live',
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
  },
  {
    id: 'APT-7412',
    doctor: 'Dr. Arjun Mehta',
    specialty: 'Dermatology',
    date: 'Nov 3, 2026 at 11:00 AM',
    status: 'Scheduled',
    roomId: 'room-arjun-nov3',
    hospital: 'Sir Ganga Ram Hospital',
  },
];

const MOCK_RECORDS = [
  { id: 'REC-101', title: 'Lipid Profile & HbA1c Panel', date: 'Oct 24, 2026', type: 'Lab Report', size: '2.4 MB' },
  { id: 'REC-102', title: 'Holter 24h ECG Analysis', date: 'Sep 12, 2026', type: 'Cardiology Scan', size: '6.1 MB' },
  { id: 'REC-103', title: 'Comprehensive Metabolic Panel', date: 'Aug 04, 2026', type: 'Lab Report', size: '1.8 MB' },
];

const MOCK_PRESCRIPTIONS = [
  {
    id: 'RX-992',
    doctor: 'Dr. Priya Sharma',
    date: 'Oct 24, 2026',
    medications: [
      { name: 'Telmisartan 40mg', dose: '1 tab daily morning', duration: '30 days' },
      { name: 'Atorvastatin 10mg', dose: '1 tab bedtime', duration: '30 days' },
    ],
  },
  {
    id: 'RX-845',
    doctor: 'Dr. Arjun Mehta',
    date: 'Sep 15, 2026',
    medications: [
      { name: 'Clindamycin Phosphate Gel 1%', dose: 'Apply thin layer twice daily', duration: '14 days' },
    ],
  },
];

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [records, setRecords] = useState(MOCK_RECORDS);

  const handleUploadMock = () => {
    const newDoc = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      title: 'Uploaded Patient Diagnostic Scan',
      date: 'Just now',
      type: 'Diagnostic PDF',
      size: '3.2 MB',
    };
    setRecords([newDoc, ...records]);
  };

  return (
    <div className="patient-dash-page">
      <div className="patient-dash-container">
        {/* Header */}
        <div className="dash-hero">
          <div>
            <Badge variant="sage" className="dash-badge">
              PATIENT HEALTH VAULT &bull; ACTIVE
            </Badge>
            <h1 className="dash-title text-display">Welcome, Vikramaditya</h1>
            <p className="dash-subtitle">
              Manage your upcoming video visits, access doctor prescriptions, and upload encrypted diagnostic records.
            </p>
          </div>

          <div className="dash-stats-bar">
            <div className="dash-stat-chip">
              <span className="stat-number">2</span>
              <span className="stat-name">Active Visits</span>
            </div>
            <div className="dash-stat-chip">
              <span className="stat-number">{records.length}</span>
              <span className="stat-name">Vault Files</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="dash-nav-pills">
          <button
            type="button"
            className={`dash-pill-btn${activeTab === 'appointments' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Video Consultations ({MOCK_APPOINTMENTS.length})
          </button>
          <button
            type="button"
            className={`dash-pill-btn${activeTab === 'records' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            Health Records Vault ({records.length})
          </button>
          <button
            type="button"
            className={`dash-pill-btn${activeTab === 'prescriptions' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Active E-Prescriptions ({MOCK_PRESCRIPTIONS.length})
          </button>
        </div>

        {/* Tab 1: Appointments */}
        {activeTab === 'appointments' && (
          <div className="dash-section-body">
            <div className="dash-card-list">
              {MOCK_APPOINTMENTS.map((apt) => (
                <div key={apt.id} className="apt-card">
                  <div className="apt-card-left">
                    <div className="apt-status-chip">
                      <span className="apt-status-dot" />
                      <span>{apt.status}</span>
                    </div>
                    <h3 className="apt-doctor-name text-display">{apt.doctor}</h3>
                    <span className="apt-specialty-badge">{apt.specialty} &bull; {apt.hospital}</span>
                    <div className="apt-time-row">
                      <Calendar size={14} />
                      <span>{apt.date}</span>
                    </div>
                  </div>

                  <div className="apt-card-right">
                    <Link to={`/consult/${apt.roomId}`} className="apt-join-btn">
                      <Video size={16} />
                      <span>Join Video Consultation</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Records Vault */}
        {activeTab === 'records' && (
          <div className="dash-section-body">
            <div className="vault-actions-bar">
              <button type="button" className="vault-upload-btn" onClick={handleUploadMock}>
                <Plus size={16} />
                <span>Upload Medical Report</span>
              </button>
              <span className="vault-security-note">
                <ShieldCheck size={14} /> Encrypted with AES-256 for HIPAA &amp; DPDP compliance
              </span>
            </div>

            <div className="vault-grid">
              {records.map((rec) => (
                <div key={rec.id} className="vault-card">
                  <div className="vault-icon-wrap">
                    <FileText size={22} />
                  </div>
                  <div className="vault-meta">
                    <span className="vault-type-badge">{rec.type} &bull; {rec.size}</span>
                    <h4 className="vault-doc-title">{rec.title}</h4>
                    <span className="vault-doc-date">Uploaded: {rec.date}</span>
                  </div>
                  <button type="button" className="vault-dl-btn" title="Download Record">
                    <Download size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="dash-section-body">
            <div className="rx-grid">
              {MOCK_PRESCRIPTIONS.map((rx) => (
                <div key={rx.id} className="rx-card">
                  <div className="rx-header">
                    <div>
                      <span className="rx-badge">{rx.id} &bull; E-SIGNED RX</span>
                      <h3 className="rx-doctor-name">{rx.doctor}</h3>
                      <span className="rx-date">Issued on: {rx.date}</span>
                    </div>
                    <button type="button" className="rx-download-pill">
                      <Download size={13} />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  <div className="rx-meds-list">
                    {rx.medications.map((m, i) => (
                      <div key={i} className="rx-med-item">
                        <CheckCircle2 size={16} className="rx-check" />
                        <div>
                          <h4 className="rx-med-name">{m.name}</h4>
                          <span className="rx-med-detail">{m.dose} &bull; {m.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
