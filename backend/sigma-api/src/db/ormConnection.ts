import { EnvHandler, EnvKey } from "../config/envs";

const envHandler = new EnvHandler();
console.log(envHandler.getEnv(EnvKey.DB_HOST))
export const ormConnection = {
    type: envHandler.getDataBaseType(),
    host: envHandler.getEnv(EnvKey.DB_HOST),
    port: envHandler.getEnvAsNumber(EnvKey.DB_PORT),
    username: envHandler.getEnv(EnvKey.DB_USERNAME),
    password: envHandler.getEnv(EnvKey.DB_PASSWORD),
    database: envHandler.getEnv(EnvKey.DB_DATABASE),
}
