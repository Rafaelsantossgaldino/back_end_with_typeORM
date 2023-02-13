import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675964435226 implements MigrationInterface {
    name = 'default1675964435226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "descriptin" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "descriptin"`);
    }

}
