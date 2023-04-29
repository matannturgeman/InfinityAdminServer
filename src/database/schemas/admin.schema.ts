import { prop } from '@typegoose/typegoose';

export class Admin {
  @prop()
  name: string;

  @prop()
  password: string;

  @prop()
  email: string;
}