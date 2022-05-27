import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  constructor(private config: ConfigService) {}
  private readonly oauth2Client = new OAuth2Client(
    this.config.get('GOOGLE_CLIENT_ID'),
    this.config.get('GOOGLE_SECRET_ID'),
    this.config.get('GOOGLE_REDIRECT'),
  );
  async getToken(code: string) {
    return await this.oauth2Client.getToken(code);
  }
  async getUserData(idToken: string) {
    return await this.oauth2Client.verifyIdToken({ idToken });
  }
  getLink() {
    return this.oauth2Client.generateAuthUrl({
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    });
  }
}
