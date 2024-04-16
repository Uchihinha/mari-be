import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AssetService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) { }

  upload(uploadAssetBody) {
    return this.prisma.asset.create(uploadAssetBody)
  }

  create(createAssetDto: CreateAssetDto) {
    return this.prisma.asset.create({ data: createAssetDto });
  }

  findAll(userId: number) {
    return this.prisma.asset.findMany({ where: { userId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return this.prisma.asset.delete({ where: { id } })
  }

  findOneByFileName(filename: string) {
    const bucketOrigin = this.configService.get('AWS_BUCKET_URL');

    return this.prisma.asset.findMany({ where: { url: `${bucketOrigin}/${filename}` } });
  }
}
