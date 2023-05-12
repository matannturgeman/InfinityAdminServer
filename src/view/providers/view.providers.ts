import { Connection } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';
import { View } from '../../database/schemas/view.schema';
import { DATABASE_CONNECTION } from '../../database/database.providers';

export const VIEW_MODEL = "VIEW_MODEL";
export const viewProviders = [
  {
    provide: VIEW_MODEL,
    useFactory: (connection: Connection) => getModelForClass(View, { existingConnection: connection }),
    inject: [DATABASE_CONNECTION],
  },
];
