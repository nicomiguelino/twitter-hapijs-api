import _ from 'lodash';
import Boom from '@hapi/boom';
import {Tweet} from '../models/tweets';
import {User} from '../models/users';

export async function getTweets(request, h) {
  const tweets = await Tweet.find({});
  return h.response(tweets).code(200);
}

export async function createTweet(request, h) {
  const {username} = request.auth.credentials;
  const {timeElapsed, content} = request.payload;
  const {displayName} = await User.findOne({username});

  const tweet = await Tweet.create({
    username,
    displayName,
    timeElapsed,
    content,
  });

  return h.response(tweet);
}

export async function getTweetById(request, h) {
  const {id} = request.params;
  const tweet = await Tweet.findById(id).exec();

  if (tweet) {
    return _.pick(
        tweet, ['id', 'username', 'displayName', 'timeElapsed', 'content']);
  }

  return Boom.notFound('No tweet found');
}

export async function deleteTweet(request, h) {
  const {id} = request.params;
  const tweet = await Tweet.findByIdAndRemove(id);

  if (tweet) {
    return h.response().code(204);
  }

  return Boom.notFound('Cannot delete a non-existing tweet');
}
