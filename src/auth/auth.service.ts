import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { loginDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: loginDto): Promise<any> {
    const user = await this.usersService.login(dto);
    if (user && user.password === dto.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.user_name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
