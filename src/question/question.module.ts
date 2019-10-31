import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question])
  ],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}
