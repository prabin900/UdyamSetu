require('dotenv').config();

const testNewUserRegistration = async () => {
  console.log('🧪 Testing Registration with New Email...\n');
  
  const testUser = {
    name: 'New Test User',
    email: 'newtest' + Date.now() + '@gmail.com', // Unique email
    password: 'testpassword123'
  };
  
  try {
    console.log('📧 Registering with email:', testUser.email);
    
    const response = await fetch('http://localhost:5555/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });
    
    const result = await response.json();
    
    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Body:', result);
    
    if (response.ok) {
      console.log('✅ Registration successful');
      if (result.message.includes('OTP sent')) {
        console.log('📧 OTP should be sent to:', testUser.email);
        console.log('⚠️  Since this is a fake email, check server logs for OTP');
      }
    } else {
      console.log('❌ Registration failed:', result.message);
    }
    
  } catch (error) {
    console.error('🚨 Request failed:', error.message);
  }
};

testNewUserRegistration();