/**
 * api.js — thin service layer.
 * Set VITE_USE_REAL_API=true in .env to proxy to the Node backend.
 * Default: returns mock data directly.
 */
import mockDoctors from '../data/doctors';

const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const getDoctors = async (filters = {}) => {
  if (!USE_REAL_API) {
    let result = [...mockDoctors];
    if (filters.specialty) result = result.filter(d => d.specialty === filters.specialty);
    if (filters.city) result = result.filter(d => d.city === filters.city);
    if (filters.language) result = result.filter(d => d.language.includes(filters.language));
    if (filters.maxFee) result = result.filter(d => d.fee <= Number(filters.maxFee));
    if (filters.minRating) result = result.filter(d => d.rating >= Number(filters.minRating));
    return result;
  }
  const params = new URLSearchParams(filters).toString();
  return apiFetch(`/doctors${params ? '?' + params : ''}`);
};

export const getDoctor = async (id) => {
  if (!USE_REAL_API) {
    const doc = mockDoctors.find(d => d.id === id);
    if (!doc) throw new Error('Doctor not found');
    return doc;
  }
  return apiFetch(`/doctors/${id}`);
};

export const getHealth = async () => {
  if (!USE_REAL_API) {
    return { status: 'ok (mock)', uptime: 0, timestamp: new Date().toISOString() };
  }
  return apiFetch('/health');
};
