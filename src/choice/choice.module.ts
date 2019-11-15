import { Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoiceController } from './choice.controller';
import { Choice } from './choice.entity';
import { Question } from '../question/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Choice, Question])
  ],
  providers: [ChoiceService],
  controllers: [ChoiceController]
})
export class ChoiceModule {}
