import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/access-token/access-token.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entity/user.entity';
import { DefaultFileValidationPipe } from './pipes/file-validation.pipe';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(DefaultFileValidationPipe)
    file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.storageService.uploadFile(file, user);
  }
}
