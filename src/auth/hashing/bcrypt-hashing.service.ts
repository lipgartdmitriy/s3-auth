import { Injectable } from '@nestjs/common';
import { HashingService } from './interface/hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashingService implements HashingService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10, 'b');
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
