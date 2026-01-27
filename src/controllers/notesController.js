// src/controllers/notesController.js

import { Note } from '../models/note.js';
import { TAGS } from '../constants/tags.js';
import createHttpError from 'http-errors';

// Отримати всі нотатки з пагінацією та фільтром
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  const skip = (page - 1) * perPage;

  // Створюємо базовий запит
  const notesQuery = Note.find();

  // Фільтр по тегу
  if (tag && TAGS.includes(tag)) {
    notesQuery.where('tag').equals(tag);
  }

  // Пошук по тексту через $text
  if (search && search.trim() !== '') {
    notesQuery.where({ $text: { $search: search } });
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(Number(perPage)),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

// Отримати одну нотатку за ID
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

// Створити нову нотатку
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

// Видалити нотатку за ID
export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({ _id: noteId });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};

// Оновити нотатку за ID
export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });

  if (!note) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(note);
};
