module.exports = [
  ...require('./auth'),
  ...require('./tweets'),
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const data = {
        message: 'Hello, World 2.0!',
      };

      return h.response(data).code(200);
    }
  },
];
