import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingActivityRecordTable1687782704005
  implements MigrationInterface
{
  name = 'CreatingActivityRecordTable1687782704005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`activity_record\` (\`id\` varchar(36) NOT NULL, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`activity\` varchar(255) NOT NULL, \`duration_hours\` int NOT NULL, \`reflection\` varchar(255) NOT NULL, INDEX \`IDX_eea7d329a7e73d11d1d8140c7b\` (\`reflection\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`activity\` (\`id\` varchar(36) NOT NULL, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`start_date\` bigint NULL, \`end_date\` bigint NULL, \`sprint_number\` int NOT NULL, \`complete\` bigint NULL, INDEX \`IDX_ed1bf50133d70abe5385127201\` (\`complete\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_ed1bf50133d70abe5385127201\` ON \`activity\``,
    );
    await queryRunner.query(`DROP TABLE \`activity\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_eea7d329a7e73d11d1d8140c7b\` ON \`activity_record\``,
    );
    await queryRunner.query(`DROP TABLE \`activity_record\``);
  }
}
