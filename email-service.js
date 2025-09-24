const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'prabinsingh9816@gmail.com',
    pass: 'hrtthihjoewxfnqm'
  }
});

app.post('/send-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    await transporter.sendMail({
      from: '"UdyamSetu Platform" <prabinsingh9816@gmail.com>',
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
        </div>
      `
    });
    
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});