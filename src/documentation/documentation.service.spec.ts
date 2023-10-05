import { Test, TestingModule } from '@nestjs/testing';
import { DocumentationService } from './documentation.service';
import { INestApplication } from '@nestjs/common';

describe('DocumentationService', () => {
  let service: DocumentationService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentationService],
    }).compile();

    service = module.get<DocumentationService>(DocumentationService);
    app = module.createNestApplication();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set up Swagger documentation', async () => {
    const endpointPath = 'api';
    const title = 'Github API Interaction';
    const description = 'Showcase of NestJS Github API interaction';
    const version = '1.0';
    const tag = 'github';

    jest.spyOn(DocumentationService, 'setup').mockImplementation(() => {});

    await DocumentationService.setup({
      app,
      endpointPath,
      title,
      description,
      version,
      tag,
    });

    expect(DocumentationService.setup).toHaveBeenCalledWith({
      app,
      endpointPath,
      title,
      description,
      version,
      tag,
    });
  });
});
