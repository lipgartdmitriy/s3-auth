import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/core';
import s3Config from './config/s3.config';
import { FileEntity } from './entities/file.entity';
import { User } from '../users/entity/user.entity';
import { FileService } from './interface/file.service';

@Injectable()
export class StorageService {
  constructor(
    @Inject(s3Config.KEY)
    private readonly awsConfig: ConfigType<typeof s3Config>,
    private readonly em: EntityManager,
    private readonly fileService: FileService,
  ) {}

  async uploadFile(file: Express.Multer.File, user: User) {
    const { url, key } = await this.fileService.uploadFile(file, user.id);
    const bucketName = this.awsConfig.bucketName;
    const fileEntity = new FileEntity();
    fileEntity.id = crypto.randomUUID();
    fileEntity.originalName = file.originalname;
    fileEntity.mimeType = file.mimetype;
    fileEntity.size = file.size;
    fileEntity.key = key;
    fileEntity.bucketName = bucketName;
    fileEntity.url = url;
    fileEntity.userId = user.id;

    await this.em.persistAndFlush(fileEntity);

    return {
      url: fileEntity.url,
      key: fileEntity.key,
      originalName: fileEntity.originalName,
      id: fileEntity.id,
    };
  }

  async findAll(user: User) {
    return this.em.find(FileEntity, { userId: user.id });
  }

  async remove(id: string, user: User) {
    const file = await this.em.findOne(FileEntity, {
      id,
      userId: user.id,
    });

    if (!file) {
      throw new Error(
        'File not found or you do not have permission to delete it',
      );
    }
    await this.fileService.deleteFile(file);
    await this.em.removeAndFlush(file);

    return { success: true };
  }
}
