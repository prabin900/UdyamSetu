require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./server/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new User({
      name: 'Admin User',
      email: 'admin@udyamsetu.com',
      password: hashedPassword,
      role: 'admin',
      verified: true
    });
    
    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@udyamsetu.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin user already exists!');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
};

createAdmin();