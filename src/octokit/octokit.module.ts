import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/core';

const OctokitProvider: Provider = {
  provide: 'Octokit',
  useFactory: (configService: ConfigService) => {
    const authToken = configService.get<string>('GITHUB_TOKEN');
    return new Octokit({
      auth: authToken,
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [OctokitProvider, ConfigService],
  exports: ['Octokit'],
})
export class OctokitModule {}
