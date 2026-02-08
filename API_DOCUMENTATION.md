# API Documentation - Worko.ai Referral Management System

**Base URL**: `https://worko-ai-fullstack.onrender.com/api`

**Local Development**: `http://localhost:3000/api`

---

## 📋 Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Candidate Endpoints](#candidate-endpoints)
3. [Response Formats](#response-formats)
4. [Error Handling](#error-handling)
5. [Authentication](#authentication)
6. [Examples](#examples)

---

## 🔐 Authentication Endpoints

### 1. Register User

Register a new user account.

```
POST /auth/register
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation Rules:**
- `name`: Required, string
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters
- `role`: Optional, default is "user"

**Error Responses:**
- `400`: Email already exists
- `400`: Validation error in request body
- `500`: Server error

---

### 2. Login User

Authenticate and get JWT token.

```
POST /auth/login
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400`: Missing email or password
- `401`: Invalid credentials
- `500`: Server error

---

### 3. Get Current User

Get authenticated user's information.

```
GET /auth/me
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-02-08T10:30:00Z",
    "updatedAt": "2024-02-08T10:30:00Z"
  }
}
```

**Error Responses:**
- `401`: Not authorized / Invalid token
- `500`: Server error

---

## 👥 Candidate Endpoints

### 1. Get All Candidates

Retrieve list of candidates with optional search and filter.

```
GET /candidates
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | No | Search by name, email, or job title |
| `status` | string | No | Filter by status: "Pending", "Reviewed", "Hired" |

**Example Request:**
```
GET /candidates?search=John&status=Pending
```

**Response (200 OK):**
```json
{
  "count": 2,
  "candidates": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "jobTitle": "Software Engineer",
      "status": "Pending",
      "resumeUrl": "https://res.cloudinary.com/...",
      "createdAt": "2024-02-08T10:30:00Z",
      "updatedAt": "2024-02-08T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Smith",
      "email": "john.smith@example.com",
      "phone": "9876543211",
      "jobTitle": "Senior Developer",
      "status": "Pending",
      "resumeUrl": "https://res.cloudinary.com/...",
      "createdAt": "2024-02-08T11:00:00Z",
      "updatedAt": "2024-02-08T11:00:00Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Not authorized
- `500`: Server error

---

### 2. Get Candidate Statistics

Get overview statistics of all candidates.

```
GET /candidates/stats
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "total": 15,
  "pending": 8,
  "reviewed": 4,
  "hired": 3
}
```

**Error Responses:**
- `401`: Not authorized
- `500`: Server error

---

### 3. View Resume

Get candidate's resume PDF (inline viewer).

```
GET /candidates/{id}/resume
```

**Request Headers:**
```
(No authentication required)
```

**Response (200 OK):**
- Returns PDF file with headers:
  - `Content-Type: application/pdf`
  - `Content-Disposition: inline`

**Error Responses:**
- `404`: Resume not found
- `500`: Error fetching resume

---

### 4. Create Candidate

Add a new candidate with resume upload.

```
POST /candidates
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | ✅ | Min 2 chars |
| `email` | string | ✅ | Valid email, unique |
| `phone` | string | ✅ | Exactly 10 digits |
| `jobTitle` | string | ✅ | Min 2 chars |
| `resume` | file | ❌ | PDF only, max 5MB |

**Example Request (cURL):**
```bash
curl -X POST http://localhost:3000/api/candidates \
  -H "Authorization: Bearer {token}" \
  -F "name=John Doe" \
  -F "email=john.doe@example.com" \
  -F "phone=9876543210" \
  -F "jobTitle=Software Engineer" \
  -F "resume=@resume.pdf"
```

**Response (201 Created):**
```json
{
  "message": "Candidate referred successfully",
  "candidate": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "jobTitle": "Software Engineer",
    "status": "Pending",
    "resumeUrl": "https://res.cloudinary.com/doaiumpyb/raw/upload/v1770570055/candidate-resumes/Resume_John_1770570054358.pdf",
    "createdAt": "2024-02-08T12:30:00Z",
    "updatedAt": "2024-02-08T12:30:00Z"
  }
}
```

**Error Responses:**
- `400`: Validation error / Email already exists
- `401`: Not authorized
- `400`: Only PDF files are allowed
- `413`: File size exceeds 5MB
- `500`: Server error

---

### 5. Update Candidate Status

Update candidate's recruitment status.

```
PUT /candidates/{id}/status
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Reviewed"
}
```

**Allowed Status Values:**
- `"Pending"` - Initial status
- `"Reviewed"` - Under review
- `"Hired"` - Hired

**Response (200 OK):**
```json
{
  "message": "Status updated to Reviewed",
  "candidate": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "jobTitle": "Software Engineer",
    "status": "Reviewed",
    "resumeUrl": "https://res.cloudinary.com/...",
    "createdAt": "2024-02-08T12:30:00Z",
    "updatedAt": "2024-02-08T12:35:00Z"
  }
}
```

**Error Responses:**
- `400`: Invalid status value
- `401`: Not authorized
- `404`: Candidate not found
- `500`: Server error

---

### 6. Delete Candidate

Remove a candidate from the system.

```
DELETE /candidates/{id}
```

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Response (200 OK):**
```json
{
  "message": "Candidate deleted successfully"
}
```

**Error Responses:**
- `401`: Not authorized
- `404`: Candidate not found
- `500`: Server error

---

## 📤 Response Formats

### Success Response Structure

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response Structure

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successfully retrieved data |
| 201 | Created | Candidate successfully created |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource not found |
| 413 | Payload Too Large | File size exceeds limit |
| 500 | Server Error | Internal server error |

### Error Response Example

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    },
    {
      "value": "12345",
      "msg": "Phone must be 10 digits",
      "param": "phone",
      "location": "body"
    }
  ]
}
```

---

## 🔑 Authentication

### JWT Token

All protected endpoints require a JWT token in the Authorization header.

**Format:**
```
Authorization: Bearer {token}
```

**Token Structure:**
```
Header.Payload.Signature
```

**Payload Contains:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "iat": 1707385800,
  "exp": 1708077600
}
```

