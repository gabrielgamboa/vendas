import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1683419105081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            alter table public.user add unique(email);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE public.user DROP CONSTRAINT user_email_key;
        `);
  }
}
