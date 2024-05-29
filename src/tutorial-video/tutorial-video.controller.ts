import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutorialVideoService } from './tutorial-video.service';
import { CreateTutorialVideoDto } from './dto/create-tutorial-video.dto';
import { UpdateTutorialVideoDto } from './dto/update-tutorial-video.dto';

@Controller('tutorial-video')
export class TutorialVideoController {
  constructor(private readonly tutorialVideoService: TutorialVideoService) {}

  @Post()
  create(@Body() createTutorialVideoDto: CreateTutorialVideoDto) {
    return this.tutorialVideoService.create(createTutorialVideoDto);
  }

  @Get()
  findAll() {
    return this.tutorialVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorialVideoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorialVideoDto: UpdateTutorialVideoDto) {
    return this.tutorialVideoService.update(+id, updateTutorialVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorialVideoService.remove(+id);
  }
}
