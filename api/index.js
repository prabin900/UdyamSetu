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
      if (adminEmail) {
        const User = require('../server/models/User');
        const existing = await User.findOne({ email: adminEmail });
        if (!existing) {
          const hashed = adminPassword ? await bcrypt.hash(adminPassword, 10) : await bcrypt.hash(require('crypto').randomBytes(12).toString('hex'), 10);
          await new User({
            name: 'Admin User',
            email: adminEmail,
            password: hashed,
            role: 'admin',
            verified: true
          }).save();
          console.log(`✅ Admin user created: ${adminEmail}`);
        } else {
          const update = { role: 'admin', verified: true };
          if (adminPassword) {
            update.password = await bcrypt.hash(adminPassword, 10);
          }
          await User.updateOne({ _id: existing._id }, { $set: update });
          console.log(`✅ Admin user ensured/promoted: ${adminEmail}`);
        }
      } else {
        console.log('ℹ️ Set ADMIN_EMAIL (and optional ADMIN_PASSWORD) to ensure an admin exists');
      }
    } catch (e) {
      console.error('❌ Admin ensure/promote failed:', e.message);
    }
  }
}

// Connect on cold start
ensureDatabaseConnection().catch((err) => {
  console.error('Database connection failed on Vercel API entry:', err.message);
});

module.exports = app;

