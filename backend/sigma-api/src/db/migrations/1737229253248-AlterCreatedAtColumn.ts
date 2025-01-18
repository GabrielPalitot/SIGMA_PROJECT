import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCreatedAtColumn1737229253248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "measurements",
      "created_at",
      new TableColumn({
        name: "measurement_time",
        type: "timestamp",
        isPrimary: true,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "measurement",
      "created_at",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        isPrimary: true,
        default: "now()",
        isNullable: false,
      }),
    );
  }
}
