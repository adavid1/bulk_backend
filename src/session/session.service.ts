import { Injectable } from '@nestjs/common';
import { Session } from './session.entity';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository : Repository<Session>,
        private readonly userService : UserService
        ) {}

    //Create a session
    async createSession(createSession: Session): Promise<Session>{
        createSession.dateCreation = new Date();
        return this.sessionRepository.save(createSession);
    }

    //Get a single session by its ID
    async getsessionByID(sessionID): Promise<Session>{
        const session = await this.sessionRepository.
                        findByIds(sessionID,
                                {relations: ["players" ,
                                             "categories"]})[0];
        return session;
    }

    //get all sessions
    async getAllSession(): Promise<Session[]>{
        const sessions = await this.sessionRepository.
                        find({relations: ["players", "categories"]});
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
}