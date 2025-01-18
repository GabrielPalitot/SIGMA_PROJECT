import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIoTDevice1737220875984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "iot_devices",
        columns: [
          {
            name: "id_esp",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "latitude",
            type: "float",
            isNullable: false,
          },
          {
            name: "longitude",
            type: "float",
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("iot_devices");
  }
}
