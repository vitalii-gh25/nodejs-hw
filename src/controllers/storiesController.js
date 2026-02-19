// src/controllers/storiesController.js
// NEW: контролер для історій

import { Articles } from '../models/articles.js';
import { User } from '../models/user.js';
import createHttpError from 'http-errors';

// Публічний GET /api/stories + пагінація + фільтр
export const getStories = async (req, res) => {
  const { page = 1, perPage = 10, category } = req.query;
  const skip = (page - 1) * perPage;

  const query = {};
  if (category) query.category = category;

  const [total, stories] = await Promise.all([
    Articles.countDocuments(query),
    Articles.find(query)
      .skip(skip)
      .limit(Number(perPage))
      .populate('author', 'username avatar'),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    total,
    totalPages: Math.ceil(total / perPage),
    stories,
  });
};

// Приватні методи: додати до savedArticles
export const saveStory = async (req, res, next) => {
  const storyId = req.params.id;
  const user = req.user;

  if (user.savedArticles.includes(storyId)) {
    return next(createHttpError(400, 'Story already saved'));
  }

  user.savedArticles.push(storyId);
  await user.save();

  res.status(200).json({ message: 'Story saved' });
};

// Видалити зі savedArticles
export const removeSavedStory = async (req, res, next) => {
  const storyId = req.params.id;
  const user = req.user;

  user.savedArticles = user.savedArticles.filter(
    (id) => id.toString() !== storyId,
  );
  await user.save();

  res.status(200).json({ message: 'Story removed from saved' });
};

// Приватний GET збережених історій
export const getSavedStories = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const user = await User.findById(req.user._id).populate({
    path: 'savedArticles',
    populate: { path: 'author', select: 'username avatar' },
    options: { skip, limit: Number(perPage) },
  });

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    stories: user.savedArticles,
  });
};

// Приватний GET власних історій
export const getMyStories = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;

  const [total, stories] = await Promise.all([
    Articles.countDocuments({ author: req.user._id }),
    Articles.find({ author: req.user._id }).skip(skip).limit(Number(perPage)),
  ]);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    total,
    totalPages: Math.ceil(total / perPage),
    stories,
  });
};

// Приватний POST створення історії
export const createStory = async (req, res) => {
  const story = await Articles.create({ ...req.body, author: req.user._id });
  res.status(201).json(story);
};

// Приватний PATCH редагування історії
export const updateStory = async (req, res, next) => {
  const storyId = req.params.id;

  const story = await Articles.findOneAndUpdate(
    { _id: storyId, author: req.user._id },
    req.body,
    { new: true },
  );

  if (!story) return next(createHttpError(404, 'Story not found'));

  res.status(200).json(story);
};
