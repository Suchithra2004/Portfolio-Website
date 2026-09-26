import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8' };

export function serve(port = 4173) {
  const directory = resolve('dist');
  const server = http.createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
    try {
      const url = new URL(request.url, 'http://localhost');
      const decoded = decodeURIComponent(url.pathname);
      let path = resolve(directory, `.${decoded}`);
      if (path !== directory && !path.startsWith(directory + sep)) { response.writeHead(403).end(); return; }
      const info = await stat(path);
      if (info.isDirectory()) {
        if (!url.pathname.endsWith('/')) { response.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return; }
        path = resolve(path, 'index.html');
      }
      const body = await readFile(path);
      response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream', 'Content-Length': body.length, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      let body = 'Page not found';
      try { body = await readFile(resolve(directory, '404.html')); } catch { /* Before first build. */ }
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(request.method === 'HEAD' ? undefined : body);
    }
  });
  server.listen(port, '127.0.0.1', () => console.log(`Portfolio preview: http://localhost:${port}`));
  return server;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) serve(Number(process.env.PORT || 4173));
