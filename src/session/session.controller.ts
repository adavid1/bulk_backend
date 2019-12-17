import { Controller, Get, Post, Res, Body, HttpStatus, Param, Put, Delete } from '@nestjs/common';
import { CreateSessionDTO } from './session.dto';
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
        sessionId: newSession.sessionId
    })
  }

  //delete a session
  @Delete('/delete/:id')
  async deleteSession(@Res() res,  @Param('id') id){
    const categories = await this.sessionService.deleteSessionById(id);
        return res.status(HttpStatus.OK).json({message:"Session #" + id + " successfully deleted"});
  }

  @Get('')
  async findAll(@Res() res) {
    const sessions = await this.sessionService.getAllSession();
    return res.status(HttpStatus.OK).json(sessions);
  }
}