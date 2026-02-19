// src/validations/storiesValidation.js

import { Joi, Segments } from 'celebrate';

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    article: Joi.string().required(),
    img: Joi.string().optional(),
    category: Joi.string().optional(),
  }),
};

export const updateStorySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().optional(),
    article: Joi.string().optional(),
    img: Joi.string().optional(),
    category: Joi.string().optional(),
  }),
};
