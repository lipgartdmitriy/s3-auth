import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('Postgres');
export const config = {
  logger: (message: string) => logger.debug(message),
  entities: ['src/**/*.entity.ts'],
  dbName: process.env['DB_NAME'],
  host: process.env['DB_HOST'],
  debug: true,
  port: parseInt(process.env['DB_PORT']!, 10),
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  persistOnCreate: false,
};
export default config;
