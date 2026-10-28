import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, Users, CheckCircle2, Plus, Trash2, ShieldCheck, UserCheck } from 'lucide-react';
import Badge from '../../components/common/Badge';
import './DoctorDashboard.css';

const TODAY_QUEUE = [
  {
    id: 'Q-01',
    patient: 'Sanya Kapoor',
    concern: 'Follow-up on Arrhythmia & BP',
    time: '02:30 PM',
    status: 'Waiting in Room',
    roomId: 'room-priya-live',
    age: 34,
  },
  {
    id: 'Q-02',
    patient: 'Rahul Sharma',
    concern: 'Chest tightness after exertion',
    time: '03:15 PM',
    status: 'Upcoming',
    roomId: 'room-rahul-oct28',
    age: 52,
  },
  {
    id: 'Q-03',
    patient: 'Aarav Mehta',
    concern: 'Routine Lipid Review',
    time: '04:00 PM',
    status: 'Upcoming',
    roomId: 'room-aarav-oct28',
    age: 41,
  },
];

const INITIAL_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:15 PM', '04:00 PM'
];

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [slotsList, setSlotsList] = useState(INITIAL_SLOTS);
  const [newSlotTime, setNewSlotTime] = useState('');

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlotTime) return;
    setSlotsList([...slotsList, newSlotTime]);
    setNewSlotTime('');
  };

  const handleRemoveSlot = (slot) => {
    setSlotsList(slotsList.filter(s => s !== slot));
  };

  return (
    <div className="doc-dash-page">
      <div className="doc-dash-container">
        {/* Hero */}
        <div className="doc-dash-hero">
          <div>
            <Badge variant="sage" className="doc-dash-badge">
              CLINICIAN WORKSPACE &bull; DR. PRIYA SHARMA
            </Badge>
            <h1 className="doc-dash-title text-display">Consultation Command Center</h1>
            <p className="doc-dash-subtitle">
              Manage patient video consultations, adjust slot availability, and review diagnostic longitudinal records.
            </p>
          </div>

          <div className="doc-metrics-row">
            <div className="doc-metric-tile">
              <span className="metric-num">3</span>
              <span className="metric-lbl">Visits Today</span>
            </div>
            <div className="doc-metric-tile">
              <span className="metric-num">{slotsList.length}</span>
              <span className="metric-lbl">Active Slots</span>
            </div>
            <div className="doc-metric-tile">
              <span className="metric-num">312</span>
              <span className="metric-lbl">Total Consults</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="doc-dash-tabs">
          <button
            type="button"
            className={`doc-tab-btn${activeTab === 'schedule' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            Today's Patient Queue (3)
          </button>
          <button
            type="button"
            className={`doc-tab-btn${activeTab === 'availability' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            Availability Builder ({slotsList.length} slots)
          </button>
          <button
            type="button"
            className={`doc-tab-btn${activeTab === 'history' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Clinical History
          </button>
        </div>

        {/* Tab 1: Today's Schedule Queue */}
        {activeTab === 'schedule' && (
          <div className="doc-tab-content">
            <div className="queue-list">
              {TODAY_QUEUE.map((item) => (
                <div key={item.id} className="queue-card">
                  <div className="queue-left">
                    <div className="queue-status-chip">
                      <span className="queue-dot" />
                      <span>{item.status}</span>
                    </div>
                    <h3 className="queue-patient-name text-display">{item.patient}</h3>
                    <p className="queue-patient-concern">
                      {item.concern} &bull; Age {item.age}
                    </p>
                    <div className="queue-time-tag">
                      <Clock size={13} />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <div className="queue-right">
                    <Link to={`/consult/${item.roomId}`} className="queue-start-btn">
                      <Video size={16} />
                      <span>Start Video Consult</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Availability Builder */}
        {activeTab === 'availability' && (
          <div className="doc-tab-content">
            <div className="builder-card">
              <div className="builder-header">
                <div>
                  <h3 className="builder-title">Slot Availability Builder</h3>
                  <p className="builder-sub">
                    Patients can immediately book available slots for online video consultations.
                  </p>
                </div>

                <form onSubmit={handleAddSlot} className="add-slot-form">
                  <input
                    type="text"
                    placeholder="e.g. 05:00 PM"
                    className="add-slot-input"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                  />
                  <button type="submit" className="add-slot-btn">
                    <Plus size={15} />
                    <span>Add Slot</span>
                  </button>
                </form>
              </div>

              <div className="slots-editor-grid">
                {slotsList.map((slot) => (
                  <div key={slot} className="slot-editor-pill">
                    <span className="slot-pill-time">{slot}</span>
                    <button
                      type="button"
                      className="slot-delete-btn"
                      onClick={() => handleRemoveSlot(slot)}
                      title="Remove Slot"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: History */}
        {activeTab === 'history' && (
          <div className="doc-tab-content">
            <div className="history-table-card">
              <h3 className="history-title">Recent Clinical Consultations</h3>
              <div className="history-rows">
                {[
                  { patient: 'Kavita Iyer', date: 'Oct 26, 2026', outcome: 'E-Prescription issued for Hypertension Stage 1' },
                  { patient: 'Rohan Deshmukh', date: 'Oct 25, 2026', outcome: 'Advised 24h ECG Holter Monitoring' },
                  { patient: 'Meenakshi Sundaram', date: 'Oct 24, 2026', outcome: 'Cardiac recovery progressing normally' },
                ].map((row, i) => (
                  <div key={i} className="history-row">
                    <div>
                      <h4 className="history-patient">{row.patient}</h4>
                      <span className="history-date">{row.date}</span>
                    </div>
                    <span className="history-outcome">{row.outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
