import { ZodType, ZodError } from "zod";
import { Errors } from "..";

/**
 * Sync validation with Zod `.parse`
 */
export function validateSync<T>(
  schema: ZodType<T>, 
  data: unknown
): T {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      // Format the issues in a client-friendly way
      const issues = err.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
        code: issue.code,
      }));
      throw new Errors.Validation("Validation failed", { issues });
    }
    throw err;
  }
}

/**
 * Async validation (for schemas with async refinements) — uses `.parseAsync`
 */
export async function validateAsync<T>(
  schema: ZodType<T>,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (err) {
    if (err instanceof ZodError) {
      const issues = err.issues.map(issue => ({
        path: issue.path,
        message: issue.message,
        code: issue.code,
      }));
      throw new Errors.Validation("Validation failed", { issues });
    }
    throw err;
  }
}

/**
 * Auto validation — if the schema is “async” (i.e. has async refinements),
 * use parseAsync, otherwise parse.
 */
// export function validate<T>(
//   schema: ZodType<T>,
//   data: unknown
// ): T | Promise<T> {
//   // There is no official `.async` flag on ZodSchema,
//   // but a schema with async refinements would need `.parseAsync`.
//   // We can heuristically check if `.parseAsync` is used by the caller,
//   // but here we default to sync and let user call `validateAsync` if needed.
//   return validateSync(schema, data);
// }
