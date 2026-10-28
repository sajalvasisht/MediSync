'use strict';

/**
 * In-memory appointments store.
 */
const appointments = [
  {
    id: 'APT-8921',
    doctor: 'Dr. Priya Sharma',
    doctorId: '1',
    specialty: 'Cardiology',
    date: 'Today, 2:30 PM',
    status: 'Ready to Join',
    roomId: 'room-priya-live',
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
    patientName: 'Vikramaditya Sharma',
    email: 'vikram@example.com',
    fee: 800,
  },
  {
    id: 'APT-7412',
    doctor: 'Dr. Arjun Mehta',
    doctorId: '2',
    specialty: 'Dermatology',
    date: 'Nov 3, 2026 at 11:00 AM',
    status: 'Scheduled',
    roomId: 'room-arjun-nov3',
    hospital: 'Sir Ganga Ram Hospital',
    patientName: 'Vikramaditya Sharma',
    email: 'vikram@example.com',
    fee: 600,
  },
];

module.exports = appointments;
