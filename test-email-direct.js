require('dotenv').config();
const { sendOTP } = require('./server/utils/emailService');

const testDirectEmail = async () => {
  console.log('📧 Testing Direct Email Service...\n');
  
  try {
    const testOTP = '123456';
    const testEmail = 'prabinsingh9816@gmail.com';
    
    console.log(`Sending OTP ${testOTP} to ${testEmail}...`);
    
    const result = await sendOTP(testEmail, testOTP);
    console.log('✅ Email sent successfully!');
    console.log('Result:', result);
    
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('Full error:', error);
  }
};

testDirectEmail();