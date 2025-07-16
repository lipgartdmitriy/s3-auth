import { FileEntity } from '../entities/file.entity';

export abstract class FileRepository {
  abstract create(file: FileEntity): Promise<FileEntity>;
  abstract findByUserId(userId: string): Promise<FileEntity[]>;
  abstract remove(file: FileEntity): Promise<void>;
  abstract findOneById(id: string): Promise<FileEntity>;
}
