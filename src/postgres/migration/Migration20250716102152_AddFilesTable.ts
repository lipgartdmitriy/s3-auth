import { Migration } from '@mikro-orm/migrations';

export class Migration20250716102152_AddFilesTable extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "files" ("id" varchar(255) not null, "original_name" varchar(255) not null, "mime_type" varchar(255) not null, "size" int not null, "url" varchar(255) not null, "key" varchar(255) not null, "bucket_name" varchar(255) not null, "user_id" uuid not null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null default CURRENT_TIMESTAMP, constraint "files_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "files" add constraint "files_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "files" cascade;`);
  }
}
