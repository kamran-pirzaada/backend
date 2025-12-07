import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

const seedUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash("clientdata@fnadvocates", 10);

    await User.create({
      username: "farhan.moghal",
      password: hashedPassword
    });

    console.log("Single user created successfully");
  } catch (err) {
    console.log("Error creating user:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedUser();
