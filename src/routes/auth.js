import {login, signup} from '../controllers/auth';

const options = {
  auth: false,
};

const routes = [
  {
    method: 'POST',
    path: '/login',
    handler: login,
    options,
  },
  {
    method: 'POST',
    path: '/signup',
    handler: signup,
    options,
  },
];

export default routes;
