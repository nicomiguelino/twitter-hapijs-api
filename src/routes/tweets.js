import Joi from 'joi';
import {
  getTweets, createTweet, getTweetById, deleteTweet,
} from '../controllers/tweets';
import {jwtPreHandler} from '../utilities/auth';

const options = {
  pre: [
    jwtPreHandler,
  ],
};

const routes = [
  {
    method: 'GET',
    path: '/tweets',
    handler: getTweets,
    options,
  },
  {
    method: 'POST',
    path: '/tweets',
    handler: createTweet,
    options: {
      ...options,
      validate: {
        payload: Joi.object({
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
