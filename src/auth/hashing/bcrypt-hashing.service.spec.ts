import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHashingService } from './bcrypt-hashing.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('BcryptHashingService', () => {
  let service: BcryptHashingService;
  const mockSalt = '$2b$10$ABCDEFGHIJKLMNOPQRSTUV';
  const mockHash = '$2b$10$ABCDEFGHIJKLMNOPQRSTUV.WXYZ0123456789abcdefghijk';
  const plainTextPassword = 'password123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptHashingService],
    }).compile();

    service = module.get<BcryptHashingService>(BcryptHashingService);

    jest.clearAllMocks();
  });

  describe('hash', () => {
    it('should generate a salt and hash the password', async () => {
      (bcrypt.genSalt as jest.Mock).mockResolvedValue(mockSalt);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

      const result = await service.hash(plainTextPassword);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, 'b');
      expect(bcrypt.hash).toHaveBeenCalledWith(plainTextPassword, mockSalt);
      expect(result).toBe(mockHash);
    });

    it('should throw an error if bcrypt.genSalt fails', async () => {
      const expectedError = new Error('Failed to generate salt');
      (bcrypt.genSalt as jest.Mock).mockRejectedValue(expectedError);

      await expect(service.hash(plainTextPassword)).rejects.toThrow(
        expectedError,
      );
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, 'b');
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it('should throw an error if bcrypt.hash fails', async () => {
      const expectedError = new Error('Failed to hash password');
      (bcrypt.genSalt as jest.Mock).mockResolvedValue(mockSalt);
      (bcrypt.hash as jest.Mock).mockRejectedValue(expectedError);

      await expect(service.hash(plainTextPassword)).rejects.toThrow(
        expectedError,
      );
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10, 'b');
      expect(bcrypt.hash).toHaveBeenCalledWith(plainTextPassword, mockSalt);
    });
  });

  describe('compare', () => {
    it('should return true when password matches hash', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.compare(plainTextPassword, mockHash);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainTextPassword, mockHash);
      expect(result).toBe(true);
    });

    it('should return false when password does not match hash', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.compare(plainTextPassword, mockHash);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainTextPassword, mockHash);
      expect(result).toBe(false);
    });

    it('should throw an error if bcrypt.compare fails', async () => {
      const expectedError = new Error('Failed to compare password');
      (bcrypt.compare as jest.Mock).mockRejectedValue(expectedError);

      await expect(
        service.compare(plainTextPassword, mockHash),
      ).rejects.toThrow(expectedError);
      expect(bcrypt.compare).toHaveBeenCalledWith(plainTextPassword, mockHash);
    });
  });
});
