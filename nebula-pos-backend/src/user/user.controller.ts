import { ParamsIdDto } from '@/common/dto/params-id.dto';
import { AdminGuard } from '@/common/guards/roles.guard';
import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateDto } from './dto/update.dto';
import { PasswordUserDto } from './dto/password.user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor (private readonly userService: UserService) {}

    @UseGuards(AdminGuard)
    @Patch(':id/active')
    async toggleActive(@Req() req: any, @Param() params: ParamsIdDto){
        await this.userService.toggleActive(req.user.role, params.id)
        return { message: 'User updated succesfully' }
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async update(@Req() req: any, @Param() params: ParamsIdDto, dto: UpdateDto){
        await this.userService.update(req.user.userId, params.id, dto)
        return { message: 'User updated succesfully' }
    }

    @UseGuards(AdminGuard)
    @Patch(':id/password')
    async changePassword(@Req() req: any, @Param() params: ParamsIdDto, dto: PasswordUserDto){
        await this.userService.changePassword(req.user, params.id, dto)
        return { message: 'Password user updated succesfully' }
    }

    @Get()
    async findAll(@Req() req: any){
        return this.userService.findAll(req.user.role)
    }
}
