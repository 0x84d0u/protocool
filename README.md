# @0x84d0u/protocool

**`@0x84d0u/protocool`** is a powerful, framework-agnostic library for modern back-end development, providing a robust toolkit for authentication, validation, and standardized API responses. With optional adapters for Express and Next.js, it's designed to be flexible and easy to integrate into your existing projects.

[!npm version](https://www.npmjs.com/package/@0x84d0u/protocool)
[!License: MIT](https://opensource.org/licenses/MIT)

## Features

*   **🔒 Authentication**: Simple and secure JWT-based authentication utilities, including token generation, verification, and password hashing.
*   **✅ Schema Validation**: Built on top of `zod`, create, and validate complex data schemas for request bodies, parameters, and more.
*   **🎨 Standardized Responses**: A consistent and predictable structure for API success and error responses.
*   **🔌 Framework Adapters**: Drop-in middlewares and handlers for Express and Next.js to streamline integration.
*   **💪 TypeScript First**: Fully written in TypeScript for a great developer experience with autocompletion and type safety.

## Installation

```bash
npm install @0x84d0u/protocool
```

## Quick Start

### Core Usage (Framework Agnostic)

Here's how you can use the core validation and response utilities in any JavaScript environment.

```typescript
import { createSchema, respond, result } from '@0x84d0u/protocool';
import { z } from 'zod';

// 1. Define a validation schema
const userSchema = createSchema({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
});

async function handleRequest(requestBody: unknown) {
  // 2. Validate the request
  const validationResult = await result(() => userSchema.body.parseAsync(requestBody));

  if (!validationResult.ok) {
    // 3. Send a standardized error response
    return respond.badRequest('Invalid user data', validationResult.error);
  }

  const user = validationResult.data;
  console.log('User is valid:', user);

  // 4. Send a standardized success response
  return respond.ok({ user });
}

// Example call
handleRequest({ username: 'test', email: 'test@example.com' });
```
- [Auth](./docs/core/auth.md)
- [Errors](./docs/core/errors.md)
- [Logger](./docs/core/logger.md)
- [Respond](./docs/core/respond.md)
- [Result](./docs/core/result.md)
- [Schema](./docs/core/schema.md)

#### Express adapter
#### Nextjs adapter


## Development

```bash
npm run build    # Build
npm run dev      # Watch mode
npm run clean    # Clean
```