import { INestApplication } from '@nestjs/common';

export interface DocumentationConfig {
  title: string;
  description: string;
  version: string;
  tag: string;
  app: INestApplication;
  endpointPath: string;
}
