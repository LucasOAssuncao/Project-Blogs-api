require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const email = jwt.verify(token, process.env.JWT_SECRET);
  
  return email;
};
