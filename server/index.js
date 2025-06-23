import express from "express";
import { createServer } from "https";
import { Server } from "socket.io";
import cors from "cors";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://192.168.86.27:5173",
  "https://192.168.86.27:5173",
  "https://sachadavid.dev",
];

// Express CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const sslOptions = {
  key: readFileSync(path.join(__dirname, "certs/key.pem")),
  cert: readFileSync(path.join(__dirname, "certs/cert.pem")),
};

const server = createServer(sslOptions, app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/health-check", (_, res) => {
  res.send("ok");
});

app.get("/", (_, res) => {
  res.send("ok");
});

io.on("connection", (socket) => {
  const targetSocketId = socket.id;
  console.log("a user connected", targetSocketId);

  socket.on("controllerConnected", (data) => {
    io.to(data.socketId).emit("startJobSearch", data);
  });
  socket.on("updateJobSearch", (data) => {
    console.log("updateJobSearch", data);
    io.to(data.socketId).emit("updateJobSearch", data);
  });
});

server.listen(3000, () => {
  console.log("server running at https://localhost:3000");
});
