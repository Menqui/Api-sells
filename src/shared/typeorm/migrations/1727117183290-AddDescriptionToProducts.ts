import { MigrationInterface, QueryRunner } from "typeorm";


// -----------------------------------------------------------------------------------------------------
//ESTE ARQUIVO TEM COMO FUNÇÃO CORRIGIR O ERRO QE FOI ESQUECER A COLUNA DESCRIPTION NA ULTIMA MIGRATION
// -----------------------------------------------------------------------------------------------------

export class AddDescriptionToProducts1727117183290 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" VARCHAR`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }
}
