import {login, logout, signup, isLoggedIn} from '~/controllers/auth';
import {jwtPreHandler} from '~/utilities/auth';

const options = {
  pre: [
    jwtPreHandler,
  ],
};

const routes = [
  {
    method: 'POST',
    path: '/login',
    handler: login,
  },
  {
    method: 'POST',
    path: '/logout',
    handler: logout,
    options,
  },
  {
    method: 'POST',
    path: '/signup',
    handler: signup,
  },
  {
    method: 'GET',
    path: '/isLoggedIn',
    handler: isLoggedIn,
    options,
  },
];

export default routes;
