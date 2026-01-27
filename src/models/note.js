// src/models/note.js

import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js'; // імпортуємо список тегів

// Схема для нотатки
const noteSchema = new Schema(
  {
    // Назва нотатки (обов'язкова)
    title: {
      type: String,
      required: true,
      trim: true, // прибирає пробіли на початку та в кінці
    },
    // Контент нотатки (необов'язковий, за замовчуванням порожній рядок)
    content: {
      type: String,
      trim: true,
      default: '',
    },
    // Тег нотатки (обмежений набором значень, за замовчуванням Todo)
    tag: {
      type: String,
      enum: TAGS, // беремо значення з constants/tags.js
      default: 'Todo',
    },
  },
  {
    timestamps: true, // автоматичне створення полів createdAt та updatedAt
    versionKey: false, // не створюємо поле __v
  },
);

// Додаємо текстовий індекс для швидкого пошуку по title та content
noteSchema.index({ title: 'text', content: 'text' });

// Експортуємо модель Note
export const Note = model('Note', noteSchema);
