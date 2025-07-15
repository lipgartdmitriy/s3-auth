import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env['ACCESS_TOKEN_SECRET'],
  accessTokenTtl: parseInt(
    process.env['ACCESS_TOKEN_VALIDITY_IN_SECONDS'] ?? '3600',
    10,
  ),
}));
