// import mongoose from "mongoose";

// const connectDb=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGODB_URL)
//         console.log("db is connected")
//     }catch (error){
//         console.log("db error") 
    
//     }
// }
// export default connectDb












import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return; // prevent multiple unnecessary connections

  const uri = process.env.MONGODB_URL;
  if (!uri) {
    throw new Error("Missing MONGODB_URL");
  }

  // If already connected, just return
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected (serverless)");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDb;
