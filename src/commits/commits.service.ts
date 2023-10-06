import { Inject, Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/core';

@Injectable()
export class CommitsService {
  constructor(@Inject('Octokit') private readonly octokit: Octokit) {}
  private readonly logger = new Logger(CommitsService.name);

  async getCommits(page: number = 1, perPage: number = 10) {
    try {
      const response = await this.octokit.request(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'Tubaher',
          repo: 'git-api-show',
          page,
          per_page: perPage,
        },
      );
      if (response.data.length === 0) {
        throw new Error('No commits found on this page.');
      }

      if (response.headers.link) {
        return {
          commits: response.data,
          page: page,
          perPage: perPage,
          totalPages: +response.headers.link
            .split(',')[1]
            .split(';')[0]
            .split('=')[1]
            .split('&')[0],
        };
      }
      return {
        commits: response.data,
        page: page,
        perPage: perPage,
        totalPages: 1,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error(`Failed to fetch commits: ${error.message}`);
    }
  }
}
