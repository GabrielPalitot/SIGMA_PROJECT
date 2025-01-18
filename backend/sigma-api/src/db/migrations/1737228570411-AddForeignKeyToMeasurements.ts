import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyToMeasurements1737228570411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "measurements",
      new TableForeignKey({
        columnNames: ["id_esp"],
        referencedColumnNames: ["id_esp"],
        referencedTableName: "iot_devices",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("measurements");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("id_esp") !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey("measurements", foreignKey);
    }
  }
}
