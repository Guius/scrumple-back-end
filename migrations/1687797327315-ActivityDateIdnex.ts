import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActivityDateIdnex1687797327315 implements MigrationInterface {
  name = 'ActivityDateIdnex1687797327315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_eea7d329a7e73d11d1d8140c7b\` ON \`activity_record\``,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_dfa250a3ce2b561a82b0fd50bf\` ON \`activity_record\` (\`activity_date\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_dfa250a3ce2b561a82b0fd50bf\` ON \`activity_record\``,
    );
    await queryRunner.query(
      `CREATE INDEX \`IDX_eea7d329a7e73d11d1d8140c7b\` ON \`activity_record\` (\`reflection\`)`,
    );
  }
}
