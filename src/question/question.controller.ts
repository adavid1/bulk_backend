import { Controller, Get } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  @Get()
  findAll(): string {
    return 'This action returns all questions';
  }
}
