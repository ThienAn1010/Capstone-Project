import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { OfferedServicesModule } from './offered-service/offered-services.module';
import { UsersModule } from './user/users.module';
import { ServicesModule } from './service/service.module';
import { CheckoutModule } from './checkout/checkout.module';
import { RawBodyMiddleware } from 'middleware/raw-body.middleware';
import { JsonBodyMiddleware } from 'middleware/json-body.middleware';

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
    CheckoutModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RawBodyMiddleware)
      .forRoutes({
        path: '/checkout/webhook',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
