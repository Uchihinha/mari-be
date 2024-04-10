import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @MaxLength(255)
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  password: string;
}
