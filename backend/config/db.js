import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// mongoose.connect("mongodb://localhost:27017/project-01").then(() => {
//     console.log("Connected to the MongoDB Successfull!!");
// }).catch((err) => {
//     console.log("Could not connect to MongoDB", err);
// });

export default connectDB;