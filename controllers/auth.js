const _ = require('lodash');
const Bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const { User } = require('../models/users');
const { generateToken } = require('../utilities/auth');

async function login(request, h) {
  const { username, password } = request.payload;
  const user = await User.findOne({ username });

  if (!user) {
    return Boom.badRequest('Username does not exist');
  }

  if (!await Bcrypt.compare(password, user.password)) {
    return Boom.unauthorized('Login failed');
  }

  const token = generateToken(user);

  return h.response({ token });
}

async function signup(request, h) {
  const { username, password } = request.payload;

  try {
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);
    await User.create({ username, password: hashedPassword });
  } catch(error) {
    return Boom.badRequest(error);
  }

  return h.response({
    message: 'Sign-up was successful.'
  });
}

module.exports = {
  login, signup
};
