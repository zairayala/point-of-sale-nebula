import { DatabaseService } from "@/database/database.service";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";

type ValidationErrors = {
    type: 'conflict' | 'not_found' | 'bad_request',
    msg: string
}

@Injectable()
export class ValidationUtils {
    constructor(private readonly db: DatabaseService) { }

    capitalize = (msg: string) => msg.charAt(0).toUpperCase() + msg.slice(1)

    async addErrorIfExists(errors: ValidationErrors[], table: string, column: string, value: string) {
        const result = await this.db.query(`SELECT * FROM ${table} WHERE LOWER(${column}) = $1`, [value.toLowerCase()])
        if (result.rowCount) {
            errors.push({ type: 'conflict', msg: `${this.capitalize(column)} is already registered` })
        }
    }
    async addErrorIfExistsExcludingId(
        errors: ValidationErrors[],
        table: string,
        column: string,
        value: string,
        excludeId: string
    ) {
        const result = await this.db.query(
            `SELECT 1 FROM ${table} WHERE LOWER(${column}) = $1 AND id != $2`, [value.toLowerCase(), excludeId]
        )
        if (result.rowCount) {
            errors.push({ type: 'conflict', msg: `${this.capitalize(column)} is already registered` })
        }
    }

    async addErrorIfNotExists(errors: ValidationErrors[], table: string, column: string, value: string, name: string) {
        const result = await this.db.query(`SELECT * FROM ${table} WHERE ${column} = $1`, [value])
        if (!result.rowCount) {
            errors.push({ type: 'not_found', msg: `${this.capitalize(name)} does not exist` })
        }
    }

    async runErrors(callback: (errors: ValidationErrors[]) => Promise<void>) {
        const errors: ValidationErrors[] = []
        await callback(errors)
        if (errors.length > 0) {
            const conflictMsgs = errors.filter(err => err.type === 'conflict')
            const notFoundMsgs = errors.filter(err => err.type === 'not_found')
            const badRequestMsgs = errors.filter(err => err.type === 'bad_request')

            if (conflictMsgs.length) throw new ConflictException(conflictMsgs.map(err => err.msg))
            if (notFoundMsgs.length) throw new NotFoundException(notFoundMsgs.map(err => err.msg))
            throw new BadRequestException(badRequestMsgs.map(err => err.msg))
        }
    }
}