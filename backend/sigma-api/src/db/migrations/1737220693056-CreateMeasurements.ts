import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMeasurements1737220693056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "measurements",
        columns: [
          {
            name: "id_esp",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "time",
            type: "timestamp",
            isPrimary: true,
            default: "now()",
          },
          {
            name: "solo_humidity",
            type: "float",
            isNullable: true,
          },
          {
            name: "temperature",
            type: "float",
            isNullable: true,
          },
          {
            name: "air_humidity",
            type: "float",
            isNullable: true,
          },
          {
            name: "has_rain",
            type: "boolean",
            isNullable: true,
          },
          {
            name: "pressure",
            type: "float",
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("measurements");
  }
}
