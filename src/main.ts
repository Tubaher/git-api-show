import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));

  // DocumentationService.setup({
  //   title: 'PEC',
  //   description: 'PEC API Documentation',
  //   version: '1.0',
  //   tag: 'pec',
  //   app,
  //   endpointPath: 'api',
  // });
  const port = app.get(ConfigService).get('PORT');
  await app.listen(port);
}
bootstrap();
