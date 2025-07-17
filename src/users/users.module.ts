import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersPostgresRepository } from './repository/users-postgres.repository';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: UsersRepository, useClass: UsersPostgresRepository },
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