### Token Expiration

- Default expiration: 7 days
- Token can be refreshed by logging in again
- Expired tokens will return `401 Unauthorized`

---

## 💡 Examples

### Example 1: Complete User Flow

**Step 1: Register**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Step 2: Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Step 3: Get Current User**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer {token_from_login}"
```

---

### Example 2: Candidate Management Flow

**Step 1: Create Candidate**
```bash
curl -X POST http://localhost:3000/api/candidates \
  -H "Authorization: Bearer {token}" \
  -F "name=Jane Smith" \
  -F "email=jane@example.com" \
  -F "phone=9876543210" \
  -F "jobTitle=Product Manager" \
  -F "resume=@jane_resume.pdf"
```

**Step 2: Get All Candidates**
```bash
curl -X GET http://localhost:3000/api/candidates \
  -H "Authorization: Bearer {token}"
```

**Step 3: Get Statistics**
```bash
curl -X GET http://localhost:3000/api/candidates/stats \
  -H "Authorization: Bearer {token}"
```

**Step 4: Update Status**
```bash
curl -X PUT http://localhost:3000/api/candidates/{id}/status \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Reviewed"
  }'
```

**Step 5: View Resume**
```bash
curl -X GET http://localhost:3000/api/candidates/{id}/resume
```

**Step 6: Delete Candidate**
```bash
curl -X DELETE http://localhost:3000/api/candidates/{id} \
  -H "Authorization: Bearer {token}"
```

---

### Example 3: Search and Filter

**Search by name:**
```bash
GET /candidates?search=John
```

**Filter by status:**
```bash
GET /candidates?status=Pending
```

**Search and filter combined:**
```bash
GET /candidates?search=Engineer&status=Reviewed
```

---

## 🧪 Testing with Postman

1. **Import Collection**: Use the provided Postman collection
2. **Set Environment Variables**:
   - `base_url`: `http://localhost:3000/api`
   - `token`: (obtained from login)
3. **Run Requests**: Execute endpoints in order
4. **Check Responses**: Verify response format and status codes

---

## 📞 Support

For API issues or questions:
- Check error messages and HTTP status codes
- Verify request headers and body format
- Ensure authentication token is valid and not expired
- Check MongoDB connection and Cloudinary credentials

---

**Last Updated**: February 8, 2026
