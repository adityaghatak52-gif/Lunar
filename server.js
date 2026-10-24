// Lunar Cloud static website server - no npm dependencies required.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "public");
const PORT = Number(process.env.PORT || 3000);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache"
  });
  res.end(body);
}

http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname);
  } catch {
    return send(res, 400, "Bad request");
  }

  if (pathname.includes("\0")) return send(res, 400, "Bad request");

  // Support clean routes such as /games and /minecraft.
  let relative = pathname.replace(/^\/+/, "");
  if (!relative || relative.endsWith("/")) relative += "index.html";
  if (!path.extname(relative)) relative += ".html";

  const target = path.resolve(ROOT, relative);
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    return send(res, 403, "Forbidden");
  }

  fs.readFile(target, (err, data) => {
    if (err) {
      if (err.code === "ENOENT" || err.code === "ENOTDIR") {
        return send(res, 404, "<h1>404 - Page not found</h1><p><a href='/'>Back to Lunar Cloud</a></p>", "text/html; charset=utf-8");
      }
      return send(res, 500, "Internal server error");
    }
    send(res, 200, data, MIME[path.extname(target).toLowerCase()] || "application/octet-stream");
  });
}).listen(PORT, "0.0.0.0", () => {
  console.log(`Lunar Cloud website running at http://localhost:${PORT}`);
  console.log("No npm install required.");
});
