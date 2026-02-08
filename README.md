# Worko.ai - Candidate Referral Management System

A full-stack MERN application for managing candidate referrals. Users can register, refer candidates, upload resumes, and track hiring progress through an intuitive dashboard.

## 🚀 Live Demo

- **Frontend**: https://worko-ai-fullstack.vercel.app
- **Backend API**: https://worko-ai-fullstack.onrender.com/api
- **GitHub Repository**: https://github.com/KhanjarSingh/worko.ai-fullstack

---

## Features Implemented

### Core Requirements (All Completed)

**Frontend**
- Dashboard displaying referred candidates
- Candidate cards with Name, Job Title, Status
- Search bar to filter by job title or status
- Referral form with Name, Email, Phone, Job Title, Resume
- PDF resume upload (5MB limit, PDF only)
- Update candidate status (Pending → Reviewed → Hired)

**Backend**
- `POST /candidates` - Save new candidate
- `GET /candidates` - Fetch all candidates
- `PUT /candidates/:id/status` - Update status
- `DELETE /candidates/:id` - Delete candidate
- Email and phone validation
- PDF format restriction
- Error handling and validation

### Bonus Features (All Implemented)

- **JWT Authentication** - Secure user login/registration
- **Cloud Storage** - Cloudinary for resume management
- **Deployment** - Vercel (frontend) + Render (backend)
- **Metrics Dashboard** - Total, Pending, Reviewed, Hired stats
- **Resume Viewer** - PDFs open inline in browser
- **API Documentation** - Complete reference guide
- **Postman Collection** - Pre-configured for testing

---

## 📋 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 • Vite • Tailwind CSS • Axios • Context API |
| **Backend** | Node.js • Express 5 • MongoDB • Mongoose • JWT |
| **Cloud** | Cloudinary (file storage) |
| **Deployment** | Vercel (frontend) • Render (backend) |

---

