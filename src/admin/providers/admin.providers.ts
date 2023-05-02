import { Connection } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { Admin } from '../../database/schemas/admin.schema';
import { DATABASE_CONNECTION } from '../../database/database.providers';

export const ADMIN_MODEL = "ADMIN_MODEL";
export const adminProviders = [
  {
    provide: ADMIN_MODEL,
    useFactory: (connection: Connection) => getModelForClass(Admin, { existingConnection: connection }),
    inject: [DATABASE_CONNECTION],
  },
];
