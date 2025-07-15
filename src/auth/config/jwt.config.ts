import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env['ACCESS_TOKEN_SECRET'],
  accessTokenTtl: process.env['ACCESS_TOKEN_VALIDITY_IN_SECONDS'],
}));
