'use strict';

import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import mongoose from 'mongoose';
import routes from './routes';

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        },
      },
      cors: {
        origin: ['*'],
        credentials: true,
      },
    },
  });

  await server.register(Jwt);

  server.state('accessToken', {
    ttl: null,
    isSecure: false,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: true,
  });

  server.route(routes);

  await mongoose.connect('mongodb://localhost:27017/yatc', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  await server.start();

  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
