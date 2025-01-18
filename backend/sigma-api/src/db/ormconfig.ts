import { EnvHandler, EnvKey } from "../config/envs";

const envHandler = new EnvHandler();
const ormconfig = {
  type: envHandler.getDataBaseType(),
  host: envHandler.getEnv(EnvKey.DB_HOST),
  port: envHandler.getEnvAsNumber(EnvKey.DB_PORT),
  username: envHandler.getEnv(EnvKey.DB_USERNAME),
  password: envHandler.getEnv(EnvKey.DB_PASSWORD),
  database: envHandler.getEnv(EnvKey.DB_DATABASE),
  entities: ["./src/models/*.ts"],
  migrations: ["./src/db/migrations/*.ts"],
};

export default ormconfig;
