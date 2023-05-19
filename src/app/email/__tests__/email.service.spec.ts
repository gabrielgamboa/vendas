import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from '../email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from '../dtos/send-email.dto';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  const sendEmail: SendEmailDto = {
    to: 'aaa',
    subject: 'aaa',
    html: 'aaa',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  it('should be able to send email', async () => {
    await service.sendEmail(sendEmail);
    expect(mailerService.sendMail).toBeCalledTimes(1);
  });

  it('should return error if send email dont work', async () => {
    jest.spyOn(mailerService, 'sendMail').mockRejectedValue(new Error());
    expect(service.sendEmail).rejects.toThrowError();
  });
});
