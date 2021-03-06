import { Controller, Post, Res, Body, HttpStatus, Get,
     Param, NotFoundException, Delete, UseGuards, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './category.entity';
import { QuestionService } from '../question/question.service';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {

    constructor(
        private categoryService: CategoryService,
        private questionService: QuestionService
    ){}

    //add a category
    @Post('/create')
    async addCategory(@Res() res, @Body() categoryDTO: CreateCategoryDTO){
        const category = await this.categoryService.addCategory(categoryDTO);
        return res.status(HttpStatus.OK).json({
            message: "Category has been created successfully", category
        })
    }

    //fetch all public categories
    @Get('/public')
    async getPublicCategories(@Res() res){
        const categories = await this.categoryService.getPublicCategories();
        return res.status(HttpStatus.OK).json(categories);
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
    async getAllCategories(@Res() res){
        const categories = await this.categoryService.getAllCategories();
        return res.status(HttpStatus.OK).json(categories);
    }

    //fetch category questions
    @Get('/:categoryId/questions')
    async getCategoryQuestions(@Res() res, @Param('categoryId') categoryId) {
        const questions = await this.questionService.getQuestionsByCategory(categoryId);
        return res.status(HttpStatus.OK).json(questions);
    }

    //update category
    @Put("/update/:id")
    async putCategory(@Res() res, @Param("id") id: number, @Body() category: Category) {
        const updatedCategory = await this.categoryService.saveCategory(id, category);
        return res.status(HttpStatus.OK).json({
            message: "category #" + id + " successfully updated", updatedCategory
        })
    }

    //remove a category
    @Delete('/delete/:id')
    async deleteCategory(@Res() res, @Param('id') id){
        const categories = await this.categoryService.deleteCategoryById(id);
        return res.status(HttpStatus.OK).json({message:"Category deleted"});
    }
}
