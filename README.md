# 🚀 UdyamSetu - Entrepreneurship Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)](https://www.mongodb.com/)

> A comprehensive web-based platform designed to facilitate entrepreneurship education through structured workshops, interactive sessions, and resource sharing.

## ✨ Features

- 🎓 **Workshop Management** - Create and manage entrepreneurship workshops
- 📚 **Learning Materials** - Upload and organize PDFs, videos, and resources
- 👥 **User Management** - Role-based access (Admin/Participant)
- 🔐 **Secure Authentication** - JWT-based auth with email verification
- 📧 **Email Integration** - Automated notifications and OTP verification
- 🎨 **Modern UI** - Glassmorphism design with responsive layout
- 📱 **Mobile Friendly** - Optimized for all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** Authentication
- **Nodemailer** for email services
- **Multer** for file uploads

### Frontend
- **Vanilla JavaScript** (ES6+)
- **HTML5** & **CSS3**
- **Font Awesome** icons
- **Responsive Design**

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.0.0 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prabin900/UdyamSetu.git
   cd UdyamSetu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open browser: `http://localhost:5555`
   - Default admin: `admin@udyamsetu.com` / `admin123`

## 📁 Project Structure

```
udyamsetu/
├── client/                 # Frontend files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   └── *.html             # HTML pages
├── server/                # Backend files
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Authentication middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── uploads/              # File storage
├── .env.example          # Environment template
├── LICENSE               # MIT License
└── CONTRIBUTING.md       # Contribution guidelines
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```env
PORT=5555
MONGO_URI=mongodb://localhost:27017/udyamsetu
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5555
ADMIN_EMAIL=admin@udyamsetu.com
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in `EMAIL_PASS`

## 📖 Usage

### For Participants
1. Register with email verification
2. Browse available workshops
3. Join workshops of interest
4. Access workshop materials
5. Participate in live sessions

### For Admins
1. Login with admin credentials
2. Create workshops with details
3. Upload learning materials
4. Associate materials with workshops
5. Create interactive sessions
6. Manage participant enrollment

## 🛡️ Security Features

- **Password Hashing** with bcryptjs
- **JWT Token** authentication
- **Email Verification** with OTP
- **Role-based Access Control**
- **File Upload Security**
- **CORS Protection**

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for cloud database
3. Configure production email service
4. Set up HTTPS
5. Use PM2 for process management

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server/server.js --name udyamsetu
pm2 startup
pm2 save
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User login

### Workshop Endpoints
- `GET /api/workshops` - Get all workshops
- `POST /api/workshops` - Create workshop (admin)
- `POST /api/workshops/:id/join` - Join workshop

### Material Endpoints
- `GET /api/materials` - Get materials
- `POST /api/materials` - Upload material (admin)

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
netstat -ano | findstr :5555
taskkill /PID <process_id> /F
```

**MongoDB connection issues:**
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify database permissions

**Email not working:**
- Check Gmail App Password
- Verify 2FA is enabled
- Check firewall settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Maintainer**: [Prabin](https://github.com/prabin900)
- **Contributors**: See [Contributors](https://github.com/prabin900/UdyamSetu/graphs/contributors)

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- Font Awesome icons
- All contributors and testers

## 📞 Support

- 📧 Email: admin@udyamsetu.com
- 🐛 Issues: [GitHub Issues](https://github.com/prabin900/UdyamSetu/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/prabin900/UdyamSetu/discussions)

---

⭐ **Star this repository if you found it helpful!**
