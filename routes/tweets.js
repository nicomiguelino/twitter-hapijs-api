const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const { Tweet } = require('../models/tweets');

module.exports = [
  {
    method: 'GET',
    path: '/tweets',
    handler: async (request, h) => {
      const tweets = await Tweet.find({});
      return h.response(tweets).code(200);
    }
  },
  {
    method: 'POST',
    path: '/tweets',
    handler: async (request, h) => {
      const tweet = await Tweet.create(request.payload);
      return h.response(tweet);
    },
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
    handler: async (request, h) => {
      const { id } = request.params;
      const tweet = await Tweet.findById(id).exec();

      if (tweet) {
        return _.pick(
          tweet, ['id', 'userName', 'displayName', 'timeElapsed', 'content']);
      }

      return Boom.notFound('No tweets found');
    }
  }
];
