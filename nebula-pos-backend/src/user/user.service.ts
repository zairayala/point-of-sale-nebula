import { DatabaseService } from '@/database/database.service';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt'
import { PasswordUserDto } from './dto/password.user.dto';
import { UserFromToken } from '@/auth/interfaces/user.interface';
import { QueryResult } from 'pg';

@Injectable()
export class UserService {
    constructor (private readonly db: DatabaseService) {}

    async toggleActive(userRole: string, id: string) {
        const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (!result.rowCount) throw new BadRequestException('User does not exist')
        const { role } = result.rows[0]
        if(userRole === 'admin' && role !== 'seller') throw new ForbiddenException('Access denied: superadmin role required')
        await this.db.query(`UPDATE users SET is_active = NOT is_active WHERE id = $1`, [id])
        return
    }

    async update(userId: string, id: string, dto: UpdateDto) {
        const { phone, name, lastname, type_doc, num_doc, email, user_password } = dto

        const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [id]) //user que quiero editar
        if (!result.rowCount) throw new NotFoundException('User does not exist')
        const { phone: currentPhone, role } = result.rows[0]

        const user = await this.db.query(`SELECT * FROM users WHERE id = $1`, [userId]) //mi usuario actual
        const { role: userRole, password: userPassword } = user.rows[0]

        if (userRole === 'admin' && role === 'superadmin') throw new ForbiddenException('Access denied: superadmin role required')
        const isMatch = await bcrypt.compare(user_password, userPassword)
        if (!isMatch) throw new UnauthorizedException('Password incorrect')

        if (currentPhone !== phone) {
            const checkPhone = await this.db.query(`SELECT * FROM users WHERE phone = $1 AND id != $2`, [phone, id])
            if (checkPhone.rowCount) throw new ConflictException('Phone is already registered')
        }

        await this.db.query(`UPDATE users SET phone = $1, name = $2, lastname = $3, type_doc = $4, num_doc = $5, email = $6
             WHERE id = $7`
            , [phone, name.toLowerCase(), lastname.toLowerCase(), type_doc, num_doc.toLowerCase(), email?.toLowerCase(), id])
        return
    }

    async changePassword(user: UserFromToken, id: string, dto: PasswordUserDto) {
        const { previous_password, password } = dto
        const { userId, role: userRole } = user
        const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [id])
        if (!result.rowCount) throw new NotFoundException('User does not exist')
        const { password: currentPassword, role } = result.rows[0]

        if (userRole === 'admin' && role === 'superadmin') throw new ForbiddenException('Access denied: superadmin role required')
        if (userId === id && userRole !== 'superadmin') {
            if (!previous_password) throw new BadRequestException('Previous password is required');
            const isMatch = await bcrypt.compare(previous_password, currentPassword)
            if (!isMatch) throw new UnauthorizedException('Password incorrect')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await this.db.query(`UPDATE users SET password = $1 WHERE id = $2`, [hashedPassword, id])
        return
    }

    async findAll(role: string){
        let result: QueryResult
        if(role === 'superadmin'){
            result = await this.db.query(`SELECT * FROM users ORDER BY 
                CASE 
                    WHEN role = 'superadmin' THEN 0 
                    WHEN role = 'admin' THEN 1 
                    ELSE 2 END, role
                `)
        }else{
            result = await this.db.query(`SELECT * FROM users WHERE role != $1 ORDER BY 
                CASE WHEN role = 'admin' THEN 0 ELSE 1 END, role`, ['superadmin'])
        }
        return result.rows
    }
}
