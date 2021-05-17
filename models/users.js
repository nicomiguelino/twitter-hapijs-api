const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String
});

const User = model('User', UserSchema);

module.exports = { User };
