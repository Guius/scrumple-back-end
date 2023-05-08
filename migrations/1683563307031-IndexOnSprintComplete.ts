import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexOnSprintComplete1683563307031 implements MigrationInterface {
    name = 'IndexOnSprintComplete1683563307031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`IDX_9148126b61c58d95f319716684\` ON \`sprint\` (\`complete\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_9148126b61c58d95f319716684\` ON \`sprint\``);
    }

}
