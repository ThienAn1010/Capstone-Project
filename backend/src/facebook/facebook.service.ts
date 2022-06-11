import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface UserDataFB {
  id: string;
  email: string;
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

@Injectable()
export class FacebookService {
  constructor(private configService: ConfigService) {}

  getLink() {
    return `https://www.facebook.com/v14.0/dialog/oauth?client_id=${this.configService.get(
      'FACEBOOK_CLIENT_ID',
    )}&redirect_uri=${this.configService.get(
      'FACEBOOK_REDIRECT',
    )}&scope=public_profile,email`;
  }

  async getToken(code: string) {
    return await axios.get<TokenResponse>(
      `https://graph.facebook.com/v14.0/oauth/access_token?client_id=${this.configService.get(
        'FACEBOOK_CLIENT_ID',
      )}&redirect_uri=${this.configService.get(
        'FACEBOOK_REDIRECT',
      )}&client_secret=${this.configService.get(
        'FACEBOOK_SECRET_ID',
      )}&code=${code}`,
    );
  }

  async getUserData(accessToken: string) {
    return await axios.get<UserDataFB>(
      `https://graph.facebook.com/v14.0/me?fields=id%2Cemail%2Cname%2Cpicture%7Burl%7D&access_token=${accessToken}`,
    );
  }
}
