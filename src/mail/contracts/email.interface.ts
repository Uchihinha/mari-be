export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export interface IEmailService {
  sendEmail(options: EmailOptions): Promise<void>;
}
