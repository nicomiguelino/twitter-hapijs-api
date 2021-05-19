import {Schema, model} from 'mongoose';

const TweetSchema = new Schema({
  username: String,
  displayName: String,
  timeElapsed: String,
  content: String,
});

export const Tweet = model('Tweet', TweetSchema);
