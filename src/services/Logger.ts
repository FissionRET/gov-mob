import pino from "pino";

export const Logger = pino({
  transport: {
    targets: [
      {
        target: "pino/file",
        options: { destination: "./logs/app.log" },
        level: "info",
      },
      {
        target: "pino-pretty",
        options: { colorize: true },
        level: "debug",
      },
    ],
  },
});
