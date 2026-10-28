'use strict';

/**
 * Parses JSON request body using plain Node.js http request streams.
 * @param {import('http').IncomingMessage} req
 * @returns {Promise<any>}
 */
function parseJSON(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      // 1MB safety limit
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = { parseJSON };
