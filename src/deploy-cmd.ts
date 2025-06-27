import { REST, Routes } from "discord.js";
import { slashCommands } from "./commands";
import { Config, Logger } from "./services";
const rest = new REST().setToken(Config.bot.token);
const logger = Logger.getInstance({ logID: "deploy-cmd" });
(async () => {
  try {
    logger.info("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(Config.bot.uid), {
      body: slashCommands,
    });

    logger.info("Successfully reloaded application (/) commands.");
  } catch (error) {
    logger.error("Error refreshing application (/) commands: " + error);
  }
})();
