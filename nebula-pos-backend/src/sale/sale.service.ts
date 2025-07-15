import { DatabaseService } from '@/database/database.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SaleDto } from './dto/sale.dto';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Injectable()
export class SaleService {
    constructor(
        private readonly db: DatabaseService,
        private readonly validator: ValidationUtils
    ) { }

    /**** BASIC CRUD ****/
    async create(userId: string, dto: SaleDto) {
        const client = await this.db.getClient()
        await client.query('BEGIN')
        try {
            const { payment_method, items } = dto
            let total = 0
            const saleResult = await client.query(`INSERT INTO sales (user_id, total, payment_method) VALUES ($1, $2, $3) RETURNING id`,
                [userId, 0, payment_method])
            const saleId = saleResult.rows[0].id
            const notFoundErrors: string[] = []
            const badRequestErrors: string[] = []
            for (const item of items) {
                const { quantity, product_id } = item
                const product = await client.query(`SELECT * FROM products WHERE id = $1`, [product_id])
                if (!product.rowCount) notFoundErrors.push(`Product with ID ${product_id} does not exist`)
                const { price, stock } = product.rows[0]
                if (stock < quantity) badRequestErrors.push(`Insufficient stock for product with ID ${product_id}`)
                const subtotal = quantity * price
                await client.query(`INSERT INTO sales_items (sale_id, product_id, quantity, price, subtotal) VALUES ($1, $2, $3, $4, $5)`,
                    [saleId, product_id, quantity, price, subtotal])
                await client.query(`UPDATE products SET stock = stock - $1 WHERE id = $2`, [quantity, product_id])
                total += subtotal
            }
            if (notFoundErrors.length) throw new NotFoundException(notFoundErrors)
            if (badRequestErrors.length) throw new NotFoundException(badRequestErrors)
            await client.query(`UPDATE sales SET total = $1 WHERE id = $2`, [total, saleId])
            await client.query('COMMIT')
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }

    async findOne(id: string) {
        const result = await this.db.query(`SELECT * FROM sales WHERE id = $1`, [id])
        if (!result.rowCount) throw new NotFoundException(`Sale does not exist`)
        return result.rows[0]
    }

    async toggleCompleted(id: string) {
        const result = await this.db.query(`UPDATE sales SET is_completed = NOT is_completed WHERE id = $1`, [id])
        if (!result.rowCount) throw new NotFoundException(`Sale does not exist`)
        return
    }

    async findAll() {
        const result = await this.db.query(`SELECT * FROM sales`)
        return result.rows
    }


    /**** SALE REPORTS ****/

    async getDailyReport() {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        const result = await this.db.query(`SELECT * FROM sales WHERE created_at >= $1 AND created_at < $2 ORDER BY created_at`,
            [today.toISOString(), tomorrow.toISOString()])
        return result.rows
    }

    async getSaleReportByDateRange(from: string, to: string) {
        if (new Date(from) >= new Date(to)) {
            throw new BadRequestException('"from" date must be earlier than the "to" date')
        }
        const result = await this.db.query(`SELECT * FROM sales WHERE created_at >= $1 AND created_at < $2 ORDER BY created_at`, [from, to])
        return result.rows
    }

    async getMonthlyReport() {
        const now = new Date()
        const from = new Date(now.getFullYear(), now.getMonth(), 1)
        const to = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        const result = await this.db.query(`SELECT * FROM sales WHERE created_at >= $1 AND created_at < $2`, [from.toISOString(), to.toISOString()])
        return result.rows
    }

    async getSalesByUser(id: string) {
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'users', 'id', id, 'user')
        })
        const result = await this.db.query(`SELECT * FROM sales WHERE user_id = $1`, [id])
        return result.rows
    }

    async getSalesGroupedByUser(id: string) {
        await this.validator.runErrors(async (errors) => {
            await this.validator.addErrorIfNotExists(errors, 'users', 'id', id, 'user')
        })
        const result = await this.db.query(`SELECT user_id, SUM(total) AS total_sales FROM sales WHERE user_id = $1 GROUP BY user_id`, [id])
        return result.rows
    }

    async getTopSellingProducts() {
        const result = await this.db.query(`
            SELECT p.*, c.name AS category_name, b.name AS brand_name, si.count_sales
            FROM (SELECT product_id, SUM(quantity) AS count_sales
            FROM sale_items
            GROUP BY product_id) AS si 
            JOIN products p ON p.id = si.product_id
            JOIN categories c ON c.id = p.category_id
            JOIN brands b ON b.id = p.brand_id
            ORDER BY si.count_sales DESC LIMIT 30
        `)
        return result.rows
    }

    async getSalesByProduct() {
        const result = await this.db.query(`
            SELECT p.*, c.name AS category_name, b.name AS brand_name, si.total_sales, si.count_sales
            FROM (SELECT product_id, SUM(si.subtotal) AS total_sales, SUM(si.quantity) AS count_sales
            FROM sale_items
            GROUP BY product_id) AS si 
            JOIN products p ON p.id = si.product_id
            JOIN categories c ON c.id = p.category_id
            JOIN brands b ON b.id = p.brand_id
            ORDER BY p.name
        `)
        return result.rows
    }

    
}


/*Resumen general
getSalesSummary()

getDashboardMetrics() ← si es para un dashboard de ventas*/

