import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { AdminParams } from './dto/admin.dto';
import { UnprocessableEntityException } from '../exceptions/unprocessableEntityException.exception';
import { ObjectId } from '../common/types/objectId.type';


const getAdminPipe = new ValidationPipe({
  exceptionFactory: () => new UnprocessableEntityException('Invalid id', 'Invalid id'),
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
    return this.adminService.findOne({ _id: new ObjectId(params.id) });
  }
}
