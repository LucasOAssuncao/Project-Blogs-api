const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../utils/generateToken');

const validateBody = (body) =>
  Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(body);

const insert = async (req, res) => {
  const { error } = validateBody(req.body);
  const { email, password, image, displayName } = req.body;

  if (error) return res.status(400).json({ message: error.message });

  console.log(req.body.email);
  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) return res.status(409).json({ message: 'User already registered' });

  await User.create({ displayName, email, password, image });

  const token = generateToken(req.body.email);

  return res.status(201).json({ token });
};

module.exports = {
  insert,
};
