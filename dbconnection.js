import mongoose from "mongoose";
import "dotenv/config";

// function for connecting to the DB
export default function dbConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.MONGODB_URL, params);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error occured while connecting DB", error);
  }
}
