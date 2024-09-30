import { Controller, Post, Body ,HttpException,HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {

      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.authService.login(user);
    }
   
}
