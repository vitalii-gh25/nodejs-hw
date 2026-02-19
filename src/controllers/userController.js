// src/controllers/usersController.js
// NEW: контролер для користувачів

import { User } from '../models/user.js';
import { Articles } from '../models/articles.js';
import createHttpError from 'http-errors';

// GET /api/users + пагінація
export const getUsers = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const [total, users] = await Promise.all([
    User.countDocuments(),
    User.find().skip(skip).limit(Number(perPage)).select('-password'),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    total,
    totalPages: Math.ceil(total / perPage),
    users,
  });
};

// GET /api/users/:id + список статей
export const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return next(createHttpError(404, 'User not found'));

  const articles = await Articles.find({ author: user._id });

  res.status(200).json({ ...user.toObject(), articles });
};

// GET /api/users/me
export const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};
