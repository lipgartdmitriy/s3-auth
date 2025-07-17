import { User } from '../entity/user.entity';

export abstract class UsersRepository {
  abstract create(email: string, hashedPassword: string): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User>;
}
