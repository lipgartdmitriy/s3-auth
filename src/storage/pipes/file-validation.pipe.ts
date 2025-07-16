import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileValidator,
} from '@nestjs/common';

/**
 * Factory function to create a custom file validation pipe with predefined validators
 * @param options Custom options for file validation
 * @returns ParseFilePipe instance with configured validators
 */
export function createFileValidationPipe(options?: {
  required?: boolean;
  maxSizeInMB?: number;
  additionalValidators?: FileValidator[];
}) {
  const {
    required = true,
    maxSizeInMB = 5, // Default 5MB
    additionalValidators = [],
  } = options || {};

  const validators = [
    new MaxFileSizeValidator({
      maxSize: 1024 * 1024 * maxSizeInMB,
      message: `File size should not exceed ${maxSizeInMB}MB`,
    }),
    ...additionalValidators,
  ];

  return new ParseFilePipe({
    validators,
    fileIsRequired: required,
  });
}

export const DefaultFileValidationPipe = createFileValidationPipe();
