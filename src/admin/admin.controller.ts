import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { AdminService } from './admin.service';
import { AdminParams } from './dto/admin.dto';
import { UnprocessableEntityException } from '../exceptions/unprocessableEntityException.exception';


const getAdminPipe = new ValidationPipe({
  exceptionFactory: () => new UnprocessableEntityException('Ivalid id', 'Ivalid id'),
});

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdmins() {
    return this.adminService.find();
  }

  @Get('/:id')
  @UsePipes(getAdminPipe)
  getAdmin(@Param() params: AdminParams) {
    return this.adminService.findOne({ _id: new Types.ObjectId(params.id) });
  }
}
