import { Ref, prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Admin } from './admin.schema';

export class Token {
  @prop()
  _id: Types.ObjectId;

  @prop({ ref: () => Admin })
  adminID: Ref<Admin>;;

  @prop()
  token: string;
}
