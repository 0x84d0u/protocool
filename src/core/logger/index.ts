/* eslint-disable no-console */

export enum Level {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

export interface Config {
  level?: Level;
  prefix?: string;
  enabled?: boolean;
  timestamps?: boolean;
  color?: boolean;
}

export class App {
  private level: Level;
  private prefix: string;
  private enabled: boolean;
  private timestamps: boolean;
  private color: boolean;

  constructor(config: Partial<Config> = {}) {
    this.level = config.level ?? Level.INFO;
    this.prefix = config.prefix ?? "Protocool";
    this.enabled = config.enabled ?? true;
    this.timestamps = config.timestamps ?? true;
    this.color = config.color ?? true;
  }

  private shouldLog(level: Level): boolean {
    return this.enabled && level >= this.level && this.level !== Level.SILENT;
  }

  private colorize(level: Level, text: string): string {
    if (!this.color) return text;
    switch (level) {
      case Level.DEBUG:
        return `\x1b[36m${text}\x1b[0m`; // cyan
      case Level.INFO:
        return `\x1b[32m${text}\x1b[0m`; // green
      case Level.WARN:
        return `\x1b[33m${text}\x1b[0m`; // yellow
      case Level.ERROR:
        return `\x1b[31m${text}\x1b[0m`; // red
      default:
        return text;
    }
  }

  private format(level: string, message: string, meta?: unknown): string {
    const now = new Date();
    const timestamp = this.timestamps
      ? `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ` +
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} `
      : "";
    // const timestamp = this.timestamps ? `${new Date().toISOString()} ` : "";
    const metaStr = meta ? ` ${JSON.stringify(meta, null, 2)}` : "";
    // return `[${level}] ${this.prefix} ${timestamp} \n${message}${metaStr}\n`;
    return `[${this.prefix}] ${timestamp}\t${message}${metaStr && '\t' + metaStr}`;
  }

  private log(level: Level, method: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: unknown): void {
    if (!this.shouldLog(level)) return;
    const formatted = this.colorize(level, this.format(Level[level], message, meta));
    console[method](formatted);
  }

  debug(message: string, meta?: unknown): void {
    this.log(Level.DEBUG, "debug", message, meta);
  }

  info(message: string, meta?: unknown): void {
    this.log(Level.INFO, "info", message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.log(Level.WARN, "warn", message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.log(Level.ERROR, "error", message, meta);
  }

  setLevel(level: Level): void {
    this.level = level;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }
}

export const logger = new App({
  level: process.env.NODE_ENV === "production" ? Level.WARN : Level.DEBUG,
});
