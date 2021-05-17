const _ = require('lodash');
const Boom = require('@hapi/boom');
const { Tweet } = require('../models/tweets');

async function getTweets(request, h) {
  const tweets = await Tweet.find({});
  return h.response(tweets).code(200);
}

async function createTweet(request, h) {
  const tweet = await Tweet.create(request.payload);
  return h.response(tweet);
}

async function getTweetById(request, h) {
  const { id } = request.params;
  const tweet = await Tweet.findById(id).exec();

  if (tweet) {
    return _.pick(
      tweet, ['id', 'username', 'displayName', 'timeElapsed', 'content']);
  }

  return Boom.notFound('No tweet found');
}

async function deleteTweet(request, h) {
  const { id } = request.params;
  const tweet = await Tweet.findByIdAndRemove(id);

  if (tweet) {
    return h.response().code(204);
  }

  return Boom.notFound('Cannot delete a non-existing tweet');
}

module.exports = {
  getTweets, createTweet, getTweetById, deleteTweet
};
