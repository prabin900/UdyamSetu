require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/database');

let isDbConnected = false;

async function ensureDatabaseConnection() {
  if (!isDbConnected) {
    await connectDB();
    isDbConnected = true;
  }
}

// Ensure DB is connected on cold start
ensureDatabaseConnection().catch((err) => {
  console.error('Database connection failed on Vercel:', err.message);
});

module.exports = app;

