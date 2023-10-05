import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/core';
import { CommitsService } from '../commits.service';
import { mockCommitsResponse } from '../commits.mock';

describe('CommitsService', () => {
  let service: CommitsService;
  let configService: ConfigService;
  let octokit: jest.Mocked<Octokit>;

  beforeEach(async () => {
    octokit = {
      request: jest.fn(),
    } as unknown as jest.Mocked<Octokit>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommitsService,
        ConfigService,
        {
          provide: 'Octokit',
          useValue: octokit,
        },
      ],
    }).compile();

    service = module.get<CommitsService>(CommitsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCommits', () => {
    it('should return an array of commits', async () => {
      const mockResponse = {
        data: mockCommitsResponse,
        headers: {},
        status: 200,
        url: 'https://example.com',
        method: 'GET',
      };
      octokit.request.mockResolvedValueOnce(mockResponse);
      jest.spyOn(configService, 'get').mockReturnValueOnce('test-token');

      const result = await service.getCommits();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual(mockCommitsResponse);
      expect(octokit.request).toHaveBeenCalledWith(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'Tubaher',
          repo: 'git-api-show',
        },
      );
    });
  });
});
