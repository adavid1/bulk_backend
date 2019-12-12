import { Controller, Post, Res, Body, HttpStatus, Get,
    Param, NotFoundException, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { CategoryService } from '../category/category.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private categoryService: CategoryService
    ){}

    //add a user
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO){
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully", user
        })
    }

    //fetch a user by Id
    @UseGuards(AuthGuard('jwt'))
    @Get('/:userId')
    async getUser(@Res() res, @Param('userId') userId){
        const user = await this.userService.getUserById(userId);
        if(!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(user);
    }

    //fetch user categories
    @UseGuards(AuthGuard('jwt'))
    @Get('/:userId/categories')
    async getUserCategories(@Res() res, @Param('userId') userId) {
        const categories = await this.categoryService.getCategoriesByUser(userId);
        return res.status(HttpStatus.OK).json(categories);
    }

    //fetch all users
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async getAllUser(@Res() res){
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }

    //update user
    @UseGuards(AuthGuard('jwt'))
    @Put("/update/:id")
    async putUser(@Res() res, @Param("id") id: number, @Body() user: User) {
        const updatedUser = await this.userService.saveUser(id, user);
        return res.status(HttpStatus.OK).json({
            message: "user #" + id + " successfully updated", updatedUser
        })
    }

    //remove a user
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    async deleteUser(@Res() res, @Param('id') id){
        const categories = await this.userService.deleteUserById(id);
        return res.status(HttpStatus.OK).json({message:"User #" + id + " successfully deleted"});
    }
}
