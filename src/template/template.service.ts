import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  create(createTemplateDto: CreateTemplateDto) {
    return this.prisma.template.create({ data: createTemplateDto });
  }

  findAll(params = {}) {
    return this.prisma.template.findMany(params);
  }

  getFive() {
    return this.prisma.template.findMany({ take: 5 });
  }

  findOne(id: number) {
    return this.prisma.template.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.prisma.template.update({
      where: { id },
      data: updateTemplateDto,
    });
  }

  remove(id: number) {
    return this.prisma.template.delete({ where: { id } });
  }
}
