import { ErrorResponse, SuccessResponse } from "./types";

export const ok = <T>(
    data: T,
    meta?: Record<string, any>
): SuccessResponse<T> => ({
    success: true,
    data,
    meta,
});

export const ko = (
    code: string,
    message: string,
    details?: Record<string, any>
): ErrorResponse => ({
    success: false,
    error: { code, message, details },
});
