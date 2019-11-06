import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private usersRepository : Repository<User>) {}

    //Create a user
    async addUser(dto: CreateUserDTO): Promise<User>{
        // check uniqueness of username/email
        const {name, email, guest, password, administrator, score} = dto;
        
        console.log(name);

        
        const user = await this.usersRepository.
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

        const errors = await validate(newUser);
        if (errors.length > 0) {
            const _errors = {username: 'User input is not valid.'};
            throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.usersRepository.save(newUser);
            return savedUser;
        }
    }

    //Get a single user by its ID
    async getUserByID(userID): Promise<User>{
        const user = await this.usersRepository.findByIds(userID);
        return user[0];
    }

    //get all users
    async getAllUser(): Promise<User[]>{
        const users = await this.usersRepository.find();
        return users;
    }
}
