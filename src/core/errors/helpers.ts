import { AbstractError } from "./classes";

export function isProtocoolError(error: unknown): error is AbstractError {
  return error instanceof AbstractError;
}
