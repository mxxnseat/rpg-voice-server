import {
  OnGatewayInit,
  WebSocketServer,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(6001, {
  transports: ['websocket'],
  cors: { origin: process.env.CLIENT_ORIGIN },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly _server: Server;

  public async handleConnection(socket: Socket): Promise<void> {
    socket.join('game');
    socket.emit('local_user', {
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      position: { x: 100 + Math.random() * 100, y: 100 },
    });
    socket.broadcast
      .to('game')
      .emit('new_user', {
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        position: { x: 100 + Math.random() * 100, y: 100 },
      });
  }

  public async handleDisconnect(socket): Promise<void> {
    console.log('disconnect');
  }
}
