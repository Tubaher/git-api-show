import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DocumentationModule } from './documentation/documentation.module';
import { CommitsModule } from './commits/commits.module';
import { OctokitModule } from './octokit/octokit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DocumentationModule,
    CommitsModule,
    OctokitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
