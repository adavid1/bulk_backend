import { Post, Res, Body, HttpStatus, Get, Param, NotFoundException, Controller, Delete } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceDTO } from './choice.dto';

@Controller('choice')
export class ChoiceController {

    constructor(private choiceService: ChoiceService){}

    //add a choice
    @Post('/create')
    async addChoice(@Res() res, @Body() choiceDTO: ChoiceDTO){
        const choice = await this.choiceService.addChoice(choiceDTO);
        return res.status(HttpStatus.OK).json({
            message: "Choice has been created successfully", choice
        })
    }

    //fetch all choices
    @Get('')
    async getAllChoice(@Res() res){
        const choices = await this.choiceService.getAllChoice();
        return res.status(HttpStatus.OK).json(choices);
    }

    //remove a choice
    @Delete('/delete/:id')
    async deleteChoice(@Res() res, @Param('id') id){
        const choices = await this.choiceService.deleteChoiceById(id);
        return res.status(HttpStatus.OK).json({message:"Choice deleted"});
    }

}
