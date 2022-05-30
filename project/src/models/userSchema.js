const {default: mongoose} = require('mongoose');
const connection = require('./connection');

const userSchema = new mongoose.Schema({
  name: 'String',
  email: 'String',
  password: 'String',
});

const User = connection.model('User', userSchema);

module.exports = User;
