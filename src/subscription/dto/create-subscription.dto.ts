import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  stripeSubscriptionId: string;
}
