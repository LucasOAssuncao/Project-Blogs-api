// const { Op } = require('sequelize');
const Joi = require('joi');
const { BlogPost, Category, User } = require('../models');
const PostService = require('../services/PostService');
const user = require('./user');

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required().messages({
      'string.empty': 'Some required fields are missing',
    }),
    content: Joi.string().required().messages({
      'string.empty': 'Some required fields are missing',
    }),
    categoryIds: Joi.required().messages({
      empty: 'Some required fields are missing',
    }),
  }).validate(body);

const insert = async (req, res) => {
  const { error } = validateBody(req.body);
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;

  if (error) return res.status(400).json({ message: error.message });

  const arr = await Category.findAll({
    where: { id: categoryIds },
  });

  if (arr.length === 0) { return res.status(400).json({ message: '"categoryIds" not found' }); }

  const { dataValues: { id: userId } } = await user.getUserId(authorization);
  const inserted = await BlogPost
  .create({ title, content, userId, updated: new Date(), published: new Date(),
  });

  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostService.insert(inserted.id, categoryId);
  }));

  return res.status(201).json(inserted);
};

const getAll = async (_req, res) => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });
  return res.status(200).json(posts);
};

module.exports = {
  insert,
  getAll,
};
