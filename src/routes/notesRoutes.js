import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

// GET /notes — отримати всі нотатки
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);

// GET /notes/:noteId — отримати одну нотатку за ID
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

// POST /notes — створити нову нотатку
router.post('/notes', celebrate(createNoteSchema), createNote);

// DELETE /notes/:noteId — видалити нотатку за ID
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

// PATCH /notes/:noteId — оновити нотатку за ID
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
