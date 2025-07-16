import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../../users/entity/user.entity';

@Entity({ tableName: 'files' })
export class FileEntity {
  @PrimaryKey({ name: 'id', columnType: 'uuid' })
  id!: string;

  @Property({ name: 'original_name', columnType: 'varchar(255)' })
  originalName!: string;

  @Property({ name: 'mime_type', columnType: 'varchar(255)' })
  mimeType!: string;

  @Property({ name: 'size', columnType: 'decimal(10,2)' })
  size!: number;

  @Property({ name: 'url', columnType: 'varchar(255)' })
  url!: string;

  @Property({ name: 'key', columnType: 'varchar(255)' })
  key!: string;

  @Property({ name: 'bucket_name', columnType: 'varchar(255)' })
  bucketName!: string;

  @ManyToOne({
    entity: () => User,
    name: 'user_id',
    nullable: true,
    mapToPk: true,
  })
  userId!: string;

  @Property({ name: 'created_at', columnType: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({
    name: 'updated_at',
    columnType: 'timestamptz',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
