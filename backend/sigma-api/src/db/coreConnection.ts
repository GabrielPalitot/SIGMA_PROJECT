import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";

export const AppDataSource = new DataSource(ormconfig);

class PostgresDataBaseConnection {
  public postgresDataSource: DataSource;
  constructor() {
    this.postgresDataSource = AppDataSource;
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

export default PostgresDataBaseConnection;
