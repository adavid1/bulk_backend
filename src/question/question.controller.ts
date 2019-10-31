import { Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Controller } from '@nestjs/common';
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

    //fetch all questions
    @Get('')
    async getAllQuestion(@Res() res){
        const questions = await this.questionService.getAllQuestion();
        return res.status(HttpStatus.OK).json(questions);
    }

}
