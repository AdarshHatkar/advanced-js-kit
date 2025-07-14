# Environment Compatibility

This document outlines the compatibility of each module in the advanced-js-kit library across different JavaScript environments.

## ✅ Universal (Node.js + Browser + Web Workers)

These modules work in all JavaScript environments:

### Array Utilities
- **`array/chunk`** - Pure JavaScript array operations
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

### String Utilities
- **`string/capitalize`** - Pure JavaScript string operations
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

### Number Utilities
- **`number/clamp`** - Pure JavaScript math operations
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

### Sleep Utilities
- **`sleep/sleep`** - Uses standard Promise API
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

### Time Utilities
- **`time/time`** - Pure JavaScript time calculations
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

### Environment Utilities
- **`utils/environment`** - Environment detection utilities
- Dependencies: None
- Browser: ✅ | Node.js: ✅ | Web Workers: ✅

## 🟡 Node.js Only

These modules require Node.js environment:

### Network Utilities
- **`network/port`** - Port checking and management
- Dependencies: `is-port-reachable` (Node.js networking)
- Browser: ❌ | Node.js: ✅ | Web Workers: ❌
- **Error**: Throws `EnvironmentError` when used outside Node.js

### JWT Utilities
- **`jwt/jwt`** - JSON Web Token operations
- Dependencies: `jsonwebtoken` (Node.js crypto)
- Browser: ❌ | Node.js: ✅ | Web Workers: ❌
- **Error**: Throws `EnvironmentError` when used outside Node.js

## 🔴 Browser Only

Currently, there are no browser-only modules in this library.

## Usage Examples

### Safe Universal Usage
```javascript
// Universal utilities (work everywhere) - Main export
import { chunk, capitalize, clamp, sleep, convertToSeconds } from 'advanced-js-kit';

// These work in Node.js, Browser, and Web Workers
const chunks = chunk([1, 2, 3, 4, 5], 2);
const title = capitalize('hello world');
const clamped = clamp(10, 0, 5);
await sleep({ seconds: 1 });
const seconds = convertToSeconds({ minutes: 5 });
```

### Platform-Specific Usage
```javascript
// Node.js-only utilities (recommended approach)
import { isPortInUse, jwtSign, chunk, capitalize } from 'advanced-js-kit/node';

// Browser-optimized imports (future-proof)
import { chunk, capitalize, clamp, sleep } from 'advanced-js-kit/browser';

// Individual module imports (maximum tree-shaking)
import { isPortInUse } from 'advanced-js-kit/network/port'; // Node.js only
import { chunk } from 'advanced-js-kit/array/chunk';         // Universal
```

### Environment-Specific Usage
```javascript
import { 
  isNodeEnvironment, 
  EnvironmentError 
} from 'advanced-js-kit';

// Check environment before using Node.js-only features
if (isNodeEnvironment()) {
  // Use Node.js-specific bundle
  const { isPortInUse, jwtSign } = await import('advanced-js-kit/node');
  
  const portInUse = await isPortInUse(3000);
  const token = jwtSign({ userId: '123' }, 'secret');
} else {
  // Use browser-compatible bundle
  console.log('Using browser-compatible features only');
  const { chunk, capitalize } = await import('advanced-js-kit/browser');
}
```

### Error Handling
```javascript
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

## Tree Shaking Support

The library supports tree shaking with three import strategies:

```javascript
// 1. Platform-specific bundles (recommended)
import { chunk, capitalize } from 'advanced-js-kit';           // Universal only
import { isPortInUse, jwtSign, chunk } from 'advanced-js-kit/node';     // Node.js + Universal  
import { chunk, capitalize, sleep } from 'advanced-js-kit/browser';   // Browser + Universal

// 2. Individual module imports (maximum tree-shaking)
import { chunk } from 'advanced-js-kit/array/chunk';           // Universal
import { capitalize } from 'advanced-js-kit/string/capitalize'; // Universal
import { isPortInUse } from 'advanced-js-kit/network/port';    // Node.js only
import { jwtSign } from 'advanced-js-kit/jwt/jwt';             // Node.js only

// 3. Environment detection + dynamic imports
if (isNodeEnvironment()) {
  const { isPortInUse } = await import('advanced-js-kit/network/port');
}
```

## Build Configuration

The library is built with dual package support:

- **ESM**: `.js` files for modern environments
- **CommonJS**: `.cjs` files for older Node.js environments  
- **TypeScript**: `.d.ts` files for type definitions

Environment detection happens at runtime, ensuring optimal compatibility across all JavaScript environments.
