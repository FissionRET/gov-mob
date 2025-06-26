import { promises } from "node:dns";
import Logger from "./services/Logger.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let config = require("./config/config.json");

const logger = Logger.getInstance();
console.log(config.bot);

async function start(): Promise<void> {
  logger.info("Bot is warming up...");
  
}
