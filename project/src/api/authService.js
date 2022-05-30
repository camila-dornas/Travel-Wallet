require('dotenv').config();
const jwt = require('jsonwebtoken');
// const fs = require('fs');


const {API_SECRET} = process.env;

const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (data) => jwt.sign(data, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, API_SECRET);
    return decoded;
  } catch (error) {
    console.log('CHECKED FAILED:', error);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
