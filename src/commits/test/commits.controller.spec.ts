import { Test, TestingModule } from '@nestjs/testing';
import { CommitsController } from '../commits.controller';
import { CommitsService } from '../commits.service';
import { ConfigService } from '@nestjs/config';
import { OctokitModule } from '../../octokit/octokit.module';
import { mockCommitsResponse } from '../commits.mock';

describe('CommitsController', () => {
  let controller: CommitsController;
  let commitsService: CommitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OctokitModule],
      controllers: [CommitsController],
      providers: [CommitsService, ConfigService],
    }).compile();

    controller = module.get<CommitsController>(CommitsController);
    commitsService = module.get<CommitsService>(CommitsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getCommits', () => {
    it('should return an array of commits', async () => {
      jest
        .spyOn(commitsService, 'getCommits')
        .mockResolvedValueOnce(mockCommitsResponse);

      const result = await controller.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(1);
      expect(result).toEqual(mockCommitsResponse);
    });
  });
});
