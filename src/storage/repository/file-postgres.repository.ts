import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { FileEntity } from '../entities/file.entity';
import { FileRepository } from '../interface/file.repository';

@Injectable()
export class PostgresFileRepository implements FileRepository {
  constructor(private readonly em: EntityManager) {}

  async create(file: FileEntity): Promise<FileEntity> {
    await this.em.persistAndFlush(file);
    return file;
  }

  async findByUserId(userId: string): Promise<FileEntity[]> {
    return this.em.find(FileEntity, { userId });
  }

  async remove(file: FileEntity): Promise<void> {
    await this.em.removeAndFlush(file);
  }
  async findOneById(id: string): Promise<FileEntity> {
    return this.em.findOneOrFail(FileEntity, { id });
  }
}
