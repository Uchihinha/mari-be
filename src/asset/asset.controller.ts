import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import { AwsService } from 'src/aws/aws.service';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import * as fs from 'fs';
import { AssetType } from '@prisma/client';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
  ) {}

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Res() res,
    @Req() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      console.log(file);
      console.log(request.body);
      const { type } = request.body;
      const splitted = request.body.destination.split('/');
      const filename = splitted[splitted.length - 1];
      const bucketName = `${this.configService.get('AWS_BUCKET_NAME')}/pages/previews`;

      const path = await this.awsService.uploadFile(
        file,
        filename,
        bucketName,
        true,
      );

      const enumType = type == 'PAGE' ? AssetType.PAGE : AssetType.IMAGE;

      await this.assetService.create({
        url: request.body.destination,
        userId: request.user.userId,
        type: enumType,
      });

      return res.status(201).json(request.body.destination);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res,
    @Req() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const { destination, type } = request.body;
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

      const { path } = await this.awsService.uploadFile(
        file,
        filename,
        destination,
      );
      const bucketOrigin = this.configService.get('AWS_BUCKET_URL');
      const url = `${bucketOrigin}/${path}`;

      const enumType = type == 'PAGE' ? AssetType.PAGE : AssetType.IMAGE;

      await this.assetService.create({
        url,
        userId: request.user.userId,
        type: enumType,
      });

      return res.status(201).json(url);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.assetService.findAll(request.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.remove(+id);
  }
}
