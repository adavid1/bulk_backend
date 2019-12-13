import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, UpdateResult } from 'typeorm';
import { Choice } from './choice.entity';
import { CreateChoiceDTO, UpdateChoiceDTO } from './choice.dto';
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
    async addChoice(dto: CreateChoiceDTO): Promise<Choice>{
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

    //Get a single choice by its Id
    async getChoiceById(choiceId): Promise<Choice>{
        const choice = await this.choiceRepository
                                .findByIds(choiceId);
        return choice[0];
    }

    //get all choices
    async getAllChoice(): Promise<Choice[]>{
        const choices = await this.choiceRepository.find();
        return choices;
    }

    //update a choice
    async saveChoice(id, choice: UpdateChoiceDTO): Promise<UpdateResult> {
        return await this.choiceRepository.update(id, choice);
    }

    //delete a choice
    async deleteChoiceById(choiceId){
        const choice = await this.choiceRepository
                                .findByIds(choiceId);
        this.choiceRepository.remove(choice);
    }

    //Get question choices
    async getChoicesByQuestion(questionId: number): Promise<Choice[]> {
        return await this.choiceRepository.find({ relations: ["question"], where: { question: { questionId: questionId } } });
    }
}
