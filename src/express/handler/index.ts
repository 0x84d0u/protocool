import type { Request, Response } from 'express';
import { Errors, Logger, Respond } from '../../core';


export type Fn<T> = (
    req: Request,
    res: Response
) => Promise<{
    json: Respond.Ok<T>
    statusCode: number
}>

export const wrap = <T>(
    fn: Fn<T>,
    log?: {
        name: string,
        app: Logger.App
    },
) => {

    return async (req: Request, res: Response) => {
        try {
            const { json, statusCode } = await fn(req, res);

            if (log) {
                log.app.info(`${log.name} OK`, json);
            }

            res.status(statusCode).json(json);
        } catch (e: any) {
            if (log) {
                log.app.error(`${log.name} KO`, e);
            }
            let err = new Errors.Internal("Internal server error", e)
            if (Errors.isErr(e)) {
                err.code = e.code;
                err.details = e.details || undefined;
                err.message = e.message;
            }
            return res.status(err.statusCode).json(err.toResponse())
        }

    }
}


