const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
  userName: String,
  displayName: String,
  timeElapsed: String,
  content: String
});

const Tweet = model('Tweet', TweetSchema);

module.exports = { Tweet };

