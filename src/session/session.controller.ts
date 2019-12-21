import { Controller, Get, Post, Res, Body, HttpStatus, Param, Put, Delete } from '@nestjs/common';
import { CreateSessionDTO } from './session.dto';
import { SessionService } from './session.service';
import { Session } from './session.entity';
import { User } from '../user/user.entity';
import { CreateUserDTO } from '../user/user.dto';


@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService){}

  //create a session
  @Post('/create')
  async addSession(@Res() res, @Body() session: CreateSessionDTO){
    const newSession = await this.sessionService.
                      createSession(session);
    return res.status(HttpStatus.OK).json({
        session: newSession.sessionId
    })
  }

  @Put('/adduser/:id')
  async addUserToSession(@Res() res, @Body() user: User, @Param('id') id){
    const userRes = await this.sessionService.
                      addUserToSession(user, id);

    return res.status(HttpStatus.OK).json(userRes.userId)
  }
  @Put('/removeuser/:id')
  async removeUserToSession(@Res() res, @Body() user: User, @Param('id') id){
    const userRes = await this.sessionService.
                      removeUserToSession(user, id);

    return res.status(HttpStatus.OK).json(userRes.userId)
  }

  //get a session by id
  @Get('/:id')
  async getSessionById(@Res() res, @Param('id') id){
    const session = await this.sessionService.
                      getsessionByID(id);
    return res.status(HttpStatus.OK).json(session)
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