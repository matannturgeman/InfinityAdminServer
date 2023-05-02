import { Connection } from 'mongoose';
import { getModelForClass } from '@typegoose/typegoose';

import { Token } from '../../database/schemas/token.schema';
import { DATABASE_CONNECTION } from '../../database/database.providers';
import { adminProviders } from '../../admin/providers/admin.providers';

export const TOKEN_MODEL = "TOKEN_MODEL";

export const authProviders = [
  ...adminProviders,  
  {
    provide: TOKEN_MODEL,
    useFactory: (connection: Connection) => getModelForClass(Token, { existingConnection: connection }),
    inject: [DATABASE_CONNECTION],
  },
];
