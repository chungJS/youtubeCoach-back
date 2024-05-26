import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { loginDto, signupDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: signupDto): Promise<any> {
    return this.prisma.user.create({ data: dto });
  }

  async login(dto: loginDto): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: dto.id } });
  }
}
