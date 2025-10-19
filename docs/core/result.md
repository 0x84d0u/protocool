[⟵ Back ](../../README.md)

# Result

```typescript
import { Result } from '@protocool';

type Result.Ok<T>
type Result.Ko<E extends Error>
type Result.Any<T, E extends Error = Error>

function Result.ok<T>(
    value: T
) : Result.Ok<T>

function Result.ko(
    error: E
) : Result.Ko<E extends Error>

function Result.wrap<T>(
    fn: () : T
)

```
