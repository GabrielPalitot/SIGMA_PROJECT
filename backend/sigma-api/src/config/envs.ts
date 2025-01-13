import { config } from "dotenv";

config({ path: ".env" });

export enum EnvKey {
	SERVER_PORT = "PORT",
	NODE_ENV = "NODE_ENV",
	DB_TYPE = "DB_TYPE",
	DB_HOST = "DB_HOST",
	DB_PORT = "DB_PORT",
	DB_USERNAME = "POSTGRES_USER",
	DB_PASSWORD = "POSTGRES_PASSWORD",
	DB_DATABASE = "POSTGRES_DB",
}

export class EnvHandler {
	getEnv(key: EnvKey): string {
		return process.env[key] || "";
	}
	getEnvAsNumber(key: EnvKey): number {
		return Number.parseInt(this.getEnv(key));
	}
    getDataBaseType(): "postgres" | "mysql" {
        return this.getEnv(EnvKey.DB_TYPE) as "postgres" | "mysql";
    }
}
