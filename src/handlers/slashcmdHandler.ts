// handlers/slashCommandHandler.ts
import { ChatInputCommandInteraction } from "discord.js";
import { commands } from "../commands/index.js";

export async function handleSlashCommand(
  interaction: ChatInputCommandInteraction
) {
  const command = commands.find((cmd) => cmd.name === interaction.commandName);
  if (!command || !command.executeSlash) return;

  try {
    await command.executeSlash({ interaction });
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "Error occurred.", ephemeral: true });
  }
}
