import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CreateSessionDTO } from './create-session.dto';
import { SessionService } from './session.service';
import { Session } from './session.entity';


@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService){}

  //create a session
  @Post('/create')
  async addSession(@Res() res, @Body() session: Session){
    const newSession = await this.sessionService.
                      createSession(session);
    return res.status(HttpStatus.OK).json({
        message: "Session has been created successfully", newSession
    })
  }

  @Get('')
  async findAll(@Res() res) {
    const sessions = await this.sessionService.getAllSession();
    return res.status(HttpStatus.OK).json(sessions);
  }
}