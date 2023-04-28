import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    get(): string {
        return "Hello Admin";
    }
}
