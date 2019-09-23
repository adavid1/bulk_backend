import { Controller, Get } from '@nestjs/common';

@Controller('choice')
export class ChoiceController {
  @Get()
  findAll(): string {
    return 'This action returns all choices';
  }
}
