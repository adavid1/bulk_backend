import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LoginUserDTO } from './user/user.dto';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() user: LoginUserDTO) {
    return this.authService.login(user);
  }
}