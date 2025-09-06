require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Connect to database (with error handling)
connectDB().catch((error) => {
  console.error('Database connection failed:', error);
  console.log('Server will continue without database connection');
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;