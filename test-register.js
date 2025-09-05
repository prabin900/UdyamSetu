require('dotenv').config();

const testRegistration = async () => {
  console.log('🧪 Testing Registration Endpoint...\n');
  
  const testUser = {
    name: 'Test User',
    email: 'prabinsingh9816@gmail.com', // Using your own email for testing
    password: 'testpassword123'
  };
  
  try {
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
      console.log('✅ Registration request successful');
      if (result.message.includes('OTP sent')) {
        console.log('📧 OTP should be sent to:', testUser.email);
      }
    } else {
      console.log('❌ Registration failed:', result.message);
    }
    
  } catch (error) {
    console.error('🚨 Request failed:', error.message);
  }
};

testRegistration();