#!/usr/bin/env node

/**
 * Local development server for SEO package documentation
 * Usage: node scripts/serve-docs.js [port]
 */

import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.argv[2] || 8080;
const docsPath = path.join(__dirname, '..', 'docs');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function serveFile(res, filePath) {
  const mimeType = getMimeType(filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
}

function handleRequest(req, res) {
  let filePath = path.join(docsPath, req.url === '/' ? 'index.html' : req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(docsPath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Try with .html extension for directory requests
      if (req.url.endsWith('/') || !path.extname(req.url)) {
        filePath = path.join(filePath, 'index.html');
        fs.stat(filePath, (err, stats) => {
          if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
                <head><title>404 - Not Found</title></head>
                <body>
                  <h1>404 - File Not Found</h1>
                  <p>The requested file could not be found.</p>
                  <p><a href="/">← Back to Documentation</a></p>
                </body>
              </html>
            `);
            return;
          }
          serveFile(res, filePath);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <head><title>404 - Not Found</title></head>
            <body>
              <h1>404 - File Not Found</h1>
              <p>The requested file could not be found.</p>
              <p><a href="/">← Back to Documentation</a></p>
            </body>
          </html>
        `);
      }
      return;
    }

    serveFile(res, filePath);
  });
}

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`🚀 SEO Documentation Server running at:`);
  console.log(`   http://localhost:${port}`);
  console.log(`   http://127.0.0.1:${port}`);
  console.log(``);
  console.log(`📚 Available pages:`);
  console.log(`   • Documentation: http://localhost:${port}/`);
  console.log(`   • Playground: http://localhost:${port}/playground.html`);
  console.log(`   • API Reference: http://localhost:${port}/api.html`);
  console.log(``);
  console.log(`Press Ctrl+C to stop the server`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
