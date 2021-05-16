const { login, signup } = require('../controllers/auth');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: login
  },
  {
    method: 'POST',
    path: '/signup',
    handler: signup
  }
];
