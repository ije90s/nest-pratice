
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 추상화 처리
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
