[⟵ Back ](../../README.md)

# Schema

```typescript
import { Schema } from '@protocool';

Schema.object()
Schema.string()
Schema.number()
Schema.email()
Schema.boolean()

function Schema.validateSync<T>(
  schema: ZodType<T>, 
  data: unknown
) : T

async function Schema.validateAsync<T>(
  schema: ZodType<T>, 
  data: unknown
) : Promise<T>

```
