const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    
    // Debug logging
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    console.log('MONGO_URI length:', process.env.MONGO_URI?.length);
    console.log('MONGO_URI starts with:', process.env.MONGO_URI?.substring(0, 20));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Let the caller handle the error
  }
};

module.exports = connectDB;