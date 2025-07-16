import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../users/entity/user.entity';
import { HashingService } from './hashing/interface/hashing.service';
import {
  EntityManager,
  EntityRepository,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { TokenService } from './token.service';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly hashingService: HashingService,
    private readonly em: EntityManager,
    private readonly tokenService: TokenService,
  ) {}

  async signUp({ email, password }: SignUpDto): Promise<void> {
    const hashedPassword = await this.hashingService.hash(password);
    const user = this.userRepository.create({
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

  async signIn({ email, password }: SignInDto): Promise<TokensDto> {
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
    const accessToken = this.tokenService.issueFor(user);
    return { accessToken };
  }
}
