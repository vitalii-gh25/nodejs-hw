// src/routes/storiesRoutes.js

import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getStories,
  createStory,
  updateStory,
  saveStory,
  removeSavedStory,
  getSavedStories,
  getMyStories,
} from '../controllers/storiesController.js';

const router = Router();

// Публічний GET
router.get('/stories', getStories);

// Приватні ендпоінти
router.use(authenticate);
router.post('/stories', createStory);
router.patch('/stories/:id', updateStory);
router.post('/stories/:id/save', saveStory);
router.delete('/stories/:id/save', removeSavedStory);
router.get('/stories/saved', getSavedStories);
router.get('/stories/my', getMyStories);

export default router;
