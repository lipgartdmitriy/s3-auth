import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptHashingService } from './hashing/bcrypt-hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [
    { provide: HashingService, useClass: BcryptHashingService },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
