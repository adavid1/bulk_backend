import * as mongoose from 'mongoose';
import { QuestionSchema } from './question.schema';

export const ChoiceSchema = new mongoose.Schema({
  choice: String,
  question: QuestionSchema,
});