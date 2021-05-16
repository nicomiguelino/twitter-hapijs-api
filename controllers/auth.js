async function login(request, h) {
  return h.response({
    message: 'Log In endpoint is under construction.'
  });
}

async function signup(request, h) {
  return h.response({
    message: 'Sign Up endpoint is under construction.'
  });
}

module.exports = {
  login, signup
};
