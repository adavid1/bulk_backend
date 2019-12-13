import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Category } from '../category/category.entity';
import { CategoryService } from '../category/category.service';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, Question])
  ],
  providers: [UserService, CategoryService, QuestionService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
