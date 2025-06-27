import fs from "node:fs";
import path from "node:path";
import pino from "pino";

interface LoggerOptions {
  logdir?: string;
  logID?: string;
}

/**
 * Logger class
 * Singleton
 * */
export class Logger {
  private static instance: Logger;
  private logger: pino.Logger;

  private logFilePath = "";
  private logdir = "";

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes Pino logger with console and file transports.
   *
   * @param args Optional configuration options for the logger.
   * @param args.logdir - directory to save logs
   * @param args.logID - log ID
   * @returns Logger instance
   */
  private constructor(args?: LoggerOptions) {
    // Default logdir is './logs' (relative to current working directory).
    // Default logID is an empty string.
    const options: LoggerOptions = { logdir: "logs/", logID: "", ...args };
    this.logdir = options.logdir;

    // Construct the full log file path.
    // If logID is provided, filename will be 'server-[logID].log', otherwise 'app.log'.
    this.logFilePath = path.join(
      options.logdir,
      `${options.logID.length > 0 ? `server-${options.logID}` : "app"}.log`
    );

    // Ensure the log directory exists synchronously.
    // This happens before Pino attempts to open the file stream.
    fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });

    // Initialize the Pino logger.
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
              translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
            },
          }),
        },
        {
          stream: pino.transport({
            target: "pino/file",
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

  public static getInstance(options?: LoggerOptions): Logger {
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

