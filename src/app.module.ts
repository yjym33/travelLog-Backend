import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TravelModule } from './travel/travel.module';
import { StoryModule } from './story/story.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // 환경 변수 설정
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Rate limiting 설정
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1분
        limit: 100, // 1분당 100회 요청 제한
      },
    ]),
    // 애플리케이션 모듈들
    PrismaModule,
    AuthModule,
    UserModule,
    TravelModule,
    StoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
