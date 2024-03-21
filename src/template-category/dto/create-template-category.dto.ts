import { IsNotEmpty, IsString } from "class-validator";

export class CreateTemplateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
