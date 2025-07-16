import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ConfigModule } from '@nestjs/config';
import s3Config from './config/s3.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FileEntity } from './entities/file.entity';
import { S3FileService } from './s3-file.service';
import { FileService } from './interface/file.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forFeature(s3Config),
    MikroOrmModule.forFeature([FileEntity]),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 5000, limit: 2 }],
    }),
  ],
  controllers: [StorageController],
  providers: [
    StorageService,
    { provide: FileService, useClass: S3FileService },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
  exports: [StorageService],
})
export class StorageModule {}
