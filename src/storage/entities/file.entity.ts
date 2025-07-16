import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from '../../users/entity/user.entity';

@Entity()
export class FileEntity {
  @PrimaryKey()
  id: string;

  @Property()
  originalName: string;

  @Property()
  mimeType: string;

  @Property()
  size: number;

  @Property()
  url: string;

  @Property()
  key: string;

  @Property()
  bucketName: string;

  @ManyToOne(() => User)
  user: User;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
