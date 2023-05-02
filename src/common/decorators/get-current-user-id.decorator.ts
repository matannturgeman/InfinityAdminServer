import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../database/schemas/admin.schema';
import { UserErrorException } from '../../exceptions/user-error.exception';

export const GetCurrentUser = createParamDecorator(
  (_: undefined, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user) throw new UserErrorException('No current user found');

    return user;
  },
);
