// src/server.js

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import storiesRoutes from './routes/storiesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api', usersRoutes);
app.use('/api', storiesRoutes);

// 404
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectMongoDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
