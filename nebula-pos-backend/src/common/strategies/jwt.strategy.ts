import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() { //aqui verifica si es valido y existe el jwt en el header
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    return req.cookies?.auth_token
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: 'secret_key'
        })
    }

    async validate(payload: any){  //payload seria el contenido del jwt
        return { userId: payload.sub, phone: payload.phone, role: payload.role } //insertamos en el req.user esta info
    }

}