const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const { JWT_SECRET } = process.env;

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

  const payload = {
    email: req.body.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  res.status(200).json({ token });
};
