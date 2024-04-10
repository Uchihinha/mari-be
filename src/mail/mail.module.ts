import { Module } from '@nestjs/common';
import { EMAIL_SERVICE } from 'src/constants';
import { EmailService } from './mail.service';
import { MailtrapService } from './implementations/mailtrap.service';
import { isLocal } from 'src/helpers/environment.helper';

@Module({
  providers: [
    EmailService,
    {
      provide: EMAIL_SERVICE,
      useClass: isLocal() ? MailtrapService : MailtrapService, // Or your specific implementation
    },
  ],
  exports: [EmailService, EMAIL_SERVICE], // Export both EmailService and the token
})
export class MailModule {}
