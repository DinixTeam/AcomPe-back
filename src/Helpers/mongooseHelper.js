require('dotenv').config();
const mongoose = require('mongoose');
const database = require('../Database');

function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(database.db.connection, database.options);
  });
}

function closeDatabase() {
  mongoose.connection.close();
}

module.exports = {
  connectDatabase,
  closeDatabase,
};
