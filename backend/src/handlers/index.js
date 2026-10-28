'use strict';

const doctors = require('../data/doctors');
const { sendJSON, send404 } = require('../utils/response');

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

module.exports = { handleRoot, handleHealth, handleGetDoctors, handleGetDoctor };
