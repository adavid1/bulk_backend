import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Get(':id')
  findOne(@Param() params): string {
  console.log(params.id);
    return `This action returns the user #${params.id}`;
  }
}
