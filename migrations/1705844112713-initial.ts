import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1705844112713 implements MigrationInterface {
  name = 'initial1705844112713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`sprint\` (\`id\` varchar(36) NOT NULL, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`start_date\` bigint NULL, \`sprint_duration_weeks\` int NULL, \`end_date\` bigint NULL, \`sprint_completion_status\` varchar(255) NULL, \`sprint_number\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`task\` (\`id\` varchar(36) NOT NULL, \`creation_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`completed\` bigint NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`points\` int NULL, \`label\` varchar(255) NULL, \`assigned_to_sprint\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`task\``);
    await queryRunner.query(`DROP TABLE \`sprint\``);
  }
}
