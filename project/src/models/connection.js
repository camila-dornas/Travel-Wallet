const mongoose = require('mongoose');
require('dotenv').config();

const {DB_CONNECTION_STRING} = process.env;

const connection = mongoose.createConnection(DB_CONNECTION_STRING);

module.exports = connection;
