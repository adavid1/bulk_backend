import { Controller, Post, Res, Body, HttpStatus, Get, Param, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    //add a category
    @Post('/create')
    async addUser(@Res() res, @Body() categoryDTO: CategoryDTO){
        const category = await this.categoryService.addCategory(categoryDTO);
        return res.status(HttpStatus.OK).json({
            message: "Category has been created successfully", category
        })
    }

    //TODO
    /*
    //fetch a user by ID
    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID){
        const user = await this.userService.getUserByID(userID);
        if(!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(user);
    }
    */

    //fetch all categories
    @Get('')
    async getAllCategory(@Res() res){
        const categories = await this.categoryService.getAllCategory();
        return res.status(HttpStatus.OK).json(categories);
    }

}
