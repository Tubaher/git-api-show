import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CommitsModule } from '../../src/commits/commits.module';
import { CommitsService } from '../../src/commits/commits.service';
import { mockCommitsResponse } from '../../src/commits/commits.mock';

describe('CommitsController (e2e)', () => {
  let app: INestApplication;
  const commitsService = {
    getCommits: (page: number = 1, perPage: number = 10) => {
      if (page > 10) {
        throw new Error('No commits found on this page.');
      }

      return {
        commits: mockCommitsResponse,
        page: page,
        perPage: perPage,
        totalPages: 1,
      };
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommitsModule],
    })
      .overrideProvider(CommitsService)
      .useValue(commitsService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/commits (GET)', () => {
    it('should return an array of commits and metadata', async () => {
      return await request(app.getHttpServer())
        .get('/commits')
        .expect(HttpStatus.OK)
        .expect({
          commits: mockCommitsResponse,
          page: 1,
          perPage: 10,
          totalPages: 1,
        });
    });

    it('should return an array of commits and metadata following the query parameters', async () => {
      return await request(app.getHttpServer())
        .get('/commits?page=1&perPage=1')
        .expect(HttpStatus.OK)
        .expect({
          commits: mockCommitsResponse,
          page: 1,
          perPage: 1,
          totalPages: 1,
        });
    });

    it('should return an error if the query parameters are invalid', async () => {
      return await request(app.getHttpServer())
        .get('/commits?page=0&perPage=0')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            'page must not be less than 1',
            'perPage must not be less than 1',
          ],
          error: 'Bad Request',
        });
    });

    it('should return an error if the page is invalid', async () => {
      return await request(app.getHttpServer())
        .get('/commits?page=11&perPage=1')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: 'No commits found on this page.',
        });
    });
  });
});
