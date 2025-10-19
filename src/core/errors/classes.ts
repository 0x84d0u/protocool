import { Respond } from "..";

export class AbstractError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ProtocolError';
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }


  toResponse(): Respond.Ko {
    return Respond.ko(
      this.code,
      this.message,
      this.details || undefined
    ) 
  }
}

export class ValidationError extends AbstractError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AbstractError {
  constructor(message: string = 'Authentication required', details?: unknown) {
    super(message, 'AUTHENTICATION_ERROR', 401, details);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AbstractError {
  constructor(message: string = 'Insufficient permissions', details?: unknown) {
    super(message, 'AUTHORIZATION_ERROR', 403, details);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AbstractError {
  constructor(message: string = 'Resource not found', details?: unknown) {
    super(message, 'NOT_FOUND', 404, details);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AbstractError {
  constructor(message: string = 'Resource conflict', details?: unknown) {
    super(message, 'CONFLICT', 409, details);
    this.name = 'ConflictError';
  }
}

export class InternalError extends AbstractError {
  constructor(message: string = 'Internal Error', details?: unknown) {
    super(message, 'INTERNAL', 500, details);
    this.name = 'InternalError';
  }
}