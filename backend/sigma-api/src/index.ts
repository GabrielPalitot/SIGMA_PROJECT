import PostgresDataBaseConnection from "./db/coreConnection";

export const postgresHandler = new PostgresDataBaseConnection();

postgresHandler.connect();
