import { Injectable } from '@nestjs/common';
import { CreateTemplateCategoryDto } from './dto/create-template-category.dto';
import { UpdateTemplateCategoryDto } from './dto/update-template-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TemplateCategoryService {
  constructor(private prisma: PrismaService) { }

  create(createTemplateCategoryDto: CreateTemplateCategoryDto) {
    return this.prisma.templateCategory.create({ data: createTemplateCategoryDto });
  }

  findAll() {
    return this.prisma.templateCategory.findMany();
  }

  findOne(id: number) {
    return this.prisma.templateCategory.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateTemplateCategoryDto: UpdateTemplateCategoryDto) {
    return this.prisma.templateCategory.update({ where: { id }, data: updateTemplateCategoryDto })
  }

  remove(id: number) {
    return this.prisma.templateCategory.delete({ where: { id } });
  }

  getByCategories() {
    return this.prisma.templateCategory.findMany({
      include: {
        templates: true,
      },
    })
  }
}
