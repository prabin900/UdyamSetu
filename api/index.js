require('dotenv').config({ path: require('path').join(__dirname, '../server/.env') });

const app = require('../server/app');
const connectDB = require('../server/config/database');
const bcrypt = require('bcryptjs');

let isDbConnected = false;

async function ensureDatabaseConnection() {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;

    // Optionally auto-create admin if env vars are provided
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (adminEmail && adminPassword) {
        const User = require('../server/models/User');
        const existing = await User.findOne({ email: adminEmail });
        if (!existing) {
          const hashed = await bcrypt.hash(adminPassword, 10);
          await new User({
            name: 'Admin User',
            email: adminEmail,
            password: hashed,
            role: 'admin',
            verified: true
          }).save();
          console.log(`✅ Admin user created: ${adminEmail}`);
        }
      } else {
        console.log('ℹ️ Set ADMIN_EMAIL and ADMIN_PASSWORD to auto-create an admin on deploy');
      }
    } catch (e) {
      console.error('❌ Admin auto-create failed:', e.message);
    }
  }
}

// Connect on cold start
ensureDatabaseConnection().catch((err) => {
  console.error('Database connection failed on Vercel API entry:', err.message);
});

module.exports = app;

