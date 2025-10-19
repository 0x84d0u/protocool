[⟵ Back ](../../README.md)

# Logger

```typescript
import { Logger } from '@protocool';

type LogLevel
type LoggerConfig

const logger = new Logger(config: Partial<LoggerConfig> = {})

logger.setLevel(level: LogLevel)
logger.setEnabled(enabled: boolean)
logger.setPrefix(prefix: string)


logger.debug(message: string, meta?: unknown)
logger.info(message: string, meta?: unknown)
logger.warn(message: string, meta?: unknown)
logger.error(message: string, meta?: unknown)
```
