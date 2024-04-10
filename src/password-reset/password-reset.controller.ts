import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RequestPasswordResetDto } from './dtos/request-password-reset.dto';
import { PasswordResetService } from './password-reset.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Public } from 'src/auth/auth.guard';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Public()
  @Post()
  async createPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.passwordResetService.createPasswordReset(
      requestPasswordResetDto.email,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }
}
