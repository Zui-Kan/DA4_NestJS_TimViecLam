import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from 'src/auth/users.interface';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create job successfully')
  create(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get('client')
  @Public()
  @ResponseMessage('Get list job successfully')
  findAllClient(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query('gte') gte: string,
    @Query('lte') lte: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+gte, +lte, +currentPage, +limit, qs);
  }
  @Get()
  @ResponseMessage('Get list job successfully')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query('gte') gte: string,
    @Query('lte') lte: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+gte, +lte, +currentPage, +limit, qs);
  }
  @Public()
  @Get('client/:id')
  @ResponseMessage('Get job successfully')
  findOneClient(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }
  @Get(':id')
  @ResponseMessage('Get job successfully')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }
  @Patch(':id')
  @ResponseMessage('Update job successfully')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete job successfully')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
