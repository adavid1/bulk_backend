import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';
import { QuestionSchema } from './question.schema';

export const SessionSchema = new mongoose.Schema({
  questions: QuestionSchema,
  user: UserSchema,
});