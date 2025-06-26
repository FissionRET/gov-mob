// import pino from "pino";

// const Logger = pino({
//   level: process.env.NODE_ENV === "production" ? "info" : "debug", // Set log level based on environment
//   transport: {
//     targets: [
//       {
//         target: "pino-pretty", // Use pino-pretty for development
//         options: {
//           colorize: true,
//           ignore: "pid,hostname", // Ignore these fields for cleaner output in development
//         },
//         level: "debug", // Apply pino-pretty only for debug level and above
//       },
//       {
//         target: "./Transport.js", // Use file transport for production
//         options: {
//           destination: "dist/logs/app.log", // Log to a file in production

//         },
//         level: "info", // Apply file transport only for info level and above
//       },
//     ],
//   },
// });

// export default Logger;

// import pino from "pino";

import pino from "pino";
import { Writable } from "stream";
import fs from "node:fs";
import path from "node:path";

class Logger {
  private static instance: Logger;
  private logger: pino.Logger;

  private logFilePath = "";
  private logdir = "";

  private constructor({
    logdir = "logs/",
    logID = "",
  }: {
    logdir: string;
    logID: string;
  }) {
    this.logdir = logdir;
    this.logFilePath = path.join(
      logdir,
      `${logID.length > 0 ? `server-${logID}` : "app"}.log`
    );
    fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });

    // const fileStream = new Writable({
    //   write: (chunk, _encoding, callback) => {
    //     try {
    //       const log = JSON.parse(chunk.toString());
    //       fs.appendFileSync(this.logFilePath, this.formatLogLine(log));
    //     } catch (e) {
    //       fs.appendFileSync(this.logFilePath, chunk.toString());
    //     }
    //     callback();
    //   },
    // });

    // const fileStream = new Writable({
    //   write(chunk, _enc, cb) {
    //     try {
    //       const log = JSON.parse(chunk.toString());
    //       fs.appendFileSync(this.logFilePath, formatLogLine(log));
    //     } catch (e) {
    //       fs.appendFileSync(logFilePath, chunk.toString());
    //     }
    //     cb();
    //   },
    // });

    this.logger = pino(
      {
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
      },
      pino.multistream([
        {
          stream: pino.transport({
            target: "pino-pretty",
            options: {
              colorize: true,
              ignore: "pid,hostname",
              translateTime: "yyyy-mm-dd HH:MM:ss",
            },
          }),
        },
        {
          stream: pino.transport({
            target: "./Transport.js",
            options: {
              destination: this.logFilePath,
            },
          }),
        },
      ])
    );
  }

  private formatLogLine(log: any): string {
    const time = new Date(log.time).toISOString();
    const levelMap = {
      0: "UNKNOWN",
      10: "TRACE",
      20: "DEBUG",
      30: "INFO",
      40: "WARN",
      50: "ERROR",
      60: "FATAL",
    };
    const level = levelMap[log.level as keyof typeof levelMap] || levelMap[0];
    const msg = typeof log.msg === "string" ? log.msg : JSON.stringify(log.msg);

    return `[${time}] ${level}: ${msg}\n`;
  }

  public static getInstance(options = { logdir: "logs/", logID: "" }): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(options);
    }
    return Logger.instance;
  }
  public info(...args: Parameters<typeof this.logger.info>) {
    this.logger.info(...args);
  }
  public error(...args: Parameters<typeof this.logger.error>) {
    this.logger.error(...args);
  }
  public debug(...args: Parameters<typeof this.logger.debug>) {
    this.logger.debug(...args);
  }
  public warn(...args: Parameters<typeof this.logger.warn>) {
    this.logger.warn(...args);
  }
  public fatal(...args: Parameters<typeof this.logger.fatal>) {
    this.logger.fatal(...args);
  }
}

export default Logger;
