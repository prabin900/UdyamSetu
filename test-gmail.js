require('dotenv').config();
const nodemailer = require('nodemailer');

const testGmailConnection = async () => {
  console.log('🔧 Testing Gmail SMTP Configuration...\n');
  
  // Check environment variables
  console.log('📋 Environment Check:');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Set' : '❌ Missing');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing');
  console.log('');
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    },
    timeout: 30000
  });

  try {
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
    
    console.log('📧 Sending test email...');
    const testEmail = {
      from: `"UdyamSetu Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'UdyamSetu - SMTP Test',
      html: `
        <h2>Gmail SMTP Test Successful!</h2>
        <p>If you receive this email, your Gmail configuration is working correctly.</p>
        <p>Test performed at: ${new Date().toLocaleString()}</p>
      `
    };
    
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    
  } catch (error) {
    console.error('❌ Gmail SMTP Test Failed:');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Enable 2-Step Verification in your Google Account');
    console.log('2. Generate an App Password:');
    console.log('   - Go to Google Account settings');
    console.log('   - Security > 2-Step Verification > App passwords');
    console.log('   - Generate password for "Mail"');
    console.log('   - Use this 16-character password in EMAIL_PASS');
    console.log('3. Ensure no spaces in the app password');
    console.log('4. Check if Gmail account is not locked or restricted');
  }
};

testGmailConnection();