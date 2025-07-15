import { Logger } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/postgresql';
import * as process from 'process';
import 'dotenv/config';
import { User } from '../users/entity/user.entity';
import { Migrator } from '@mikro-orm/migrations';
import { Migrations } from './migration';

const logger: Logger = new Logger('Postgres');

export const config = defineConfig({
  logger: (message: string) => logger.debug(message),
  entities: [User],
  dbName: process.env['DB_NAME'],
  host: process.env['DB_HOST'],
  debug: true,
  port: parseInt(process.env['DB_PORT']!, 10),
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  extensions: [Migrator],
  migrations: {
    tableName: 'MIGRATIONS',
    pathTs: 'src/postgres/migration',
    glob: '!(*.d).{js,ts}',
    migrationsList: Migrations,
    emit: 'ts',
    transactional: true,
    allOrNothing: true,
    snapshot: false,
  },
});
export default config;
