import Joi from 'joi';
import {
  getTweets, createTweet, getTweetById, deleteTweet,
} from '../controllers/tweets';

const routes = [
  {
    method: 'GET',
    path: '/tweets',
    handler: getTweets,
  },
  {
    method: 'POST',
    path: '/tweets',
    handler: createTweet,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          displayName: Joi.string().required(),
          timeElapsed: Joi.string().required(),
          content: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/tweets/{id}',
    handler: getTweetById,
  },
  {
    method: 'DELETE',
    path: '/tweets/{id}',
    handler: deleteTweet,
  },
];

export default routes;
