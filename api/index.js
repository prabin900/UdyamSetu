require('dotenv').config({ path: require('path').join(__dirname, '../server/.env') });

const app = require('../server/app');
const connectDB = require('../server/config/database');

let isDbConnected = false;

async function ensureDatabaseConnection() {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
}

// Connect on cold start
ensureDatabaseConnection().catch((err) => {
  console.error('Database connection failed on Vercel API entry:', err.message);
});

module.exports = app;

