[⟵ Back ](../../README.md)

# Errors

```typescript
import { Errors } from '@protocool';

new Errors.Custom(
    message: string,
    code: string,
    statusCode: number = 500,
    details?: unknown
)
new Errors.Authentication(
    message: string = 'Authentication required', 
    details?: unknown
)
new Errors.Authorization(
    message: string = 'Insufficient permissions', 
    details?: unknown
)
new Errors.Conflict(
    message: string = 'Resource conflict',
    details?: unknown
)
new Errors.NotFound(
    message: string = 'Resource not found', 
    details?: unknown
)
new Errors.Validation(
    message: string,
    details?: unknown
)

function Errors.isErr(
    error: unknown
): error is AbstractError

```
