import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  health() {
    return {
      success: true,
      statusCode: HttpStatus.OK,
    };
  }
}
