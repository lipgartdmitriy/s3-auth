import { Migration } from '@mikro-orm/migrations';
import { Constructor } from '@mikro-orm/core';
import { Migration20250715095509_Initial } from './Migration20250715095509_Initial';

export const Migrations: Constructor<Migration>[] = [
  Migration20250715095509_Initial,
];
