import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import s3Config from './config/s3.config';
import { FileEntity } from './entity/file.entity';
import { User } from '../users/entity/user.entity';
import { FileService } from './interface/file.service';
import { FileRepository } from './interface/file.repository';
import { FileMapper } from './mapper/file.mapper';
import { FileDto } from './dto/file.dto';

@Injectable()
export class StorageService {
  constructor(
    @Inject(s3Config.KEY)
    private readonly awsConfig: ConfigType<typeof s3Config>,
    private readonly fileService: FileService,
    private readonly fileRepository: FileRepository,
    private readonly fileMapper: FileMapper,
  ) {}

  async uploadFile(file: Express.Multer.File, user: User): Promise<FileDto> {
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

    await this.fileRepository.create(fileEntity);

    return this.fileMapper.toDto(fileEntity);
  }

  async findAll(user: User): Promise<FileDto[]> {
    const files = await this.fileRepository.findByUserId(user.id);
    return this.fileMapper.toDtoList(files);
  }

  async remove(id: string) {
    const file = await this.fileRepository.findOneById(id);

    if (!file) {
      throw new Error(
        'File not found or you do not have permission to delete it',
      );
    }
    await this.fileService.deleteFile(file);
    await this.fileRepository.remove(file);

    return { success: true };
  }
}
