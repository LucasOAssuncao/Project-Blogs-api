const { PostCategory, BlogPost, Category } = require('../models');

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

module.exports = { insert, update };
