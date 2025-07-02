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
import { chunk, capitalize, clamp } from 'advanced-js-kit';

// Array utilities
const chunkedArray = chunk([1, 2, 3, 4, 5], 2);
// Result: [[1, 2], [3, 4], [5]]

// String utilities
const capitalizedString = capitalize('hello world');
// Result: "Hello world"

// Number utilities
const clampedNumber = clamp(15, 0, 10);
// Result: 10
```

### Tree-shaking Support

You can also import individual functions for better tree-shaking:

```typescript
// Import specific functions
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';
import { clamp } from 'advanced-js-kit/number/clamp';
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