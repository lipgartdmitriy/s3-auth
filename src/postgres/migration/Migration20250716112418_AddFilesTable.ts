import { Migration } from '@mikro-orm/migrations';

export class Migration20250716112418_AddFilesTable extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "files" ("id" uuid not null, "original_name" varchar(255) not null, "mime_type" varchar(255) not null, "size" decimal(10,2) not null, "url" varchar(255) not null, "key" varchar(255) not null, "bucket_name" varchar(255) not null, "user_id" uuid null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "files_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "files" add constraint "files_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "files" cascade;`);
  }
}
