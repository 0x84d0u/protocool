export type SuccessResponse<T> = {
    success: true;
    data: T;
    meta?: Record<string, any>;
};

export type ErrorResponse = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
};

export type ProtocoolResponse<T = any> = SuccessResponse<T> | ErrorResponse;
