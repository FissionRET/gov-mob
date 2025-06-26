import { Message } from "discord.js";
import { commands } from "../commands";

const prefix = "!";

export async function handleMessageCommand(message: Message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.find((cmd) => cmd.name === commandName);
  if (!command || !command.executeText) return;

  try {
    await command.executeText({ message, args });
  } catch (err) {
    console.error(err);
    await message.reply("There was an error executing that command.");
  }
}
