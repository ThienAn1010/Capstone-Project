import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { FacebookService } from 'src/facebook/facebook.service';
import { GoogleService } from 'src/google/google.service';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
    private readonly facebookService: FacebookService,
    private readonly configService: ConfigService,
  ) {}

  private async redirect(res: Response, accessToken: string, expires: Date) {
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires,
    });
    res.redirect('http://localhost:3000');
  }

  @Get('/google')
  getGoogleOAuth2Link(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.googleService.getLink());
  }

  @Get('/google/callback')
  async handleGoogleRedirect(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.loginWithGoogle(code);
    return this.redirect(
      res,
      accessToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24),
    );
  }

  @Get('/facebook')
  getFacebookOAuth2Link(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.facebookService.getLink());
  }

  @Get('/facebook/callback')
  async handleFacebookRedirect(
    @Query('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.loginWithFacebook(code);
    return this.redirect(
      res,
      accessToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24),
    );
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const expireCookie = Date.now() - 1000 * 10;
    res.cookie('accessToken', null, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(expireCookie),
    });
    res.json({});
  }
}
