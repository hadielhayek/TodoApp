import { Controller, Post, Body ,Get, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor(''))
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseInterceptors(FileInterceptor(''))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

@Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}