import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createServer as createHttpsServer } from "https";
import { createServer as createHttpServer } from "http";
import { Server } from "socket.io";

import app from "./src/app.js";
import { corsOptions } from "./config/corsOptions.js";
import { initSocket } from "./src/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";

let server;
let io;

if (isProduction) {
  // Fly.io or other cloud env: use HTTP server
  server = createHttpServer(app);
  console.log("🌍 Starting in production (HTTP)");
} else {
  // Local development: use HTTPS with self-signed certs
  try {
    const sslOptions = {
      key: readFileSync(path.join(__dirname, "certs/key.pem")),
      cert: readFileSync(path.join(__dirname, "certs/cert.pem")),
    };
    server = createHttpsServer(sslOptions, app);
    console.log("🔐 Starting in development (HTTPS)");
  } catch (error) {
    console.warn("⚠️ SSL certificates not found, falling back to HTTP for development");
    server = createHttpServer(app);
    console.log("🌍 Starting in development (HTTP fallback)");
  }
}

io = new Server(server, { cors: corsOptions });
initSocket(io);

server.listen(PORT, () => {
  console.log(`✅ Server listening on ${isProduction ? "http" : "https"}://localhost:${PORT} [${process.env.NODE_ENV || "development"}]`);
});