import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { User } from '../user/user.entity';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, Question])
  ],
  providers: [CategoryService, QuestionService],
  controllers: [CategoryController]
})
export class CategoryModule {}
