import { Command, Option } from "commander";
const program = new Command();
import { __dirname } from "../utils/utils.js";

program
  .addOption(new Option("--test <archivo>", "Archivo de test"))
  .addOption(
    new Option("--mode <mode>", "Mode").choices(["dev", "prod"]).default("dev")
  );

program.parse(process.argv);

const mode = program.opts().mode;

// In a Docker environment, environment variables are injected directly from the .env file
// via the --env-file flag, so we don't need to load a specific .env.prod or .env.dev file here.
if (mode === 'dev') {
  process.loadEnvFile('./.env.dev');
}

console.log(`Running in ${mode} mode`);

export default {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URL: process.env.MONGO_URL || "",
  COOKIE_SIGN: process.env.COOKIE_SIGN || "",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  FRONTEND_DEV_URL: process.env.FRONTEND_DEV_URL || "",
  mode: mode,
};
