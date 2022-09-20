import { Module } from '@nestjs/common';
import { GameGateway } from './gateways';

@Module({
  providers: [GameGateway],
})
export class WebsocketModule {}
