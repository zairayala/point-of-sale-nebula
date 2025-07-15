import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as path from 'path';
import { Pool, PoolClient } from 'pg'
import { promises as fs } from 'fs'

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool

    constructor(){
        this.pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'root',
            database: 'nebula_db'
        })
    }

    async onModuleInit() {
        const client = await this.pool.connect()
        console.log('Conectado a Postgres con puerto 5432')

        const sqlFilePath = path.resolve(process.cwd(), 'src/database/seeds/init.sql')
        try {
            const sql = await fs.readFile(sqlFilePath, 'utf8')
            await client.query(sql)
            console.log('Archivo SQL ejecutado correctamente')
        } catch (error) {
            console.error('Error al ejecutar archivo SQL', error)
        }finally {
            client.release()
        }
    }

    async onModuleDestroy() {
        await this.pool.end()
    }

    async query(text: string, params?: any[]){
        return this.pool.query(text, params)
    }

    async getClient(): Promise<PoolClient> {
        return this.pool.connect()
    }
}
