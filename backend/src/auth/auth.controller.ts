import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GoogleService } from 'src/google/google.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/google')
  getGoogleOAuth2Link(@Res({ passthrough: true }) response: Response) {
    response.redirect(this.googleService.getLink());
  }

  @Get('/google/callback')
  async handleGoogleRedirect(
    @Query('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.loginWithGoogle(code);
    console.log(accessToken);
    response.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
    });
    response.redirect('http://localhost:3000');
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    const expireCookie = Date.now() - 1000 * 10;
    response.cookie('accessToken', null, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(expireCookie),
    });
    response.send({});
  }
}
