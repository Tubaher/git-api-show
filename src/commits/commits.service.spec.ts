import { Test, TestingModule } from '@nestjs/testing';
import { CommitsService } from './commits.service';
import { ConfigService } from '@nestjs/config';
import { mockCommitsResponse } from './commits.mock';
import { OctokitService } from '../octokit/octokit.service';
import { OctokitModule } from '../octokit/octokit.module';

jest.mock('octokit');

describe('CommitsService', () => {
  let service: CommitsService;
  let configService: ConfigService;
  let octokitService: OctokitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OctokitModule],
      providers: [CommitsService, ConfigService],
    }).compile();

    service = module.get<CommitsService>(CommitsService);
    configService = module.get<ConfigService>(ConfigService);
    octokitService = module.get<OctokitService>(OctokitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCommits', () => {
    it('should return an array of commits', async () => {
      const mockResponse = {
        data: [mockCommitsResponse],
        headers: {},
        status: 200,
        url: 'https://example.com',
        method: 'GET',
      };

      jest.spyOn(configService, 'get').mockReturnValueOnce('test-token');
      jest.spyOn(octokitService, 'request').mockResolvedValueOnce(mockResponse);

      const result = await service.getCommits();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual([mockCommitsResponse]);
      expect(octokitService.request).toHaveBeenCalledWith(
        'GET /repos/{owner}/{repo}/commits',
        {
          owner: 'Tubaher',
          repo: 'git-api-show',
        },
      );
    });
  });
});
