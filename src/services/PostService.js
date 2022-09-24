const { PostCategory } = require('../models');

const insert = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

module.exports = { insert };
