import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentationService } from './documentation/documentation.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  DocumentationService.setup({
    title: 'Github API Interaction',
    description: 'Showcase of NestJS Github API interaction',
    version: '1.0',
    tag: 'github',
    app,
    endpointPath: 'api',
  });
  const port = app.get(ConfigService).get('PORT') || 3001;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(port);
}
bootstrap();
