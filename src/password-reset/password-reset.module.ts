import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { EmailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [PasswordResetController],
  providers: [PasswordResetService, EmailService],
  imports: [MailModule],
})
export class PasswordResetModule {}
