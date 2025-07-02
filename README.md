# Advanced JavaScript Kit

A collection of advanced JavaScript/TypeScript utility functions for modern development.

## Features

- 🚀 **TypeScript Support** - Full TypeScript support with type definitions
- 📦 **Tree Shakable** - Import only what you need
- 🧪 **Well Tested** - Comprehensive test coverage
- 📖 **Well Documented** - JSDoc comments for all functions
- 🔧 **Modern Build** - Built with tsup for optimal bundling
- 💡 **Excellent IDE Support** - Full auto-completion and IntelliSense support

## Installation

```bash
npm install advanced-js-kit
```

## Usage

```typescript
import { chunk, capitalize, clamp, sleep, sleepMs } from 'advanced-js-kit';

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
await sleepMs(1000); // Sleep for 1 second
await sleep({ seconds: 2, milliseconds: 500 }); // Sleep for 2.5 seconds
```

### Tree-shaking Support

You can also import individual functions for better tree-shaking:

```typescript
// Import specific functions
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';
import { clamp } from 'advanced-js-kit/number/clamp';
import { sleep, sleepMs } from 'advanced-js-kit/sleep/sleep';
```

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

### Array Utilities

#### `chunk<T>(array: T[], size: number): T[][]`
Splits an array into chunks of a specified size.

### String Utilities

#### `capitalize(str: string): string`
Capitalizes the first letter of a string.

#### `capitalizeWords(str: string): string`
Capitalizes the first letter of each word in a string.

### Number Utilities

#### `clamp(number: number, lower: number, upper: number): number`
Clamps a number within the inclusive lower and upper bounds.

#### `inRange(number: number, lower: number, upper: number): boolean`
Checks if a number is within the inclusive range.

### Sleep Utilities

#### `sleep(params: TSleepParams): Promise<void>`
Advanced sleep function with flexible delay options:
- Fixed delays: `{ milliseconds: 1000 }`, `{ seconds: 5 }`, `{ minutes: 2 }`
- Combined delays: `{ seconds: 1, milliseconds: 500 }`
- Random delays: `{ random: { seconds: { min: 1, max: 5 } } }`
- Sleep until timestamp: `{ until: { unixTimestamp: 1672531200 } }`

#### `sleepMs(ms: number): Promise<void>`
Sleep for a specific number of milliseconds.

#### `sleepSeconds(seconds: number): Promise<void>`
Sleep for a specific number of seconds.

#### `sleepMinutes(minutes: number): Promise<void>`
Sleep for a specific number of minutes.

#### `sleepUntil(unixTimestamp: number): Promise<void>`
Sleep until a specific Unix timestamp (in seconds).

### Network Utilities

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