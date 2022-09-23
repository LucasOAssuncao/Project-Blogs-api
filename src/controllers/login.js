const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');
require('dotenv').config();

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(body);

module.exports = async (req, res) => {
  const { error } = validateBody(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const token = generateToken(req.body.email);

  res.status(200).json({ token });
};
