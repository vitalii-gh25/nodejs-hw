// src/validations/notesValidation.js

import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Кастомний валідатор для ObjectId
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

// Схема для GET /notes (query параметри)
export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().integer().min(5).max(20).default(10).messages({
      'number.base': 'perPage must be a number',
      'number.integer': 'perPage must be an integer',
      'number.min': 'perPage must be at least {#limit}',
      'number.max': 'perPage must be at most {#limit}',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': 'Tag must be one of the allowed values',
        'string.base': 'Tag must be a string',
      }),
    search: Joi.string().allow('').optional().messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

// Схема для параметру noteId
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// Схема для POST /notes (створення нотатки)
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must have at least {#limit} character',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': 'Tag must be one of the allowed values',
        'string.base': 'Tag must be a string',
      }),
  }),
};

// Схема для PATCH /notes/:noteId (оновлення нотатки)
export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).optional().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must have at least {#limit} character',
    }),
    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(...TAGS)
      .optional()
      .messages({
        'any.only': 'Tag must be one of the allowed values',
        'string.base': 'Tag must be a string',
      }),
  }).min(1), // важливо: не дозволяємо порожнє тіло
};
