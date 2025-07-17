import { ConflictException, Injectable } from '@nestjs/common';
import {
  EntityManager,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { UsersRepository } from './users.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersPostgresRepository implements UsersRepository {
  constructor(private readonly em: EntityManager) {}

  async create(email: string, hashedPassword: string): Promise<void> {
    const user = this.em.create(User, {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
    });
    try {
      await this.em.persistAndFlush(user);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.em.findAll(User);
  }

  findById(id: string): Promise<User> {
    return this.em.findOneOrFail(User, { id });
  }

  findByEmail(email: string): Promise<User> {
    return this.em.findOneOrFail(User, { email });
  }
}
