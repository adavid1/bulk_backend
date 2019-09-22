import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    //add a user
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO){
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully", user
        })
    }

    //fetch a user by ID
    @Get('user/:userID')
    async getUser(@Res() res, @Param('userID') userID){
        const user = await this.userService.getUserByID(userID);
        if(!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(user);
    }
}
