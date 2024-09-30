import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class Relationtable1727182306787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // User to Employee Relation
        await queryRunner.createForeignKey('employee', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        // User to Customer Relation
        await queryRunner.createForeignKey('customer', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        

       

        // Category to Product Relation
        await queryRunner.createForeignKey('product', new TableForeignKey({
            columnNames: ['cateId'],
            referencedTableName: 'category',
            referencedColumnNames: ['cateId'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('order', new TableForeignKey({
            columnNames: ['custId'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

         // User to Supplier Relation
         await queryRunner.createForeignKey('supplier', new TableForeignKey({
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

         // User to Supplier Relation
         await queryRunner.createForeignKey('supplier', new TableForeignKey({
            columnNames: ['cateId'],
            referencedTableName: 'category',
            referencedColumnNames: ['cateId'],
            onDelete: 'CASCADE',
        }));

         // User to Supplier Relation
         await queryRunner.createForeignKey('supplier', new TableForeignKey({
            columnNames: ['prodId'],
            referencedTableName: 'product',
            referencedColumnNames: ['prodId'],
            onDelete: 'CASCADE',
        }));

        await queryRunner.createForeignKey('purchaseitem', new TableForeignKey({
            columnNames: ['orderId'],
            referencedTableName: 'order',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        

        await queryRunner.createForeignKey('purchaseitem', new TableForeignKey({
            columnNames: ['prodId'],
            referencedTableName: 'product',
            referencedColumnNames: ['prodId'],
            onDelete: 'CASCADE',
        }));

        // Bill to User Relation
        await queryRunner.createForeignKey('bill', new TableForeignKey({
            columnNames: ['custId'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        // Bill to Category Relation
        await queryRunner.createForeignKey('bill', new TableForeignKey({
            columnNames: ['orderId'],
            referencedTableName: 'order',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        
        

        // CustProd to Customer Relation
        await queryRunner.createForeignKey('cust_prod', new TableForeignKey({
            columnNames: ['custId'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        // CustProd to Product Relation
        await queryRunner.createForeignKey('cust_prod', new TableForeignKey({
            columnNames: ['prodId'],
            referencedTableName: 'product',
            referencedColumnNames: ['prodId'],
            onDelete: 'CASCADE',
        }));

        // ProdSupp to Product Relation
        await queryRunner.createForeignKey('prod_supp', new TableForeignKey({
            columnNames: ['prodId'],
            referencedTableName: 'product',
            referencedColumnNames: ['prodId'],
            onDelete: 'CASCADE',
        }));

        // ProdSupp to Supplier Relation
        await queryRunner.createForeignKey('prod_supp', new TableForeignKey({
            columnNames: ['suppId'],
            referencedTableName: 'supplier',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        // EmpCust to Employee Relation
        await queryRunner.createForeignKey('empCust', new TableForeignKey({
            columnNames: ['empId'],
            referencedTableName: 'employee',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));

        // EmpCust to Customer Relation
        await queryRunner.createForeignKey('empCust', new TableForeignKey({
            columnNames: ['custId'],
            referencedTableName: 'customer',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('empCust', 'FK_empCust_empId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('empCust', 'FK_empCust_custId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('prod_supp', 'FK_prodSupp_prodId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('prod_supp', 'FK_prodSupp_suppId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('cust_prod', 'FK_custProd_prodId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('cust_prod', 'FK_custProd_custId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('bill', 'FK_bill_prodId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('bill', 'FK_bill_cateId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('bill', 'FK_bill_userId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('product', 'FK_product_cateId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('supplier', 'FK_supplier_userId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('customer', 'FK_customer_userId'); // Replace with actual name if specified
        await queryRunner.dropForeignKey('employee', 'FK_employee_userId'); // Replace with actual name if specified
    }
}
