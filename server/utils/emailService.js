const nodemailer = require('nodemailer');

// Validate email configuration
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('❌ Email configuration missing!');
  console.log('Required: EMAIL_USER and EMAIL_PASS environment variables');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
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
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000
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

const sendOTP = async (email, otp) => {
  try {
    // Use EmailJS or similar service that works with Railway
    const emailData = {
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

    console.log(`📧 Attempting to send OTP to: ${email}`);
    
    // Try SMTP first
    const result = await transporter.sendMail({
      from: `"UdyamSetu Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailData.subject,
      html: emailData.html
    });
    
    console.log('✅ OTP sent successfully via SMTP!');
    return result;
    
  } catch (error) {
    console.error('❌ SMTP failed:', error.message);
    
    // Fallback: Use fetch to send via webhook (if available)
    try {
      if (process.env.EMAIL_WEBHOOK_URL) {
        const response = await fetch(process.env.EMAIL_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: 'UdyamSetu - Email Verification OTP',
            text: `Your OTP: ${otp}`
          })
        });
        
        if (response.ok) {
          console.log('✅ OTP sent via webhook!');
          return { messageId: 'webhook-sent' };
        }
      }
    } catch (webhookError) {
      console.error('❌ Webhook also failed:', webhookError.message);
    }
    
    console.log(`\n🔑 === OTP FOR ${email} ===`);
    console.log(`📱 OTP: ${otp}`);
    console.log(`⏰ Valid for 10 minutes`);
    console.log(`===============================\n`);
    
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