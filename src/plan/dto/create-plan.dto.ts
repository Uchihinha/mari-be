import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  recurrence: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  stripePriceId: string;
}
