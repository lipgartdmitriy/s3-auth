import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
