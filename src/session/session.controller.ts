import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CreateSessionDTO } from './create-session.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService){}

  //create a session
  @Post('/create')
  async addUser(@Res() res, @Body() createSessionDTO: CreateSessionDTO){
      const session = await this.sessionService.
                         createSession(createSessionDTO);
      return res.status(HttpStatus.OK).json({
          message: "Session has been created successfully", session
      })
  }

  @Get()
  findAll(): string {
    return 'This action returns all sessions';
  }
}