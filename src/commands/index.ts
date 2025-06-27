import { ChatInputCommandInteraction, Message } from "discord.js";
import ping from "./ping.js";

export const commands = [ping];

// For slash registration
export const slashCommands = commands.map((cmd) => ({
  name: cmd.name,
  description: cmd.description,
}));


export interface Command {
  name: string;
  description: string;
  executeText?: (args: { message: Message; args?: string[] }) => void | Promise<void>;
  executeSlash?: (args: { interaction: ChatInputCommandInteraction }) => void | Promise<void>;
}

// export interface Command {
//   name: string;
//   description: string;
//   executeText?: ({ message, args }: { message: string; args?: any }) => void;
//   executeSlash?: ({ interaction }: { interaction: any }) => void;
// }
