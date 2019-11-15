import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDTO } from './question.dto';
import { validate } from 'class-validator';
import { NestApplication } from '@nestjs/core';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question)
        private questionRepository : Repository<Question>) {}


    //Create a question
    async addQuestion(dto: QuestionDTO): Promise<Question>{

        const {category, author, question} = dto;

        // create new question
        let newQuestion = new Question();
        newQuestion.category = category;
        newQuestion.question = question;
        newQuestion.author = author;
        newQuestion.choices = [];

        const errors = await validate(newQuestion);
        if (errors.length > 0) {
            const _errors = {name: 'Question input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedQuestion = await this.questionRepository.save(newQuestion);
            return savedQuestion;
        }
    }

    //Get a single question by its ID
    async getQuestionByID(questionID): Promise<Question>{
        const question = await this.questionRepository
                                .findByIds(questionID);
        return question[0];
    }

    //get all question
    async getAllQuestion(): Promise<Question[]>{
        const questions = await this.questionRepository.
                        find({relations: ["choices"]});
        return questions;
    }
}
