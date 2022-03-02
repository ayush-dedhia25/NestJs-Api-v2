import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthStrategy } from './jwt/jwt.strategy';

@Module({
   imports: [UsersModule, JwtModule.register({})],
   controllers: [AuthController],
   providers: [AuthService, JwtAuthStrategy],
})
export class AuthModule {}
