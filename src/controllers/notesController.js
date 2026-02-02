// src/controllers/notesController.js

import { Note } from '../models/note.js';
import { TAGS } from '../constants/tags.js';
import createHttpError from 'http-errors';

// Отримати всі нотатки користувача з пагінацією та фільтром
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  // Базовий запит лише для поточного користувача
  const notesQuery = Note.find({ userId: req.user._id });

  if (tag && TAGS.includes(tag)) {
    notesQuery.where('tag').equals(tag);
  }

  if (search && search.trim() !== '') {
    notesQuery.where({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(Number(perPage)),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPage),
    notes,
  });
};

// Отримати одну нотатку користувача за ID
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOne({ _id: noteId, userId: req.user._id });
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// Створити нову нотатку для поточного користувача
export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id, // додаємо власника нотатки
  });

  res.status(201).json(note);
};

// Видалити нотатку користувача за ID
export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });
  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};

// Оновити нотатку користувача за ID
export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    { _id: noteId, userId: req.user._id },
    req.body,
    { new: true },
  );

  if (!note) {
    return next(createHttpError(404, 'Note not found'));
  }

  res.status(200).json(note);
};
