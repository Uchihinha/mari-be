import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { AwsService } from 'src/aws/aws.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, AwsService],
})
export class AssetModule { }
