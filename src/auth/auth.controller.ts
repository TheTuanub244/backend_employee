import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data);
  }
  @Post('changePassword')
  async changePassword(@Body() data: any) {
    return this.authService.changePassword(data);
  }
}
