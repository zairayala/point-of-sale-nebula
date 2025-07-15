import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { DatabaseService } from "@/database/database.service";
import * as bcrypt from 'bcrypt'

async function runSeed() {
    const app = await NestFactory.createApplicationContext(AppModule) //crea una instancia de la aplicacion pero no inicia el servidor completo
    const db = app.get(DatabaseService) //como ya importe el module tengo que importar el service

    await db.query(`
        INSERT INTO brands(id, name)
        SELECT gen_random_uuid(), b.name 
        FROM (VALUES 
            ('alicorp'),
            ('adidas'),
            ('bimbo'),
            ('laive'),
            ('gloria'),
            ('san fernando'),
            ('molitalia'),
            ('backus'),
            ('d''onofrio'),
            ('pura vida'),
            ('kraft'),
            ('pepsico'),
            ('frito lay'),
            ('coca-cola'),
            ('nestlé'),
            ('otros')
        ) AS b(name)
        WHERE NOT EXISTS (
            SELECT 1 FROM brands WHERE name = b.name
        );
    `)

    await db.query(`
        INSERT INTO categories(id, name)
        SELECT gen_random_uuid(), c.name 
        FROM (VALUES 
            ('lácteos'),
            ('panadería'),
            ('bebidas'),
            ('snacks'),
            ('frutas y verduras'),
            ('carnes y embutidos'),
            ('abarrotes'),
            ('limpieza'),
            ('higiene personal'),
            ('mascotas'),
            ('congelados'),
            ('culces y golosinas'),
            ('cuidado del bebé')
        ) AS c(name)
        WHERE NOT EXISTS (
            SELECT 1 FROM categories WHERE name = c.name
        );
    `)
    
    // ========================
    // Superadmin
    // ========================
    const phone = '000000000'; // login temporal
    const password = 'admin123'; // login temporal
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(`
    INSERT INTO users(id, phone, password, name, lastname, type_doc, num_doc, role, email)
    SELECT gen_random_uuid(), $1::text, $2, 'super', 'admin', 'dni', '00000000', 'superadmin', 'superadmin@email.com'
    WHERE NOT EXISTS (
      SELECT 1 FROM users WHERE phone = $1::text OR role = 'superadmin'
    )
  `, [phone, hashedPassword]);

    await app.close()
    console.log('Seed ejecutado correctamente')
    process.exit(0)
}

runSeed().catch((err) => {
    console.log('Ha ocurrido un error al ejecutar el seed: ', err)
})