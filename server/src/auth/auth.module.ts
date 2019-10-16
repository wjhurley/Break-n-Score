import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getJwtModuleOptions } from '../jwtconfig';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

const jwtConfig: JwtModuleOptions = getJwtModuleOptions();
console.log(JSON.stringify(jwtConfig));
@Module({
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
  imports: [
    JwtModule.register(jwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
