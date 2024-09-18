import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726661091504 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create User table
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) UNIQUE NOT NULL,
                "age" INT NOT NULL
            )
        `);

        // Create Customer table
        await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" SERIAL PRIMARY KEY,
                "userId" INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);

        // Create Employee table
        await queryRunner.query(`
            CREATE TABLE "employee" (
                "id" SERIAL PRIMARY KEY,
                "userId" INT NOT NULL,
                "salary" INT NOT NULL,
                CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);

        // Create Category table
        await queryRunner.query(`
            CREATE TABLE "category" (
                "cateId" SERIAL PRIMARY KEY,
                "cName" VARCHAR(255) NOT NULL,
                "description" VARCHAR(255)
            )
        `);

        // Create Product table
        await queryRunner.query(`
            CREATE TABLE "product" (
                "prodId" SERIAL PRIMARY KEY,
                "pName" VARCHAR(255) NOT NULL,
                "description" VARCHAR(255),
                "stockQuantity" INT NOT NULL,
                "price" DECIMAL NOT NULL,
                "cateId" INT NOT NULL,
                CONSTRAINT fk_category FOREIGN KEY ("cateId") REFERENCES "category"("cateId") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Product table
        await queryRunner.query(`
            DROP TABLE "product"
        `);

        // Drop Category table
        await queryRunner.query(`
            DROP TABLE "category"
        `);

        // Drop Employee table
        await queryRunner.query(`
            DROP TABLE "employee"
        `);

        // Drop Customer table
        await queryRunner.query(`
            DROP TABLE "customer"
        `);

        // Drop User table
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
