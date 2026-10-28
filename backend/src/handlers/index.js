'use strict';

const doctors = require('../data/doctors');
const appointments = require('../data/appointments');
const reviews = require('../data/reviews');
const slots = require('../data/slots');
const { sendJSON, send404, send500 } = require('../utils/response');
const { parseJSON } = require('../utils/body');

/**
 * GET /
 * Returns basic API info.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function handleRoot(req, res) {
  sendJSON(res, 200, {
    message: 'MediSync API',
    version: '0.1.0',
    docs: '/api/health',
  });
}

/**
 * GET /api/health
 * Returns API health/status.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function handleHealth(req, res) {
  sendJSON(res, 200, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}

/**
 * GET /api/doctors[?specialty=...]
 * Returns all doctors, optionally filtered by specialty query param.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {Record<string,string>} _params
 * @param {URLSearchParams} searchParams
 */
function handleGetDoctors(req, res, _params, searchParams) {
  const specialtyFilter = searchParams.get('specialty');
  let result = doctors;

  if (specialtyFilter) {
    const lower = specialtyFilter.toLowerCase();
    result = doctors.filter((d) => d.specialty.toLowerCase() === lower);
  }

  sendJSON(res, 200, result);
}

/**
 * GET /api/doctors/:id
 * Returns a single doctor by id or 404.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {Record<string,string>} params
 */
function handleGetDoctor(req, res, params) {
  const doctor = doctors.find((d) => d.id === params.id);
  if (!doctor) {
    return send404(res);
  }
  sendJSON(res, 200, doctor);
}

/**
 * GET /api/appointments
 * Returns the current appointments array.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function handleGetAppointments(req, res) {
  sendJSON(res, 200, appointments);
}

/**
 * POST /api/appointments
 * Parses incoming JSON body, generates appointment ID and roomId,
 * saves it to in-memory array, and returns HTTP 201.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
async function handleCreateAppointment(req, res) {
  try {
    const body = await parseJSON(req);

    const generatedId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const generatedRoomId = `room-${Math.random().toString(36).substring(2, 9)}`;

    const doctorMatch = body.doctorId ? doctors.find((d) => d.id === String(body.doctorId)) : null;

    const newAppointment = {
      id: body.id || generatedId,
      doctor: body.doctor || (doctorMatch ? doctorMatch.name : 'Dr. Priya Sharma'),
      doctorId: body.doctorId || '1',
      specialty: body.specialty || (doctorMatch ? doctorMatch.specialty : 'Cardiology'),
      hospital: body.hospital || (doctorMatch ? doctorMatch.hospital : 'MediSync Virtual Care'),
      date: body.date || 'Today, 2:30 PM',
      time: body.time || '2:30 PM',
      status: body.status || 'Ready to Join',
      roomId: body.roomId || generatedRoomId,
      patientName: body.patientName || 'Patient',
      email: body.email || '',
      phone: body.phone || '',
      fee: body.fee || (doctorMatch ? doctorMatch.fee : 800),
      createdAt: new Date().toISOString(),
    };

    appointments.unshift(newAppointment);
    sendJSON(res, 201, newAppointment);
  } catch (err) {
    sendJSON(res, 400, { error: err.message || 'Invalid appointment data' });
  }
}

/**
 * GET /api/reviews
 * Returns patient reviews.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function handleGetReviews(req, res) {
  sendJSON(res, 200, reviews);
}

/**
 * POST /api/reviews
 * Accepts new review { name, specialty, rating, text } and prepends to the array.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
async function handleCreateReview(req, res) {
  try {
    const body = await parseJSON(req);

    if (!body.name || !body.text) {
      return sendJSON(res, 400, { error: 'Name and review text are required' });
    }

    const newReview = {
      id: Date.now(),
      name: body.name.trim(),
      location: body.location || 'Verified Patient',
      specialty: body.specialty ? body.specialty.trim() : 'General Consultation',
      rating: Number(body.rating) || 5,
      text: body.text.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    reviews.unshift(newReview);
    sendJSON(res, 201, newReview);
  } catch (err) {
    sendJSON(res, 400, { error: err.message || 'Invalid review data' });
  }
}

/**
 * GET /api/doctors/:id/slots
 * Returns available slots for a doctor.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {Record<string,string>} params
 * @param {URLSearchParams} searchParams
 */
function handleGetDoctorSlots(req, res, params, searchParams) {
  const doctorSlots = slots[params.id] || {};
  const dateFilter = searchParams.get('date');

  if (dateFilter) {
    return sendJSON(res, 200, {
      doctorId: params.id,
      date: dateFilter,
      slots: doctorSlots[dateFilter] || [],
    });
  }

  sendJSON(res, 200, doctorSlots);
}

/**
 * POST /api/doctors/:id/slots/book
 * Removes a booked slot so it disappears from subsequent availability checks.
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {Record<string,string>} params
 */
async function handleBookDoctorSlot(req, res, params) {
  try {
    const body = await parseJSON(req);
    const date = body.date;
    const targetSlot = body.slot || body.time;

    if (!date || !targetSlot) {
      return sendJSON(res, 400, { error: 'Both date and slot/time are required to book a slot' });
    }

    const doctorSlots = slots[params.id];
    if (!doctorSlots || !doctorSlots[date]) {
      return sendJSON(res, 404, { error: 'No slots found for given doctor and date' });
    }

    const index = doctorSlots[date].indexOf(targetSlot);
    if (index === -1) {
      return sendJSON(res, 400, { error: 'Requested slot is not available or already booked' });
    }

    // Remove the booked slot
    doctorSlots[date].splice(index, 1);

    sendJSON(res, 200, {
      success: true,
      doctorId: params.id,
      date,
      bookedSlot: targetSlot,
      remainingSlots: doctorSlots[date],
    });
  } catch (err) {
    sendJSON(res, 400, { error: err.message || 'Failed to book slot' });
  }
}

module.exports = {
  handleRoot,
  handleHealth,
  handleGetDoctors,
  handleGetDoctor,
  handleGetAppointments,
  handleCreateAppointment,
  handleGetReviews,
  handleCreateReview,
  handleGetDoctorSlots,
  handleBookDoctorSlot,
};
