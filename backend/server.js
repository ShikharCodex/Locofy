const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Correct allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://locofy-omega.vercel.app",
  "https://locofy.xyz",
  "https://www.locofy.xyz",
];

// ✅ CORS config
const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌐 Incoming Origin:", origin);

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// ✅ Apply CORS
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // 🔥 IMPORTANT

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/persons", require("./routes/personRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("API Running...");
});

// Error middleware
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
