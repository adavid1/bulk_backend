import { Controller, Post, Res, Body, HttpStatus, Get,
     Param, NotFoundException, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    //add a category
    @Post('/create')
    async addCategory(@Res() res, @Body() categoryDTO: CategoryDTO){
        const category = await this.categoryService.addCategory(categoryDTO);
        return res.status(HttpStatus.OK).json({
            message: "Category has been created successfully", category
        })
    }

    //fetch a category by Id
    @Get('/:categoryId')
    async getCategory(@Res() res, @Param('categoryId') categoryId){
        const category = await this.categoryService.getCategoryById(categoryId);
        if(!category) throw new NotFoundException('Category does not exist');
        return res.status(HttpStatus.OK).json(category);
    }

    //fetch all categories
    @Get('')
    async getAllCategory(@Res() res){
        const categories = await this.categoryService.getAllCategory();
        return res.status(HttpStatus.OK).json(categories);
    }

    //remove a category
    @Delete('/delete/:id')
    async deleteCategory(@Res() res, @Param('id') id){
        const categories = await this.categoryService.deleteCategoryById(id);
        return res.status(HttpStatus.OK).json({message:"Category deleted"});
    }
}
