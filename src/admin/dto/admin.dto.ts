import { IsMongoId } from 'class-validator';

export class AdminParams {
  @IsMongoId()
  id: string;
}
