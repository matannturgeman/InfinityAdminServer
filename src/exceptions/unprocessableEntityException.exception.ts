import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  constructor(message: string, error: string) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message,
        error,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
