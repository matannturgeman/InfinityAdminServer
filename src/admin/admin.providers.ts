import { Connection } from 'mongoose';
import { AdminSchema, name } from '../database/schemas/admin.schema';

export const adminProviders = [
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) => connection.model(name, AdminSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];