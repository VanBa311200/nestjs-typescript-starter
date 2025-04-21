import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import RegisterDto from '../Users/dto/Register.dto';
import AuthService from 'src/Auth/auth.service';
import { RequestWithUser } from 'src/Auth/auth.interface';
import LocalAuthenticationGuard from 'src/Auth/localAuth.guard';
import JwtAuthGuard from './jwtAuth.guard';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Post('register')
  // @HttpCode(204)
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @UseGuards(LocalAuthenticationGuard)
  @HttpCode(200)
  login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user;
    const { token, cookie } = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader('Set-Cookie', cookie);
    res.setHeader('Authorization', `Bearer ${token}`);

    return user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  logOut(@Res({ passthrough: true }) res: Response) {
    const { token, cookie } = this.authService.getCookieForLogOut();
    res.set('Set-Cookie', cookie);
    res.set('Authorization', token);
  }
}
