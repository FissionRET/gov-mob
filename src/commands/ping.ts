import { Command } from "commands";
import { ChatInputCommandInteraction, Message } from "discord.js";

const ping: Command = {
  name: "ping",
  description: "check how long until my hand hit your face",

  executeText: async ({ message }) => {
    const latency = message.client.ws.ping;
    const channel = message.channel;

    if (channel.isSendable()) {
      await channel.send(
        `it's about ${latency} ms until my hand hits your face`
      );
    }
  },

  executeSlash: async ({ interaction }) => {
    const latency = interaction.client.ws.ping;
    await interaction.reply(
      `it's about ${latency} ms until my hand hits your face`
    );
  },
};

export default ping;
