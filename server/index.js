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

const sslOptions = {
  key: readFileSync(path.join(__dirname, "certs/key.pem")),
  cert: readFileSync(path.join(__dirname, "certs/cert.pem")),
};

const server = createServer(sslOptions, app);
const io = new Server(server, { cors: corsOptions });

initSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(
    `✅ Server running at https://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
