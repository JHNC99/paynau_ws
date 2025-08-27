import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGenderToUuid1756196080689 implements MigrationInterface {
    name = 'UpdateGenderToUuid1756196080689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_31bdbb624bb9994266de26b2e67\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`phone\` \`phone\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`birth_date\` \`birth_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`gender_id\` \`gender_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_31bdbb624bb9994266de26b2e67\` FOREIGN KEY (\`gender_id\`) REFERENCES \`genders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`clients\` DROP FOREIGN KEY \`FK_31bdbb624bb9994266de26b2e67\``);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`gender_id\` \`gender_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`birth_date\` \`birth_date\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` CHANGE \`phone\` \`phone\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`clients\` ADD CONSTRAINT \`FK_31bdbb624bb9994266de26b2e67\` FOREIGN KEY (\`gender_id\`) REFERENCES \`genders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`clients\` DROP COLUMN \`created_at\``);
    }

}
