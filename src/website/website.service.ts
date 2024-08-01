import { Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class WebsiteService {
  constructor(private prisma: PrismaService) {}

  create(createWebsiteDto: CreateWebsiteDto, req: any) {
    const userId = req.user.userId;

    return this.prisma.website.create({
      data: { ...createWebsiteDto, userId },
    });
  }

  findAll(req: any) {
    const { userId } = req.user;
    return this.prisma.website.findMany({
      where: {
        userId,
      },
    });
  }

  async getDomainConfiguration(req: any) {
    // https://api.vercel.com/v6/domains/lp.omegaconta.com.br/config
    const request = await fetch(
      'https://api.vercel.com/v6/domains/lp.omegaconta.com.br/config',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer FaNzTLxaR9TBQ5j63AQkOP3i',
        },
      },
    );
  }

  async createNewDomain(req: any) {
    const { url, websiteId } = req.body;
    console.log('createNewDomain ->', url);
    return await fetch('https://api.vercel.com/v10/projects/mari-ia/domains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 7dWEzngCMergoNdcUL3t12uY',
      },
      body: JSON.stringify({
        name: url,
      }),
    }).then(async (r: any) => {
      const nr = await r.json();
      console.log('nr', nr);
      if (nr.error) {
        console.log('fall into eerror');
        return {
          ok: false,
          ...nr,
        };
      }

      return nr;
    });
  }

  async findDomains(req: any) {
    const { userId } = req.user;
    const websites = await this.prisma.website.findMany({
      where: {
        userId,
      },
    });

    return websites.map(({ domain, id, status }) => {
      return {
        id,
        domain,
        status,
      };
    });
  }

  findOne(id: number) {
    return this.prisma.website.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateWebsiteDto: UpdateWebsiteDto) {
    return this.prisma.website.update({
      where: { id },
      data: updateWebsiteDto,
    });
  }

  remove(id: number) {
    return this.prisma.website.delete({ where: { id } });
  }
}
