import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Choice } from './choice.entity';
import { ChoiceDTO } from './choice.dto';
import { validate } from 'class-validator';

@Injectable()
export class ChoiceService {
    constructor(@InjectRepository(Choice)
        private choiceRepository : Repository<Choice>) {}


    //Add a choice
    async addChoice(dto: ChoiceDTO): Promise<Choice>{

        const {choiceId, questionId, choice} = dto;

        // create new choice
        let newChoice = new Choice();
        newChoice.questionId = questionId;
        newChoice.choice = choice;

        const errors = await validate(newChoice);
        if (errors.length > 0) {
            const _errors = {name: 'Choice input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedChoice = await this.choiceRepository.save(newChoice);
            return savedChoice;
        }
    }

    //Get a single choice by its ID
    async getChoiceByID(choiceID): Promise<Choice>{
        const choice = await this.choiceRepository
                                .findByIds(choiceID);
        return choice[0];
    }

    //get all choices
    async getAllChoice(): Promise<Choice[]>{
        const choices = await this.choiceRepository.find();
        return choices;
    }
}
