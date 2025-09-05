require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📊 Checking existing users...\n');
    
    const users = await User.find({}, 'name email verified createdAt');
    
    if (users.length === 0) {
      console.log('✅ No users found in database');
    } else {
      console.log(`📋 Found ${users.length} users:`);
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email}) - Verified: ${user.verified}`);
      });
    }
    
    // Check for your specific email
    const yourUser = await User.findOne({ email: 'prabinsingh9816@gmail.com' });
    if (yourUser) {
      console.log('\n🔍 Your user account:');
      console.log('Name:', yourUser.name);
      console.log('Email:', yourUser.email);
      console.log('Verified:', yourUser.verified);
      console.log('Created:', yourUser.createdAt);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

checkUsers();