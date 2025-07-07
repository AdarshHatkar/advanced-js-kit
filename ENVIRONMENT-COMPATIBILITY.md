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
import { chunk, capitalize, clamp, sleep, convertToSeconds } from 'advanced-js-kit';

// These work everywhere
const chunks = chunk([1, 2, 3, 4, 5], 2);
const title = capitalize('hello world');
const clamped = clamp(10, 0, 5);
await sleep({ seconds: 1 });
const seconds = convertToSeconds({ minutes: 5 });
```

### Environment-Specific Usage
```javascript
import { 
  isNodeEnvironment, 
  EnvironmentError 
} from 'advanced-js-kit';

// Check environment before using Node.js-only features
if (isNodeEnvironment()) {
  const { isPortInUse } = await import('advanced-js-kit/network/port');
  const { jwtSign } = await import('advanced-js-kit/jwt/jwt');
  
  const portInUse = await isPortInUse(3000);
  const token = await jwtSign({ userId: '123' }, 'secret');
} else {
  console.log('Network and JWT utilities require Node.js');
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

The library supports tree shaking, so you can import only the modules you need:

```javascript
// Import only what you need
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';

// Node.js only imports
import { isPortInUse } from 'advanced-js-kit/network/port'; // Only works in Node.js
import { jwtSign } from 'advanced-js-kit/jwt/jwt';           // Only works in Node.js
```

## Build Configuration

The library is built with dual package support:

- **ESM**: `.js` files for modern environments
- **CommonJS**: `.cjs` files for older Node.js environments  
- **TypeScript**: `.d.ts` files for type definitions

Environment detection happens at runtime, ensuring optimal compatibility across all JavaScript environments.
