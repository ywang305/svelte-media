// Lightweight dev server that emulates Vercel serverless functions locally.
// Usage: node api/dev-server.js
// Serves api/*.js handlers at /api/<name>

const http = require('http');
const path = require('path');
const url = require('url');

const PORT = 5001;

// Map route name → handler (lazy-loaded)
const handlers = {};

async function loadHandler(name) {
  if (!handlers[name]) {
    const mod = await import(path.join(__dirname, `${name}.js`));
    handlers[name] = mod.default;
  }
  return handlers[name];
}

// Minimal req/res adapter to match Vercel's API
function createRes(nodeRes) {
  const res = {
    statusCode: 200,
    _headers: {},
    status(code) { res.statusCode = code; return res; },
    setHeader(k, v) { res._headers[k] = v; return res; },
    json(data) {
      res._headers['Content-Type'] = res._headers['Content-Type'] || 'application/json';
      nodeRes.writeHead(res.statusCode, res._headers);
      nodeRes.end(JSON.stringify(data));
    },
    send(body) {
      nodeRes.writeHead(res.statusCode, res._headers);
      nodeRes.end(body);
    },
    end() {
      nodeRes.writeHead(res.statusCode, res._headers);
      nodeRes.end();
    },
  };
  return res;
}

const server = http.createServer(async (req, nodeRes) => {
  // CORS headers for local dev
  nodeRes.setHeader('Access-Control-Allow-Origin', '*');
  nodeRes.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') { nodeRes.writeHead(204); nodeRes.end(); return; }

  const parsed = url.parse(req.url, true);
  const match = parsed.pathname.match(/^\/api\/(\w+)$/);
  if (!match) {
    nodeRes.writeHead(404);
    nodeRes.end('Not found');
    return;
  }

  try {
    const handler = await loadHandler(match[1]);
    const fakeReq = { query: parsed.query, method: req.method, headers: req.headers };
    const fakeRes = createRes(nodeRes);
    await handler(fakeReq, fakeRes);
  } catch (err) {
    console.error(`[api/${match[1]}]`, err);
    if (!nodeRes.headersSent) {
      nodeRes.writeHead(500);
      nodeRes.end('Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\x1b[35m  API dev server running at http://localhost:${PORT}/api/*\x1b[0m`);
});
