[⟵ Back ](../../README.md)

# Auth

```typescript
import { Auth } from '@protocool';
```

## Jwt 

```typescript

type Auth.Jwt.SignOptions
type Auth.Jwt.VerifyOptions
type Auth.Jwt.Payload
type Auth.Jwt.TokenPair

function Auth.Jwt.sign(
    payload: JwtPayload,
    secret: string,
    options: SignOptions = {}
): string

function Auth.Jwt.verify<T = unknown>(
    token: string,
    secret: string,
    options: VerifyOptions = {}
): T

function Auth.Jwt.decode<T = unknown>(
    token: string
): T | null

function genPair(
    payload: JwtPayload,
    secret: string,
    accessExpiresIn: SignOptions['expiresIn'] = '15m',
    refreshExpiresIn: SignOptions['expiresIn'] = '7d'
): TokenPair

```

## Pass

```typescript
async function Auth.Pass.hash(
    password: string,
    rounds = 10
): Promise<string>

async function Auth.Pass.compare(
    password: string,
    hash: string
): Promise<boolean>

```


## Qr

```typescript

type Options

async function Auth.Qr.gen(
  data: string,
  options: Options = {}
): Promise<string>

async function Auth.Qr.genBuffer(
  data: string,
  options: Options = {}
): Promise<Buffer>

async function Auth.Qr.genSvg(
  data: string,
  options: Options = {}
): Promise<string>

```

## Misc

```typescript

function Auth.Misc.genPin(
    length = 6
): string

function Auth.Misc.genShort(
    length = 8, 
    options: { uppercase?: boolean } = {}
): string

function Auth.Misc.genOtp = (
    length = 6,
    expiresInMinutes = 5
): { 
    code: string,
    expiresAt: Date    
}

function Auth.Misc.genSlug(
    text: string,
    maxLength = 50
): string


```