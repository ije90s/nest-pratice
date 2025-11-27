import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에섯 토큰 추출
            secretOrKey: process.env.JWT_SECRET!,
            ignoreExpiration: false,
        });
    }

    //인증 처리
    async validate(payload) {}
}