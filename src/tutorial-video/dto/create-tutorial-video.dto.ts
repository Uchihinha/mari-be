import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTutorialVideoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  thumbnail: string;
}
