import { Injectable } from '@nestjs/common';
import { CreateTutorialVideoDto } from './dto/create-tutorial-video.dto';
import { UpdateTutorialVideoDto } from './dto/update-tutorial-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TutorialVideoService {
  constructor(private prisma: PrismaService) {}
  create(createTutorialVideoDto: CreateTutorialVideoDto) {
    return this.prisma.tutorialVideos.create({ data: createTutorialVideoDto });
  }

  findAll() {
    return this.prisma.tutorialVideos.findMany({});
  }

  findOne(id: number) {
    return this.prisma.tutorialVideos.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateTutorialVideoDto: UpdateTutorialVideoDto) {
    return this.prisma.tutorialVideos.update({
      data: updateTutorialVideoDto,
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.tutorialVideos.delete({ where: { id } });
  }
}
