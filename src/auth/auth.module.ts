import { Module } from '@nestjs/common';
import { HashingService } from './hashing/interface/hashing.service';
import { BcryptHashingService } from './hashing/bcrypt-hashing.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    JwtModule.register({}),
    UsersModule,
  ],
  providers: [
    { provide: HashingService, useClass: BcryptHashingService },
    AuthService,
    TokenService,
    AccessTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
