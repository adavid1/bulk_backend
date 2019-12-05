import { Post, Res, Body, HttpStatus, Get, Param,
     NotFoundException, Controller, Delete, UseGuards, Put } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { CreateChoiceDTO } from './choice.dto';
import { AuthGuard } from '@nestjs/passport';
import { Choice } from './choice.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('choice')
export class ChoiceController {

    constructor(private choiceService: ChoiceService){}

    //add a choice
    @Post('/create')
    async addChoice(@Res() res, @Body() choiceDTO: CreateChoiceDTO){
        const choice = await this.choiceService.addChoice(choiceDTO);
        return res.status(HttpStatus.OK).json({
            message: "Choice has been created successfully", choice
        })
    }

    //fetch a choice by Id
    @Get('/:choiceId')
    async getChoice(@Res() res, @Param('choiceId') choiceId){
        const choice = await this.choiceService.getChoiceById(choiceId);
        if(!choice) throw new NotFoundException('Choice does not exist');
        return res.status(HttpStatus.OK).json(choice);
    }

    //fetch all choices
    @Get('')
    async getAllChoice(@Res() res){
        const choices = await this.choiceService.getAllChoice();
        return res.status(HttpStatus.OK).json(choices);
    }

    //update choice
    @UseGuards(AuthGuard('jwt'))
    @Put("/update/:id")
    async putChoice(@Res() res, @Param("id") id: number, @Body() choice: Choice) {
        const updatedChoice = await this.choiceService.saveChoice(id, choice);
        return res.status(HttpStatus.OK).json({
            message: "choice #" + id + " successfully updated", updatedChoice
        })
    }

    //remove a choice
    @Delete('/delete/:id')
    async deleteChoice(@Res() res, @Param('id') id){
        const choices = await this.choiceService.deleteChoiceById(id);
        return res.status(HttpStatus.OK).json({message:"Choice deleted"});
    }

}
