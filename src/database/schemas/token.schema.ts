import { Ref, prop } from '@typegoose/typegoose';
import { Admin } from './admin.schema';
import { ObjectId } from '../../common/types/objectId.type';

export class Token {
  @prop()
  _id: ObjectId;

  @prop({ ref: () => Admin, unique: true  })
  adminID: Ref<Admin>;;

  @prop()
  token: string;
}
