import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlanBenefitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  planId: number;

  @IsNumber()
  @IsNotEmpty()
  websiteAmount: number;
}
