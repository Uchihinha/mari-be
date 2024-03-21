import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) { }

  create(createWebsiteDto: CreateWebsiteDto, req: any) {
    const userId = req.user.userId
    console.log(req)
    return this.prisma.website.create({ data: {...createWebsiteDto, userId} });
  }

  findAll(req: any) {
    const { userId } = req.user
    return this.prisma.website.findMany({
      where: {
        userId
      }
    });
  }

  findOne(id: number) {
    return this.prisma.website.findUniqueOrThrow({ where: { id } })
  }

  update(id: number, updateWebsiteDto: UpdateWebsiteDto) {
    return this.prisma.website.update({ where: { id }, data: updateWebsiteDto })
  }

  remove(id: number) {
    return this.prisma.website.delete({ where: { id } })
  }
}
