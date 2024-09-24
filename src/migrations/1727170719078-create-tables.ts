import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTables1727170719078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create User Table
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'firstName', type: 'varchar' },
                { name: 'lastName', type: 'varchar' },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'age', type: 'int' }
            ]
        }));

        // Create Employee Table
        await queryRunner.createTable(new Table({
            name: 'employee',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'userId', type: 'int' },
                { name: 'salary', type: 'decimal' }
            ]
        }));

        // Create Customer Table
        await queryRunner.createTable(new Table({
            name: 'customer',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'userId', type: 'int' }
            ]
        }));

        // Create Supplier Table
        await queryRunner.createTable(new Table({
            name: 'supplier',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'userId', type: 'int' },
                { name: 'cateId', type: 'int', isNullable: true },
                { name: 'prodId', type: 'int', isNullable: true },
                { name: 'quantity', type: 'int', isNullable: true }
            ]
        }));

        // Create Category Table
        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                { name: 'cateId', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'cName', type: 'varchar' },
                { name: 'description', type: 'varchar', isNullable: true }
            ]
        }));

        // Create Product Table
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                { name: 'prodId', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'pName', type: 'varchar' },
                { name: 'description', type: 'varchar', isNullable: true },
                { name: 'stockQuantity', type: 'int' },
                { name: 'price', type: 'decimal' },
                { name: 'cateId', type: 'int' }
            ]
        }));

        // Create Bill Table
        await queryRunner.createTable(new Table({
            name: 'bill',
            columns: [
                { name: 'billId', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'userId', type: 'int' },
                { name: 'cateId', type: 'int' },
                { name: 'prodId', type: 'int' },
                { name: 'billDate', type: 'date' }
            ]
        }));

        // Create CustProd Table
        await queryRunner.createTable(new Table({
            name: 'cust_prod',
            columns: [
                { name: 'cust_prod_id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'custId', type: 'int' },
                { name: 'prodId', type: 'int' }
            ]
        }));

        // Create ProdSupp Table
        await queryRunner.createTable(new Table({
            name: 'prod_supp',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'prodId', type: 'int' },
                { name: 'suppId', type: 'int' }
            ]
        }));

        // Create EmpCust Table
        await queryRunner.createTable(new Table({
            name: 'empCust',
            columns: [
                { name: 'empCustId', type: 'int', isPrimary: true, isGenerated: true },
                { name: 'empId', type: 'int' },
                { name: 'custId', type: 'int' }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('empCust');
        await queryRunner.dropTable('prod_supp');
        await queryRunner.dropTable('cust_prod');
        await queryRunner.dropTable('bill');
        await queryRunner.dropTable('product');
        await queryRunner.dropTable('category');
        await queryRunner.dropTable('supplier');
        await queryRunner.dropTable('customer');
        await queryRunner.dropTable('employee');
        await queryRunner.dropTable('user');
    }

}
