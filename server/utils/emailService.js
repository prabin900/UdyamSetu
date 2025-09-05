const nodemailer = require('nodemailer');

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

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error.message);
    console.log('📧 Email config:', {
      user: process.env.EMAIL_USER ? 'Set' : 'Missing',
      pass: process.env.EMAIL_PASS ? 'Set' : 'Missing',
      host: 'smtp.gmail.com',
      port: 587
    });
    console.log('🔧 Troubleshooting tips:');
    console.log('1. Ensure 2-Step Verification is enabled on Gmail');
    console.log('2. Use App Password instead of regular password');
    console.log('3. Check if "Less secure app access" is enabled (if not using App Password)');
  } else {
    console.log('✅ Email service ready for Gmail SMTP');
  }
});

const sendOTP = async (email, otp, retryCount = 0) => {
  try {
    const mailOptions = {
      from: `"UdyamSetu Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'UdyamSetu - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">UdyamSetu Email Verification</h2>
          <p>Your OTP for email verification is:</p>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; margin: 0; font-size: 32px;">${otp}</h1>
          </div>
          <p><strong>This OTP will expire in 10 minutes.</strong></p>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
      `
    };

    console.log(`📧 Attempting to send OTP to: ${email} (Attempt ${retryCount + 1})`);
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ OTP sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send OTP:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    
    // Retry once for network issues
    if (retryCount < 1 && (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT')) {
      console.log('🔄 Retrying email send...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return sendOTP(email, otp, retryCount + 1);
    }
    
    // Log OTP for testing when email fails
    console.log(`\n=== OTP FOR TESTING (EMAIL FAILED) ===`);
    console.log(`Email: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`Error: ${error.message}`);
    console.log(`=====================================\n`);
    
    throw error;
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const mailOptions = {
      from: `"UdyamSetu Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset - UdyamSetu',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Password Reset Request</h2>
          <p>Your password reset OTP is:</p>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #dc3545; margin: 0; font-size: 32px;">${resetToken}</h1>
          </div>
          <p><strong>This OTP will expire in 10 minutes.</strong></p>
          <p>If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
        </div>
      `
    };

    console.log(`📧 Sending password reset OTP to: ${email}`);
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully!');
    console.log('Message ID:', result.messageId);
    return result;
  } catch (error) {
    console.error('❌ Failed to send password reset email:', error.message);
    console.log(`\n=== RESET OTP FOR TESTING ===`);
    console.log(`Email: ${email}`);
    console.log(`OTP: ${resetToken}`);
    console.log(`============================\n`);
    throw error;
  }
};

module.exports = { sendOTP, sendPasswordResetEmail };