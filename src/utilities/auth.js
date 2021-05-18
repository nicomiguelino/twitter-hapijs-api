import Jwt from '@hapi/jwt';

export function generateToken(user) {
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
}
