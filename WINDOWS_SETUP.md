# Windows Setup Guide - UdyamSetu

## Prerequisites

### 1. Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS version (16.0.0 or higher)
- Run installer and follow setup wizard
- Verify installation:
```cmd
node --version
npm --version
```

### 2. Install MongoDB
- Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
- Run installer and choose "Complete" setup
- Install as Windows Service (recommended)
- Verify installation:
```cmd
mongod --version
```

### 3. Install Git (Optional)
- Download from [git-scm.com](https://git-scm.com/download/win)
- Use default settings during installation

## Project Setup

### 1. Extract Project
- Extract the UdyamSetu folder to `C:\udyamsetu\`
- Or any preferred location

### 2. Install Dependencies
Open Command Prompt or PowerShell in project folder:
```cmd
cd C:\udyamsetu
npm install
```

### 3. Environment Configuration
The `.env` file is already configured. Update if needed:
```
PORT=5555
MONGO_URI=mongodb://localhost:27017/udyamsetu
JWT_SECRET=udyamsetu_super_secret_jwt_key_2024_advanced_platform
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=production
FRONTEND_URL=http://localhost:5555
ADMIN_EMAIL=admin@udyamsetu.com
```

### 4. Start MongoDB Service
```cmd
net start MongoDB
```

### 5. Create Admin User
```cmd
node create-admin.js
```

## Running the Application

### Start Server
```cmd
npm start
```

### Access Application
- Open browser: `http://localhost:5555`
- Admin Login: `admin@udyamsetu.com` / `admin123`

## Windows-Specific Commands

### Start MongoDB Service
```cmd
net start MongoDB
```

### Stop MongoDB Service
```cmd
net stop MongoDB
```

### Kill Node Process (if needed)
```cmd
taskkill /f /im node.exe
```

### Check Running Processes
```cmd
netstat -ano | findstr :5555
```

## Troubleshooting

### Port Already in Use
```cmd
netstat -ano | findstr :5555
taskkill /PID <process_id> /F
```

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check Windows Services (services.msc)
- Restart MongoDB service if needed

### Permission Issues
- Run Command Prompt as Administrator
- Check folder permissions

## File Structure
```
C:\udyamsetu\
├── client\          # Frontend files
├── server\          # Backend files
├── uploads\         # File storage
├── package.json     # Dependencies
├── .env            # Configuration
└── README.md       # Documentation
```

## Production Deployment

### Using PM2 (Recommended)
```cmd
npm install -g pm2
pm2 start server/server.js --name udyamsetu
pm2 startup
pm2 save
```

### Windows Service (Alternative)
Use tools like `node-windows` to create Windows service

## Support
- Check MongoDB is running: `services.msc`
- Verify Node.js version: `node --version`
- Check port availability: `netstat -ano | findstr :5555`