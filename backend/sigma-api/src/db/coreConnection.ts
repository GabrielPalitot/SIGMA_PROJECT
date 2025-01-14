import { DataSource } from "typeorm";
import { ormConnection } from "./ormConnection";
export class PostgresDataBaseConnection {
  public postgresDataSource: DataSource;
  constructor() {
    this.postgresDataSource = new DataSource(ormConnection);
  }

  public async connect(): Promise<void> {
    try {
      await this.postgresDataSource.initialize();
      console.log("Postgres connected");

      await this.postgresDataSource.query("SELECT 1");
      console.log("Connection test query succeeded.");
    } catch (error) {
      console.error("Postgres connection failed: ", error);
      throw error;
    }
  }
}

const postgresConnection = new PostgresDataBaseConnection();
postgresConnection.connect().then(() => {
  console.log("Postgres connected");
});
