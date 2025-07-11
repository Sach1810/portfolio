import { createServer } from "https";
import { Server } from "socket.io";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import app from "./src/app.js";
import { corsOptions } from "./config/corsOptions.js";
import { initSocket } from "./src/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

let server;
let io;

if (isProduction) {
  // Production: Use HTTP server (for Fly.io and other cloud platforms)
  const { createServer: createHttpServer } = await import("http");
  server = createHttpServer(app);
  io = new Server(server, { cors: corsOptions });
  
  server.listen(PORT, () => {
    console.log(
      `✅ Server running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
} else {
  // Development: Use HTTPS server with SSL certificates
  const sslOptions = {
    key: readFileSync(path.join(__dirname, "certs/key.pem")),
    cert: readFileSync(path.join(__dirname, "certs/cert.pem")),
  };

  server = createServer(sslOptions, app);
  io = new Server(server, { cors: corsOptions });
  
  server.listen(PORT, () => {
    console.log(
      `✅ Server running at https://localhost:${PORT} in ${process.env.NODE_ENV} mode`
    );
  });
}

initSocket(io);