## 🎯 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB account (https://mongodb.com/cloud/atlas - free)
- Cloudinary account (https://cloudinary.com - free)

### Setup in 5 Steps

#### Step 1: Clone & Install
```bash
git clone https://github.com/KhanjarSingh/worko.ai-fullstack.git
cd worko.ai-fullstack
```

#### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

Run backend:
```bash
npm run dev
```
✅ Backend running on http://localhost:3000

#### Step 3: Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:3000/api
```

Run frontend:
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173

#### Step 4: Get MongoDB Connection String
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Click "Connect" → "Drivers"
5. Copy connection string: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
6. Add to `backend/.env` as `MONGODB_URI`

#### Step 5: Get Cloudinary Keys
1. Sign up at https://cloudinary.com (free tier)
2. Go to Dashboard
3. Copy: Cloud Name, API Key, API Secret
4. Add to `backend/.env`

### Test Application ✅
1. Open http://localhost:5173
2. Register new account
3. Add candidate with PDF resume
4. Search/filter candidates
5. Update status
6. View statistics

---

## 📚 API Documentation

**Full API reference with all endpoints, examples, and error codes**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Quick API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register user |
| POST | `/auth/login` | ❌ | Login user |
| GET | `/candidates` | ✅ | List candidates |
| POST | `/candidates` | ✅ | Add candidate |
| PUT | `/candidates/:id/status` | ✅ | Update status |
| DELETE | `/candidates/:id` | ✅ | Delete candidate |
| GET | `/candidates/stats` | ✅ | Get statistics |
| GET | `/candidates/:id/resume` | ❌ | View resume (PDF) |

---

## 🧪 Testing API with Postman

Import [Worko.ai_Postman_Collection.json](Worko.ai_Postman_Collection.json) to test all endpoints.

**Steps**:
1. Open Postman
2. Click "Import" → Select `Worko.ai_Postman_Collection.json`
3. After login, set `token` variable with your JWT
4. Test all endpoints with pre-configured requests

---

## 🔐 Authentication

- **Method**: JWT (JSON Web Tokens)
- **Expiry**: 7 days
- **Storage**: Browser localStorage
- **Usage**: `Authorization: Bearer <token>` header

Protected routes require login. Resume viewing is public (no auth).

---

## 📁 Project Structure

```
backend/
  ├── config/db.js                 → Database connection
  ├── controllers/
  │   ├── authController.js        → Login/Register logic
  │   └── candidateController.js   → Candidate operations
  ├── middleware/
  │   ├── auth.js                  → JWT verification
  │   └── upload.js                → File upload config
  ├── models/
  │   ├── User.js                  → User schema
  │   └── Candidate.js             → Candidate schema
  ├── routes/
  │   ├── auth.js                  → Auth endpoints
  │   └── candidates.js            → Candidate endpoints
  ├── server.js
  └── package.json

frontend/
  ├── src/
  │   ├── api/
  │   │   └── axios.js             → API configuration
  │   ├── components/              → Reusable UI components
  │   ├── context/
  │   │   └── AuthContext.jsx      → Auth state management
  │   ├── pages/
  │   │   ├── LandingPage.jsx      → Home page
  │   │   ├── Login.jsx            → Login form
  │   │   ├── Register.jsx         → Registration form
  │   │   ├── Dashboard.jsx        → Candidates list
  │   │   └── CreateCandidate.jsx  → Add candidate form
  │   ├── App.jsx
  │   └── main.jsx
  ├── package.json
  └── vite.config.js
```

---

## 🎯 Key Features

### Dashboard
- View all referred candidates
- Real-time search
- Filter by status
- Update status in one click
- View statistics

### Referral Form
- Input: Name, Email, Phone, Job Title
- Upload PDF resume (optional)
- Form validation
- Success notifications

### Resume Management
- Upload to Cloudinary cloud
- View inline in browser
- PDF controls (zoom, download, etc.)
- Secure public access

### Statistics
- Total candidates
- By status breakdown
- Success metrics

---

## 🌐 Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
NODE_ENV=development
```

### Frontend (`frontend/.env.local`)
```
VITE_API_URL=http://localhost:3000/api
```

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Module not found errors | Run `npm install` in backend & frontend |
| MongoDB won't connect | Check MONGODB_URI, whitelist IP in Atlas |
| Resume upload fails | Verify Cloudinary keys, file is PDF, < 5MB |
| CORS errors | Check VITE_API_URL matches backend |
| Resume won't display | Check Cloudinary credentials are correct |
| Token expired | Login again (token valid 7 days) |

---

## 📋 Assumptions & Limitations

### Assumptions
- MongoDB available (local or Atlas)
- Cloudinary account set up
- Valid email addresses
- Phone numbers in standard format
- Resumes in PDF format

### Limitations
- Resume max 5MB, PDF only
- JWT expires in 7 days
- No pagination (shows all candidates)
- No role-based access control
- Single resume per candidate

---

## 📖 Complete Documentation

- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - All endpoints with examples
- **Testing**: [Worko.ai_Postman_Collection.json](Worko.ai_Postman_Collection.json) - Import in Postman

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| **Frontend (Live)** | https://worko-ai-fullstack.vercel.app |
| **Backend API** | https://worko-ai-fullstack.onrender.com/api |
| **GitHub Repo** | https://github.com/KhanjarSingh/worko.ai-fullstack |
| **MongoDB** | https://mongodb.com/cloud/atlas |
| **Cloudinary** | https://cloudinary.com |

---

## ✨ What's Included

- Full MERN stack application  
- User authentication with JWT  
- Candidate management system  
- Resume upload to cloud  
- Statistics dashboard  
- Responsive UI design  
- Complete API documentation  
- Postman collection for testing  
- Deployed and running live  
- Production-ready code  

---

## 🎓 Running Tests

### Manual Testing
1. Register account
2. Add candidate with resume
3. Search/filter candidates
4. Update status
5. Check statistics
6. View resume

### API Testing
1. Import Postman collection
2. Register and login
3. Test each endpoint
4. Verify responses

---

## 📝 License

MIT License - Open source

---