import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDTO, UpdateQuestionDTO } from './question.dto';
import { validate } from 'class-validator';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository : Repository<Question>,
        @InjectRepository(Category)
        private categoryRepository : Repository<Category>,
        @InjectRepository(User)
        private userRepository : Repository<User>
        ) {}


    //Create a question
    async addQuestion(dto: CreateQuestionDTO): Promise<Question>{

        const {category, author, question, hasChoices} = dto;

        // create new question
        let newQuestion = new Question();
        newQuestion.category = category;
        newQuestion.question = question;
        newQuestion.author = author;
        newQuestion.hasChoices = hasChoices;
        newQuestion.choices = [];

        // Update category
        if(category){
            const categoryFetched = await this.categoryRepository.
                                    findOne({categoryId: (Number)(category)});
            if(categoryFetched.questions==null)
                categoryFetched.questions = new Array();
            categoryFetched.questions.push(newQuestion);
        }

        // Update user
        if(author){
            const userFetched = await this.userRepository.
                                    findOne(author);
            if(userFetched.questions==null)
                userFetched.questions = new Array();
            userFetched.questions.push(newQuestion);
        }

        // update question
        const errors = await validate(newQuestion);
        if (errors.length > 0) {
            const _errors = {name: 'Question input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedQuestion = await this.questionRepository.save(newQuestion);
            return savedQuestion;
        }
    }

    //Get a single question by its Id
    async getQuestionById(questionId): Promise<Question>{
        const question = await this.questionRepository
                                .findByIds(questionId, {relations: ["choices"]});
        return question[0];
    }

    //get all question
    async getAllQuestion(): Promise<Question[]>{
        const questions = await this.questionRepository.
                        find({relations: ["choices"]});
        return questions;
    }

    //update a question
    async saveQuestion(id, question: UpdateQuestionDTO): Promise<UpdateResult> {
        return await this.questionRepository.update(id, question);
    }

    //delete a question
    async deleteQuestionById(questionId){
        const question = await this.questionRepository
                                .findByIds(questionId);
        this.questionRepository.remove(question);
    }

    //Get user questions
    async getQuestionsByUser(userId: number): Promise<Question[]> {
        return await this.questionRepository.find({ relations: ["category", "author"], where: { author: { userId: userId } } });
    }
}