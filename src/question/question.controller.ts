import { Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Controller, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDTO } from './question.dto';

@Controller('question')
export class QuestionController {

    constructor(private questionService: QuestionService){}

    //add a question
    @Post('/create')
    async addQuestion(@Res() res, @Body() questionDTO: QuestionDTO){
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

    //remove a question
    @Delete('/delete/:id')
    async deleteQuestion(@Res() res, @Param('id') id){
        const categories = await this.questionService.deleteQuestionById(id);
        return res.status(HttpStatus.OK).json({message:"Question deleted"});
    }
}
