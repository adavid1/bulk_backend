import { Controller, Get } from '@nestjs/common';

@Controller('session')
export class SessionController {
  @Get()
  findAll(): string {
    return 'This action returns all sessions';
  }
}
