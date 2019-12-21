import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Session } from './session.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { create } from 'domain';
import { Category } from 'src/category/category.entity';
import { CreateSessionDTO } from './session.dto';
import { User } from '../user/user.entity';
import { throwError } from 'rxjs';
import { sequenceExpression } from '@babel/types';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository : Repository<Session>,
        @Inject(UserService)
        private readonly userService : UserService
        ) {}

    //Create a session
    async createSession(createSession: CreateSessionDTO): Promise<Session>{
        let session = new Session(); 
        session.dateCreation = new Date();
        await this.userService.getUserById(createSession.owner).
        then(user=>{
            //if the user has already a session : stop here
            if(user.sessionHost!=null){
                throw new HttpException('Already has session', HttpStatus.FORBIDDEN);
            }
            user.sessionHost = session;
            session.owner = user;
            
            session.category = createSession.category;
            session.players = [];

            this.userService.saveUser(user.userId, user);
        }).catch(error => {throw new
                            HttpException(error,
                             HttpStatus.FORBIDDEN)});
        return await this.sessionRepository.save(session);
    }

    //Get a single session by its ID
    async getsessionByID(sessionID): Promise<Session>{
        const session = await this.sessionRepository.
                        findOne(sessionID,
                                {relations: ["owner",
                                            "players" ,
                                            "category"]});
        return session;
    }

    //get all sessions
    async getAllSession(): Promise<Session[]>{
        const sessions = await this.sessionRepository.
                        find({relations: ["owner",
                                        "players",
                                        "category"]});
        return sessions;
    }

    //Add a user to a session
    async addUserToSession(userId, sessionId): Promise<User>{
        const session = await this.sessionRepository
                                .findOne(sessionId,
                                    {relations: ["players"]});
        let user;
        await this.userService.getUserById(userId).
        then(result=>{
            //if the user has already a session : stop here
            if(result.session!=null)
                throw new HttpException('Already has session', HttpStatus.FORBIDDEN);
            user=result;
            session.players.push(result);
            user.session = session;
            this.userService.saveUser(result.userId, result);
        }).catch(error => {throw new
            HttpException(error,
             HttpStatus.FORBIDDEN)});;

        await this.sessionRepository.save(session);
        return user;
    }

    //Remove a user to a session
    async removeUserToSession(userId, sessionId): Promise<User>{
        const session = await this.sessionRepository
                                .findOne(sessionId,
                                    {relations: ["players"]});
        let user;
        await this.userService.getUserById(userId).
        then(async result=>{
            user=result.userId;
            session.players = session.players.
                            filter(x => x.userId !== result.userId);
            result.session = session;
            this.userService.saveUser(result.userId, result);
            if(result.guest){
                await this.userService.deleteUserById(result.userId)
            }
        });
        
        await this.sessionRepository.save(session);
        return user;
    }

    //delete session by id
    async deleteSessionById(sessionId){
        const session = await this.sessionRepository
                                .findOne(sessionId,
                                    {relations: ["players","owner"]});

        //delete users that are guests
        session.players.forEach(async player => {
            if(player.guest){
                await this.userService.deleteUserById(player.userId)
            }
        });

        //update current sessions of each user to null
        session.owner.sessionHost=null;
        await this.userService.saveUser(session.owner.userId,
                                        session.owner);
        session.players = [];
        session.owner = null;
        await this.sessionRepository.save(session);                     
        await this.sessionRepository.remove(session);
    }
}