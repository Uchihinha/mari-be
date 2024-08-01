import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Request } from 'express';
import { Public } from 'src/auth/auth.guard';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto, @Req() req) {
    return this.websiteService.create(createWebsiteDto, req);
  }

  @Get('domains')
  findDomains(@Req() request: Request) {
    return this.websiteService.findDomains(request);
  }

  @Post('domain')
  createDomain(@Req() request: Request) {
    return this.websiteService.createNewDomain(request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.websiteService.findAll(request);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websiteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websiteService.update(+id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.websiteService.remove(+id);
  }
}
