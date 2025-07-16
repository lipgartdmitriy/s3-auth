import { Migration } from '@mikro-orm/migrations';
import { Constructor } from '@mikro-orm/core';
import { Migration20250715095509_Initial } from './Migration20250715095509_Initial';
import { Migration20250716112418_AddFilesTable } from './Migration20250716112418_AddFilesTable';

export const Migrations: Constructor<Migration>[] = [
  Migration20250715095509_Initial,
  Migration20250716112418_AddFilesTable,
];
