# UdyamSetu - Entrepreneurship Learning Platform

## Project Overview

UdyamSetu is a comprehensive web-based platform designed to facilitate entrepreneurship education through structured workshops, interactive sessions, and resource sharing. The platform connects aspiring entrepreneurs with expert instructors and provides a centralized hub for learning materials and live interactions.

## Architecture & Technology Stack

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs password hashing
- **Email Service**: Nodemailer with Gmail SMTP
- **File Upload**: Multer middleware for PDF handling
- **Security**: CORS enabled, environment-based configuration

### Frontend
- **Core Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Design System**: Modern glassmorphism UI with gradient backgrounds
- **Icons**: Font Awesome 6.0
- **Typography**: Inter font family
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Database Schema

#### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['admin', 'participant'], default: 'participant'),
  isVerified: Boolean (default: false),
  otp: String,
  otpExpires: Date
}
```

#### Workshop Model
```javascript
{
  title: String (required),
  description: String (required),
  date: Date (required),
  meetingLink: String,
  materials: [ObjectId] (ref: Material),
  createdBy: ObjectId (ref: User)
}
```

#### Material Model
```javascript
{
  title: String (required),
  description: String (required),
  type: String (enum: ['pdf', 'video', 'workshop']),
  filePath: String,
  link: String,
  workshop: ObjectId (ref: Workshop, required)
}
```

#### WorkshopParticipant Model
```javascript
{
  workshop: ObjectId (ref: Workshop, required),
  participant: ObjectId (ref: User, required),
  joinedAt: Date (default: Date.now)
}
```

## Key Features

### 1. Authentication System
- **Registration**: Email-based signup with OTP verification
- **Login**: JWT token-based authentication
- **Role Management**: Admin and participant access levels
- **Security**: Password hashing, token expiration, email verification

### 2. Workshop Management
- **Creation**: Admin can create workshops with title, description, date, and meeting links
- **Enrollment**: Participants can join workshops
- **Material Association**: Link learning materials to specific workshops
- **Access Control**: Only enrolled participants can access workshop materials

### 3. Content Management
- **File Upload**: PDF document upload with Multer
- **Link Sharing**: External video and resource links
- **Material Viewer**: Dedicated interface for browsing materials
- **Workshop-Centric**: All materials must belong to a workshop

### 4. Interactive Sessions
- **Live Meetings**: Integration with Google Meet, Zoom, YouTube
- **Session Creation**: Admin can create and manage live sessions
- **Real-time Access**: Direct links to live sessions for participants

### 5. User Interface
- **Modern Design**: Glassmorphism effects with backdrop blur
- **Responsive Layout**: Mobile-optimized design
- **Interactive Elements**: Hover effects, animations, smooth transitions
- **Accessibility**: Proper contrast, readable fonts, intuitive navigation

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration with OTP
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Workshop Routes
- `GET /api/workshops` - Get all workshops (public)
- `POST /api/workshops` - Create workshop (admin only)
- `POST /api/workshops/:id/join` - Join workshop (authenticated)
- `GET /api/workshops/joined` - Get user's joined workshops
- `POST /api/workshops/:id/materials` - Add material to workshop (admin)

### Material Routes
- `GET /api/materials` - Get all materials (authenticated)
- `POST /api/materials` - Create material (admin only)
- `GET /api/materials/:id` - Get specific material

### Session Routes
- `GET /api/sessions` - Get all sessions
- `POST /api/sessions` - Create session (admin only)

## Security Implementation

### Authentication Middleware
```javascript
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
```

### Admin Authorization
```javascript
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

## File Structure
```
udyamsetu/
├── client/                 # Frontend files
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   ├── auth.js        # Authentication logic
│   │   ├── materials.js   # Material management
│   │   └── workshops.js   # Workshop functionality
│   ├── index.html         # Landing page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── dashboard.html     # Main dashboard
│   ├── workshop.html      # Workshop creation
│   ├── upload.html        # Material upload
│   └── session.html       # Session management
├── server/                # Backend files
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Authentication middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── uploads/              # File storage
├── .env                  # Environment variables
├── package.json          # Dependencies
└── README.md            # Documentation
```

## Deployment Configuration

### Environment Variables
```
PORT=5555
MONGO_URI=mongodb://localhost:27017/udyamsetu
JWT_SECRET=udyamsetu_super_secret_jwt_key_2024_advanced_platform
EMAIL_USER=niraula76kunjan@gmail.com
EMAIL_PASS=lgckidmzeavhumyr
NODE_ENV=production
FRONTEND_URL=http://localhost:8080
ADMIN_EMAIL=admin@udyamsetu.com
```

### Production Considerations
- MongoDB Atlas for cloud database
- Email service configuration (Gmail App Passwords)
- File storage optimization
- HTTPS implementation
- Error logging and monitoring
- Performance optimization

## User Workflows

### Participant Journey
1. Register with email verification
2. Browse available workshops
3. Join workshops of interest
4. Access workshop materials
5. Participate in live sessions
6. View materials through dedicated viewer

### Admin Journey
1. Login with admin credentials
2. Create workshops with details
3. Upload learning materials
4. Associate materials with workshops
5. Create interactive sessions
6. Manage participant enrollment

## Future Enhancements
- Real-time chat functionality
- Progress tracking and certificates
- Advanced search and filtering
- Mobile application
- Payment integration
- Analytics dashboard
- Multi-language support

## Performance Metrics
- Page load time: <3 seconds
- Mobile responsiveness: 100%
- Cross-browser compatibility
- SEO optimization ready
- Accessibility compliance

This platform successfully bridges the gap between entrepreneurship education and practical learning through a modern, user-friendly interface backed by robust backend architecture.