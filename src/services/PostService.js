const { Op } = require('sequelize');
const { PostCategory, BlogPost, Category, User } = require('../models');

const insert = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

const update = async (id, title, content) => {
  await BlogPost.update(
    {
      title,
      content,
    },
    {
      where: { id },
    },
  );
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: Category,
      as: 'categories',
    }],
    exclude: ['PostId'],
  });
  return post;
};

const findAllSearch = async (query) => {

const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });

  return posts;
};

module.exports = { insert, update, findAllSearch };
