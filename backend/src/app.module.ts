import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OfferedServicesModule } from './offered-service/offered-services.module';
import { UsersModule } from './user/users.module';
import { ServicesModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    OfferedServicesModule,
    ServicesModule,
  ],
})
export class AppModule {}
