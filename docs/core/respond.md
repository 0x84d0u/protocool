[⟵ Back ](../../README.md)

# Respond

```typescript
import { Respond } from '@protocool';

type Respond.Ok<T>
type Respond.Ko
type Respond.Any<T = any>

function Respond.ok<T>(
    data: T,
    meta?: Record<string, any>
) : Respond.Ok<T>

function Respond.fail(
    code: string,
    message: string,
    details?: Record<string, any>
) : Respond.Ko

```
