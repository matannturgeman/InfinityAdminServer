import { prop } from '@typegoose/typegoose';

export class Admin {
  @prop()
  name!: string;

  @prop()
  age!: number;

  @prop()
  breed!: string;
}

export const name = 'Admin';
