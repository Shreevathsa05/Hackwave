import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log(` ✅ MongoDB connection : Successful`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

export default dbConnect;