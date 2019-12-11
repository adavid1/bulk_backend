import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { validate } from 'class-validator';
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ) {}

    //Create a user
    async addUser(dto: CreateUserDTO): Promise<User>{
        // check uniqueness of username/email
        const {username, email, guest, password, administrator, score, questions, categories} = dto;
        
        console.log(username);

        
        const user = await this.userRepository.
                    findOne({ username: username, email: email });
        if (user) {
            const errors = {username: 'Username and/or email already taken.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new user
        let newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, 10);
        if(guest==null)         newUser.guest = false;
        else                    newUser.guest = guest;
        if(administrator==null) newUser.administrator = false;
        else                    newUser.administrator = administrator;
        if(score==null)         newUser.score = 0;
        else                    newUser.score = score;
        newUser.questions = questions;
        newUser.categories = categories;

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.userRepository.save(newUser);
            return savedUser;
        }
    }

    //Get a single user by its Id
    async getUserById(userId): Promise<User>{
        const user = await this.userRepository.findByIds(userId);
        return user[0];
    }

    //Get a single user by its name
    async getUserByName(username:string): Promise<User>{
        const user = await this.userRepository
                    .findOne({username: username});
        return user;
    }

    //get all users
    async getAllUser(): Promise<User[]>{
        const users = await this.userRepository.find({relations: ["questions", "categories", "session"]});
        return users;
    }

    //update a user
    async saveUser(id, user: UpdateUserDTO): Promise<UpdateResult> {

        const {username, email, guest, password, administrator, score} = user;

        // update user
        let updatedUser = new User();
        updatedUser.username = username;
        updatedUser.email = email;
        updatedUser.guest = guest;
        updatedUser.password = bcrypt.hashSync(password, 10);
        updatedUser.administrator = administrator;
        updatedUser.score = score;

        return await this.userRepository.update(id, updatedUser);
    }

    //delete a user
    async deleteUserById(userId){
        const user = await this.userRepository
                                .findByIds(userId);
        this.userRepository.remove(user);
    }
}
