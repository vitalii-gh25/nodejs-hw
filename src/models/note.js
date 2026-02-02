// src/models/note.js

import { Schema, model, Types } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Схема для нотатки
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
    // Нове поле: власник нотатки
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Текстовий індекс для пошуку
noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('Note', noteSchema);
