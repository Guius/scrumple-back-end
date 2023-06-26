import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActivityDateColumn1687796845015 implements MigrationInterface {
  name = 'ActivityDateColumn1687796845015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activity_record\` ADD \`activity_date\` bigint NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activity_record\` DROP COLUMN \`activity_date\``,
    );
  }
}
