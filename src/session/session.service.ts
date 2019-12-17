import { Injectable, Inject } from '@nestjs/common';
import { Session } from './session.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { create } from 'domain';
import { Category } from 'src/category/category.entity';
import { CreateSessionDTO } from './session.dto';

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
        session.players = [];
        await this.userService.getUserById(createSession.owner).
        then(user=>{
            session.players.push(user);
            user.session = session;
            this.userService.saveUser(user.userId, user);
        });
        session.owner = createSession.owner;
        session.category = createSession.category;
        return await this.sessionRepository.save(session);
    }

    //Get a single session by its ID
    async getsessionByID(sessionID): Promise<Session>{
        const session = await this.sessionRepository.
                        findByIds(sessionID,
                                {relations: ["owner",
                                            "players" ,
                                            "category"]})[0];
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
    async addUserToSession(userId, sessionId): Promise<Session>{
        const session = await this.getsessionByID(sessionId);
        const user = await this.userService.getUserById(userId);

        session.players.push(user);

        return await this.sessionRepository.save(session);
    }

    //Remove a user to a session
    async removeUserToSession(userId, sessionId): Promise<Session>{
        const session = await this.getsessionByID(sessionId);
        const user = await this.userService.getUserById(userId);

        session.players = session.players.
                            filter(x => x.userId !== user.userId);

        return await this.sessionRepository.save(session);
    }

    //delete session by id
    async deleteSessionById(sessionId){
        const session = await this.sessionRepository
                                .findOne(sessionId,
                                    {relations: ["players"]});
        //update current sessions of each user to null
        session.players = [];
        this.sessionRepository.save(session);                     
        this.sessionRepository.remove(session);
    }
}