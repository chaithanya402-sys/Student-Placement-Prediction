const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function openLandingPage(port) {
  // Avoid duplicate browser launches in CI / headless environments
  if (process.env.NO_AUTO_OPEN || process.env.CI) return;

  const targetUrl = `http://localhost:${port}/landing.html`;
  let command;
  switch (process.platform) {
    case 'win32':
      command = `start "" "${targetUrl}"`;
      break;
    case 'darwin':
      command = `open "${targetUrl}"`;
      break;
    default:
      command = `xdg-open "${targetUrl}"`;
      break;
  }

  exec(command, (err) => {
    if (err) {
      console.log(`Open in your browser: ${targetUrl}`);
    }
  });
}

function requestHandler(req, res) {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Clean route aliases & root fallback
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath === '/landing' || reqPath === '/landing/') {
    reqPath = '/landing.html';
  } else if (reqPath === '/login' || reqPath === '/login/' || reqPath === '/auth') {
    reqPath = '/login.html';
  } else if (reqPath === '/dashboard' || reqPath === '/dashboard/') {
    reqPath = '/index.html';
  }

  const filePath = path.join(DIR, reqPath);

  if (!filePath.startsWith(DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(DIR, 'index.html');
      fs.readFile(indexPath, (err2, content) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
}

// Create dual-stack server (binds to both IPv4 and IPv6 on Windows)
const server = http.createServer(requestHandler);
server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`Student Placement Prediction System Live`);
  console.log(`======================================================`);
  console.log(`Default Startup (Landing Page): http://localhost:${PORT}/landing.html`);
  console.log(`Application Dashboard:          http://localhost:${PORT}/`);
  console.log(`Student Overview:               http://localhost:${PORT}/#/student/overview`);
  console.log(`Student Profile:                http://localhost:${PORT}/#/student/profile`);
  console.log(`Faculty Mentoring Dashboard:    http://localhost:${PORT}/#/faculty/overview`);
  console.log(`T&P Officer Portal:             http://localhost:${PORT}/#/officer/overview`);
  console.log(`Authentication Portal:          http://localhost:${PORT}/login.html`);
  console.log(`======================================================\n`);

  // Automatically open the Landing Page in default browser on startup
  openLandingPage(PORT);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = 8080;
    const altServer = http.createServer(requestHandler);
    altServer.listen(ALT_PORT, () => {
      console.log(`Port ${PORT} in use. Listening on port ${ALT_PORT}`);
      console.log(`Default Startup (Landing Page): http://localhost:${ALT_PORT}/landing.html`);
      openLandingPage(ALT_PORT);
    });
  } else {
    console.error('Server error:', err);
  }
});
