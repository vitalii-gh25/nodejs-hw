// src/models/note.js

import { Schema, model } from 'mongoose';

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
      enum: [
        'Work',
        'Personal',
        'Meeting',
        'Shopping',
        'Ideas',
        'Travel',
        'Finance',
        'Health',
        'Important',
        'Todo',
      ],
      default: 'Todo',
    },
  },
  {
    timestamps: true, // автоматичне створення полів createdAt та updatedAt
    versionKey: false, // не створюємо поле __v
  },
);

// Експортуємо модель Note
export const Note = model('Note', noteSchema);
