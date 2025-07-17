import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingService } from './hashing/interface/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { TokenService } from './token.service';
import { TokensDto } from './dto/tokens.dto';
import { UsersRepository } from '../users/repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  async signUp({ email, password }: SignUpDto): Promise<void> {
    const hashedPassword = await this.hashingService.hash(password);
    await this.userRepository.create(email, hashedPassword);
  }

  async signIn({ email, password }: SignInDto): Promise<TokensDto> {
    const user = await this.userRepository.findByEmail(email);
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
