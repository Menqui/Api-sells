import {MigrationInterface, QueryRunner , Table} from "typeorm";

export class CreateUsersTokens1728753669759 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: 'user_tokens',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            },
            {
                name: 'token',
                type: 'uuid',
                generationStrategy:'uuid',
                default:'uuid_generate_v4()',
            },

            {
                name: 'user_id',
                type: 'uuid',
            },
            {
                name: 'created_at',
                type: 'timestamp with time zone',
                default: 'CURRENT_TIMESTAMP',
            },
            {
                name: 'updated_at',
                type: 'timestamp with time zone',
                default: 'CURRENT_TIMESTAMP',
            },
        ],
        foreignKeys:[
          {
            name:'TokenUser',
            referencedTableName:'users',
            referencedColumnNames:['id'],
            columnNames:['user_id'],
            onDelete:'CASCADE',
            onUpdate:'CASCADE',
          }
        ]
    }));
}

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('user_tokens')
    }

}
