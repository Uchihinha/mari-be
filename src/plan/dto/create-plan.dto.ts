import { IsNotEmpty, IsString } from "class-validator";

export enum PlanFrequency {
  YEARLY = 'YEARLY',
  MONTHLY = 'MONTHLY',
}

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  frequency: PlanFrequency;

  @IsString()
  @IsNotEmpty()
  stripeProductId: string;
}
