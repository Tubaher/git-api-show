import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CommitsService } from './commits.service';
import { CommitsQueryDTO } from './dto/commits-query.dto';

@Controller('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  async findAll(@Query() query: CommitsQueryDTO) {
    try {
      return await this.commitsService.getCommits(query.page, query.perPage);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
