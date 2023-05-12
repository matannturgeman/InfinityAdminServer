import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { View } from './interfaces/view.interface';
import { VIEW_MODEL } from './providers/view.providers';

@Injectable()
export class ViewService {
  constructor(
    @Inject(VIEW_MODEL)
    private viewModel: Model<View>,
  ) {}

  async create(view: View): Promise<View> {
    const createdView = new this.viewModel(view);
    return createdView.save();
  }

  async find(conditions: { [k: string]: any } = {}): Promise<View[]> {
    return this.viewModel.find(conditions).sort({ index: 1 }).lean().exec();
  }

  async findOne(conditions: { [k: string]: any } = {}): Promise<View> {
    return this.viewModel.findOne(conditions).lean().exec();
  }
}
