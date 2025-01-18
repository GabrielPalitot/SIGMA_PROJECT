import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToIotDevices1737233565721
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "iot_devices",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      "iot_devices",
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
    await queryRunner.dropColumn("iot_devices", "created_at");
    await queryRunner.dropColumn("iot_devices", "updated_at");
  }
}
