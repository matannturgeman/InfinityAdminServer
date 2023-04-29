import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Types } from 'mongoose';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    getAdmins() {
        return this.adminService.find();
    }

    @Get('/:id')
    getAdmin(@Param("id") id: Types.ObjectId) {
        return this.adminService.findOne({ _id: id });
    }
}
