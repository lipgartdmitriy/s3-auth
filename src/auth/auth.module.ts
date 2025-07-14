import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptHashingService } from './bcrypt-hashing/bcrypt-hashing.service';

@Module({
  providers: [HashingService, BcryptHashingService],
})
export class AuthModule {}
