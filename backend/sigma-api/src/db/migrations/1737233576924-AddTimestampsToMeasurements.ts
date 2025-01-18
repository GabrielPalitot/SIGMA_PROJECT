import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToMeasurements1737233576924
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "measurements",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      "measurements",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
        isNullable: false,
        onUpdate: "CURRENT_TIMESTAMP",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("measurements", "created_at");
    await queryRunner.dropColumn("measurements", "updated_at");
  }
}
