# Advanced JavaScript Kit

> **Modern TypeScript utility library with tree-shaking support** - Comprehensive collection of array, string, number, network, sleep, and JWT utilities for JavaScript and TypeScript projects.

[![npm version](https://badge.fury.io/js/advanced-js-kit.svg)](https://www.npmjs.com/package/advanced-js-kit)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Tree Shakable](https://img.shields.io/badge/Tree--Shakable-✓-brightgreen.svg)](https://webpack.js.org/guides/tree-shaking/)

A collection of advanced JavaScript/TypeScript utility functions for modern development.

## 🌐 Environment Compatibility

This library is designed to work across multiple JavaScript environments:

- **✅ Universal**: Array, String, Number, Sleep, Time, and Environment utilities work in **Node.js**, **Browser**, and **Web Workers**
- **🟡 Node.js Only**: Network and JWT utilities require **Node.js** environment
- **🔴 Browser Only**: Currently no browser-specific utilities

> **Important**: Node.js-only modules will throw `EnvironmentError` when used in non-Node.js environments.

## Features

- 🚀 **TypeScript Support** - Full TypeScript support with type definitions
- 📦 **Tree Shakable** - Import only what you need
- 🧪 **Well Tested** - Comprehensive test coverage
- 📖 **Well Documented** - JSDoc comments for all functions
- 🔧 **Modern Build** - Built with tsup for optimal bundling
- 💡 **Excellent IDE Support** - Full auto-completion and IntelliSense support
- 🌐 **Cross-Platform** - Works in Node.js, browsers, and web workers

## Installation

```bash
npm install advanced-js-kit
```

**Alternative package managers:**
```bash
# Yarn
yarn add advanced-js-kit

# pnpm
pnpm add advanced-js-kit

# Bun
bun add advanced-js-kit
```

## Usage

### Universal Modules (Work Everywhere)

```typescript
import { chunk, capitalize, clamp, sleep } from 'advanced-js-kit';

// Array utilities
const chunkedArray = chunk([1, 2, 3, 4, 5], 2);
// Result: [[1, 2], [3, 4], [5]]

// String utilities
const capitalizedString = capitalize('hello world');
// Result: "Hello world"

// Number utilities
const clampedNumber = clamp(15, 0, 10);
// Result: 10

// Sleep utilities
await sleep({ seconds: 2, milliseconds: 500 }); // Sleep for 2.5 seconds
```

### Environment-Specific Usage

```typescript
import { 
  isNodeEnvironment, 
  EnvironmentError 
} from 'advanced-js-kit';

// Check environment before using Node.js-only features
if (isNodeEnvironment()) {
  // These modules only work in Node.js
  const { isPortInUse } = await import('advanced-js-kit/network/port');
  const { jwtSign } = await import('advanced-js-kit/jwt/jwt');
  
  const portInUse = await isPortInUse(3000);
  const token = await jwtSign({ userId: '123' }, 'secret');
} else {
  console.log('Network and JWT utilities require Node.js');
}
```

### Error Handling

```typescript
import { jwtVerify, EnvironmentError } from 'advanced-js-kit';

try {
  const payload = await jwtVerify(token, secret);
} catch (error) {
  if (error instanceof EnvironmentError) {
    console.log(`Feature not available: ${error.message}`);
    console.log(`Required: ${error.requiredEnvironment}, Current: ${error.currentEnvironment}`);
  }
}
```

### Tree-shaking Support

You can also import individual functions for better tree-shaking:

```typescript
// Import specific functions
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';
import { clamp } from 'advanced-js-kit/number/clamp';
import { sleep } from 'advanced-js-kit/sleep/sleep';
```

## 📋 Available Modules

### ✅ Universal Modules (Node.js + Browser + Web Workers)

| Module | Functions | Description |
|--------|-----------|-------------|
| `array/chunk` | `chunk` | Split arrays into chunks of specified size |
| `string/capitalize` | `capitalize`, `capitalizeWords` | String capitalization utilities |
| `number/clamp` | `clamp`, `inRange` | Number range utilities |
| `sleep/sleep` | `sleep` | Promise-based sleep with multiple time units |
| `time/time` | `convertToSeconds` | Time conversion utilities |
| `utils/environment` | `isNodeEnvironment`, `isBrowserEnvironment`, `getEnvironment` | Environment detection |

### 🟡 Node.js Only Modules

| Module | Functions | Description |
|--------|-----------|-------------|
| `network/port` | `isPortInUse`, `isPortAvailable`, `findAvailablePort` | Port checking and management |
| `jwt/jwt` | `jwtSign`, `jwtVerify` | JSON Web Token operations |

> **Note**: Node.js-only modules will throw `EnvironmentError` when used in non-Node.js environments.

## TypeScript Configuration

For optimal compatibility with this package, ensure your `tsconfig.json` uses modern module resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"/"nodenext"
    "module": "ESNext", // or "Node16"
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  }
}
```

### Troubleshooting Import Issues

If you encounter module resolution errors like:
```
Cannot find module 'advanced-js-kit/string/capitalize' or its corresponding type declarations
```

Try these solutions:

1. **Update your TypeScript configuration** to use modern module resolution (see above)
2. **Ensure you're using a recent Node.js version** (16+ recommended)
3. **Copy the example configuration** from `example-tsconfig-for-consumers.json` in this package
4. **As a workaround**, you can import directly from the dist folder:
   ```typescript
   import { capitalize } from "advanced-js-kit/dist/string/capitalize.js";
   ```

### IDE Support

This package provides excellent IDE support with:
- **Auto-completion** for all functions and their parameters
- **Type checking** with full TypeScript support
- **JSDoc documentation** shown in hover tooltips
- **Auto-import** suggestions when typing function names

## API Reference

### 📚 Package Documentation

For comprehensive documentation with examples, advanced usage patterns, and best practices, see the individual package documentation:

- **[🔢 Array Utilities](./src/array/array.md)** - Array manipulation and chunking utilities
- **[🌐 Network Utilities](./src/network/network.md)** - Port management and connectivity testing
- **[🔢 Number Utilities](./src/number/number.md)** - Number clamping and range validation
- **[⏰ Sleep Utilities](./src/sleep/sleep.md)** - Advanced sleep and timing functions
- **[📝 String Utilities](./src/string/string.md)** - String manipulation and formatting
- **[🔐 JWT Utilities](./src/jwt/jwt.md)** - JSON Web Token operations

### Quick Reference

#### Array Utilities
- `chunk<T>(array: T[], size: number): T[][]` - Splits an array into chunks of a specified size

#### String Utilities
- `capitalize(str: string): string` - Capitalizes the first letter of a string
- `capitalizeWords(str: string): string` - Capitalizes the first letter of each word

#### Number Utilities
- `clamp(number: number, lower: number, upper: number): number` - Clamps a number within bounds
- `inRange(number: number, lower: number, upper: number): boolean` - Checks if number is in range

#### Sleep Utilities
- `sleep(params: TSleepParams): Promise<void>` - Advanced sleep with flexible options
- `sleepMs(ms: number): Promise<void>` - Sleep for milliseconds
- `sleepSeconds(seconds: number): Promise<void>` - Sleep for seconds
- `sleepMinutes(minutes: number): Promise<void>` - Sleep for minutes
- `sleepUntil(unixTimestamp: number): Promise<void>` - Sleep until timestamp

#### Network Utilities
- `isPortInUse(port: number, options?): Promise<boolean>` - Check if port is in use
- `isPortAvailable(port: number, options?): Promise<boolean>` - Check if port is available
- `findAvailablePort(options?): Promise<number>` - Find an available port
- `checkMultiplePorts(ports: number[], options?): Promise<Map<number, boolean>>` - Check multiple ports
- `waitForPort(port: number, state: string, options?): Promise<void>` - Wait for port state

#### JWT Utilities
- `jwtSign<T>(payload: T, secret: string, options?): Promise<string>` - Sign JWT token
- `jwtVerify<T>(token: string, secret: string, options?): Promise<T | null>` - Verify JWT token
- `jwtDecode<T>(token: string, options?): T | null` - Decode JWT without verification
- `jwtIsExpired(token: string): boolean | null` - Check if token is expired
- `jwtTimeUntilExpiry(token: string): number | null` - Get time until expiration

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Type checking
npm run type-check

# Run tests
npm run test
```

## License

MIT