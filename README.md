# Amar Digital Studio - Backend API

Express.js REST API for the Amar Digital Studio photography website with MongoDB database, Cloudinary image storage, and JWT authentication.

## 🚀 Features

- **RESTful API** - Clean, resource-based API design
- **MongoDB Database** - Scalable NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure token-based authentication
- **Image Upload** - Cloudinary integration for image storage
- **Email Notifications** - Nodemailer for sending emails
- **Request Validation** - Express-validator for input validation
- **Security** - Helmet, CORS, rate limiting
- **Error Handling** - Centralized error handling
- **Logging** - Morgan HTTP request logger

## 📋 Prerequisites

- Node.js 16.x or higher
- MongoDB 4.4 or higher (local or Atlas)
- Cloudinary account (for image uploads)
- npm or yarn

## 🛠️ Installation

### 1. Navigate to backend directory

```bash
cd amar_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=8001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/amar_studio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 4. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 5. Setup Cloudinary

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from dashboard
3. Update Cloudinary variables in `.env`

### 6. Seed the database

```bash
npm run seed
```

This creates:
- Admin user
- Initial settings
- Sample galleries
- Sample testimonials

### 7. Start the server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server will start on `http://localhost:8001`

## 📁 Project Structure

```
amar_backend/
├── config/              # Configuration files
│   ├── cloudinary.js    # Cloudinary setup
│   └── database.js      # Database connection
├── middleware/          # Express middleware
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling
│   └── upload.js        # File upload configuration
├── models/              # Mongoose models
│   ├── User.js          # User model
│   ├── Gallery.js       # Gallery model
│   ├── Photo.js         # Photo model
│   ├── Testimonial.js   # Testimonial model
│   ├── Booking.js       # Booking model
│   ├── Contact.js       # Contact model
│   └── Settings.js      # Settings model
├── routes/              # API routes
│   ├── auth.js          # Authentication routes
│   ├── galleries.js     # Gallery routes
│   ├── photos.js        # Photo routes
│   ├── testimonials.js  # Testimonial routes
│   ├── bookings.js      # Booking routes
│   ├── contacts.js      # Contact routes
│   └── settings.js      # Settings routes
├── scripts/             # Utility scripts
│   └── seed.js          # Database seeding
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies
├── server.js            # Entry point
└── README.md            # This file
```

## 🔌 API Endpoints

### Base URL

```
http://localhost:8001/api
```

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Galleries

#### Get All Galleries
```http
GET /api/galleries
GET /api/galleries?featured=true
GET /api/galleries?category=wedding

Response:
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

#### Get Single Gallery
```http
GET /api/galleries/:id
```

#### Create Gallery (Admin Only)
```http
POST /api/galleries
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Wedding Photography",
  "description": "Beautiful wedding moments",
  "category": "wedding",
  "coverImage": "data:image/jpeg;base64,...",
  "featured": true
}
```

#### Update Gallery (Admin Only)
```http
PUT /api/galleries/:id
Authorization: Bearer {token}
```

#### Delete Gallery (Admin Only)
```http
DELETE /api/galleries/:id
Authorization: Bearer {token}
```

### Photos

#### Get All Photos
```http
GET /api/photos
GET /api/photos?galleryId={galleryId}
```

#### Create Photo (Admin Only)
```http
POST /api/photos
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Photo Title",
  "description": "Photo description",
  "imageUrl": "data:image/jpeg;base64,...",
  "galleryId": "..."
}
```

#### Delete Photo (Admin Only)
```http
DELETE /api/photos/:id
Authorization: Bearer {token}
```

### Testimonials

#### Get All Testimonials
```http
GET /api/testimonials
GET /api/testimonials?approved=true
```

#### Create Testimonial (Public)
```http
POST /api/testimonials
Content-Type: application/json

{
  "name": "John Doe",
  "role": "Wedding Client",
  "content": "Amazing service!",
  "rating": 5,
  "image": "data:image/jpeg;base64,..."
}
```

#### Update Testimonial (Admin Only)
```http
PUT /api/testimonials/:id
Authorization: Bearer {token}

{
  "approved": true
}
```

#### Delete Testimonial (Admin Only)
```http
DELETE /api/testimonials/:id
Authorization: Bearer {token}
```

### Bookings

#### Get All Bookings (Admin Only)
```http
GET /api/bookings
Authorization: Bearer {token}
```

#### Create Booking (Public)
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "service": "Wedding Photography",
  "date": "2024-12-25",
  "time": "10:00 AM",
  "message": "Optional message"
}
```

#### Update Booking (Admin Only)
```http
PUT /api/bookings/:id
Authorization: Bearer {token}

{
  "status": "confirmed"
}
```

### Contacts

#### Get All Contacts (Admin Only)
```http
GET /api/contacts
Authorization: Bearer {token}
```

#### Create Contact (Public)
```http
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Inquiry",
  "message": "I'm interested in your services"
}
```

#### Update Contact (Admin Only)
```http
PUT /api/contacts/:id
Authorization: Bearer {token}

{
  "read": true
}
```

