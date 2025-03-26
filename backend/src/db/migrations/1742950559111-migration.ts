import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742950559111 implements MigrationInterface {
  name = "Migration1742950559111";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_fd078d23aa52482d19347a96274"`);
    await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90"`);
    await queryRunner.query(`CREATE TYPE "public"."user_list_entity_role_enum" AS ENUM('admin', 'viewer', 'owner')`);
    await queryRunner.query(`CREATE TABLE "user_list_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."user_list_entity_role_enum" NOT NULL DEFAULT 'editor', "userId" uuid, "listId" uuid, CONSTRAINT "PK_e01243e1990c2f07188f7cf26a3" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e36e5b4dcf9d6fb62548c6625b" ON "user_list_entity" ("userId", "listId") `);
    await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_fd078d23aa52482d19347a96274" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_list_entity" ADD CONSTRAINT "FK_d3d6cfe410217affb8ebfec70d4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "user_list_entity" ADD CONSTRAINT "FK_e274b8f2ca77ae1da8cca64a157" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_list_entity" DROP CONSTRAINT "FK_e274b8f2ca77ae1da8cca64a157"`);
    await queryRunner.query(`ALTER TABLE "user_list_entity" DROP CONSTRAINT "FK_d3d6cfe410217affb8ebfec70d4"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_fd078d23aa52482d19347a96274"`);
    await queryRunner.query(`ALTER TABLE "lists" ADD "userId" uuid`);
    await queryRunner.query(`DROP INDEX "public"."IDX_e36e5b4dcf9d6fb62548c6625b"`);
    await queryRunner.query(`DROP TABLE "user_list_entity"`);
    await queryRunner.query(`DROP TYPE "public"."user_list_entity_role_enum"`);
    await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_fd078d23aa52482d19347a96274" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
  }
}
