import { Module } from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsController } from './commits.controller';
import { OctokitModule } from 'src/octokit/octokit.module';

@Module({
  imports: [OctokitModule],
  providers: [CommitsService],
  controllers: [CommitsController],
})
export class CommitsModule {}
