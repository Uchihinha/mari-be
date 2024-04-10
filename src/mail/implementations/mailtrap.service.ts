import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailOptions, IEmailService } from '../contracts/email.interface';

@Injectable()
export class MailtrapService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions = {
      from: 'Marii.ai <gestao@marii.ai>',
      to: options.to,
      subject: options.subject, // Subject line
      text: options.body, // Plain text body
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error);
      throw new Error('Failed to send email');
    }
  }
}
