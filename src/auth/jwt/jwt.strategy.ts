import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export interface IJwtPayload {
   sub: number;
   email: string;
   iat: number;
   exp: number;
}

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: process.env.SECRET_KEY,
      });
   }
   
   public validate(payload: IJwtPayload) {
      return payload;
   }
}
