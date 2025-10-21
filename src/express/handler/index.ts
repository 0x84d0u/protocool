import type { Request, Response, RequestHandler } from "express";
import { Errors, Logger, Respond } from "../../core";

interface HandlerConfig {
  fn: (req: Request, res: Response) => void | Response | Promise<void | Response>;
  log?: {
    name: string;
    app: Logger.App;
    showError?: boolean
  };
}

export const wrap = ({ fn, log }: HandlerConfig): RequestHandler => {
  return async (req, res) => {
    try {
      if (log) log.app.info(`[${log.name} handler] → init`);
      return await fn(req, res);
    } catch (e: any) {
      if (log) log.app.error(`[${log.name} handler] → Error`, log.showError && e);

      let err = new Errors.Internal("Internal server error", e);
      if (Errors.isErr(e)) {
        err.code = e.code;
        err.details = e.details;
        err.message = e.message;
      }

      return res.status(err.statusCode).json(err.toResponse());
    }
  };
};


export const ping = (): RequestHandler => {
  return async (req, res) => {
    res.send("pong")
  }
}

export const message = (msg: string = "Hello from protocool!"): RequestHandler => {
  return async (req, res) => {
    res.json(Respond.ok({
      message: msg
    }))
  }
}