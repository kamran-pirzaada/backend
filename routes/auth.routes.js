// import express from "express";
// import bcrypt from "bcryptjs";
// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;



// const router = express.Router();

// // Login route
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) return res.status(401).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Wrong password" });




//    // JWT token generate karo aur response me bhejo
//   const token = jwt.sign(
//     { id: user._id, username: user.username },
//     JWT_SECRET,
//     { expiresIn: "1h" }
//   );





//   res.json({ message: "Login successful" ,
//     token:token
//   });
// });

// export default router;















// routes/auth.routes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDb from "../config/db.js";
import User from "../models/user.model.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Connect DB immediately (serverless)
connectDb();

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    // JWT token generate
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
