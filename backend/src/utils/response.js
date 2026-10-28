'use strict';

/**
 * Sends a JSON response with the given HTTP status code and data payload.
 * @param {import('http').ServerResponse} res
 * @param {number} status
 * @param {*} data
 */
function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

/**
 * Sends a 404 Not Found JSON response.
 * @param {import('http').ServerResponse} res
 */
function send404(res) {
  sendJSON(res, 404, { error: 'Not Found' });
}

/**
 * Sends a 500 Internal Server Error JSON response.
 * @param {import('http').ServerResponse} res
 */
function send500(res) {
  sendJSON(res, 500, { error: 'Internal Server Error' });
}

module.exports = { sendJSON, send404, send500 };
