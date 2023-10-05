import { Injectable, Logger } from '@nestjs/common';
import { DocumentationConfig } from './documentation.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class DocumentationService {
  static setup({
    title,
    description,
    version,
    tag,
    app,
    endpointPath,
  }: DocumentationConfig) {
    const logger = new Logger(DocumentationService.name);
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addTag(tag)
      .build();

    try {
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup(endpointPath, app, document);
      logger.log(`Documentation is running on ${endpointPath}`);
    } catch (error) {
      logger.error(`Documentation failed to run on ${endpointPath}`);
      logger.error(error);
    }
  }
}
