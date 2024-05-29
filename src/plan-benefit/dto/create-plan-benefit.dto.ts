import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlanBenefitDto {
  @IsNumber()
  @IsNotEmpty()
  planId: never;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNumber()
  @IsNotEmpty()
  value: string;
}
