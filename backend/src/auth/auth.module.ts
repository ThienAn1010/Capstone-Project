import { Module } from '@nestjs/common';
import { FacebookModule } from 'src/facebook/facebook.module';
import { GoogleModule } from 'src/google/google.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [GoogleModule, FacebookModule],
})
export class AuthModule {}
