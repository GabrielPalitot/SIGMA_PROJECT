import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddidUserInIotDevices1737306688626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "iot_devices",
      new TableColumn({
        name: "id_identity_user",
        type: "int",
        isNullable: false,
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("iot_devices", "id_identity_user");
  }
}
