import _ from 'lodash';
import Boom from '@hapi/boom';
import {Tweet} from '~/models/tweets';
import {User} from '~/models/users';

export const getTweets = async (request, h) => {
  const tweets = await Tweet.find({});

  const response = tweets.map(tweet =>
    _.pick(tweet, ['id', 'username', 'displayName', 'timeElapsed', 'content']))

  return h.response(response).code(200);
};

export const createTweet = async (request, h) => {
  const {username} = request.pre.credentials;
  const {timeElapsed, content} = request.payload;
  const {displayName} = await User.findOne({username});

  const tweet = await Tweet.create({
    username,
    displayName,
    timeElapsed,
    content,
  });

  return h.response(tweet);
};

export const getTweetById = async (request, h) => {
  const {id} = request.params;
  const tweet = await Tweet.findById(id).exec();

  if (tweet) {
    return _.pick(
        tweet, ['id', 'username', 'displayName', 'timeElapsed', 'content']);
  }

  return Boom.notFound('No tweet found');
};

export const deleteTweet = async (request, h) => {
  const {id} = request.params;
  const tweet = await Tweet.findByIdAndRemove(id);

  if (tweet) {
    return h.response().code(204);
  }

  return Boom.notFound('Cannot delete a non-existing tweet');
};
