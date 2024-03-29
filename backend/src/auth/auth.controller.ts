import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { FacebookService } from 'src/facebook/facebook.service';
import { GoogleService } from 'src/google/google.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly googleService: GoogleService,
    private readonly facebookService: FacebookService,
    private readonly configService: ConfigService,
  ) {}

  private async redirect(
    res: Response,
    accessToken: string,
    expires: Date,
    url?: string,
  ) {
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires,
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    res.redirect(`${this.configService.get('CLIENT_URL')}/${url ? url : ''}`);
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
    try {
      const { accessToken } = await this.authService.socialLogin({
        code,
        type: 'google',
      });
      return this.redirect(
        res,
        accessToken,
        new Date(Date.now() + 1000 * 60 * 60 * 24),
      );
    } catch (error) {}
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
    const { accessToken } = await this.authService.socialLogin({
      code,
      type: 'facebook',
    });
    return this.redirect(
      res,
      accessToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24),
    );
  }

  @Post('/social')
  async socialLogin(
    @Body() socialLoginDto: SocialLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.socialLogin(
      socialLoginDto,
    );
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    return { user, accessToken };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    const expireCookie = Date.now() - 1000 * 10;
    res.cookie('accessToken', null, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(expireCookie),
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    res.json({});
  }

  @Post('/login')
  async login(
    @Body() login: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.login(login);
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    return { accessToken: accessToken };
  }

  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.register(registerDto);
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    return { accessToken: accessToken };
  }
}
