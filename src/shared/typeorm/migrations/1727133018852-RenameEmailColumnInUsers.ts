import {MigrationInterface, QueryRunner} from "typeorm";



// -----------------------------------------------------------------------------------------------------
//ESTE ARQUIVO TEM COMO FUNÇÃO CORRIGIR O ERRO QuE COLUNA EMAIL DO BANCO ORIGINAL
// -----------------------------------------------------------------------------------------------------




export class RenameEmailColumnInUsers1727133018852 implements MigrationInterface {
  name = 'RenameEmailColumnInUsers1727133018852';

  public async up(queryRunner: QueryRunner): Promise<void> {
      // Renomeia a coluna "e-mail" para "email"
      await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "e-mail" TO "email"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      // Reverte a renomeação da coluna "email" para "e-mail"
      await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "e-mail"`);
  }
}
