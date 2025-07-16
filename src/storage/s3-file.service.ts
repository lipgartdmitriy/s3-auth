import { FileService } from './interface/file.service';
import { Inject, Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { FileEntity } from './entity/file.entity';
import s3Config from './config/s3.config';
import { ConfigType } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/core';
import { FileUploadDto } from './dto/file-upload.dto';

@Injectable()
export class S3FileService implements FileService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    @Inject(s3Config.KEY)
    private readonly awsConfig: ConfigType<typeof s3Config>,
    private readonly em: EntityManager,
  ) {
    this.s3Client = new S3Client({
      region: this.awsConfig.region,
      credentials: {
        accessKeyId: this.awsConfig.accessKeyId,
        secretAccessKey: this.awsConfig.secretAccessKey,
      },
    });
    this.bucketName = this.awsConfig.bucketName;
  }
  async uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<FileUploadDto> {
    try {
      const uniqueFileName = crypto.randomUUID();
      const fileExtension = file.originalname.split('.').pop();
      const key = `${folder}/${uniqueFileName}.${fileExtension}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
      });

      await this.s3Client.send(command);
      const url = `https://${this.bucketName}.s3.${this.awsConfig.region}.amazonaws.com/${key}`;
      return { url, key };
    } catch (error) {
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }
  async deleteFile(file: FileEntity): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.awsConfig.bucketName,
      Key: file.key,
    });

    await this.s3Client.send(command);
  }
}
