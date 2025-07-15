import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ValidationUtils } from '@/common/validators/validation.utils';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService { //servicio: logica reutilizable
    constructor( //aqui declaro los servicios que utilizare
        private readonly db: DatabaseService,
        private readonly jwtService: JwtService,
        private readonly validator: ValidationUtils
    ) { }

    async register(currentRole: string, dto: RegisterDto) {
        const { phone, password, name, lastname, type_doc, num_doc, role, email } = dto
        if (currentRole === 'admin') {
            if (role !== 'seller') throw new ForbiddenException('Access denied: superadmin role required')
        }
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfExists(errors, 'users', 'phone', phone)
            await this.validator.addErrorIfExists(errors, 'users', 'num_doc', num_doc)
            if (email) await this.validator.addErrorIfExists(errors, 'users', 'email', email)
        })
        const hashedPassword = await bcrypt.hash(password, 10)
        const query = `
            INSERT INTO users (phone, password, name, lastname, type_doc, num_doc, role, email)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        await this.db.query(query, [phone, hashedPassword, name.toLowerCase(), lastname.toLowerCase(), type_doc, num_doc.toLowerCase(), role, email?.toLowerCase()])
        return
    }

    async login(dto: LoginDto) {
        const { phone, password } = dto
        const query = `
            SELECT * FROM users WHERE phone = $1
        `
        const result = await this.db.query(query, [phone])
        const user = result.rows[0]

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new UnauthorizedException('Password incorrect')

        const payload = { sub: user.id, phone: user.phone, role: user.role } //defino el contenido
        const token = this.jwtService.sign(payload) //genero el token

        return {
            token
        }
    }

    async user(userId: string) {
        const query = `
            SELECT * FROM users WHERE id = $1
        `
        const result = await this.db.query(query, [userId])
        const { password: _, ...user } = result.rows[0]
        return user
    }

}
