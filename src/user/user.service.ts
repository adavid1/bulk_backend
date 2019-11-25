import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { validate } from 'class-validator';
import { userInfo } from 'os';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository : Repository<User>) {}

    //Create a user
    async addUser(dto: CreateUserDTO): Promise<User>{
        // check uniqueness of username/email
        const {name, email, guest, password, administrator, score, questions, categories} = dto;
        
        console.log(name);

        
        const user = await this.userRepository.
                    findOne({ name: name, email: email });
        if (user) {
            const errors = {username: 'Username and/or email already taken.'};
            throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
        }

        // create new user
        let newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.guest = guest;
        newUser.password = password;
        newUser.administrator = administrator;
        newUser.score = score;
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
        const user = await this.userRepository.findByIds(userId, {relations: ["questions", "categories"]});
        return user[0];
    }

    //get all users
    async getAllUser(): Promise<User[]>{
        const users = await this.userRepository.find({relations: ["questions", "categories"]});
        return users;
    }

    //update a user
    async saveUser(id, user: UpdateUserDTO): Promise<UpdateResult> {
        return await this.userRepository.update(id, user);
    }

    //delete a user
    async deleteUserById(userId){
        const user = await this.userRepository
                                .findByIds(userId);
        this.userRepository.remove(user);
    }
}
