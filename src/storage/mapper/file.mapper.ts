import { Injectable } from '@nestjs/common';
import { FileEntity } from '../entity/file.entity';
import { FileDto } from '../dto/file.dto';

@Injectable()
export class FileMapper {
  toDto(entity: FileEntity): FileDto {
    const dto = new FileDto();
    dto.id = entity.id;
    dto.originalName = entity.originalName;
    dto.mimeType = entity.mimeType;
    dto.size = entity.size;
    dto.url = entity.url;
    dto.key = entity.key;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  toDtoList(entities: FileEntity[]): FileDto[] {
    return entities.map((entity) => this.toDto(entity));
  }
}
