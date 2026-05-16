import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import cors from 'cors'
import taskRoute from './routes/task.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

import { app, server } from './SocketIO/server.js'

dotenv.config()

const PORT = process.env.PORT || 3001
const URI = process.env.MONGODB_URI


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(
  "/uploads",
  express.static("uploads")
);
// CORS config
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

// Connect to DB
try {
  await mongoose.connect(URI)
  console.log("Connected to MongoDB")
} catch (error) {
  console.error("MongoDB connection error:", error)
}

// Routes
app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();
  app.use(express.static('./client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath,'./client/dist' ,'index.html'));
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
