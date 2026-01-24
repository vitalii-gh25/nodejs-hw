// src/routes/notesRoutes.js

import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

// GET /notes — отримати всі нотатки
router.get('/notes', getAllNotes);

// GET /notes/:noteId — отримати одну нотатку за ID
router.get('/notes/:noteId', getNoteById);

// POST /notes — створити нову нотатку
router.post('/notes', createNote);

// DELETE /notes/:noteId — видалити нотатку за ID
router.delete('/notes/:noteId', deleteNote);

// PATCH /notes/:noteId — оновити нотатку за ID
router.patch('/notes/:noteId', updateNote);

export default router;
