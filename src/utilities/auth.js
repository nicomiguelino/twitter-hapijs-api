import Boom from '@hapi/boom';
import Jwt from '@hapi/jwt';

const verifyToken = (artifact, secret, options = {}) => {
  try {
    Jwt.token.verify(artifact, secret, options);
    return {
      isValid: true,
      username: artifact.decoded.payload.username,
    };
  } catch (error) {
    return Boom.unauthorized(error.message);
  }
};

const verifyTokenFromCookie = (request, h) => {
  const {accessToken} = request.state;

  if (!accessToken) {
    return Boom.unauthorized('Missing authentication');
  }

  const decodedAccessToken = Jwt.token.decode(accessToken);

  const response = verifyToken(decodedAccessToken, 'some_shared_secret', {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    sub: false,
    nbf: true,
    exp: true,
    maxAgeSec: 14400,
    timeSkewSec: 15,
  });

  return response;
};

export const jwtPreHandler = {
  method: verifyTokenFromCookie, assign: 'credentials',
};

export const generateToken = (user) => {
  const payload = {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    username: user.username,
    userId: user.id,
  };

  const token = Jwt.token.generate(
      payload,
      {
        key: 'some_shared_secret',
        algorithm: 'HS512',
      },
      {
        ttlSec: 14400,
      },
  );

  return token;
};
