import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Choice } from './choice.entity';
import { ChoiceDTO } from './choice.dto';
import { validate } from 'class-validator';
import { Question } from '../question/question.entity';

@Injectable()
export class ChoiceService {
    constructor(
        @InjectRepository(Choice)
        private choiceRepository : Repository<Choice>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>) {}


    //Add a choice
    async addChoice(dto: ChoiceDTO): Promise<Choice>{
        const {question, choice} = dto;

        // Create new choice
        let newChoice = new Choice();
        newChoice.question = question;
        newChoice.choice = choice;

        // Update question
        if(question){
            const questionFetched = await this.questionRepository.
                                    findOne({questionId: (Number)(question)});
            if(questionFetched.choices==null)
                questionFetched.choices = new Array();
            questionFetched.choices.push(newChoice);
        }

        // Update choice 
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

    //delete a choice
    async deleteChoiceById(choiceID){
        const choice = await this.choiceRepository
                                .findByIds(choiceID);
        this.choiceRepository.remove(choice);
    }
}
