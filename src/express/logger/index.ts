import { Logger } from "../../core";
import type { Request, Response, NextFunction, RequestHandler } from "express";

export const requestsMiddleware = (logger: Logger.App): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = process.hrtime.bigint();

        res.on("finish", () => {
            const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
            const { method, originalUrl } = req;
            const status = res.statusCode;

            let level = Logger.Level.INFO;
            if (status >= 500) level = Logger.Level.ERROR;
            else if (status >= 400) level = Logger.Level.WARN;

            const message = `[${method} ${originalUrl}] → ${status} (${durationMs.toFixed(2)}ms)`;
            const meta = {
                ip: req.ip,
                userAgent: req.get("user-agent"),
                contentLength: res.get("content-length"),
            };

            switch (level) {
                case Logger.Level.ERROR:
                    logger.error(message);
                    break;
                case Logger.Level.WARN:
                    logger.warn(message);
                    break;
                case Logger.Level.INFO:
                default:
                    logger.info(message);
                    break;
            }
        });

        next();
    };
}


