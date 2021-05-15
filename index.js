'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const routes = require('./routes');

const init = async() => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    router: {
      stripTrailingSlash: true
    },
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        }
      },
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);

  await mongoose.connect('mongodb://localhost:27017/yatc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
