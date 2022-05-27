import { Module } from '@nestjs/common';
import { GoogleModule } from 'src/google/google.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [GoogleModule],
})
export class AuthModule {}
