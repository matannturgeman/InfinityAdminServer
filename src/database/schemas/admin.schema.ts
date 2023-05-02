import { prop } from '@typegoose/typegoose';
import { ObjectId } from '../../common/types/objectId.type';

export class Admin {
  @prop()
  _id: ObjectId;

  @prop()
  name: string;

  @prop()
  password: string;

  @prop()
  email: string;
}

export interface User {
  id: ObjectId;
  name: string;
  email: string;
}