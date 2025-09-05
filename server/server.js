require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Connect to database (with error handling)
connectDB().catch((error) => {
  console.error('Database connection failed:', error);
  console.log('Server will continue without database connection');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});