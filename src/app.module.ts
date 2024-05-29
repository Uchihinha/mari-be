import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { PrismaModule } from './prisma/prisma.module';
import { TemplateModule } from './template/template.module';
import { TemplateCategoryModule } from './template-category/template-category.module';
import { WebsiteModule } from './website/website.module';
import { ConfigModule } from '@nestjs/config';
import { PlanModule } from './plan/plan.module';
import { PlanBenefitModule } from './plan-benefit/plan-benefit.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import configs from 'config/configuration';
import { MailModule } from './mail/mail.module';
import { AssetModule } from './asset/asset.module';
import { TutorialVideoModule } from './tutorial-video/tutorial-video.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    TemplateModule,
    TemplateCategoryModule,
    WebsiteModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    PlanModule,
    PlanBenefitModule,
    PasswordResetModule,
    MailModule,
    AssetModule,
    TutorialVideoModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
