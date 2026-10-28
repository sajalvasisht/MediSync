/**
 * api.js — thin service layer.
 * Set VITE_USE_REAL_API=true in .env to proxy to the Node backend.
 * Default: returns mock data directly.
 */
import mockDoctors from '../data/doctors';
import initialTestimonials from '../data/testimonials';
import mockSlots from '../data/slots';

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// In-memory local stores for mock mode
let localAppointments = [
  {
    id: 'APT-8921',
    doctor: 'Dr. Priya Sharma',
    doctorId: '1',
    specialty: 'Cardiology',
    date: 'Today, 2:30 PM',
    status: 'Ready to Join',
    roomId: 'room-priya-live',
    hospital: 'Kokilaben Dhirubhai Ambani Hospital',
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
  },
];

let localReviews = [...initialTestimonials];
let localSlots = { ...mockSlots };

// Map doctor IDs to imported avatar assets
const doctorAvatarMap = mockDoctors.reduce((acc, doc) => {
  acc[doc.id] = doc.avatar;
  return acc;
}, {});

async function apiFetch(path, options = {}) {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  const res = await fetch(`${API_BASE}${path}`, config);
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `API error ${res.status}`);
  }
  return res.json();
}

/**
 * Get doctors list with optional filters.
 */
export const getDoctors = async (filters = {}) => {
  if (!USE_REAL_API) {
    let result = [...mockDoctors];
    if (filters.specialty && filters.specialty !== 'All') result = result.filter(d => d.specialty === filters.specialty);
    if (filters.city && filters.city !== 'All') result = result.filter(d => d.city === filters.city);
    if (filters.language && filters.language !== 'All') result = result.filter(d => d.language.includes(filters.language));
    if (filters.maxFee) result = result.filter(d => d.fee <= Number(filters.maxFee));
    if (filters.minRating) result = result.filter(d => d.rating >= Number(filters.minRating));
    return result;
  }
  const params = new URLSearchParams(filters).toString();
  const docs = await apiFetch(`/doctors${params ? '?' + params : ''}`);
  return docs.map(d => ({
    ...d,
    avatar: d.avatar || doctorAvatarMap[d.id] || null,
  }));
};

/**
 * Get single doctor by ID.
 */
export const getDoctor = async (id) => {
  if (!USE_REAL_API) {
    const doc = mockDoctors.find(d => d.id === id);
    if (!doc) throw new Error('Doctor not found');
    return doc;
  }
  const doc = await apiFetch(`/doctors/${id}`);
  return {
    ...doc,
    avatar: doc.avatar || doctorAvatarMap[doc.id] || null,
  };
};

/**
 * Health check.
 */
export const getHealth = async () => {
  if (!USE_REAL_API) {
    return { status: 'ok (mock)', uptime: 0, timestamp: new Date().toISOString() };
  }
  return apiFetch('/health');
};

/**
 * Get list of patient appointments.
 */
export const getAppointments = async () => {
  if (!USE_REAL_API) {
    return [...localAppointments];
  }
  return apiFetch('/appointments');
};

/**
 * Create a new appointment.
 */
export const createAppointment = async (appointmentData) => {
  if (!USE_REAL_API) {
    const newApt = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      roomId: `room-${Math.random().toString(36).substring(2, 9)}`,
      status: 'Scheduled',
      date: 'Today, 2:30 PM',
      ...appointmentData,
    };
    localAppointments = [newApt, ...localAppointments];
    return newApt;
  }
  return apiFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};

/**
 * Get patient reviews.
 */
export const getReviews = async () => {
  if (!USE_REAL_API) {
    return [...localReviews];
  }
  return apiFetch('/reviews');
};

/**
 * Submit a patient review.
 */
export const submitReview = async (reviewData) => {
  if (!USE_REAL_API) {
    const newRev = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      location: 'Verified Patient',
      ...reviewData,
    };
    localReviews = [newRev, ...localReviews];
    return newRev;
  }
  return apiFetch('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
};

/**
 * Get slots for a doctor.
 */
export const getDoctorSlots = async (doctorId, date) => {
  if (!USE_REAL_API) {
    const docSlots = localSlots[doctorId] || localSlots['1'] || {};
    if (date) return docSlots[date] || [];
    return docSlots;
  }
  return apiFetch(`/doctors/${doctorId}/slots${date ? '?date=' + date : ''}`);
};

/**
 * Book/remove a doctor's slot.
 */
export const bookDoctorSlot = async (doctorId, { date, slot }) => {
  if (!USE_REAL_API) {
    if (localSlots[doctorId] && localSlots[doctorId][date]) {
      localSlots[doctorId][date] = localSlots[doctorId][date].filter(s => s !== slot);
    }
    return { success: true, doctorId, date, bookedSlot: slot };
  }
  return apiFetch(`/doctors/${doctorId}/slots/book`, {
    method: 'POST',
    body: JSON.stringify({ date, slot }),
  });
};

export { USE_REAL_API };
