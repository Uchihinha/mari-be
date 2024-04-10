import { Inject, Injectable } from '@nestjs/common';
import { IEmailService } from './contracts/email.interface';
import { frontEndPath } from 'src/helpers/environment.helper';
import { EMAIL_SERVICE } from 'src/constants';

@Injectable()
export class EmailService {
  constructor(
    @Inject(EMAIL_SERVICE) private readonly emailService: IEmailService,
  ) {}

  async sendPasswordResetEmail(to: string, token: string) {
    await this.emailService.sendEmail({
      to,
      subject: 'Reset your password',
      body: `Click on this link to reset your password: ${frontEndPath(
        '/reset-password/' + token,
      )}`,
    });
  }
}
