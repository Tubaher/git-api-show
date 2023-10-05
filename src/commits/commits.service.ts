import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';

@Injectable()
export class CommitsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly logger = new Logger(CommitsService.name);
  async getCommits() {
    try {
      const octokit = new Octokit({
        auth: this.configService.get<string>('GITHUB_TOKEN'),
      });

      const { data } = await octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'Tubaher',
          repo: 'git-api-show',
        },
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error while fetching commits');
    }
  }
}
