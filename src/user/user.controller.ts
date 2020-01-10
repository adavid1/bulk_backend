import { Controller, Post, Res, Body, HttpStatus, Get,
    Param, NotFoundException, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO, CreateUserGuestDTO } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { CategoryService } from '../category/category.service';
import { QuestionService } from '../question/question.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private categoryService: CategoryService,
        private questionService: QuestionService
    ){}

    //add a user
    @Post('/create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO){
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully", user
        })
    }
    
    //add a user
    @Post('/createguest')
    async addUserGuest(@Res() res, @Body() createUserGuestDTO: CreateUserGuestDTO){
        const user = await this.userService.addUserGuest(createUserGuestDTO);
        return res.status(HttpStatus.OK).json(user)
    }

    //fetch a user by Id
    //@UseGuards(AuthGuard('jwt'))
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

    //fetch user questions
    @UseGuards(AuthGuard('jwt'))
    @Get('/:userId/questions')
    async getUserQuestions(@Res() res, @Param('userId') userId) {
        const questions = await this.questionService.getQuestionsByUser(userId);
        return res.status(HttpStatus.OK).json(questions);
    }

    //fetch all users
    //@UseGuards(AuthGuard('jwt'))
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

    //set user's color
    @UseGuards(AuthGuard('jwt'))
    @Put("/setcolor/:id")
    async setUserColor(@Res() res, @Body() user: User, @Param('id') id){
        const updatedUser = await this.userService.
                           setUserColor(user, id);
    
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
