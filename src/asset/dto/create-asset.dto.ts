import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  type: any;
}
