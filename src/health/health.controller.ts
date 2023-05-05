import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { Public } from '../common/decorators/public.metadata';

@Controller('health')
export class HealthController {
    constructor(private healthService: HealthService) {}

    @Get()
    @Public()
    getProfile() {
        return this.healthService.health();
    }
}
