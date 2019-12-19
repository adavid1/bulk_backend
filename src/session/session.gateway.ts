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

    
    @SubscribeMessage('joinSession')
    async onJoinSession(clientSocket, data){
        //add client to session
        try{
            const userId=data[0];
            const sessionId=data[1];
            clientSocket.join(sessionId);
            clientSocket.broadcast.to(sessionId).emit('joinSession', userId);
            
        }catch(e){
            //return false;
            //clientSocket.broadcast.emit('joinSession', "false");
        }
    }

    @SubscribeMessage('exitSession')
    async onExitSession(clientcSocket, clientId, sessionId){
        //add client to session
        try{
            this.sessionService.removeUserToSession(clientId, sessionId);
            clientcSocket.broadcast.
                emit('joinSession', "true");
        }catch(e){
            clientcSocket.broadcast.
                emit('joinSession', "false");
        }
    }
}