### Settings

#### Get Settings (Public)
```http
GET /api/settings

Response:
{
  "success": true,
  "data": {
    "siteName": "Amar Digital Studio",
    "email": "contact@amardigitalstudio.com",
    "phone": "+91 8849058787",
    "address": "...",
    "owners": "Jayesh Chavda & Akash Chavda",
    "socialMedia": {
      "instagram": "...",
      "facebook": "...",
      "twitter": "...",
      "pinterest": "..."
    }
  }
}
```

#### Update Settings (Admin Only)
```http
PUT /api/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "siteName": "Updated Name",
  "email": "new@email.com"
}
```

## 🔒 Authentication & Authorization

### JWT Tokens

- Tokens are valid for 7 days
- Include token in Authorization header: `Bearer {token}`
- Tokens are automatically verified by protected routes

### Roles

- **admin**: Full access to all endpoints
- Protected routes require admin role

### Protecting Routes

```javascript
const { protect, adminOnly } = require('../middleware/auth');

// Requires authentication
router.get('/protected', protect, handler);

// Requires admin role
router.post('/admin-only', adminOnly, handler);
```

## 📤 Image Upload

Images are uploaded to Cloudinary automatically:

1. Send base64 image data
2. Backend uploads to Cloudinary
3. Returns Cloudinary URL
4. URL stored in database

### Image Formats

Supported formats: JPEG, JPG, PNG, GIF, WebP

### Size Limits

- Max file size: 10MB
- Images automatically optimized
- Responsive transformations applied

## 🛡️ Security Features

### Implemented Security

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevents abuse
- **JWT**: Secure authentication
- **Password Hashing**: BCrypt with salt rounds
- **Input Validation**: Express-validator
- **MongoDB Injection Prevention**: Mongoose sanitization

### Rate Limiting

- Window: 15 minutes
- Max requests: 100 per IP
- Configurable in `.env`

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with initial data
npm run seed
```

### Testing API

Use tools like:
- **Postman**: GUI API testing
- **Insomnia**: REST client
- **curl**: Command line testing
- **Thunder Client**: VS Code extension

Example curl request:
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## 🌐 Deployment

### Environment Variables

Set these in production:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-secure-string-minimum-32-characters
CLOUDINARY_CLOUD_NAME=prod-cloud-name
CLOUDINARY_API_KEY=prod-api-key
CLOUDINARY_API_SECRET=prod-api-secret
ALLOWED_ORIGINS=https://yourdomain.com,https://admin.yourdomain.com
```

### Deployment Platforms

#### Heroku

```bash
# Install Heroku CLI
heroku create amar-studio-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main
```

#### Railway

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

#### DigitalOcean App Platform

1. Create new app
2. Connect repository
3. Configure environment variables
4. Deploy

### Database Migration

For production, use MongoDB Atlas:

1. Export local data: `mongodump`
2. Import to Atlas: `mongorestore`
3. Update `MONGODB_URI`

## 📊 Monitoring

### Logging

- Development: Detailed logs with Morgan
- Production: Combined logs

### Error Tracking

Recommended tools:
- Sentry
- LogRocket
- Datadog

## 🐛 Troubleshooting

### MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Cloudinary Upload Failed

**Solution**: Check credentials in `.env`
```bash
# Verify credentials
echo $CLOUDINARY_CLOUD_NAME
```

### JWT Token Invalid

**Solution**: Ensure JWT_SECRET matches between services

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::8001
```

**Solution**: Change port or kill process
```bash
# Find process
lsof -i :8001

# Kill process
kill -9 {PID}

# Or change PORT in .env
PORT=5001
```

## 📚 Database Schema

### User
- email (String, unique, required)
- password (String, hashed, required)
- role (String, enum: admin/user)

### Gallery
- title (String, required)
- description (String, required)
- category (String, enum)
- coverImage (Object: url, publicId)
- featured (Boolean)
- images (Array of Photo refs)

### Photo
- title (String, required)
- description (String)
- imageUrl (Object: url, publicId, width, height)
- gallery (Gallery ref, required)

### Testimonial
- name (String, required)
- role (String, required)
- content (String, required)
- rating (Number, 1-5, required)
- image (Object: url, publicId)
- approved (Boolean)

### Booking
- name, email, phone (String, required)
- service (String, required)
- date (Date, required)
- time (String)
- message (String)
- status (String, enum)

### Contact
- name, email, subject, message (String, required)
- phone (String)
- read (Boolean)

### Settings
- siteName, email, phone, address, owners (String, required)
- socialMedia (Object)

## 🔗 Integration

### Frontend Integration

Update frontend `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

### Admin Panel Integration

Update admin `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8001/api
```

Both will automatically connect to this backend.

## 📄 License

This project is part of Amar Digital Studio.

## 👥 Support

For issues or questions:
1. Check this documentation
2. Review error logs
3. Check MongoDB connection
4. Verify environment variables
5. Contact development team

---

**Built with ❤️ for Amar Digital Studio**

API Version: 1.0.0

