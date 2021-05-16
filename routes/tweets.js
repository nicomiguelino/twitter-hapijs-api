const Joi = require('joi');
const {
  getTweets, createTweet, getTweetById, deleteTweet
} = require('../controllers/tweets');

module.exports = [
  {
    method: 'GET',
    path: '/tweets',
    handler: getTweets
  },
  {
    method: 'POST',
    path: '/tweets',
    handler: createTweet,
    options: {
      validate: {
        payload: Joi.object({
          userName: Joi.string().required(),
          displayName: Joi.string().required(),
          timeElapsed: Joi.string().required(),
          content: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/tweets/{id}',
    handler: getTweetById
  },
  {
    method: 'DELETE',
    path: '/tweets/{id}',
    handler: deleteTweet
  }
];
