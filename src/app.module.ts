import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebsocketModule } from '@app/websocket/websocket.module';

@Module({
  imports: [ConfigModule.forRoot(), WebsocketModule],
})
export class AppModule {}
