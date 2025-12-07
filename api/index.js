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








// api/index.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "../config/db.js";
import authRoutes from "../routes/auth.routes.js";
import dashboardRoutes from "../routes/dashboard.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*", // frontend alag domain pe ho to *
  credentials: true,
}));

// Connect DB (serverless friendly)
await connectDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes); // Add dashboard routes

// Test route
app.get("/api", (req, res) => {
  res.status(200).json({ message: "Serverless API is running" });
});

export default app;
