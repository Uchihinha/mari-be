import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { fromBuffer } from 'file-type';

@Injectable()
export class AwsService {
  private bucketName = this.configService.get('AWS_BUCKET_NAME');
  private s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
  });

  constructor(private configService: ConfigService) {}

  async uploadFile(
    file: Express.Multer.File,
    filename: string,
    destination: string,
    replace = false,
  ): Promise<{ url: string; path: string }> {
    const fileTypeInfo = await fromBuffer(file.buffer);

    let bucketName = '';
    if (replace) {
      bucketName = destination;
    } else if (destination && !replace) {
      bucketName = `${this.bucketName}/${destination}`;
    } else {
      bucketName = this.bucketName;
    }

    console.log('bucket', bucketName);

    // return { url: '', path: '' };

    const params = {
      Bucket: bucketName,
      Key: filename,
      Body: file.buffer,
      ACL: 'public-read',
      ContentDisposition: 'inline',
      ContentType: fileTypeInfo ? fileTypeInfo.mime : 'binary/octet-stream',
    };

    const { Key } = await this.s3.upload(params).promise();

    return {
      url: `${this.configService.get('AWS_BUCKET_URL')}/${Key}`,
      path: Key,
    };
  }
}
