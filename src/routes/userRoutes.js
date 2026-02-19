// src/routes/usersRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsers,
  getUserById,
  getCurrentUser,
} from '../controllers/usersController.js';

const router = Router();

// Публічні
router.get('/users', getUsers);
router.get('/users/:id', getUserById);

// Приватні
router.get('/users/me', authenticate, getCurrentUser);

export default router;
