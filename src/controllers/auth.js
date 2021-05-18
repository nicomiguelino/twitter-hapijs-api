import Bcrypt from 'bcrypt';
import Boom from '@hapi/boom';

import {User} from '../models/users';
import {generateToken} from '../utilities/auth';

export async function login(request, h) {
  const {username, password} = request.payload;
  const user = await User.findOne({username});

  if (!user) {
    return Boom.badRequest('Username does not exist');
  }

  if (!await Bcrypt.compare(password, user.password)) {
    return Boom.unauthorized('Login failed');
  }

  const token = generateToken(user);

  return h.response({token});
}

export async function signup(request, h) {
  const {username, password} = request.payload;

  try {
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    await User.create({username, password: hashedPassword});
  } catch (error) {
    return Boom.badRequest(error);
  }

  return h.response({
    message: 'Sign-up was successful.',
  });
}
