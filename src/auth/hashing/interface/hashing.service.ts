import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(value: string): Promise<string>;
  abstract compare(value: string, hash: string): Promise<boolean>;
}
