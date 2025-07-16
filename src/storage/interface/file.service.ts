import { FileEntity } from '../entity/file.entity';
import { FileUploadDto } from '../dto/file-upload.dto';

export abstract class FileService {
  abstract uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<FileUploadDto>;
  abstract deleteFile(file: FileEntity): Promise<void>;
}
