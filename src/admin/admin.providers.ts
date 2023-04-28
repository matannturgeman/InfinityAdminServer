import { Connection } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { Admin } from '../database/schemas/admin.schema';

export const adminProviders = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) => getModelForClass(Admin, { existingConnection: connection }),
    inject: ['DATABASE_CONNECTION'],
  },
];
