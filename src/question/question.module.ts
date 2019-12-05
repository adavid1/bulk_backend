import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Category, User])
  ],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
