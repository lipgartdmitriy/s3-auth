import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
