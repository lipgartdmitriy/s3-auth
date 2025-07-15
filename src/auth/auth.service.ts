import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../users/entity/user.entity';
import { HashingService } from './hashing/hashing.service';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly hashingService: HashingService,
    private readonly em: EntityManager,
  ) {}

  async signUp({ email, password }: SignUpDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(password);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  async signIn({ email, password }: SignInDto): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
