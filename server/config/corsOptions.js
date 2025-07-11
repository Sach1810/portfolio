const allowedOrigins = [
  "https://localhost:5173",
  "https://sachadavid.dev",
  "https://192.168.2.21:5173",
  // Add Fly.io domain - replace with your actual Fly.io app domain
  "https://server-purple-lake-6888.fly.dev",
  // Add custom domain for backend
  "https://server.sachadavid.dev",
  // Allow any subdomain of fly.dev for flexibility
  /^https:\/\/.*\.fly\.dev$/,
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === "development") {
      return callback(null, true); // allow all in dev
    }

    if (!origin) {
      return callback(null, true); // allow requests with no origin (like mobile apps)
    }

    // Check if origin matches any allowed origin
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === "string") {
        return allowedOrigin === origin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      return callback(null, true);
    }

    console.warn(`CORS blocked origin: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST"],
  credentials: true,
};
