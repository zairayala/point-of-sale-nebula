import { DatabaseService } from '@/database/database.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProviderDto } from './dto/provider.dto';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Injectable()
export class ProviderService {
    constructor(
        private readonly db: DatabaseService,
        private readonly validator: ValidationUtils
    ) { }

    async findAllProducts(id: string) {
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'providers', 'id', id, 'provider')
        })
        const result = await this.db.query(`SELECT * FROM products WHERE provider_id = $1 ORDER BY name`, [id])
        return result.rows
    }

    async create(dto: ProviderDto) {
        const { name, ruc, phone, email, address } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfExists(errors, 'providers', 'name', name)
        })
        await this.db.query(`INSERT INTO providers (name, ruc, phone, email, address) VALUES ($1, $2, $3, $4, $5)`,
            [name.toLowerCase(), ruc, phone, email?.toLowerCase(), address?.toLowerCase()])
        return
    }

    async update(id: string, dto: ProviderDto) {
        const { name, ruc, phone, email, address } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'providers', 'id', id, 'provider')
            await this.validator.addErrorIfExistsExcludingId(errors, 'providers', 'name', name, id)
            if(ruc) await this.validator.addErrorIfExistsExcludingId(errors, 'providers', 'ruc', ruc, id)
            if(phone) await this.validator.addErrorIfExistsExcludingId(errors, 'providers', 'phone', phone, id)
            if (email) await this.validator.addErrorIfExistsExcludingId(errors, 'providers', 'email', email, id)
        })
        await this.db.query(`UPDATE providers SET name = $1, ruc = $2, phone = $3, email = $4, address = $5 WHERE id = $6`,
            [name.toLowerCase(), ruc, phone, email?.toLowerCase(), address?.toLowerCase(), id])
        return
    }

    async delete(id: string) {
        const result = await this.db.query(`DELETE from providers WHERE id = $1`, [id])
        if (!result.rowCount) throw new BadRequestException('Provider does not exist')
        return
    }

    async findAll() {
        const result = await this.db.query(`SELECT * FROM providers ORDER BY name`)
        return result.rows
    }
}
