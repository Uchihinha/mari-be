import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  html: string;

  @IsNotEmpty()
  @IsString()
  css: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsString()
  templatePreview: string;
}
