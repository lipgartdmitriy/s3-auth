import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHashingService } from './bcrypt-hashing.service';

describe('BcryptHashingService', () => {
  let service: BcryptHashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHashingService],
    }).compile();

    service = module.get<BcryptHashingService>(BcryptHashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
