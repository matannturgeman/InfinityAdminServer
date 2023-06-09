import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Admin } from './interfaces/admin.interface';
import { ADMIN_MODEL } from './providers/admin.providers';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_MODEL)
    private adminModel: Model<Admin>,
  ) {}

  async create(admin: Admin): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return createdAdmin.save();
  }

  async find(conditions: { [k: string]: any } = {}): Promise<Admin[]> {
    return this.adminModel.find(conditions).lean().exec();
  }

  async findOne(conditions: { [k: string]: any } = {}): Promise<Admin> {
    return this.adminModel.findOne(conditions).lean().exec();
  }
}
