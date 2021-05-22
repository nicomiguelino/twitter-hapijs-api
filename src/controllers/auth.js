import Bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import {User} from '~/models/users';
import {generateToken} from '~/utilities/auth';

export const login = async (request, h) => {
  const {username, password} = request.payload;
  const user = await User.findOne({username});

  if (!user) {
    return Boom.badRequest('Username does not exist');
  }

  if (!await Bcrypt.compare(password, user.password)) {
    return Boom.unauthorized('Login failed');
  }

  const token = generateToken(user);

  h.state('accessToken', token);
  return h.response({token});
};

export const logout = async (request, h) => {
  try {
    h.unstate('accessToken');
    return h.response().code(200);
  } catch (error) {
    return Boom.badRequest('Logout failed');
  }
};

export const signup = async (request, h) => {
  const {username, password, displayName} = request.payload;

  try {
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    await User.create({
      username,
      password: hashedPassword,
      displayName,
    });
  } catch (error) {
    return Boom.badRequest(error);
  }

  return h.response({
    message: 'Sign-up was successful.',
  });
};

export const isLoggedIn = async (request, h) => {
  const {username} = request.pre.credentials;
  const response = {username};

  return h.response(response).code(200);
};
