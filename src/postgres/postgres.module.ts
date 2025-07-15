import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/postgresql';
import {
  DynamicModule,
  Logger,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from './mikro-orm.config';

@Module({})
export class PostgresModule implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(PostgresModule.name);

  constructor(
    private readonly mikroOrm: MikroORM,
    private readonly config: ConfigService,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: PostgresModule,
      global: true,
      imports: [MikroOrmModule.forRoot(config)],
    };
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.mikroOrm.getMigrator().up();
    this.logger.log('Migrations executed successfully.');
  }
}
