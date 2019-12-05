import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Category])
  ],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
