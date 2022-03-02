import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: 'top-secret-data',
      });
   }
   
   public validate(payload: any) {
      return payload;
   }
}
