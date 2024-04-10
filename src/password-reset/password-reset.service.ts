import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { EmailService } from 'src/mail/mail.service';

@Injectable()
export class PasswordResetService {
  TEN_MINUTES = 1000 * 60 * 10;

  constructor(
    private prisma: PrismaService,
    private emailSerivce: EmailService,
  ) {}

  async createPasswordReset(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    await this.prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    const token =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    await this.prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + this.TEN_MINUTES),
      },
    });

    await this.emailSerivce.sendPasswordResetEmail(user.email, token);
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const passwordReset = await this.prisma.passwordReset.findFirst({
      where: { token },
      include: { user: true },
    });

    if (!passwordReset) {
      throw new BadRequestException('INVALID_TOKEN');
    }

    if (passwordReset.expiresAt < new Date()) {
      throw new BadRequestException('TOKEN_EXPIRED');
    }

    const hashedPassword = await argon.hash(password);

    await this.prisma.user.update({
      where: { id: passwordReset.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordReset.delete({ where: { id: passwordReset.id } });
  }
}
