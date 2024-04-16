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
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as crypto from 'crypto';
import { AwsService } from 'src/aws/aws.service';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetController {
  constructor(
    private readonly assetService: AssetService,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res,
    @Req() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

      const { path } = await this.awsService.uploadFile(file, filename);
      const bucketOrigin = this.configService.get('AWS_BUCKET_URL');
      console.log(path)
      const url = `${bucketOrigin}/${path}`;

      await this.assetService.create({
        url,
        userId: request.user.userId,
      })

      return res.status(201).json(path);
    } catch (error) {
      console.log(error)
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
