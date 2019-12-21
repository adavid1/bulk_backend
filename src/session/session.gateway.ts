import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { User } from '../user/user.entity';
import { Session } from 'inspector';
import { SessionService } from './session.service';

@WebSocketGateway()
export class SessionGateway implements  OnGatewayConnection,
                                        OnGatewayDisconnect {
    constructor(private readonly sessionService: SessionService) {}
    @WebSocketServer() server;

    async handleConnection(sessionId:any){
        // Notify connected clients of current users
        //this.server.emit('playerAdd', player.username);
    }
    async handleDisconnect(sessionId:any){
        // Notify connected clients of current users
        //this.server.emit('playerRemove', player.username);
    }

    //pre-game
    @SubscribeMessage('joinSession')
    async onJoinSession(clientSocket, data){
        //add client to session
        const userId=data[0];
        const sessionId=data[1];
        clientSocket.join(sessionId);
        clientSocket.broadcast.
            to(sessionId).emit('joinSession', userId);
    }

    @SubscribeMessage('quitSession')
    async onQuitSession(clientSocket, data){
        const userId=data[0];
        const sessionId=data[1];
        clientSocket.broadcast.
            to(sessionId).emit('quitSession', userId);

        clientSocket.leave(sessionId);
    }

    @SubscribeMessage('killSession')
    async onKillSession(clientSocket, sessionId){
        clientSocket.broadcast.
            to(sessionId).emit('killSession', sessionId);

        clientSocket.leave(sessionId);
    }


    //game
    @SubscribeMessage('joinGame')
    async onJoinGame(clientSocket, sessionId){
        clientSocket.broadcast.
            to(sessionId).emit('joinGame', sessionId);
    }

    @SubscribeMessage('sendChoice')
    async onSendChoice(clientSocket, data){
        const sessionId = data.sessionId;
        const choices = data.choices;
        console.log(choices);
        //clientSocket.broadcast.
        //    to(sessionId).emit('joinGame', sessionId);
    }
}