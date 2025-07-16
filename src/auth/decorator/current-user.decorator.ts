import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../users/entity/user.entity';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as User;
  },
);
