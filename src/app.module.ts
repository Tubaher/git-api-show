import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentationModule } from './documentation/documentation.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DocumentationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
