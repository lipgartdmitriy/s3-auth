import { PrimaryKey, Property, Unique } from '@mikro-orm/core';

export class User {
  @PrimaryKey({ name: 'id', columnType: 'uuid' })
  id!: string;

  @Unique()
  @Property({ name: 'email', columnType: 'varchar(255)' })
  email!: string;

  @Property({ name: 'password', columnType: 'text' })
  password!: string;
}
