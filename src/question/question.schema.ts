import * as mongoose from 'mongoose';
import { ChoiceSchema } from './choice.schema';

export const QuestionSchema = new mongoose.Schema({
  question: String,
  choices: ChoiceSchema,
});