import { MigrationInterface, QueryRunner } from "typeorm";

export class GenderSchema1756194429483 implements MigrationInterface {
    name = 'GenderSchema1756194429483'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
    }

}
