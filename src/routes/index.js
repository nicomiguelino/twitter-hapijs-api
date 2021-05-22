import authRoutes from '~/routes/auth';
import tweetsRoutes from '~/routes/tweets';

const routes = [
  ...authRoutes,
  ...tweetsRoutes,
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const data = {
        message: 'Hello, World 2.0!',
      };

      return h.response(data).code(200);
    },
  },
];

export default routes;
