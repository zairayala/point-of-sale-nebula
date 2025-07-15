import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { ProductDto } from './dto/product.dto';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Injectable()
export class ProductService {
    constructor(
        private readonly db: DatabaseService,
        private readonly validator: ValidationUtils
    ) { }

    async findOne(barcode: string) {
        const result = await this.db.query(`SELECT * FROM products WHERE barcode = $1`, [barcode])
        if (!result.rowCount) throw new BadRequestException('Barcode does not exist')
        return result.rows[0]
    }

    async create(dto: ProductDto) {
        const { name, barcode, price, purchase_price, category_id, brand_id, stock, min_stock, unit, provider_id } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfExists(errors, 'products', 'barcode', barcode)
            await this.validator.addErrorIfNotExists(errors, 'brands', 'id', brand_id, 'brand')
            await this.validator.addErrorIfNotExists(errors, 'categories', 'id', category_id, 'category')
            if (provider_id) await this.validator.addErrorIfNotExists(errors, 'providers', 'id', provider_id, 'provider')
        })
        const query = `
            INSERT INTO products (name, barcode, price, purchase_price, category_id, brand_id, stock, unit, min_stock, provider_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `

        await this.db.query(query, [name.toLowerCase(), barcode, price, purchase_price, category_id, brand_id, stock, unit.toLowerCase(), min_stock, provider_id])
        return
    }

    async update(barcodeParam: string, dto: ProductDto) {
        const { name, barcode, price, purchase_price, category_id, brand_id, stock, min_stock, unit, provider_id } = dto
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'products', 'barcode', barcodeParam, 'barcode')
            if (barcode !== barcodeParam) await this.validator.addErrorIfExists(errors, 'products', 'barcode', barcode) //si son iguales no pasa nada pues no estamos cambiando el barcode
            await this.validator.addErrorIfNotExists(errors, 'categories', 'id', category_id, 'category')
            await this.validator.addErrorIfNotExists(errors, 'brands', 'id', brand_id, 'brand')
            if (provider_id) await this.validator.addErrorIfNotExists(errors, 'providers', 'id', provider_id, 'provider')
        })
        const query = `
            UPDATE products SET name = $1, barcode = $2, price = $3, purchase_price = $4, category_id = $5, 
            brand_id = $6, stock = $7, min_stock = $8, unit = $9, provider_id = $10  WHERE barcode = $11
        `
        await this.db.query(query, [name.toLowerCase(), barcode, price, purchase_price, category_id, brand_id, stock, min_stock, unit.toLowerCase(), provider_id, barcodeParam])
        return

    }

    async updateStock(barcodeParam: string, stock: number) {
        const result = await this.db.query(`UPDATE products SET stock = $1 WHERE barcode = $2`, [stock, barcodeParam])
        if (!result.rowCount) throw new NotFoundException('Product does not exist')
        return
    }

    async toggleActive(barcodeParam: string) {
        const result = await this.db.query(`UPDATE products SET is_active = NOT is_active WHERE barcode = $1`, [barcodeParam])
        if (!result.rowCount) throw new NotFoundException('Product does not exist')
        return
    }

    async delete(barcode: string) {
        const result = await this.db.query(`DELETE from products WHERE barcode = $1`, [barcode])
        if (!result.rowCount) throw new NotFoundException('Barcode does not exist')
        return
    }

    async findAll() {
        const result = await this.db.query(`SELECT * FROM products ORDER BY name`)
        return result.rows
    }
}
