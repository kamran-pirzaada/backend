// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import connectDb from "../config/db.js";
// import authRoutes from "../routes/auth.routes.js";
// import cors from "cors";

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// // CORS setup (frontend port ke liye)
// app.use(cors({
//   origin: "http://localhost:5173", // aapka React dev server port
//   credentials: true                // session cookies allow karne ke liye
// }));

// // Connect DB
// connectDb();

// // Routes
// app.use("/api/auth", authRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server started at ${port}`);
// });



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "../routes/auth.routes.js";
import dashboardRoutes from "../routes/dashboard.routes.js";
import cors from "cors";
import testRouter from "./routes/test.routes.js";


dotenv.config();
app.use("/api", testRouter);

let isConnected = false;

async function connectDb() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// DB connect inside request lifecycle (Vercel safe)
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    return res.status(500).json({ error: "DB connection failed" });
  }
});

// Routes (NO extra /api prefix)
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "API working" });
});

export default app;
