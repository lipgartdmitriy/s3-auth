import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { AuthModule } from './auth/auth.module';
import config from './config/mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    UsersModule,
    StorageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
