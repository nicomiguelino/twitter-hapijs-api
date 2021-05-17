const { login, signup } = require('../controllers/auth');

const options = {
  auth: false
};

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: login,
    options
  },
  {
    method: 'POST',
    path: '/signup',
    handler: signup,
    options
  }
];
