import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/common/guards/roles.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @Post('register')
    async register( @Req() req: any,@Body() dto: RegisterDto){
        await this.authService.register(req.user.role, dto)
        return { message: 'Register successfully' };
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response){ //uso passtrough para controlar que retorno
        const { token } = await this.authService.login(dto)
        res.cookie('auth_token', token, {
            path: '/',
            httpOnly: true,
            secure: false, //true en produccion
            sameSite: 'lax'
        })
        return { message: 'Login successfully' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    user(@Req() req: any){
        return this.authService.user(req.user.userId)
    }

    @HttpCode(200)
    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response){
        res.clearCookie('auth_token')
        return { message: 'Logged out successfully' };
    }

}