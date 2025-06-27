import { Config, Logger } from "./services";

const logger = Logger.getInstance();
console.log(Config.bot);

async function start(): Promise<void> {
  logger.info("Bot is warming up...");
}

start().catch((err) => {
  logger.error(err);
  process.exit(1);
});
