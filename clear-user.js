require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');
const OTP = require('./server/models/OTP');

const clearUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗑️  Clearing user data for prabinsingh9816@gmail.com...\n');
    
    // Delete user
    const userResult = await User.deleteOne({ email: 'prabinsingh9816@gmail.com' });
    console.log('👤 User deleted:', userResult.deletedCount > 0 ? 'Yes' : 'No');
    
    // Delete any OTP records
    const otpResult = await OTP.deleteMany({ email: 'prabinsingh9816@gmail.com' });
    console.log('🔢 OTP records deleted:', otpResult.deletedCount);
    
    console.log('\n✅ User data cleared. You can now register again.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

clearUser();