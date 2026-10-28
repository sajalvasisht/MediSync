'use strict';

const http = require('http');
const { route } = require('./router');

let PORT = process.env.PORT ? Number(process.env.PORT) : 5001;

// ── Server ────────────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  route(req, res);
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`MediSync API running on port ${portToTry}`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} in use, trying port ${PORT + 1}...`);
    PORT += 1;
    startServer(PORT);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);

// ── Error handling ────────────────────────────────────────────────────────────

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException] Unhandled exception — server will keep running:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection] Unhandled promise rejection:', reason);
});

module.exports = server;
