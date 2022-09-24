const { Category } = require('../models');

const insert = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });

    const inserted = await Category.create({ name });

    return res.status(201).json(inserted);
  };

module.exports = {
    insert,
};