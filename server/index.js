import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';
import causeRoutes from './routes/causeRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import profileRoutes from "./routes/profileRoutes.js";


dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT" ],
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinCause', (causeId) => {
    socket.join(`cause:${causeId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Make io available in req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/causes', causeRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/profile", profileRoutes);

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Optionally: process.exit(1) to forcefully shut down the server
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Optionally: process.exit(1) to forcefully shut down the server
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});