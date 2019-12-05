import { Post, Res, Body, HttpStatus, Get, Param,
     NotFoundException, Controller, Delete, UseGuards, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDTO } from './question.dto';
import { AuthGuard } from '@nestjs/passport';
import { Question } from './question.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService){}

    //add a question
    @Post('/create')
    async addQuestion(@Res() res, @Body() questionDTO: CreateQuestionDTO){
        const question = await this.questionService.addQuestion(questionDTO);
        return res.status(HttpStatus.OK).json({
            message: "Question has been created successfully", question
        })
    }

    //fetch a question by Id
    @Get('/:questionId')
    async getQuestion(@Res() res, @Param('questionId') questionId){
        const question = await this.questionService.getQuestionById(questionId);
        if(!question) throw new NotFoundException('Question does not exist');
        return res.status(HttpStatus.OK).json(question);
    }

    //fetch all questions
    @Get('')
    async getAllQuestion(@Res() res){
        const questions = await this.questionService.getAllQuestion();
        return res.status(HttpStatus.OK).json(questions);
    }

    //update question
    @Put("/update/:id")
    async putQuestion(@Res() res, @Param("id") id: number, @Body() question: Question) {
        const updatedQuestion = await this.questionService.saveQuestion(id, question);
        return res.status(HttpStatus.OK).json({
            message: "question #" + id + " successfully updated", updatedQuestion
        })
    }

    //remove a question
    @Delete('/delete/:id')
    async deleteQuestion(@Res() res, @Param('id') id){
        const categories = await this.questionService.deleteQuestionById(id);
        return res.status(HttpStatus.OK).json({message:"Question deleted"});
    }
}
