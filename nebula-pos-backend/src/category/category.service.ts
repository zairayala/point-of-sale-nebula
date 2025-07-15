import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Injectable()
export class CategoryService {
    constructor(
        private readonly db: DatabaseService,
        private readonly validator: ValidationUtils
    ) { }

    async findAllProducts(id: string){
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'categories', 'id', id, 'category')
        })
        const result = await this.db.query(`SELECT * FROM products WHERE category_id = $1 ORDER BY name`, [id])
        return result.rows
    }
    
    async findAll(){
        const result = await this.db.query(`SELECT * FROM categories ORDER BY name`)
        return result.rows
    }

}
