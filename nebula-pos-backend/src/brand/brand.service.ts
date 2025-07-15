import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { BrandDto } from './dto/brand.dto';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Injectable()
export class BrandService {
    constructor(
        private readonly db: DatabaseService,
        private readonly validator: ValidationUtils
    ) { }

    async findAllProducts(id: string) {
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'brands', 'id', id, 'brand')
        })
        const result = await this.db.query(`SELECT * FROM products WHERE brand_id = $1 ORDER BY name`, [id])
        return result.rows
    }

    async create(dto: BrandDto) {
        const { name } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfExists(errors, 'brands', 'name', name)
        })
        await this.db.query(`INSERT INTO brands (name) VALUES ($1)`, [name.toLowerCase()])
        return
    }

    async update(id: string, dto: BrandDto) {
        const { name } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'brands', 'id', id, 'brand')
            await this.validator.addErrorIfExistsExcludingId(errors, 'brands', 'name', name, id)
        })
        await this.db.query(`UPDATE brands SET name = $1 WHERE id = $2`, [name.toLowerCase(), id])
        return
    }

    async delete(id: string) {
        const result = await this.db.query(`DELETE from brands WHERE id = $1`, [id])
        if (!result.rowCount) throw new BadRequestException('Brand does not exist')
        return
    }

    async findAll() {
        const result = await this.db.query(`SELECT * FROM brands ORDER BY 
            CASE WHEN name = 'otros' THEN 1 ELSE 0 END, name`) //ordena los que son 0 primero 
        return result.rows
    }

}
