const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const { User } = require('../models/users');

async function login(request, h) {
  const { username, password } = request.payload;
  const user = await User.findOne({ username });

  if (!user) {
    return Boom.badRequest('Username does not exist');
  }

  if (!await bcrypt.compare(password, user.password)) {
    return Boom.unauthorized('Login failed');
  }

  return h.response({
    message: 'Login successful'
  });
}

async function signup(request, h) {
  const { username, password } = request.payload;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
