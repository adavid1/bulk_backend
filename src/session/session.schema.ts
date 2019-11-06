import * as mongoose from 'mongoose';
import { User } from '../user/user.entity';
import { Question } from '../question/question.entity';
import { Category } from 'src/category/category.entity';
import { Choice } from 'src/choice/choice.entity';

export const SessionSchema = new mongoose.Schema({
  sessionId: String,
  user: User,
  categoriy : Category,
  question : Question,
  choice : Choice
});