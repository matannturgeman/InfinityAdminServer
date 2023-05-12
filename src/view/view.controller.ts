import { Controller, Get, Post, Body } from '@nestjs/common';

import { ViewService } from './view.service';
import { Public } from '../common/decorators/public.metadata';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Public()
  @Get()
  getViews() {
    return this.viewService.find();
  }

  @Post()
  create(@Body() body) {
    return this.viewService.create(body);
  }
}
