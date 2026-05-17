# TaskFlow Pro

TaskFlow Pro is a full-stack task management web application designed to simplify task handling and team collaboration. Users can create tasks, assign them to team members, upload PDF attachments, and manage workflows through a modern dashboard interface.

This project was built using the MERN stack with JWT authentication and deployed using Vercel, Render, and MongoDB Atlas.

---

## Live Demo

Frontend: https://taskflowpro-chi.vercel.app

Backend API: https://taskflow-pro-170j.onrender.com

---

## Features

- User Authentication (Signup/Login/Logout)
- JWT-based Protected Routes
- Create and Manage Tasks
- Assign Tasks to Team Members
- Upload PDF Attachments
- Dashboard with Task Statistics
- Responsive UI using Tailwind CSS
- MongoDB Atlas Cloud Database
- REST API Architecture
- Full Frontend + Backend Deployment

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## Folder Structure

```bash
server/
│
├── client/                 # Frontend React App
├── controller/             # Controllers
├── middlewares/            # JWT Middleware
├── models/                 # MongoDB Models
├── routes/                 # API Routes
├── uploads/                # Uploaded PDF files
├── jwt/                    # JWT token generation
├── .env
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the root directory and add the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_TOKEN=your_secret_key
NODE_ENV=production
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/tanish0714/TaskFlow-Pro.git
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Start Backend Server

```bash
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## API Documentation

Postman collection is available inside the `postman` file.

### Main API Endpoints

#### Authentication
- `POST /api/user/signup`
- `POST /api/user/login`
- `POST /api/user/logout`

#### Users
- `GET /api/user/AllUsers`

#### Tasks
- `POST /api/task/create`
- `GET /api/task/all`
- `GET /api/task/stats`

---

## Challenges Faced

Some major challenges while building this project were:

- Handling JWT authentication using cookies
- Managing CORS issues after deployment
- Configuring MongoDB Atlas cloud database
- Debugging protected routes in production
- Managing frontend-backend communication between Vercel and Render
- Handling PDF uploads using Multer

These challenges helped in understanding real-world backend authentication systems and deployment workflows much better.

---

## Future Improvements

- Role-Based Access Control
- Admin Dashboard
- Drag & Drop Task Board
- Real-Time Notifications
- Team Chat Integration
- Task Progress Timeline
- Task Filtering & Search

---

## Author

Tanish Chourasia

GitHub: https://github.com/tanish0714