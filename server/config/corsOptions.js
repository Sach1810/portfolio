const allowedOrigins = [
  "https://localhost:5173",
  // "https://192.168.86.27:5173",
  "https://sachadavid.dev",
  "https://192.168.2.21:5173",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === "development") {
      return callback(null, true); // allow all in dev
    }

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  credentials: true,
};
