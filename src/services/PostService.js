const { PostCategory, BlogPost } = require('../models');

const insert = async (postId, categoryId) => {
  await PostCategory.create({ postId, categoryId });
};

const update = async (id, title, content) => {
  await PostCategory.update(
    {
      title,
      content,
    },
    {
      where: { id },
    },
  );
  const post = await BlogPost.findOne({ id });
  return post;
};

module.exports = { insert, update };
