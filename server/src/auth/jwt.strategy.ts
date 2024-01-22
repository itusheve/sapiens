// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,private readonly authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'), // Replace with your secret key
    });
  }

  async validate(payload: any) {
    const user = await this.authService.getUserFromDB(payload.userEmail,payload.password);
    console.log("we are in validate")
    console.log('user from validate ,', user)
    if(!user){
      throw new UnauthorizedException();
    }
   return user;
  }
}
