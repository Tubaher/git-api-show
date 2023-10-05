import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/core';

@Injectable()
export class CommitsService {
  constructor(@Inject('Octokit') private readonly octokit: Octokit) {}
  private readonly logger = new Logger(CommitsService.name);

  async getCommits() {
    try {
      const { data } = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'Tubaher',
          repo: 'git-api-show',
        },
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new Error(
        'Could not retrieve commits from the specified repository',
      );
    }
  }
}
