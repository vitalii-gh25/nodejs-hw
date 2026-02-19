// src/models/articles.js
// NEW: модель для історій

import { Schema, model } from 'mongoose';

const articlesSchema = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    img: { type: String },
    category: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Articles = model('Articles', articlesSchema);
