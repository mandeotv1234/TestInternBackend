const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: String,
  birthdate: Date
});

module.exports = mongoose.model('User', userSchema);
