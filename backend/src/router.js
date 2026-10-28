'use strict';

const { setCorsHeaders } = require('./utils/cors');
const { send404, send500 } = require('./utils/response');
const {
  handleRoot,
  handleHealth,
  handleGetDoctors,
  handleGetDoctor,
} = require('./handlers/index');

/**
 * Route table.
 * Each entry:
 *   method  - HTTP method string (uppercase) or null to match any
 *   pattern - exact string path OR a RegExp with named capture groups for params
 *   handler - function(req, res, params, searchParams)
 */
const routes = [
  { method: 'GET', pattern: '/',            handler: handleRoot },
  { method: 'GET', pattern: '/api/health',  handler: handleHealth },
  // /api/doctors/:id  — must come before /api/doctors so the more-specific path matches first
  { method: 'GET', pattern: /^\/api\/doctors\/(?<id>[^/]+)$/, handler: handleGetDoctor },
  { method: 'GET', pattern: '/api/doctors', handler: handleGetDoctors },
];

/**
 * Attempts to match the given method + pathname against the route table.
 * Returns { handler, params } on a match, or null if no route matches.
 *
 * @param {string} method    - Uppercase HTTP method
 * @param {string} pathname  - URL path without query string
 * @returns {{ handler: Function, params: Record<string,string> } | null}
 */
function match(method, pathname) {
  for (const route of routes) {
    // Method check (null means any method)
    if (route.method !== null && route.method !== method) continue;

    if (typeof route.pattern === 'string') {
      if (route.pattern === pathname) {
        return { handler: route.handler, params: {} };
      }
    } else if (route.pattern instanceof RegExp) {
      const m = pathname.match(route.pattern);
      if (m) {
        return { handler: route.handler, params: m.groups || {} };
      }
    }
  }
  return null;
}

/**
 * Main routing function — parses the incoming request URL, applies CORS
 * headers, handles OPTIONS preflight, dispatches to the matching handler,
 * and falls back to 404 / 500 as appropriate.
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
function route(req, res) {
  try {
    // Parse URL safely; fall back to '/' on bad input
    let parsedUrl;
    try {
      parsedUrl = new URL(req.url, 'http://localhost');
    } catch (_) {
      parsedUrl = new URL('/', 'http://localhost');
    }

    const pathname = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;
    const method = (req.method || 'GET').toUpperCase();

    // Always set CORS headers
    setCorsHeaders(res);

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const matched = match(method, pathname);
    if (!matched) {
      return send404(res);
    }

    matched.handler(req, res, matched.params, searchParams);
  } catch (err) {
    console.error('[router] Unhandled error:', err);
    send500(res);
  }
}

module.exports = { routes, match, route };
