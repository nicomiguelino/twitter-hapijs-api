'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
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

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: 'some_shared_secret', // TODO: Use a stronger secret.
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400,
      timeSkewSec: 15
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload.user }
      };
    }
  });

  server.auth.default('jwt');

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
