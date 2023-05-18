import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  createMailerOptions(): Promise<MailerOptions> | MailerOptions {
    console.log(process.env.SMTP_USER, process.env.SMTP_PASSWORD);
    return {
      transport: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    };
  }
}
