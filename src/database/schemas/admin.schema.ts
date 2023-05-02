import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Admin {
  @prop()
  _id: Types.ObjectId;

  @prop()
  name: string;

  @prop()
  password: string;

  @prop()
  email: string;
}

export interface User {
  id: Types.ObjectId;
  name: string;
  email: string;
}