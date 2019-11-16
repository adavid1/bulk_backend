import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { User } from './user.entity';

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

    //fetch a user by Id
    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId){
        const user = await this.userService.getUserById(userId);
        if(!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(user);
    }

    //fetch all users
    @Get('')
    async getAllUser(@Res() res){
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }

    //update user
    @Put("/update/:id")
    async putUser(@Res() res, @Param("id") id: number, @Body() user: UpdateUserDTO) {
        const updatedUser = await this.userService.saveUser(user);
        return res.status(HttpStatus.OK).json({
            message: "user #" + id + " successfully updated", updatedUser
        })
    }

    //remove a user
    @Delete('/delete/:id')
    async deleteUser(@Res() res, @Param('id') id){
        const categories = await this.userService.deleteUserById(id);
        return res.status(HttpStatus.OK).json({message:"User #" + id + " successfully deleted"});
    }
}
