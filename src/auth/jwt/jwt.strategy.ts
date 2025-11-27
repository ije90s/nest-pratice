import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { payload } from "./jwt.payload";
import { CatsRepository } from "src/cats/cats.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly catsRepository:CatsRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에섯 토큰 추출
            secretOrKey: process.env.JWT_SECRET!,
            ignoreExpiration: false,
        });
    }

    //인증 처리
    async validate(payload: payload) {
        const cat = await this.catsRepository.findCatByIdWithoutPassowrd(payload.sub);

        if(cat){
            return cat;
        }else{
            throw new UnauthorizedException('접근 오류');
        }
    }
}