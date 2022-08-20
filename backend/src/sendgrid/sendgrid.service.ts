import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
@Injectable()
export class SendGridService {
  constructor(private configService: ConfigService) {}
  private readonly sendgrid = sgMail.setApiKey(
    this.configService.get('SENDGRID_API_KEY'),
  );
  getSendGrid() {
    return sgMail;
  }
}
