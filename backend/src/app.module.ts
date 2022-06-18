import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
<<<<<<< HEAD
import { OfferedServicesModule } from './offered-service/offered-services.module';
=======
import { ServicesModule } from './service/services.module';
>>>>>>> issue-25-_BE_CRUD_Services
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
<<<<<<< HEAD
    OfferedServicesModule,
=======
>>>>>>> issue-25-_BE_CRUD_Services
    ServicesModule,
  ],
})
export class AppModule {}
